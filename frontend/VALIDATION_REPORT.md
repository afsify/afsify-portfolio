# AFSIFY portfolio — October 2026 update and validation

Completed **6 October 2026 (Asia/Calcutta)**. Final browser evidence: **2026-10-06T14:00:55.568Z**. Build ID: **QvOlLJutiro9f1EQNgdg8**. Local production QA URL: **http://localhost:3100**.

The existing portfolio was updated in place for recruiters first and selected freelance enquiries second. The graphite/warm-paper/platinum identity, Manrope typography, page hierarchy, photographs, theme implementation and Webpack development workaround are preserved.

**Local production build verified; production deployment still pending.**

## Content and UX changes

- Hero emphasizes Frontend Developer / React & TypeScript, retains current Bizforz employment, and adds a discreet Frontend / Full-Stack availability line. Full-stack work is explicitly supported by independent projects.
- Added a restrained homepage freelance section: business websites, frontend/dashboard/API work, responsive fixes, deployment/domain setup and maintenance. No invented clients, testimonials, metrics or pricing. Freelance scope is outside employment commitments.
- Contact retains email prominence and now separates hiring and project enquiries, with centralized phone, tel, WhatsApp, LinkedIn and GitHub links plus location/timezone. No form backend or messaging service was added.
- The canonical default is **https://www.afsify.com**. NEXT_PUBLIC_SITE_URL still intentionally overrides it. Canonicals, Open Graph, Twitter images, Person JSON-LD, robots and sitemap were checked. Person data now includes the intentionally public telephone/email and a restrained skills list.
- The project data already contained five projects, while homepage/Projects labels, README, filter expectations, an icon mapping and a CSS selector retained six-project assumptions. Counts now derive from projects.length; the intended five slugs are verified. Orphaned entries were removed. An invisible Projects H2 restores semantic heading order without altering the visual design.
- Root README's unclosed code fence was fixed. Both READMEs document the current domain, five projects, development workaround, approved downloads and maintenance workflow.

## Resume files and source protection

Both approved updated files were already present at task start: the DOCX was modified and the PDF was untracked relative to Git. They were inspected and retained at their stable paths; neither was rewritten, regenerated or replaced from an older source.

| Format | Public route | Role | Bytes | SHA-256 |
| --- | --- | --- | --- | --- |
| PDF | /documents/muhammed-afsal-resume.pdf | Primary: Download CV (PDF) | 58176 | 46350b92f22160706e11f0145957ecafbc9449ec79748bdab7d76c30288d3010 |
| DOCX | /documents/muhammed-afsal-resume.docx | Secondary: Download CV (DOCX) | 39629 | 5cb121d1b986aa11c456a8c899340b7a0fdf77ad5fa66f59eaab3c14bd0ac501 |

Both formats preserve clickable email/phone/LinkedIn/GitHub/portfolio links and the authoritative EkaVio/Afssian Live and GitHub links. Verification checks embedded PDF URI annotations and DOCX relationship targets, validates current DOCX content, and compares actual downloaded bytes to the approved assets. The PDF has one page.

The HTML /resume summary now includes the current contact header, confident professional summary, current EkaVio architecture/security/delivery highlights, Live/GitHub links, skills and education aligned with the supplied resume. Bizforz remains the current professional role. It is an HTML summary rather than a pixel copy of the approved one-page PDF. Both theme print outputs were exercised and visually reviewed.

Removed the asset generator's old resume-copy step so regenerating photographs/artwork cannot overwrite the updated DOCX. scripts/approved-assets.json records the two approved binaries and four photographs. Updating these hashes requires an intentional approved-source update; verification never refreshes them automatically.

## EkaVio source and claims

The current local repository at C:/Projects/ekavio was read without modification. Inspected HEAD: **2e393bbd5bc5bf1289a2b32e0e29b8893b314029**. Evidence includes README.md, backend/src/server.ts, backend/src/utils/authCookies.ts and docker-compose.yml. The README describes current identity/recovery and organization/RBAC acceptance work; server startup/readiness imports PostgreSQL runtime persistence and does not require MongoDB. Legacy tooling has a separate Compose service/profile.

Updated the flagship case study, homepage/project diagram, stack chips and HTML resume to describe:

- React + TypeScript + Vite PWA; Node/Express/TypeScript API.
- PostgreSQL as the **sole normal runtime data authority**; MongoDB only for explicit legacy migration, reconciliation, archive/recovery and compatibility tooling.
- Revocable sessions, HttpOnly refresh cookies, organization/branch boundaries, membership-based RBAC, commercial entitlements and tenant-aware Socket.IO.
- Verified-email recovery, recipient-chosen invitation passwords, transactional migrations, parity/integration checks, Docker health/readiness and repeatable acceptance gates.
- **Active development / staging**, for disposable development data and **not approved for real customer data**. Local engineering gates are not represented as hosted commercial production approval.

