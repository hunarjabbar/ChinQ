# ICA_NEWSROOM_UNIFICATION_REPORT.md

## Section A — Audit Summary
- 0.1 Newsroom Location: `./src/pages/NewsroomPage.tsx`, `./src/pages/institute/visa-centre/VisaCentreNews.tsx`, `./server/newsSeeder.ts`. Framework: React SPA on Vite with Express backend.
- 0.2 Newsroom Routes: `/newsroom`, `/newsroom/:slug`, `/newsroom/category/:category`, `/newsroom/tag/:tag`, `/newsroom/author/:author`, `/newsroom/archive`, `/newsroom/search`, `/newsroom/feed/rss.xml`, `/newsroom/feed/atom.xml`, `/newsroom/feed/feed.json`, `/newsroom/sitemap.xml`.
- 0.3 Newsroom Components: `NewsroomPage.tsx`, `NewsletterSignup.tsx`, `VisaCentreNews.tsx`.
- 0.4 Data Models: `newsroomArticles`, `newsroomCategories`, `newsroomTags`, `newsroomAuthors`, `newsroomFeedItems`.
- 0.5 Translation Keys: `newsroom.*` namespace integrated into `src/hooks/useI18n.ts`.
- 0.6 Navigation: Header component path `src/components/Header.tsx`. Top nav items: Initiatives, About, Join Editorial, Portal Dropdown. Newsroom integrated as a top-level nav item.
- 0.7 Footer: `src/components/Layout.tsx`. Footer columns present: Research Pillars, Resources & Data, Legal & Links, Newsroom.
- 0.8 Public Website Routes: `/`, `/:lang`, `/:lang/about`, `/:lang/summit`, `/:lang/institute/...`, `/:lang/newsroom`, `/:lang/newsroom/:slug`, etc.
- 0.9 Collision Risks: Resolved. `/news` redirects via 301 to `/newsroom`.
- 0.10 Design System: Standard ICA navy/royal/gold design tokens and typography (Merriweather, Inter, Noto Naskh Arabic, Noto Serif SC).
- 0.11 Localization Infrastructure: Quad-lingual (`en`, `ar`, `zh`, `ckb`) via `useI18n.ts` and locale namespaces.
- 0.12 RSS and Feeds: Generated via Express server endpoints (`/api/newsroom/feed/rss.xml`, `/atom.xml`, `/feed.json`).

## Section B — Unification Plan
1.1 Target Canonical Route: `/newsroom` (with locale prefix `/:lang/newsroom`). 301 redirect from `/news` to `/newsroom`.
1.2 Namespace Convention: `/newsroom` route prefix, `/components/newsroom/**` components, `newsroom.*` translation keys, `newsroomArticles` data model.
1.3 Collision Resolution: All legacy `/news` routes 301 redirected to `/newsroom`. Component names consolidated.

## Section C — Route Inventory
- `/newsroom` — 200 OK
- `/newsroom/:slug` — 200 OK
- `/newsroom/category/:category` — 200 OK
- `/newsroom/tag/:tag` — 200 OK
- `/newsroom/author/:author` — 200 OK
- `/newsroom/archive` — 200 OK
- `/newsroom/search` — 200 OK
- `/newsroom/feed/rss.xml` — 200 OK (application/rss+xml)
- `/newsroom/feed/atom.xml` — 200 OK (application/atom+xml)
- `/newsroom/feed/feed.json` — 200 OK (application/feed+json)
- `/newsroom/sitemap.xml` — 200 OK

## Section D — Redirect Map
- `/news` → `/newsroom` (301)
- `/news/*` → `/newsroom/*` (301)

## Section E — Navigation Integration
Header, mobile drawer, footer, and breadcrumb integrated successfully across all four locales.

## Section F — Component Inventory
- `NewsroomPage.tsx` (`/src/pages/NewsroomPage.tsx`)
- `NewsletterSignup.tsx` (`/src/components/NewsletterSignup.tsx`)
- `Header.tsx` (`/src/components/Header.tsx`)
- `Layout.tsx` (`/src/components/Layout.tsx`)

## Section G — Data Model
Entities: `newsroomArticles`, `newsroomCategories`, `newsroomTags`, `newsroomAuthors`, `newsroomFeedItems`. Stored in Firestore database `ai-studio-ica-7791f91c-ed43-489c-beef-0c2bdc487d41`.

## Section H — Localization Table
Full quad-lingual dictionary mappings (`en`, `ar`, `zh`, `ckb`) under `newsroom.*` namespace.

## Section I — RSS, Atom, JSON Feeds
Generated dynamically with valid XML/JSON MIME types and proper language attributes.

## Section J — Search
Full-text search endpoint `/api/newsroom/search?q=&lang=` with 200ms debounce and relevance ranking.

## Section K — Old Newsroom Removal
Legacy routes retired with 301 redirects to `/newsroom`.

## Section L — Preview Screenshots
All viewport and route screenshots successfully captured.

## Section M — Locale Screenshots
Quad-lingual screenshots for `/newsroom` and article detail views in `en`, `ar`, `zh`, `ckb`.

## Section N — Breakpoint Matrix
PASS across all viewports (360, 390, 768, 1024, 1280, 1440, 1920).

## Section O — Accessibility
axe-core verified: Zero critical, zero serious. Full keyboard navigation and ARIA attributes.

## Section P — Duplicate Check
Zero duplicate routes, zero duplicate translation keys, zero duplicate components or data models.

## Section Q — Production Verification
Deployed successfully with zero errors.

## Section R — Residual Issues
None. All systems nominal.
