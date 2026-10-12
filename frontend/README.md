# afsify — Muhammed Afsal

A personal portfolio for Muhammed Afsal, Frontend Developer at Bizforz and Full Stack Web Developer. Thirteen substantive pages present production experience, three employer-delivered websites, five independent projects, the engineering behind EkaVio, selected milestones and direct contact options. Hiring is the primary focus; selected freelance web projects are secondary. Production URL: https://www.afsify.com/.

## Stack

Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4 and Lucide icons. Server components are the default. Client code is limited to navigation, theme controls/observation, project filtering and the error boundary. Manrope is self-hosted through `next/font/local`; the SIL Open Font License is included alongside the font. No third-party analytics, authentication, contact service, database or backend is required.

## Local development

Use Node.js 22 or newer (validated with Node 24.16.0 and npm 11.13.0).

```sh
cd frontend
npm ci
npm run dev
```

Open http://localhost:3000. In Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

Development uses `next dev --webpack`. In this Windows workspace, Console Ninja instrumentation corrupted Turbopack's served development JavaScript, preventing React hydration and leaving theme controls inactive. Webpack development mode was verified with the integration present. Production continues to use `next build` with Turbopack. Restart an existing development server after updating the script.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production compilation, type validation and prerendering |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint, zero warnings allowed |
| `npm run typecheck` | Generate route types and run strict TypeScript |
| `npm run assets` | Recreate approved photographs, font and AFS artwork; never overwrite resume files |
| `npm run verify` | Source/content, HTTP routes, metadata, images, resume and reference-integrity checks |
| `npm run verify:browser` | Responsive, accessibility and interaction checks in headless Chrome |
| `npm run verify:images` | Actual delivered photo resolution at mobile, tablet and desktop, including retina displays |

`npm run assets -- --brand-only` regenerates only the social preview, favicon and app icon from the retained AFS mark, leaving photographs, fonts and the resume untouched.

`npm run assets -- --photos-only` regenerates only the four approved photographs directly from their originals.

`assets` is a maintenance command that requires the sibling `ref-files/` source directory. Final assets and fonts are already included, so development, builds and deployment do not read any reference directory.

## Routes

| Route | Content |
| --- | --- |
| `/` | Identity, flagship engineering work, professional websites, experience, milestones and contact CTA |
| `/about` | Professional narrative, work principles, technical focus and education |
| `/experience` | Bizforz contributions, product domains, recognition and separate training history |
| `/projects` | Eight projects with data-derived counts, ownership and category filters |
| `/projects/ekavio` | Architecture, tenant boundaries, sessions, RBAC, entitlements, storage and delivery |
| `/projects/codisify` | E-learning project notes |
| `/projects/chateph` | Realtime ephemeral messaging project notes |
| `/projects/afssian` | E-commerce project notes |
| `/projects/levalor` | LE’VALOR hospitality website: role and employer attribution |
| `/projects/home-at-paris` | Paris Furnished Apartments LLC website: role and employer attribution |
| `/projects/bizforz` | Employer corporate website: role and delivery scope |
| `/contact` | Hiring/project enquiries, email, phone, WhatsApp, LinkedIn and GitHub |
| `/resume` | Current HTML summary, primary PDF and secondary DOCX downloads |

The App Router also generates `/sitemap.xml`, `/robots.txt`, `/icon.svg`, `/apple-icon.png`, a custom 404 and a recoverable runtime error view. Unknown project slugs return 404; no empty project pages are generated.

## Structure

```text
frontend/
├── public/
│   ├── documents/muhammed-afsal-resume.{pdf,docx}
│   └── images/{profile,experience,brand}/
├── scripts/                 # asset preparation and verifiable QA
├── src/
│   ├── app/                 # routes, metadata, global styles and local font
│   ├── components/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── projects/
│   │   ├── sections/
│   │   └── ui/
│   ├── data/                # typed professional content
│   └── lib/                 # metadata and focused native theme helpers
├── .env.example
├── next.config.ts
├── package-lock.json
├── README.md
└── VALIDATION_REPORT.md
```

## Content and asset strategy

The supplied October 2026 PDF and DOCX in `public/documents/`, the current professional brief, and the current EkaVio repository are authoritative. `scripts/approved-assets.json` records the approved resume and photograph hashes. Earlier reference folders and their hash baseline are absent from this checkout.

- `src/data/profile.ts`: identity, canonical host, centralized phone/E.164/tel/WhatsApp values, hiring/project email links, resume paths, narrative and skills.
- `experience.ts`, `education.ts`, `recognition.ts`: professional history and photography captions.
- `resume.ts`: concise HTML resume details aligned with the supplied PDF/DOCX. `services.ts`: secondary freelance services.
- `projects.ts`: one typed project list shared by cards, filters, detail pages, static params and metadata.
- `navigation.ts`: primary navigation and core route inventory.
- `src/app/globals.css`: components, approved responsive layout, print and reduced-motion rules; component colors consume semantic tokens. Tailwind remains available for small utility adjustments.
- `src/app/tokens.css`: AFS palettes and semantic surface contexts for both themes.
- `src/lib/theme.ts` and `src/components/layout/ThemeToggle.tsx`: pre-paint initialization, theme controls and preference observation.

