# Professional website showcase — 12 October 2026

Local implementation and required validation are complete. This records the portfolio update separately from the preserved October 6 results in `VALIDATION_REPORT.md`. No commit, push or deployment was performed.

## Scope and baseline

Repository: `C:/Projects/afsify-portfolio`, branch `main`, HEAD `82367c241cb88a40a3fa612cb8a50cfdb0808621`. Existing uncommitted work was preserved across interruptions. No commit, push, PR or deployment is part of this task. No EkaVio files were modified. The conversation's historical edited-file count is not the current portfolio Git status.

Read the repository instructions and installed Next.js 16.3.5 page/metadata documentation. Existing dependencies were used without upgrades. Node v24.16.0 / npm 11.13.0. Final evidence goes to ignored `frontend/artifacts/professional-showcase/production-final/`; the earlier contrast-failure evidence and external URL results remain under `production/`. Previous milestone evidence is retained. Final production build ID: `3Nzd-p6B3qxb8ZbFpxX0q`.

## Content and implementation

Eight projects: five independent projects and exactly three professional websites. Thirteen content routes: six core pages and seven detail pages. Taskent retains its supporting card without an empty detail route. Static parameters, metadata and sitemap derive from the existing shared data.

| Professional project | Case-study route | Supplied website |
| --- | --- | --- |
| LE’VALOR Hotels & Resorts | `/projects/levalor` | https://www.levalor.in/ |
| Home at Paris / Paris Furnished Apartments LLC | `/projects/home-at-paris` | https://www.homeatparis.com/ |
| Bizforz Solutions Pvt Ltd | `/projects/bizforz` | https://www.bizforz.com/ |

Each identifies Primary Website Developer responsibility and delivery through employment at Bizforz Solutions Pvt Ltd. The corporate website is identified as the employer's own site. Bizforz's Kerala location is labeled as employment context; its public footer currently lists a Bengaluru corporate address. No inferred stacks, customer outcomes, testimonials, project dates or metrics were introduced.

The homepage retains its hero, portrait, independent-project selection and sole EkaVio flagship, followed by a dedicated professional-websites section. Shared typography/icon cards use existing semantic colors and no new company logos or website screenshots. Project filters distinguish professional/independent work and retain technical categories. Counts derive from data. Case studies show role, sector, location, employer attribution and Visit website links. Professional projects have no source links; shared source rendering is optional and the discriminated type forbids GitHub fields for employer projects.

Experience identifies the three primary website implementations, client communication, content coordination, responsive development, deployment assistance and support. Broader ERP/product contributions remain collaborative. Institutional maintenance is mentioned generically. No college website cards, links, detail routes or assets were added. Hiring remains primary; freelance services remain secondary with quotation-based pricing.

## Preservation

Programmatic comparison against baseline Git data confirms the complete five independent project records are unchanged except the intended ownership field: EkaVio, Codisify Devlearn, Chateph Messenger, Afssian E-Commerce and Taskent Dashboard. Their source/demo URLs and technical descriptions remain unchanged. EkaVio retains active-development/staging and not-approved-for-real-customer-data disclosures.

All six SHA-256 values match `scripts/approved-assets.json`: PDF/DOCX resume binaries and four approved photographs. The manifest, public assets, fonts, theme tokens/controls, navigation, contact configuration, package manifests and lockfile are unchanged. No image regeneration/recompression was run. The HTML resume retains its independent-project selection while using the updated shared employment narrative.

## Validation record

Run from `frontend` with `QA_BASE_URL=http://127.0.0.1:3100` and `QA_OUTPUT_DIR=artifacts/professional-showcase/production-final` after building and serving the production output (`npm.cmd start -- --port 3100 --hostname 127.0.0.1`).

| Command/check | Result |
| --- | --- |
| `npm.cmd run lint` | PASS, exit 0 after contrast correction, zero warnings |
| `npm.cmd run typecheck` | PASS, exit 0 after contrast correction |
| `npm.cmd run build` | PASS, exit 0 after contrast correction; 13 content routes; 19 internal build work items including metadata/not-found |
| `npm.cmd run verify` | PASS, exit 0 after contrast correction: 13 routes, 15 local links, 5 image requests, four negative 404 cases, metadata/canonicals/sitemap/robots/icons, downloaded resume bytes and six approved hashes |
| `npm.cmd run verify:browser` | PASS, exit 0: 182 responsive checks, 54 axe scans with zero violations, 10 theme behavior checks; zero runtime/console errors |
| `npm.cmd run verify:images` | PASS, exit 0: 56 photo delivery checks at DPR 1/2 plus mobile DPR 3; zero runtime/console errors |
| Independent-record preservation | PASS: all five complete records unchanged except ownership |
| External HTTP checker | All three professional sites 200; five source repositories and four independent demos 200; Afssian timeout; LinkedIn 999 |
| Final diff/artifact review | PASS: intended portfolio files only, no staged changes, no changed public assets/dependencies/secrets; `git diff --check` exit 0; QA artifacts ignored |