The public CTA uses **View staging** for https://ekavio.afsify.com/. Afssian's approved https://afssian.onrender.com/ live link is restored in typed data, project cards/details and HTML resume. No internal credentials, customer data, confidential employer material or fabricated product screenshots were included.

## Final quality gate

Environment: Windows, Node **v24.16.0**, npm **11.13.0**, Next.js **16.3.5**, React **19.3.0**, Chrome **154.0.8037.58**. Existing installed dependencies were used; package.json and package-lock.json are unchanged. No npm install/upgrade/audit was needed or newly claimed.

| Command / check | Result |
| --- | --- |
| npm.cmd run lint | PASS, exit 0, zero warnings |
| npm.cmd run typecheck | PASS, exit 0, generated route types and strict TypeScript |
| npm.cmd run build | PASS, exit 0, optimized Turbopack production build |
| npm.cmd run verify | PASS, exit 0, 10 routes / 12 local destinations / 5 image URLs |
| npm.cmd run verify:browser | PASS, exit 0, 140 route checks / 42 axe scans / 10 theme scenarios |
| npm.cmd run verify:images | PASS, exit 0, 56 delivered-photo checks |
| git diff --check | PASS |

Ten content routes remain: /, /about, /experience, /projects, /projects/ekavio, /projects/codisify, /projects/chateph, /projects/afssian, /contact and /resume. The build also prerenders the not-found view and four metadata endpoints; its 16 internal work items are not 16 content pages.

All routes returned 200 with exactly one H1, sequential semantic headings, canonical metadata, Open Graph, Twitter and truthful Person JSON-LD. The default canonical origin is www.afsify.com. Both download content types and byte contents pass. Icons/social image/sitemap/robots and four negative 404 cases pass.

Responsive widths: **360, 390, 430, 768, 1024, 1280, 1440**, all ten routes in **dark and light** (70 each / 140 total). No horizontal overflow, broken images or undersized main interaction targets. Sixty full-page screenshots cover every route at 390/768/1440 in both themes. Focused visual inspection covered the hero, freelance section, Contact, resume/print, flagship diagram and recognition imagery.

**Accessibility: zero axe violations in 42 scans** (20 route scans + one mobile dialog per theme; WCAG 2 A/AA, 2.1 AA and 2.2 AA). Keyboard activation, focus visibility/trapping/restoration, accessible mobile dialog, scroll locking, navigation/resize closing, filter counts, skip links and reduced-motion behavior pass. These are automated, keyboard and visual checks, not a formal assistive-technology certification.

Explicit new behavior checks pass in both themes: PDF and DOCX downloads, expected filenames and byte identity; contact email/tel/WhatsApp/LinkedIn/GitHub destinations; separate hiring/project email links; EkaVio/Afssian CTAs on details and HTML resume; current contact/architecture text; print navigation/toolbar suppression and visible resume content.

The original 10 theme scenarios pass: system fallback/live updates, real clicks in both directions, root/background/storage agreement, Enter/Space, reload/client-navigation persistence for both modes, correct action labels/focus targets, cross-tab synchronization, pre-hydration saved preference against the opposite OS, invalid/unavailable storage, and theme-color metadata.

**Portfolio: 0 uncaught runtime errors, 0 unexpected console errors, 0 hydration mismatches.** Only the expected 404 console entry from the intentional missing-page check is excluded. An early new metadata assertion compared literal trailing slashes; it was corrected to compare normalized URLs, consistent with Next.js serialization. The full final verification passes.

## Photography and preserved implementation

All four photograph files remain byte-identical to the supplied approved files: profile **1254×1254**, Le’Valor **1906×1798**, anniversary **2304×3072**, graduation **2048×1328**. Source WebP quality 92, responsive quality-90 delivery, crop-aware sizes helpers, hero-only preload and non-hero lazy loading are unchanged. No photos were regenerated in this update.

The 56 delivery checks inspect actual encoded HTTP response dimensions at 390px DPR 1/2/3, 768px DPR 1/2 and 1440px DPR 1/2 across Home/About/Experience. Pixel density, successful decode and q=90 WebP delivery pass. Theme tokens, theme helper/controls, navigation behavior, image sizes helper, next.config.ts, fonts and brand art have no Git changes. CSS additions are limited to availability, contact enquiry columns, the freelance introduction and resume link rows, using existing semantic colors.