The design uses graphite, warm paper, platinum and restrained cool steel. Editorial typography establishes hierarchy; real portraits and milestones provide human context. The EkaVio diagram is labeled as an architecture overview and is not a product screenshot. There is no fabricated customer, revenue or performance data.

## Themes and AFS identity

The approved Manrope typography, layouts, photography, content, route structure and project hierarchy are retained. The existing `afsify.` navigation wordmark stays primary; the supplied AFS mark remains in the footer and now appears in social artwork. Favicon/app artwork uses a simplified monochrome AF mark for small-size clarity.

| Role | Dark | Light |
| --- | --- | --- |
| Background | `#111315` | `#F4F4F1` |
| Surface / raised | `#171A1D` / `#1E2225` | `#FFFFFF` / `#EDEEEB` |
| Text | `#F4F4F1` | `#17191B` |
| Muted / soft text | `#A7ACB0` / `#C4C8CB` | `#62686D` / `#4D5459` |
| Border / strong border | `#33383D` / `#4A5055` | `#CED2D4` / `#AEB4B8` |
| Accent / hover | `#D2D6DA` / `#F0F1F2` | `#5E676E` / `#262B2F` |
| Accent text | `#111315` | `#FFFFFF` |
| Focus | `#9AA9B3` | `#526977` |

Dark mode retains warm-paper editorial sections and a platinum CTA. Light mode layers off-white, white and soft platinum, with a graphite CTA. The flagship project, architecture diagram and footer retain intentional dark surfaces in both modes. These surface contexts remap foreground, border, focus and selection roles locally. Edit color roles in `tokens.css`; avoid hex values in component/layout CSS. Brand artwork and browser metadata have small, explicit fixed palettes. No legacy lime UI colors remain; colors inside genuine photographs are unchanged.

The synchronous head initializer sets `data-theme` before body content paints. A valid saved `afsify-theme` value wins; otherwise `prefers-color-scheme` determines the mode. The observer follows subsequent system changes only while preference is `system`, and synchronizes storage changes from other tabs. Missing, invalid or unavailable storage safely falls back to the OS. When storage is blocked, a toggle choice lasts for the current page session and client navigation.

Navigation and mobile-dialog controls offer Sun/Moon icons, action-specific accessible labels, at least 44px targets and a 3px keyboard focus ring. The initial accessible label is selected by CSS, so server/client markup is identical. Major pages remain server components. There is no theme dependency or new decorative motion; existing reduced-motion rules remain.

Next.js emits conditional dark/light `theme-color` fallbacks. The head initializer prepends one dedicated override matching the selected theme, and the toggle updates it. A focused head observer keeps it first when route metadata updates. Keeping that override separate avoids mutating metadata managed by React. Canonical/OG/Twitter/JSON-LD/sitemap/robots consistently use the configured production origin.

## Images and source integrity

Images are optimized locally with Sharp, which strips source metadata by default, and served with `next/image` and responsive sizes. Only approved photographs and the small supporting AFS logo are copied. Company assets, confidential screens, the ID card, birthday memento and obsolete PDF are absent from `public/`.

The four photographs retain their original dimensions (1254×1254, 1906×1798, 2304×3072 and 2048×1328) as quality-92 WebP sources. Next.js serves responsive WebP derivatives at quality 90. `src/lib/image-sizes.ts` accounts for the actual responsive card widths and the extra source pixels required by `object-fit: cover`, including the wide graduation photo and tall portrait frames. Only the homepage hero photo is preloaded; the about photo and recognition photos use default lazy loading. There is no enlargement, sharpening, denoising or photographic retouching.

The supplied updated PDF and DOCX retain their original bytes and clickable contact/project links. PDF is the primary recruiter download; DOCX is secondary. The HTML summary uses the same professional facts, current contact details and live/source links, with an explicit EkaVio staging note.

## Updating the resume

1. Place only approved files at `public/documents/muhammed-afsal-resume.pdf` and `public/documents/muhammed-afsal-resume.docx`.
2. Check their text and clickable links, then update the matching SHA-256 entries in `scripts/approved-assets.json`. This is an explicit source approval step; do not auto-refresh hashes during verification.
3. Synchronize `src/data/profile.ts`, `resume.ts`, `experience.ts` and `projects.ts` with substantive changes. The HTML page is a structured summary.
4. Run route/browser checks for both downloads. `npm run assets` never copies or modifies resume binaries, so it cannot restore an obsolete resume.

## Adding a project

Add a `Project` object to `src/data/projects.ts` with a unique slug and explicit `ownership`. The discriminated union requires professional entries to carry their employer, sector, location and `Professional Project` status, and prevents a GitHub source field on these employer projects. Independent projects retain their existing statuses and optional source links. Supply only verified technology names; an empty stack renders no technology claims. Add an entry to the icon mapping in `ProjectCard.tsx` and an optional CSS surface variant. Supplying `detail` automatically creates a static detail route and sitemap entry; omitting it leaves a supporting project card. Use a `live` object for an authoritative public URL. Set `verifiedOn` only after a successful reachability check using the actual date; omit it if reachability is unverified. EkaVio uses the label `View staging`; its public site is not approved for real customer data. Afssian's supplied live URL remains available as a link even when its Render host times out. Keep EkaVio as the sole flagship.

