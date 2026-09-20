# AFSIFY portfolio — final validation

Finalized **2026-09-20T18:17:04.738Z** (20/09/2026, 23:47:04 IST).

The two reported issues are fixed and verified in fresh Chrome sessions. Approved layouts, typography, copy, project hierarchy, routes and graphite/platinum branding were preserved. This report closes out the earlier brand/theme pass and the focused image-quality/development-hydration repair.

**Local production build verified; production deployment still pending.**

## Fresh environment and commands

Windows; Node **v24.16.0**; npm **11.13.0**; Next.js **16.3.5**; React **19.3.0**; TypeScript **5.9.3**. Browser: actual installed headless Google Chrome **153.0.8010.48**, controlled with Playwright. The existing dependency tree was reused; no dependency was added or upgraded, and package-lock.json is byte-identical. No new install or npm audit was performed during this focused repair.

Stopped the old development server, resolved and checked the cache path, deleted only **C:/Projects/Afsify-Portfolio/frontend/.next**, and confirmed it absent at **2026-09-20T18:03:03.6311457Z**. Lint, typecheck and a fresh production build followed. Production build ID: **RHTyQLSQryI9Wx1heNr_A**, served at **http://localhost:3100**. The default Webpack development command was also restarted with a fresh development cache at **http://localhost:3000**.

| Required check | Result |
| --- | --- |
| npm run lint | PASS, exit 0; zero warnings |
| npm run typecheck | PASS, exit 0; generated route types and strict TypeScript |
| npm run build | PASS, exit 0; clean Turbopack production build |
| npm run verify | PASS, exit 0; routes, local assets, resume and reference integrity |
| npm run verify:browser | PASS, exit 0; 140 responsive checks, 42 axe scans, 10 theme scenarios |
| npm run verify:images | PASS, exit 0; 56 actual delivered-image checks |
| Fresh development theme suite | PASS, exit 0; the same 10 theme scenarios on port 3000 |
| npm run assets -- --photos-only | PASS; originals regenerated directly |

Production browser evidence: **2026-09-20T18:08:46.299Z**. Route/integrity evidence: **2026-09-20T18:05:09.791Z**. Photo delivery evidence: **2026-09-20T18:05:50.489Z**. Fresh development evidence: **2026-09-20T18:15:39.914Z**. Logs and machine-readable results are under artifacts/image-theme-fix/.

## Image blur: root cause and exact repair

The original pipeline discarded resolution before delivery: the portrait was reduced to 900px, two recognition photos to 1200px and graduation to 1400px, all quality-84 WebP. Next.js then recompressed those derivatives using its default quality 75, preferring AVIF. Some sizes declarations also underestimated the source pixels needed by the unchanged object-fit: cover crops. For example, the desktop About square portrait needs enough pixels for its 512px-tall frame; a fixed 380px sizes hint underestimated that requirement. The wide graduation photograph needs approximately 1.24 times its desktop card width before cropping.

scripts/prepare-assets.mjs now reads the four ORIGINAL ref-files photographs, auto-orients them, retains native dimensions with withoutEnlargement, and writes WebP quality **92**, effort **6**, smartSubsample enabled. Metadata is stripped by Sharp's default behavior. No derivative is upscaled; no sharpening, denoising, retouching or color replacement is applied.

| Photograph | Original dimensions | Previous public derivative | New public WebP | Quality | Bytes |
| --- | --- | --- | --- | --- | --- |
| Profile | 1254×1254 | 900×900 | 1254×1254 | 92 | 232,894 |
| Le’Valor recognition | 1906×1798 | 1200×1132 | 1906×1798 | 92 | 222,264 |
| Bizforz anniversary | 2304×3072 | 1200×1600 | 2304×3072 | 92 | 1,098,264 |
| Brototype graduation | 2048×1328 | 1400×908 | 2048×1328 | 92 | 365,726 |

Next.js now delivers WebP at explicit quality **90** for all photographs; the allowed qualities are 75/90, retaining default quality for the small footer mark. Shared sizes helpers match the approved responsive geometry and account for cover cropping. Only the homepage hero photograph uses Next.js preload (the current equivalent of deprecated priority). About and recognition photos retain default lazy loading. The fixed 25×25 footer mark uses a 100px source, with sufficient 1×/2× delivery; it required no change. These four components cover every next/image use in the application.

Real Chrome checked every photograph on /, /about and /experience at **390px DPR 1/2/3**, **768px DPR 1/2**, and **1440px DPR 1/2**: **56 checks**. The script decodes actual HTTP response bytes with Sharp and verifies that BOTH encoded dimensions meet the rendered crop's pixel budget, the optimizer request uses q=90, responses are WebP/HTTP 200, and images decode. No undersized delivery, broken photo or horizontal overflow was found. Visual inspection of fresh production recognition captures at **390/768/1440px**, plus hero/About portraits, confirmed natural detail without added sharpening. Original camera focus/detail remains the upper bound; no invented detail is added.

