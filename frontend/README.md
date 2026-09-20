# afsify — Muhammed Afsal

A personal portfolio for Muhammed Afsal, Frontend Developer at Bizforz and Full Stack Web Developer. Ten substantive pages present production experience, independent projects, the engineering behind EkaVio, selected milestones and direct contact options.

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
| `npm run assets` | Recreate optimized source photographs, font, resume copy and AFS graphite/platinum social/icon artwork |
| `npm run verify` | Source/content, HTTP routes, metadata, images, resume and reference-integrity checks |
| `npm run verify:browser` | Responsive, accessibility and interaction checks in headless Chrome |
| `npm run verify:images` | Actual delivered photo resolution at mobile, tablet and desktop, including retina displays |

`npm run assets -- --brand-only` regenerates only the social preview, favicon and app icon from the retained AFS mark, leaving photographs, fonts and the resume untouched.

`npm run assets -- --photos-only` regenerates only the four approved photographs directly from their originals.

`assets` is a maintenance command that requires the sibling `ref-files/` source directory. Final assets and fonts are already included, so development, builds and deployment do not read any reference directory.

## Routes

| Route | Content |
| --- | --- |
| `/` | Identity, selected work, experience, milestones and contact CTA |
| `/about` | Professional narrative, work principles, technical focus and education |
| `/experience` | Bizforz contributions, product domains, recognition and separate training history |
| `/projects` | Six projects with accessible category filters |
| `/projects/ekavio` | Architecture, tenant boundaries, sessions, RBAC, entitlements, storage and delivery |
| `/projects/codisify` | E-learning project notes |
| `/projects/chateph` | Realtime ephemeral messaging project notes |
| `/projects/afssian` | E-commerce project notes |
| `/contact` | Email, GitHub, LinkedIn and Solo.to |
| `/resume` | Readable current professional summary and current DOCX download |

The App Router also generates `/sitemap.xml`, `/robots.txt`, `/icon.svg`, `/apple-icon.png`, a custom 404 and a recoverable runtime error view. Unknown project slugs return 404; no empty project pages are generated.

## Structure

