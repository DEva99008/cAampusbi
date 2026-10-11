# CampusBite KPRCAS

## Pages

- `index.html` is the start page. Choose Student or Admin on each visit; the Admin login link is also highlighted at the top of the welcome card.
- `student-login.html` is the separate student sign-in.
- `student.html` is the student portal.
- `admin.html` is the separate admin sign-in and dashboard.
- `shop.html` is the student food menu and ordering page.
- The order page includes a direct Admin login link in its header.
- Homepage search opens the menu with matching meals pre-filtered. The order page search suggests menu items while typing, and its realistic food-photo carousel can be swiped or advanced with the arrows. All pages include rotating, swipeable food-photo backgrounds.
- The welcome page plays `campusbite-intro.mp4` with an animated-logo overlay and a skip option. When playback is supported, the welcome page appears after the entire video finishes; unsupported playback shows the logo intro before continuing.
- Student sign-in offers demo Student ID/PIN and sample mobile/demo-code modes. Mobile mode does not send an SMS or reveal a password.
- Admin analytics include daily revenue and order-volume bars with a revenue trend line. The map shows KPRCAS locations only; it does not track a visitor's device location. WhatsApp and SMS delivery are not connected.
- `supabase/` contains a backend setup foundation: a database migration with row-level security and order creation, plus a secure Student ID/Admin username login function. The existing pages are not yet connected to this backend; follow [`supabase/SETUP.md`](./supabase/SETUP.md) before attempting a live deployment.

## Publish with GitHub Pages

1. Upload all files and this project's assets to the root of a GitHub repository.
2. Commit the upload to the `main` branch.
3. In **Settings → Pages**, select **Deploy from a branch**, then choose **main** and **/(root)**.
4. After deployment, open the URL shown in Pages settings. It should show the Student/Admin start page.

## Optional Supabase backend foundation

The current website remains a browser-local demo until its pages are connected
to a configured Supabase project. See [`supabase/SETUP.md`](./supabase/SETUP.md)
for project setup, account provisioning, database policies, and secure
Edge Function deployment. Never upload a Supabase service-role key to GitHub.

## Demo-only security and storage

Admin and student authentication are client-side demo flows, not secure authentication. Data is saved in each browser's local storage and is not shared or synchronized between visitors. Do not use real passwords, personal student data, or real payment details on this static public demo.
