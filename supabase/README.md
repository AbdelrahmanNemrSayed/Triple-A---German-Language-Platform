# Supabase progress backup setup

The app keeps working locally if cloud backup is not configured. Cloud sync is a manual, whole-account snapshot: upload explicitly replaces that account's previous cloud snapshot; restore explicitly replaces managed learning/profile data on the current device. Export a local JSON backup before restoring. Theme, audio preferences, and other device-only settings are not replaced.

## Project setup

1. Create a Supabase project and run `schema.sql` in its SQL Editor.
2. In Authentication → URL Configuration, add the exact local and deployed site origins to the allowed redirect URLs (for example `http://localhost:3000/**` and `https://your-domain.example/**`).
3. Copy the project's Project URL and publishable/anon key into `assets/js/supabase_config.js` as `url` and `anonKey`.
4. Never put a `service_role` key in the browser or repository.
5. Rebuild and deploy with `npm run build`. The browser SDK is copied from the installed npm dependency into the static output; the app shell caches it for offline use.

Users enter an email address and follow Supabase's one-time sign-in link. The browser stores its Supabase session locally. Snapshot transfer requires a connection; learning itself remains local-first. Snapshots contain all local learner profiles and their progress, so only upload to a private account controlled by the learner.