Fresh retina captures: [390px recognition](artifacts/image-theme-fix/production/images/recognition-390-2x.png), [768px recognition](artifacts/image-theme-fix/production/images/recognition-768-2x.png), [1440px recognition](artifacts/image-theme-fix/production/images/recognition-1440-2x.png), [desktop About portrait](artifacts/image-theme-fix/production/images/about-1440-2x.png).

## Theme failure: reproduced cause and exact repair

On the original default Turbopack development server, real browser clicks left the root dark and afsify-theme unset. Seven served JavaScript chunks returned HTTP 200 but contained syntax errors (including unexpected end of input and incomplete expressions). The local emitted files were complete; served responses contained Console Ninja instrumentation and were truncated. React could not hydrate, so the server-rendered toggle had no functioning click handler. Evidence: artifacts/image-theme-fix/before-dev-errors.json. This identifies the local development instrumentation/transport incompatibility, rather than a failing CSS palette or localStorage handler.

The exact runtime repair is **package.json: dev = next dev --webpack**. The same local Console Ninja integration remains present; actual Chrome now hydrates successfully and the existing React handlers work. Production continues to use next build with Turbopack. The core ThemeToggle, theme helper, global CSS and token CSS were intentionally retained and hash-verified unchanged. An already running old dev process must be restarted to use the updated command; the verified port-3000 server has been restarted.

Fresh production and development sessions explicitly verify:

- Initial OS-selected dark theme with no stored preference; live system changes follow while preference is system.
- Real navbar click: root data-theme=light, afsify-theme=light, body background rgb(244, 244, 241).
- Second real click: root data-theme=dark, afsify-theme=dark, body background rgb(17, 19, 21).
- Enter/Space activation, correct action label, visible 3px focus ring and minimum 44px target.
- Explicit light AND dark choices survive reload and client navigation; stored values are reasserted. OS changes cannot override an explicit choice.
- Mobile-menu click/keyboard theme changes work and keep the dialog open; open/close/Escape and focus restoration work in both themes (production interaction suite).
- Cross-tab preference synchronization; removing the preference resumes system mode.
- Both saved themes are correct with hydration bundles held back against the opposite OS setting, and remain correct after hydration. No wrong initial theme or hydration mismatch was observed.
- Invalid/unavailable storage falls back to the OS and leaves the toggle usable.
- Browser theme-color metadata follows the selected mode and survives route changes.

The native theme architecture uses semantic CSS variables selected by root data-theme, a synchronous pre-paint head initializer, localStorage afsify-theme, and a small React observer for matchMedia/storage changes. Main pages remain server components; no theme dependency was introduced. CSS-selected labels/icons keep server/client markup identical. Conditional dark/light metadata remains intact, with a separate first theme-color override reflecting an explicit choice.

Extra development checks initially encountered a background-tab timeout and snapshots taken while streamed route metadata was incomplete. An instrumented event trace confirmed correct storage/reset behavior. The final test helper polls inactive tabs independently of animation frames and waits for all three theme-color entries before asserting their contents. Navigation is allowed to finish before persistence checks. Final development and production theme suites pass with these synchronization changes; earlier diagnostic logs remain available.

## Routes, interactions and accessibility

**10 public content routes**: /, /about, /experience, /projects, /projects/ekavio, /projects/codisify, /projects/chateph, /projects/afssian, /contact, /resume. The production build also generates the not-found view and icon.svg, apple-icon.png, robots.txt and sitemap.xml. Next reported 16 prerender work items; that is not 16 public content pages.

All ten routes returned HTTP 200, exactly one H1, correct canonical metadata, description, Open Graph, Twitter cards and Person JSON-LD. All **11 local link destinations** and **5 distinct image request URLs** returned 200. Sitemap/robots/icons/social artwork work. Four negative routes return 404: /missing-page, /projects/missing-project, /projects/constructor, /projects/__proto__. The custom not-found page was tested in both themes. The unchanged error boundary was not triggered by an artificial production exception.

Chrome checked all ten routes in BOTH themes at **360, 390, 430, 768, 1024, 1280, 1440px**: **70 per theme / 140 total**. No horizontal overflow or broken images. Sixty fresh full-page captures cover every route at 390/768/1440px in both themes.

**Accessibility: 0 axe violations in either theme.** Each mode has 20 page scans (ten routes at 390/1440px) and one mobile-dialog scan: **42 total**, with WCAG 2 A/AA, 2.1 AA and 2.2 AA tags. Theme target size/focus/labels and keyboard behavior also pass. This is automated and keyboard QA, not a formal accessibility certification.

