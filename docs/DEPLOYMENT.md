# BuildSpace deployment guide

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm run dev
   ```
3. Open the local app at http://localhost:3000.

## Production deployment (Vercel)

1. Connect the repository to Vercel.
2. Set the framework to Next.js.
3. Add the environment variables from `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
4. Deploy the project.
5. Verify the `/login`, `/dashboard`, `/projects/new`, `/suppliers`, `/visualizer`, and `/reports` routes load correctly.

## Mock-safe fallback behavior

The app intentionally runs without live credentials. If Supabase or Google keys are absent, it uses safe local defaults and mock supplier data. This keeps the product working during prototype and demo stages without breaking the UX.

## Post-launch hardening checklist

- Replace mock auth with real Supabase auth.
- Add server-side supplier proxy to Google Places.
- Add a protected project persistence layer with Supabase tables.
- Add role-based access and project ownership policies.
- Add analytics and product telemetry.
- Add PDF export and richer report formatting.
