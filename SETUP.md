# CampusBite Supabase backend setup

This folder contains the database migration and account-ID login endpoint for a
Supabase project. Supabase Auth stores password hashes; CampusBite does not
store plain-text passwords. The service-role key is used only by the Edge
Function and must never be added to a website file or GitHub repository.

## 1. Create the Supabase project

1. Create a project at [supabase.com](https://supabase.com/).
2. In **Project Settings → API**, copy the Project URL and the public `anon`
   key. Keep the `service_role` key private.
3. In **SQL Editor**, run the complete migration
   [`migrations/20261011000000_campusbite_backend.sql`](./migrations/20261011000000_campusbite_backend.sql).
4. In **SQL Editor**, run [`seed.sql`](./seed.sql) to add the two campus canteens,
   A/B/C Blocks, and starter menu. It is safe to run again; existing seeded rows
   are not overwritten.
5. In **Authentication → Providers**, enable Email/password sign-in. Use verified
   campus email addresses for Auth accounts. Each account will also have a
   CampusBite login ID such as `cb1024` or `admin`.

## 2. Create a login account

For each student or staff member:

1. Create their Auth user from the Supabase dashboard and set a temporary
   password. Confirm the account using the dashboard's user controls.
2. Copy that Auth user's UUID.
3. Insert a profile using the SQL Editor, replacing the example values:

```sql
insert into public.profiles (user_id, login_id, display_name, role)
values (
  'AUTH-USER-UUID',
  'cb1024',
  'Student display name',
  'student'
);
```

Allowed roles are `student`, `stall_staff`, `stall_manager`, and `admin`.
Login IDs are lowercase and unique. Suspended profiles cannot use the login
endpoint. Provision the first admin from the SQL Editor; do not create an
admin role through a public sign-up form.

## 3. Add campus data

Create the New Canteen and Old Canteen in `public.stalls`, then add each
canteen's food to `public.menu_items` with its stall UUID. Public visitors can
read only available items at open stalls. Images should be hosted in a public
Supabase Storage bucket or at a stable HTTPS URL, and the URL should be saved
as `image_url`.

The `public.create_order` RPC accepts a stall UUID, a JSON array of
`{"menu_item_id":"UUID","quantity":1}` values, and a payment method. It checks
the signed-in student, stall, item availability, quantity, and database prices
before creating an order, item snapshots, and a pending payment record.
The migration adds orders, menu items, stalls, and announcements to Supabase
Realtime when the project's `supabase_realtime` publication is available.

## 4. Deploy account-ID sign-in

Install and authenticate the Supabase CLI, link this project, and set the
function secrets. Use the exact public website origin in `ALLOWED_ORIGINS`
(for GitHub Pages, this is the origin such as `https://owner.github.io`, not a
full page path).

```powershell
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_PRIVATE_SERVICE_ROLE_KEY
supabase secrets set ALLOWED_ORIGINS=https://owner.github.io
supabase functions deploy login
```

Supabase provides `SUPABASE_URL` and `SUPABASE_ANON_KEY` to Edge Functions.
Never set the service-role key in client-side JavaScript.

The endpoint is:

```text
POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/login
apikey: YOUR_PUBLIC_ANON_KEY
Content-Type: application/json

{"loginId":"cb1024","password":"the-user-password"}
```

It returns a Supabase Auth session on success and a generic credential error
when the account ID or password is invalid. The function accepts requests only
from origins listed in `ALLOWED_ORIGINS`.

## 5. Connect the existing website

The current `shop.html`, student pages, and admin dashboard still use
browser-local demo data. The migration and login function are backend
prerequisites, not a completed website integration. Do not publish the demo
login as production authentication. Once a project URL and public `anon` key
are available, the website's sign-in, data loading, ordering, and admin
actions must be wired to Supabase and tested against the deployed project's
RLS policies before treating this as a live ordering system.

Supabase database policies protect account records, menu/stall management,
orders, payments, announcements, and the admin activity log. Payment records
are ledger records only; no payment gateway or real charge is configured.