Both modes pass mobile menu opening/closing, Escape, forward/reverse focus trap, focus restoration, scroll lock/restoration, navigation and desktop-resize closing. All five project filter states return expected card counts and aria-pressed states. The resume downloads with the expected DOCX filename; skip-link focus reaches main content. Reduced-motion mode disables the hero animation and smooth scrolling.

**0 uncaught runtime errors, 0 unexpected console errors, 0 hydration errors** in final production and theme-development runs. Expected HTTP 404 logging from the deliberate missing-page test is the only excluded console category. No other error category is suppressed.

## Preserved brand and source integrity

| Role | Dark | Light |
| --- | --- | --- |
| Background | #111315 | #F4F4F1 |
| Surface / raised | #171A1D / #1E2225 | #FFFFFF / #EDEEEB |
| Text | #F4F4F1 | #17191B |
| Muted / soft | #A7ACB0 / #C4C8CB | #62686D / #4D5459 |
| Border / strong | #33383D / #4A5055 | #CED2D4 / #AEB4B8 |
| Accent / hover | #D2D6DA / #F0F1F2 | #5E676E / #262B2F |
| Accent text / focus | #111315 / #9AA9B3 | #FFFFFF / #526977 |

The afsify. navigation wordmark remains primary. The supplied AFS mark appears in the footer and social preview; small icons use a legible monochrome AF mark. Editorial/feature/CTA section contrast remains intentional in both modes. No new motion or design framework was added. Component/layout CSS has no hard-coded hex/RGB/HSL colors; source/generator guards find zero legacy lime identity values. Historical artifacts, reference projects and genuine photographic colors retain their originals.

**383 reference files unchanged**, verified against the original SHA-256 baseline. The current public resume is byte-identical to ref-files/Muhammed_Afsal_Resume.docx. Sixteen protected files also match this repair's baseline: all content data, Manrope/license, global/token CSS, core theme code, resume, AFS bitmap/social image and package-lock.json. No page geometry or factual copy changed in this repair; only photo props/imports changed in the affected pages/components.

## Exact files changed

Focused image/theme-runtime repair (paths relative to frontend):

- README.md
- VALIDATION_REPORT.md
- next.config.ts
- package.json
- public/images/experience/bizforz-anniversary.webp
- public/images/experience/brototype-graduation.webp
- public/images/experience/levalor-delivery.webp
- public/images/profile/muhammed-afsal.webp
- scripts/prepare-assets.mjs
- scripts/verify-browser.mjs
- scripts/verify-images.mjs
- scripts/verify-theme-behavior.mjs
- scripts/verify.mjs
- src/app/about/page.tsx
- src/components/home/Hero.tsx
- src/components/sections/Recognition.tsx
- src/lib/image-sizes.ts

Earlier completed brand/theme implementation, retained unchanged during this repair:

- public/images/brand/social-preview.png
- src/app/apple-icon.png
- src/app/globals.css
- src/app/icon.svg
- src/app/layout.tsx
- src/app/resume/page.tsx
- src/app/tokens.css
- src/components/layout/Navbar.tsx
- src/components/layout/ThemeToggle.tsx
- src/components/ui/primitives.tsx
- src/lib/theme.ts

Next.js regenerates next-env.d.ts and writes AGENTS.md/CLAUDE.md during development startup. Build/cache files and ignored QA evidence are generated separately. No ref-* file was edited.

## External links and practical limits

External availability was last checked in the earlier brand pass at **2026-09-20T13:03:49.352Z**; those destinations were not changed or rechecked by this focused local repair. Retained observations: Codisify/Chateph/Taskent demos, six GitHub repositories, GitHub profile and Solo.to returned 200. LinkedIn returned automation-limited HTTP 999. Expenseer returned 404 and Afssian timed out (prior browser evidence showed 503/loading); their unavailable live links remain omitted. EkaVio has no fabricated live demo. These observations do not verify third-party authenticated flows or backend behavior.

Current final evidence is **artifacts/image-theme-fix/production/**, **fresh-development/**, generation/cache/protected-file JSON and command logs. Older artifacts/themes/, artifacts/browser/ and external evidence are retained; historical audit failures are not the final state. The in-app browser runtime could not initialize (missing sandboxPolicy); the local Chrome/Playwright session provided actual browser evidence. Safari/Firefox, physical devices and screen-reader user testing were not performed.

The project is ready for a standard Next.js deployment using root directory frontend, npm ci and npm run build, with image optimization enabled and the existing canonical host https://afsify.vercel.app. No required local QA remains failing. No deployment, hosted/CDN verification or third-party uptime guarantee is claimed.

**Local production build verified; production deployment still pending.**
