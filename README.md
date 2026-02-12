📘 Knowly — Career Discovery Platform 

Knowly is an MVP web platform designed to help students better understand themselves and discover suitable career directions through a structured profile and a career quiz.

The core idea of the product is career guidance through self-discovery, not tests or exams.

🚀 Core Idea

Many students struggle to choose a career direction because they lack structured self-analysis.
Knowly solves this by guiding users through:

A simple student profile

A career quiz — the main feature of the product

Clear and understandable career direction recommendations

✨ Key Features (MVP)
🧑 Student Profile

Full name

Age or school grade

Place of study

Interests (multiple choice)

Career goal (choose profession / change direction)

Avatar upload & removal

Editable personal profile page

🧠 Career Quiz (Core Feature)

10–12 simple questions

Focus on preferences (people vs systems, theory vs practice, etc.)

Rules-based logic (no AI yet)

Generates 2–3 recommended career directions

Each recommendation includes a short textual explanation

The Career Quiz is one of the primary actions (CTA) in the product and represents the main value proposition.

🧩 MVP Constraints

No authentication (for now)

One profile per user

Simple, deterministic logic

Scalable architecture for future features

🛠 Tech Stack (Current)

Frontend: React / Next.js

Backend: Node.js

Storage: Database or local storage (MVP)

Styling: Minimalistic, clean UI

🔮 Planned Features

User authentication

Personalized career paths

Course and major recommendations

Profile completeness tracking

AI-powered career matching

🎯 Project Status

This project is currently in MVP development stage and is focused on validating the core idea and user flow.

---

### Project structure

- **Root repo (`Knowly/`)**: meta folder that contains the app and git utilities.
- **App root (`Knowly-main/`)**:
  - `frontend/` – Next.js 16 app (landing + waitlist + Clarity quiz).
  - `supabase/` – SQL migrations for the `leads` table.
  - `.github/workflows/` – CI workflows (`nextjs.yml`, `vercel-build-check.yml`).

All application code lives under `Knowly-main/frontend`.

---

### Prerequisites

- **Node.js**: **20.x LTS** (or newer 22.x). On Windows, install from the official installer or via `nvm-windows`.
- **npm**: 10+ (bundled with recent Node).
- **Git**.
- **Supabase account**: 1 project for Knowly.

> The repo is configured so that `node_modules` and build output are **never committed**. Root-level `package.json` is a minimal placeholder to avoid legacy dependencies and node-gyp builds.

---

### 1. Local development on Windows

All commands below assume the repository root is `Knowly`.

1. **Clone the repo**

   ```bash
   git clone <your-fork-or-origin-url> Knowly
   cd Knowly
   ```

2. **Install frontend dependencies**

   ```bash
   cd Knowly-main/frontend
   npm install
   ```

3. **Create your local env file**

   ```bash
   cp .env.example .env.local
   ```

4. **Fill required Supabase variables in `.env.local`**

   - **`NEXT_PUBLIC_SUPABASE_URL`** – `https://<your-project-id>.supabase.co`
   - **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** – anon (public) key from Supabase
   - **`SUPABASE_SERVICE_ROLE_KEY`** – service role key (server-only, never exposed to client)
   - **`NEXT_PUBLIC_SITE_URL`** – e.g. `http://localhost:3000` for local dev

5. **Run the dev server**

   From the frontend folder:

   ```bash
   cd Knowly-main/frontend
   npm run dev
   ```

   Or using the wrapper scripts from `Knowly-main`:

   ```bash
   cd Knowly-main
   npm run dev
   ```

6. **Open the app**

   Visit `http://localhost:3000` (or the port printed by Next.js).

---

### 2. Supabase configuration

1. **Create a Supabase project**

   - Go to Supabase dashboard.
   - Create a new project for Knowly.

2. **Apply database migrations**

   In Supabase SQL editor, apply the SQL from:

   - `supabase/migrations/20250211000000_create_leads.sql`
   - `supabase/migrations/20250211001000_alter_leads_add_role_fields.sql`
   - `supabase/migrations/20250212000000_add_clarity_fields.sql`