The prior workspace's ref-* directories and .reference-hashes.json are absent from this checkout. Consequently **the historic 383-file source audit was not rerun and is not claimed here**. The verification script still enforces that audit if the baseline is present and fails on missing/changed references. In this checkout it explicitly reports unavailable and instead verifies all six approved public asset hashes. The old validation report is retained at artifacts/master-update/previous-validation-report.md.

## External availability and limits

Public HTTP checks: **2026-10-06T13:50:16.815Z** (6 October 2026). All five GitHub project repositories, GitHub profile, Solo.to, EkaVio/Codisify/Chateph/Taskent hosts returned 200. LinkedIn returned automation-limited 999. Afssian initially timed out, then browser navigation returned 200 and rendered its storefront. verifiedOn values record reachability, not authenticated functionality or production readiness.

External browser observations:

| Project | Result |
| --- | --- |
| https://ekavio.afsify.com/ | 200; empty body within the observation window; 0 uncaught page errors |
| https://codisify.vercel.app | 200; landing content rendered; 0 uncaught page errors |
| https://chateph.vercel.app | 200; empty body within the observation window; 0 uncaught page errors |
| https://taskent.vercel.app | 200; landing content rendered; 0 uncaught page errors |
| https://afssian.onrender.com/ | 200; landing content rendered; 2 uncaught page errors |

Afssian emitted two Unexpected token '<' errors on its own external page. EkaVio and Chateph returned 200 but had empty body text within the short browser observation window; those applications are not claimed fully functional. External logins, accounts, payments, hosted recovery and backend behavior were not tested. These findings were not hidden by the portfolio's zero-error result, and no separate project was modified. Authoritative supplied URLs remain linked.

The in-app browser connection failed with missing sandboxPolicy; the actual installed Chrome/Playwright workflow produced the QA evidence. Safari/Firefox and physical mobile devices were not tested. No LinkedIn/GitHub profile edits, external messages or production deployments were performed.

## Exact changed files

Paths are relative to the repository root; ignored QA evidence is listed separately.

- README.md
- frontend/.env.example
- frontend/README.md
- frontend/VALIDATION_REPORT.md
- frontend/scripts/approved-assets.json
- frontend/scripts/check-demo-browser.mjs
- frontend/scripts/check-external.mjs
- frontend/scripts/prepare-assets.mjs
- frontend/scripts/verify-browser.mjs
- frontend/scripts/verify-documents.mjs
- frontend/scripts/verify-images.mjs
- frontend/scripts/verify.mjs
- frontend/src/app/contact/page.tsx
- frontend/src/app/globals.css
- frontend/src/app/layout.tsx
- frontend/src/app/page.tsx
- frontend/src/app/projects/[slug]/page.tsx
- frontend/src/app/projects/page.tsx
- frontend/src/app/resume/page.tsx
- frontend/src/components/home/Hero.tsx
- frontend/src/components/projects/Architecture.tsx
- frontend/src/components/projects/FeaturedProject.tsx
- frontend/src/components/projects/ProjectCard.tsx
- frontend/src/components/sections/WorkWithMe.tsx
- frontend/src/components/ui/primitives.tsx
- frontend/src/data/experience.ts
- frontend/src/data/profile.ts
- frontend/src/data/projects.ts
- frontend/src/data/resume.ts
- frontend/src/data/services.ts

Supplied files already changed/present at task start, preserved without modification by this update:

- frontend/public/documents/muhammed-afsal-resume.docx
- frontend/public/documents/muhammed-afsal-resume.pdf

Next.js regenerated frontend/next-env.d.ts to reference production route types. Generated/ignored evidence lives under artifacts/master-update/: command logs, external checks, approved-source inspection, production results/accessibility/screenshots/print PDFs, and focused review captures. No generated QA screenshot is shipped as a portfolio asset.

## Handoff

The local portfolio update is complete and the required local gates pass. Preview the production output at **http://localhost:3100**. Deploy using root directory frontend, npm ci and npm run build with Next.js image optimization enabled. Review the host's existing NEXT_PUBLIC_SITE_URL value: leave it unset for the new default or set it to https://www.afsify.com, then verify hosted canonical metadata and downloads after deployment. An old configured Vercel URL would intentionally override the corrected source default.

External demo rendering/errors may warrant separate project follow-up. Any LinkedIn profile or job-search preference changes remain manual and outside this repository update. No remaining local implementation or QA blocker is recorded.

**Local production build verified; production deployment still pending.**