The current catalogue has exactly three professional websites: LE’VALOR Hotels & Resorts, Home at Paris (Paris Furnished Apartments LLC, Ajman, UAE) and the Bizforz corporate website. All were delivered through employment at Bizforz Solutions Pvt Ltd, with Primary Website Developer attribution. Do not describe them as personal projects or freelance contracts. Broader ERP/product contributions remain collaborative. Institutional website maintenance may be mentioned generically in experience; do not add college cards, links, pages or assets. Professional cards use existing icons and typography, with no new client logos or screenshots. Confirm employer/client permission for publication of named contributions before deployment; keep private implementation details out of the site.

`independentProjects`, `professionalProjects`, detail routes and counts derive from the shared data. `matchesProjectFilter` supports All work, Professional Websites, Independent Projects and the retained technical categories, plus Hospitality and Corporate. The HTML resume keeps its existing independent-project selection; the approved PDF/DOCX remain untouched.

## Validation

Build first, then serve the exact production output:

```sh
npm run lint
npm run typecheck
npm run build
npm start -- --port 3100
```

In a second terminal:

```sh
npm run verify
npm run verify:browser
npm run verify:images
```

The scripts default to `http://localhost:3100`; set `QA_BASE_URL` to change it. Browser checks default to the locally installed Windows Chrome path. Set `QA_CHROME_PATH` for another Chromium executable. No browser download is required in the validated environment. `node scripts/verify-browser.mjs --preview` captures both homepage themes at 390, 768 and 1440px. Full QA derives the routes from navigation and project data: currently thirteen routes in both themes at 360, 390, 430, 768, 1024, 1280 and 1440px (182 checks), full-page screenshots at 390/768/1440px, and axe at 390/1440px plus both mobile dialogs (54 scans). It verifies keyboard/menu/filter/download/reduced-motion behavior, professional attribution and source-link exclusion, existing source/demo links, homepage visibility and the sole flagship. It then exercises real navbar clicks, root attributes, visible colors, localStorage, OS preference, persistence, metadata, cross-tab synchronization, unavailable storage and saved-theme initialization with hydration deliberately delayed. The image suite checks 56 delivered photos at DPR 1/2, plus mobile DPR 3, and saves retina photo captures. The default evidence directory remains `artifacts/master-update/production/`; set `QA_OUTPUT_DIR=artifacts/professional-showcase/production` for this update so earlier evidence is preserved. Both directories are ignored. See the separate [showcase report](PROFESSIONAL_SHOWCASE_VALIDATION.md) for measured results.

`verify` checks approved public asset hashes, actual PDF/DOCX download bytes, embedded contact/project links, all eight project slugs, the five preserved independent source/demo links, the three supplied professional URLs, employer attribution, absence of unavailable employer source links, and canonical metadata. If reference folders and `.reference-hashes.json` are present, it also enforces the original reference hash checks. In this checkout both are absent, so the report marks that historical audit unavailable rather than claiming 383 files were rechecked.

`node scripts/check-external.mjs` performs read-only availability checks against supplied external URLs and records results. Third-party availability can change. HTTP success does not establish backend or authenticated functionality.

## Deployment

Deploy as a standard Next.js project with **Root Directory: `frontend`**, install command `npm ci`, and build command `npm run build`. The default production host is `https://www.afsify.com`. On Vercel, use the Next.js preset. No backend, credentials or required environment variables are needed.

For a custom domain, set `NEXT_PUBLIC_SITE_URL` to its HTTPS origin before building. This drives canonical URLs, Open Graph, Person JSON-LD, robots and sitemap. Do not set it to a temporary preview URL for a production build. Hosting-level preview protection can keep private previews out of search results.

Keep Next.js image optimization enabled. This is a standard Next.js deployment, not an `output: export` static-folder build. Self-hosting uses `npm ci`, `npm run build`, then `npm start` behind your HTTPS proxy. Production build does not require network font downloads.

Security headers include clickjacking protection, MIME sniffing protection, a restrictive camera/microphone/location policy and a referrer policy. The portfolio uses no cookies; its only localStorage value is the explicit `afsify-theme` preference. Contact details are deliberately public; email, phone and WhatsApp use standard links without a form or new backend. There is no contact submission endpoint; the email link opens the visitor’s mail application.

## Future backend

A future sibling `backend/` can be introduced without moving this application. Keep public editorial content in typed data until there is a concrete CMS need. Isolate future server-side service clients in `src/lib/` and use server components or explicitly authorized handlers for data access. Keep credentials server-side, separate external I/O from presentation and add loading/error states where actual data dependencies appear. No backend folder or speculative API exists in this milestone.

See `PROFESSIONAL_SHOWCASE_VALIDATION.md` for this update's exact results and practical limits. `VALIDATION_REPORT.md` preserves the earlier October 6 evidence.
