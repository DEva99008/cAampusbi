import { createClient } from "npm:@supabase/supabase-js@2";

const allowedOrigins = (Deno.env.get("ALLOWED_ORIGINS") ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

function corsHeaders(origin: string | null): Record<string, string> | null {
  if (!origin || !allowedOrigins.includes(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  cors: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...cors,
      "Cache-Control": "no-store",
      "Content-Type": "application/json",
    },
  });
}

Deno.serve(async (request: Request) => {
  const cors = corsHeaders(request.headers.get("origin"));
  if (!cors) return new Response("Origin is not allowed", { status: 403 });

  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405, cors);
  }
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 8192) {
    return jsonResponse({ error: "Request is too large." }, 413, cors);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    console.error("CampusBite login function is missing Supabase environment variables.");
    return jsonResponse({ error: "Sign-in is not configured yet." }, 500, cors);
  }

  let requestBody: unknown;
  try {
    requestBody = await request.json();
  } catch {
    return jsonResponse({ error: "Enter your account ID and password." }, 400, cors);
  }
  if (!requestBody || typeof requestBody !== "object" || Array.isArray(requestBody)) {
    return jsonResponse({ error: "Enter your account ID and password." }, 400, cors);
  }
  const credentials = requestBody as { loginId?: unknown; password?: unknown };

  const loginId = typeof credentials.loginId === "string"
    ? credentials.loginId.trim().toLowerCase()
    : "";
  const password = typeof credentials.password === "string"
    ? credentials.password
    : "";
  if (!/^[a-z0-9._-]{2,80}$/.test(loginId) || password.length < 1 || password.length > 128) {
    return jsonResponse({ error: "Enter your account ID and password." }, 400, cors);
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const authClient = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: profile, error: profileError } = await adminClient
    .from("profiles")
    .select("user_id, status")
    .eq("login_id", loginId)
    .maybeSingle();

  if (profileError) {
    console.error("CampusBite profile lookup failed:", profileError.message);
    return jsonResponse({ error: "Sign-in is temporarily unavailable." }, 500, cors);
  }
  if (!profile || profile.status !== "active") {
    return jsonResponse({ error: "Invalid account ID or password." }, 401, cors);
  }

  const { data: userResult, error: userError } = await adminClient.auth.admin
    .getUserById(profile.user_id);
  if (userError || !userResult.user?.email) {
    console.error("CampusBite auth account lookup failed:", userError?.message ?? "Missing email");
    return jsonResponse({ error: "Sign-in is temporarily unavailable." }, 500, cors);
  }

  const { data: signIn, error: signInError } = await authClient.auth
    .signInWithPassword({ email: userResult.user.email, password });
  if (signInError || !signIn.session) {
    return jsonResponse({ error: "Invalid account ID or password." }, 401, cors);
  }

  return jsonResponse({
    access_token: signIn.session.access_token,
    refresh_token: signIn.session.refresh_token,
    expires_at: signIn.session.expires_at,
    token_type: signIn.session.token_type,
    user: { id: profile.user_id, login_id: loginId },
  }, 200, cors);
});
