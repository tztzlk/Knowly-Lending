# Local development (Windows & TLS)

This guide helps you run the Knowly frontend locally without TLS/SSL or fetch errors when talking to Supabase (e.g. **"TypeError: fetch failed"** / **"UNABLE_TO_GET_ISSUER_CERT_LOCALLY"**).

## Why this happens

On Windows, Node.js sometimes cannot verify the SSL certificate chain for Supabase’s API. Corporate proxies or locked-down environments can make this worse. The lead capture form calls your Next.js API route, which uses the Supabase server client; that `fetch` runs in Node and can fail with a certificate error.

## What we do in code

- **Production:** TLS is always enforced. No changes.
- **Local dev:** You can optionally relax TLS **only for Supabase requests** or for the whole Node process, as below.

## Option 1 – Insecure dev fetch (recommended)

Only Supabase requests use a custom fetch that skips certificate verification. Other traffic is unchanged.

1. In `frontend/.env.local`, add:
   ```env
   SUPABASE_INSECURE_DEV=1
   ```
2. From `frontend/`, run:
   ```bash
   npm run dev
   ```
3. Submit the waitlist form again.

**Do not set `SUPABASE_INSECURE_DEV` in production.** The app only uses this when `NODE_ENV=development`.

## Option 2 – Process-wide TLS relax (Windows)

If Option 1 is not enough (e.g. old Node or different TLS stack), you can relax TLS for the whole dev process:

From `frontend/`, run:

```bash
npm run dev:win
```

This sets `NODE_TLS_REJECT_UNAUTHORIZED=0` only for that process. **Never use this in production or set it in deployment env.**

## Option 3 – Use your own CA (corporate proxy)

If you’re behind a corporate proxy that uses a custom CA:

1. Export your corporate root CA as PEM (e.g. `corporate-root.pem`).
2. In `frontend/.env.local` (or in the shell before running dev), set:
   ```env
   NODE_EXTRA_CA_CERTS=C:\path\to\corporate-root.pem
   ```
3. Run:
   ```bash
   npm run dev
   ```

No TLS verification is disabled; Node just trusts your CA.

## Environment variables summary

| Variable | Where | Purpose |
|----------|--------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` | Supabase project URL (required) |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` | Server-only key for API routes (required) |
| `SUPABASE_INSECURE_DEV=1` | `.env.local` (dev only) | Use custom fetch that skips TLS for Supabase in development |
| `NODE_EXTRA_CA_CERTS` | Shell or `.env` | Path to PEM file for custom CA (optional) |

Copy `frontend/.env.example` to `frontend/.env.local` and fill in the Supabase values. See `.env.example` for TLS options.

## Working Supabase fetch flow (lead form)

1. **Client** (`WaitlistForm.tsx`): `POST /api/waitlist` with JSON body `{ name, email, phone, role, … }`.
2. **API route** (`app/api/waitlist/route.ts`): Validates input, then calls `getSupabaseServer()` and `supabase.from("leads").upsert(...)` with `onConflict: "email"`.
3. **Server client** (`lib/supabase/server.ts`): Uses `createClient(url, serviceRoleKey)`. In dev, if `SUPABASE_INSECURE_DEV=1`, it uses a custom `fetch` (via undici `Agent` with `rejectUnauthorized: false`) so Supabase requests succeed despite local TLS issues.

All Supabase calls from API routes go through this server client; no TLS bypass is used in production.

## Vercel deployment

- Do **not** set `SUPABASE_INSECURE_DEV` or `NODE_TLS_REJECT_UNAUTHORIZED` in Vercel.
- Only `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (as env vars in Vercel) are needed. TLS works normally in production.