The contrast failure was caused by light card backgrounds inheriting dark-section foreground tokens. Professional cards now use the existing `light-section` semantic surface context. Assertions, accessibility rules, timeouts and theme checks were not weakened. The failed attempt is recorded rather than counted as a pass.

The in-app browser connection previously failed before navigation because its bridge lacked `sandboxPolicy` metadata. The repository's installed Playwright/Chrome workflow provides browser evidence. Historical reference folders/hash baseline are absent; the verification script reports that audit unavailable while checking all approved public assets. No historical 383-file audit is claimed.

Final Chrome version: **154.0.8037.98**. Browser report timestamp: **2026-10-12T14:17:19.519Z** (19:47 IST). Image report timestamp: **2026-10-12T14:18:15.583Z**. Browser checks cover all thirteen routes at **360, 390, 430, 768, 1024, 1280 and 1440px** in both themes. Each theme completed 91 route checks, 26 route axe scans and one mobile-dialog scan. The ten retained theme scenarios include OS preference changes, saved preference, initialization with delayed hydration, storage failures, cross-tab sync and metadata. Keyboard filters, announced counts, optional source links, exact external destinations, sole flagship, professional attribution, downloads, mobile menu/focus handling, reduced motion, semantic headings, overflow and image decoding all pass. There were zero hydration mismatches and no unexpected console errors; only the intentional missing-page 404 is excluded by the existing check.

Visual review loaded all six final contact sheets (60 focused views) in `production-final/review-final/`, covering Home hero/professional section, Projects professional filter, Experience and all three detail overviews/responsibility sections at **390, 768 and 1440px**, Light and Dark. It also inspected original full-page mobile Projects/Experience and case-study captures. The existing layout, typography, photography and theme identity remain intact; responsive wrapping, card hierarchy, employer labels and actions are readable without unexpected clipping. The suite retains 78 full-page route screenshots plus mobile-menu/theme/print evidence. Focused captures initially included sticky-navigation interference from element scrolling; final captures crop full-page screenshots from the top without altering application styling. Earlier captures remain for traceability. Safari, Firefox, physical devices and external authenticated flows were not tested.

## Exact changed-file inventory

Paths below are relative to `C:/Projects/afsify-portfolio`. There are **19 modified tracked files and 2 new files**, all unstaged. `next-env.d.ts` is regenerated by Next.js to reference production route types rather than development route types.

- `README.md`
- `frontend/README.md`
- `frontend/VALIDATION_REPORT.md` — historical results preserved; added link to this report
- `frontend/PROFESSIONAL_SHOWCASE_VALIDATION.md` — new
- `frontend/next-env.d.ts` — generated route-type references
- `frontend/scripts/check-external.mjs`
- `frontend/scripts/verify-browser.mjs`
- `frontend/scripts/verify.mjs`
- `frontend/src/app/experience/page.tsx`
- `frontend/src/app/globals.css`
- `frontend/src/app/page.tsx`
- `frontend/src/app/projects/[slug]/page.tsx`
- `frontend/src/app/projects/page.tsx`
- `frontend/src/app/resume/page.tsx`
- `frontend/src/components/home/ProfessionalWebsites.tsx` — new
- `frontend/src/components/projects/FeaturedProject.tsx`
- `frontend/src/components/projects/ProjectCard.tsx`
- `frontend/src/components/projects/ProjectExplorer.tsx`
- `frontend/src/components/sections/WorkWithMe.tsx`
- `frontend/src/data/experience.ts`
- `frontend/src/data/projects.ts`

Ignored QA JSON, screenshots, print PDFs and the focused capture helper are under `frontend/artifacts/professional-showcase/`. They are not application assets or staged changes. No `check-demo-browser.mjs` change was made; direct external reachability was verified with the existing HTTP checker.

## Publication requirements and limitations

Confirm employer/client permission to publish the named website contribution descriptions before approving deployment. Public reachability verifies links, not authorship, permission or authenticated functionality. No new client visual assets were used. Preserve permissions for existing approved assets. External Afssian and LinkedIn availability limitations do not change their authoritative links.

No local implementation or required validation work remains open. Before publication, obtain the employer/client content permission and the user's explicit deployment approval, then follow the existing Next.js deployment instructions and verify hosted links/metadata/downloads. External Afssian timeout and LinkedIn 999 remain recorded availability limitations. No production deployment, commit or push was performed. HEAD remains `82367c241cb88a40a3fa612cb8a50cfdb0808621`; the completed changes are intentionally uncommitted.