```text
frontend/
├── public/
│   ├── documents/muhammed-afsal-resume.docx
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

The current `Muhammed_Afsal_Resume.docx` and the supplied brief are authoritative. The historical PDF contributes only supported project context. See the root `PORTFOLIO_CONTENT_AUDIT.md` for source decisions and exclusions.

- `src/data/profile.ts`: identity, canonical host, social links, narrative, skills and principles.
- `experience.ts`, `education.ts`, `recognition.ts`: professional history and photography captions.
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

Next.js emits conditional dark/light `theme-color` fallbacks. The head initializer prepends one dedicated override matching the selected theme, and the toggle updates it. A focused head observer keeps it first when route metadata updates. Keeping that override separate avoids mutating metadata managed by React. Canonical/OG/Twitter/JSON-LD/sitemap/robots remain unchanged.

## Images and source integrity

Images are optimized locally with Sharp, which strips source metadata by default, and served with `next/image` and responsive sizes. Only approved photographs and the small supporting AFS logo are copied. Company assets, confidential screens, the ID card, birthday memento and obsolete PDF are absent from `public/`.

The four photographs retain their original dimensions (1254×1254, 1906×1798, 2304×3072 and 2048×1328) as quality-92 WebP sources. Next.js serves responsive WebP derivatives at quality 90. `src/lib/image-sizes.ts` accounts for the actual responsive card widths and the extra source pixels required by `object-fit: cover`, including the wide graduation photo and tall portrait frames. Only the homepage hero photo is preloaded; the about photo and recognition photos use default lazy loading. There is no enlargement, sharpening, denoising or photographic retouching.

The current resume download intentionally preserves the supplied document, including its professional contact information. The page makes the DOCX format explicit. No PDF is fabricated or mislabeled.

## Updating the resume

1. Replace `public/documents/muhammed-afsal-resume.docx` with the approved current resume, or update the canonical source and run `npm run assets`.
2. Update the typed data to match substantive changes. The HTML resume is a structured summary, not a file viewer.
3. When an approved current PDF is available, place it in `public/documents/`, update `profile.resume` and the format labels in `ResumeButton` and `/resume`, and update the verification assertions accordingly.
4. Verify the download, metadata and content. Never substitute the historical CV.

## Adding a project

Add a `Project` object to `src/data/projects.ts` with a unique slug, supported stack and valid repository URL. Add an entry to the icon mapping in `ProjectCard.tsx` and an optional CSS surface variant. Supplying `detail` automatically creates a static detail route and sitemap entry; omitting it leaves a supporting project card. Add a `live` object only after checking the destination, with its verification date. Project filters use the existing categories; expand the category union/list if needed. Keep EkaVio as the sole flagship unless intentionally changing the editorial hierarchy.

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

The scripts default to `http://localhost:3100`; set `QA_BASE_URL` to change it. Browser checks default to the locally installed Windows Chrome path. Set `QA_CHROME_PATH` for another Chromium executable. No browser download is required in the validated environment. `node scripts/verify-browser.mjs --preview` captures both homepage themes at 390, 768 and 1440px. Full QA checks all ten routes in both themes at 360, 390, 430, 768, 1024, 1280 and 1440px (140 checks), saves full-page screenshots at 390/768/1440px, and runs axe at 390/1440px plus both mobile dialogs (42 scans). It verifies keyboard/menu/filter/download/reduced-motion behavior in each theme, then exercises real navbar clicks, root attributes, visible colors, localStorage, OS preference, persistence, metadata, cross-tab synchronization, unavailable storage and saved-theme initialization with hydration deliberately delayed. The image suite checks 56 delivered photos at DPR 1/2, plus mobile DPR 3, and saves retina photo captures. Final evidence goes into ignored `artifacts/image-theme-fix/production/`; use `QA_OUTPUT_DIR` to override it. Earlier `artifacts/themes/` and `artifacts/browser/` evidence remains intact and is historical.

`verify` also compares the resume to its canonical source and hashes all reference files against the root `.reference-hashes.json` captured before implementation. These source-integrity checks are for this supplied workspace; they are not build or runtime dependencies.

`node scripts/check-external.mjs` performs read-only availability checks against supplied external URLs and records results. Third-party availability can change. HTTP success does not establish backend or authenticated functionality.

## Deployment

Deploy as a standard Next.js project with **Root Directory: `frontend`**, install command `npm ci`, and build command `npm run build`. The default production host is `https://afsify.vercel.app`. On Vercel, use the Next.js preset. No backend, credentials or required environment variables are needed.

For a custom domain, set `NEXT_PUBLIC_SITE_URL` to its HTTPS origin before building. This drives canonical URLs, Open Graph, Person JSON-LD, robots and sitemap. Do not set it to a temporary preview URL for a production build. Hosting-level preview protection can keep private previews out of search results.

Keep Next.js image optimization enabled. This is a standard Next.js deployment, not an `output: export` static-folder build. Self-hosting uses `npm ci`, `npm run build`, then `npm start` behind your HTTPS proxy. Production build does not require network font downloads.

Security headers include clickjacking protection, MIME sniffing protection, a restrictive camera/microphone/location policy and a referrer policy. The portfolio uses no cookies; its only localStorage value is the explicit `afsify-theme` preference. There is no contact submission endpoint; the email link opens the visitor’s mail application.

## Future backend

A future sibling `backend/` can be introduced without moving this application. Keep public editorial content in typed data until there is a concrete CMS need. Isolate future server-side service clients in `src/lib/` and use server components or explicitly authorized handlers for data access. Keep credentials server-side, separate external I/O from presentation and add loading/error states where actual data dependencies appear. No backend folder or speculative API exists in this milestone.

See `VALIDATION_REPORT.md` for exact test results and practical limits.