3. **Copy Supabase keys**

   From the Supabase project settings:

   - `NEXT_PUBLIC_SUPABASE_URL` – project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` – anon/public key.
   - `SUPABASE_SERVICE_ROLE_KEY` – service role key (server-side only).

   Put them into:

   - `.env.local` (for local development).
   - Vercel project environment variables (for production).

4. **Security notes**

- `SUPABASE_SERVICE_ROLE_KEY` is used **only** in API routes on the server (`getSupabaseServer()` in `frontend/lib/supabase/server.ts`).
- `.env.local` is git-ignored; do **not** commit real secrets.
- If secrets were ever committed, **rotate all keys in Supabase** and update Vercel/envs.

5. **Windows TLS / certificate issues**

If you see **"fetch failed"** or **"UNABLE_TO_GET_ISSUER_CERT_LOCALLY"** when submitting the waitlist form:

- **Recommended:** Add `SUPABASE_INSECURE_DEV=1` to `.env.local` (dev only), then run `npm run dev`. This relaxes TLS only for Supabase requests.
- **Alternative:** From `frontend/`, run `npm run dev:win` to relax TLS for the dev process (Windows).
- **Corporate proxy:** Set `NODE_EXTRA_CA_CERTS=C:\path\to\corporate-root.pem` and run `npm run dev`.

Full details: **[LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md)**. Do not use these options in production.

---

### 3. Production build & checks

From `Knowly-main/frontend`:

```bash
npm run build
```

This runs a Next.js 16 production build and TypeScript checks. The CI workflow `vercel-build-check.yml` replicates this using placeholder Supabase keys.

---

### 4. Deploying to Vercel

1. **Create a new Vercel project**

   - Import your GitHub repository.

2. **Root directory**

   - If the repo root is `Knowly`, set **Root Directory** in Vercel to:  
     `Knowly-main/frontend`

3. **Build settings**

   - Framework: **Next.js**
   - Build command: `npm run build`
   - Output: default `.next`
   - Node version: 20.x (or the current LTS supported by Vercel).

4. **Environment variables (Vercel → Project → Settings → Environment Variables)**

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.vercel.app`)
   - Optional analytics:
     - `NEXT_PUBLIC_MICROSOFT_CLARITY_ID`
     - `NEXT_PUBLIC_GA_MEASUREMENT_ID`

5. **First deploy checklist**

   - Trigger a deploy in Vercel.
   - After deploy, open:
     - `/[locale]/waitlist` – submit the waitlist form.
     - `/[locale]/clarity` – complete the Clarity quiz.
   - Verify records appear in the `leads` table in Supabase.

---

### 5. Cleaning git history & large files

The working tree is configured to ignore `node_modules`, build output, and other transient files, but you may still have large binaries (e.g. `next-swc.*.node`, old `node_modules/` trees) in **git history**.

> This step **rewrites git history**. Only run it if you understand the impact and have backups.

1. **Ensure you have a backup**

   ```bash
   git clone --mirror . ../Knowly-backup.git
   ```

2. **Install `git filter-repo` tooling**

   You can either:

   - Use the official Python-based `git filter-repo` from the upstream repo, **or**
   - Use the Node.js CLI installed as a devDependency in `Knowly-main`:

     ```bash
     cd Knowly-main
     npx git-filter-repo --help
     ```

3. **Remove `node_modules` and typical large binary blobs from history**

   From the repo root (`Knowly/`) or from `Knowly-main/`:

   ```bash
   npx git-filter-repo ^
     --invert-paths ^
     --path node_modules ^
     --path-glob "*.tgz" ^
     --path-glob "*.zip" ^
     --path-glob "*.log"
   ```

4. **Force-push the cleaned history (optional, for shared remotes)**

   ```bash
   git push --force-with-lease origin main
   ```

   Every collaborator must then **re-clone** or hard-reset to the new history.

After running these steps, the repository history will no longer contain committed `node_modules` trees or common large archives, and `.gitignore` will prevent them from being reintroduced.

