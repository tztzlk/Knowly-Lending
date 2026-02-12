# Knowly Landing Refactor

## 1) Files deleted

### Backend (entire backend removed)
- `backend/.env.example`
- `backend/package.json`
- `backend/package-lock.json`
- `backend/src/index.js`
- `backend/src/db.js`
- `backend/src/engagement/db.js`
- `backend/src/engagement/routes.js`
- `backend/src/profile/db.js`
- `backend/src/profile/routes.js`
- `backend/src/quiz/routes.js`
- `backend/src/quiz/scoring.js`

### Legacy app routes (non-locale, platform/quiz/trials)
- `frontend/app/about/page.tsx`
- `frontend/app/contact/page.tsx`
- `frontend/app/product/page.tsx`
- `frontend/app/profile/page.tsx`
- `frontend/app/quiz/layout.tsx`
- `frontend/app/quiz/page.tsx`
- `frontend/app/schools/page.tsx`
- `frontend/app/students/page.tsx`
- `frontend/app/students/next/page.tsx`
- `frontend/app/students/profile/page.tsx`
- `frontend/app/students/tasks/[field]/page.tsx`
- `frontend/app/trials/page.tsx`
- `frontend/app/trials/[field]/page.tsx`
- `frontend/app/trials/[field]/TrialStartCTA.tsx`
- `frontend/app/trials/[field]/close/page.tsx`
- `frontend/app/trials/[field]/intermediate/page.tsx`
- `frontend/app/trials/[field]/project/page.tsx`
- `frontend/app/trials/[field]/tasks/page.tsx`
- `frontend/app/trials/[field]/verdict/page.tsx`

### Unused components
- `frontend/components/about/AboutAdvantages.tsx`
- `frontend/components/about/AboutMission.tsx`
- `frontend/components/about/AboutVision.tsx`
- `frontend/components/contact/ContactEmailCapture.tsx`
- `frontend/components/contact/ContactForm.tsx`
- `frontend/components/contact/ContactPartnershipsCTA.tsx`
- `frontend/components/home/*` (Audience, Benefits, CTA, Hero, HowItWorks, Problem, Solution)
- `frontend/components/product/*` (AISection, FeatureGrid, ProductOverview, UserFlow)
- `frontend/components/schools/*` (SchoolsBenefits, SchoolsDemoCTA, SchoolsPricing, SchoolsValueProp)
- `frontend/components/students/*` (StudentsBenefits, Outcomes, Pricing, TrialCTA, UpgradeCTA, module/*)
- `frontend/components/layout/Header.tsx`
- `frontend/components/layout/Footer.tsx`
- `frontend/components/ui/Button.tsx`
- `frontend/components/ui/Card.tsx`
- `frontend/components/ui/Section.tsx`

### Dead lib code
- `frontend/lib/api.ts`
- `frontend/lib/constants.ts`
- `frontend/lib/engagement.ts`
- `frontend/lib/modules.ts`
- `frontend/lib/profile-constants.ts`
- `frontend/lib/profile.ts`
- `frontend/lib/quiz.ts`
- `frontend/lib/trials.ts`
- `frontend/lib/validation.ts`

### Legacy Vite / docs / misc
- `frontend/src/App.jsx`
- `frontend/src/main.jsx`
- `frontend/src/index.css`
- `frontend/index.html`
- `frontend/vite.config.js`
- `frontend/DESIGN_ANALYSIS.md`
- `frontend/DESIGN_CONCEPTS.md`
- `frontend/LANDING_MIGRATION.md`
- `frontend/Untitled`

---

## 2) Refactored structure (after)

```
Knowly-main/
├── .github/workflows/nextjs.yml
├── .gitignore
├── docker-compose.yml          # postgres only; optional for future backend
├── package.json                # knowly-landing, scripts: dev, build, start
├── README.md
├── REFACTOR.md                 # this file
└── frontend/
    ├── .env.local.example
    ├── .gitignore
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx            # redirects to /en
    │   ├── api/waitlist/route.ts
    │   └── [locale]/
    │       ├── layout.tsx
    │       ├── page.tsx
    │       ├── about/page.tsx
    │       ├── for-universities/page.tsx
    │       ├── how-it-works/page.tsx
    │       └── waitlist/page.tsx
    ├── components/
    │   ├── analytics/AnalyticsScripts.tsx
    │   ├── context/LocaleContext.tsx, SetHtmlLang.tsx
    │   ├── landing/
    │   │   ├── AboutContent.tsx, ForUniversitiesContent.tsx, HowItWorksContent.tsx
    │   │   ├── LandingHero.tsx, LandingSteps.tsx, LandingBenefits.tsx
    │   │   ├── LandingSocialProof.tsx, LandingCTA.tsx
    │   │   ├── WaitlistContent.tsx, WaitlistForm.tsx
    │   ├── layout/Container.tsx, LandingHeader.tsx, LandingFooter.tsx, LanguageSwitcher.tsx
    │   └── shared/Logo.tsx
    ├── lib/i18n/
    │   ├── index.ts            # getMessages, localePrefix, types
    │   ├── types.ts
    │   └── messages/en.ts, ru.ts, kz.ts
    ├── styles/globals.css
    ├── middleware.ts
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── tsconfig.json
    ├── next-env.d.ts
    └── package.json
```

---

## 3) Updated color system

- **Primary (accent):** Shifted from purple (`#5D50A3`) to **startup blue**.
  - `ref.primary`: `#4F8CFF` (main CTA, links, logo block)
  - Tailwind `primary` scale: blue scale aligned to `#3b82f6` (50–900)
  - Tailwind `secondary`: same blue range (50–900) for consistency; used for success states (e.g. waitlist success message)

- **CSS variables** (`styles/globals.css`):
  - `--color-primary`: `59 130 246`
  - `--color-secondary`: `79 140 255`

- **Unchanged:** `ref.bg`, `ref.heading`, `ref.body`, `ref.border` (Knowly base).

- **Result:** Brighter, more confident, tech/startup feel; less “edtech purple.”

---

## 4) Optimized components

- **Shared `localePrefix`:** Moved to `lib/i18n` and used in LandingHeader, LandingFooter, LandingHero, LandingCTA, HowItWorksContent, ForUniversitiesContent (no duplicated logic).
- **Transitions:** Replaced ad-hoc `transition-colors duration-200` with a single `.transition-smooth` class in `globals.css` (color, background, border, shadow, transform, 0.2s ease).
- **Tailwind content:** Removed `index.html` and `./src/**`; only `app/**` and `components/**` are scanned (smaller/faster).
- **LandingBenefits:** SparkIcon fixed (was duplicate of CompassIcon; given distinct path).
- **Root package.json:** Renamed to `knowly-landing`; scripts `dev`, `build`, `start` (frontend only); removed `dev:backend` and `git` dependency.

---

## 5) Risks

| Risk | Mitigation |
|------|------------|
| **Empty backend folder** | Backend was removed file-by-file; empty `backend/` dirs may remain. Safe to delete the whole `backend/` folder if you no longer need it. |
| **Docker Compose** | Still defines Postgres only. Harmless for landing-only; remove or keep for future backend. |
| **Middleware deprecation** | Next.js 16 warns about “middleware” → “proxy”. Behavior unchanged; plan to follow Next.js migration when you upgrade. |
| **Waitlist API** | `/api/waitlist` still expects `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for persistence. Without them, POST still returns 200 but does not store emails. |
| **i18n types** | `Messages` and nested keys (e.g. `t.home.hero`) are typed loosely (`Record<string, unknown>`). Tighter typing can be added later without breaking the landing. |

---

## Before / after file tree (summary)

**Before:** Backend + duplicate app routes (about, contact, product, profile, quiz, schools, students, trials) + home/about/contact/product/schools/students components + Header/Footer + Button/Card/Section + lib (api, constants, engagement, modules, profile, quiz, trials, validation) + Vite `src/`, `index.html`, `vite.config.js` + design docs.

**After:** Single Next.js app with `[locale]` routes only, landing components, layout (Container, LandingHeader, LandingFooter, LanguageSwitcher), shared Logo, analytics, i18n (with `localePrefix`), waitlist API, and global styles. No backend, no quiz/platform/trials code.

Run from repo root: `npm run dev` (or `npm run dev --prefix frontend`). Build: `npm run build`.
