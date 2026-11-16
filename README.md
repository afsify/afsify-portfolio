# Muhammed Afsal — afsify

Personal portfolio of Muhammed Afsal TP, **Full Stack Web Developer**, with verified professional Frontend Developer experience at Bizforz and independent Node.js/Express/PostgreSQL project work.

**Production URL:** [www.afsify.com](https://www.afsify.com/)

Open to the right Frontend / Full-Stack role and selected freelance web projects outside employment commitments.

## Application

The Next.js 16 / React 19 / TypeScript application lives in [frontend](frontend). Its route and project counts derive from the typed catalogue, including independent projects (EkaVio, Boxlist Scheduler, Codisify Devlearn, Chateph Messenger, Afssian E-Commerce and Taskent Dashboard) and three professional websites (Le'valor Hotels & Resorts, Paris Furnished Apartments LLC and Bizforz Solutions Pvt Ltd). The professional websites were delivered through employment at Bizforz; they are not freelance contracts. EkaVio remains the sole flagship and is explicitly presented as active development / staging.

## Local development

Use Node.js 22 or newer:

```sh
cd frontend
npm ci
npm run dev
```

Open http://localhost:3000. On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`.

Development deliberately uses `next dev --webpack` to preserve the verified workaround for local Console Ninja/Turbopack instrumentation. Production uses `next build`.

## Content and downloads

- Typed identity, phone, WhatsApp and canonical origin: `frontend/src/data/profile.ts`.
- Typed project content and live links: `frontend/src/data/projects.ts`.
- Professional ownership, employer attribution and optional source links are modeled explicitly. College websites are not part of the project catalogue. Do not add client assets or technology claims without verified information and publication permission.
- Approved downloads: [PDF](frontend/public/documents/muhammed-afsal-resume.pdf) (primary) and [DOCX](frontend/public/documents/muhammed-afsal-resume.docx) (secondary).
- Asset preparation never overwrites the approved resume binaries.

The canonical origin defaults to `https://www.afsify.com`; `NEXT_PUBLIC_SITE_URL` intentionally overrides it. Do not use a preview URL for production metadata.

See [frontend/README.md](frontend/README.md) for setup, all routes, resume maintenance and deployment instructions. [VALIDATION_REPORT.md](frontend/VALIDATION_REPORT.md) preserves the October 6 evidence; [PROFESSIONAL_SHOWCASE_VALIDATION.md](frontend/PROFESSIONAL_SHOWCASE_VALIDATION.md) records the separate professional-showcase verification and remaining publication checks.

V2 adds scoped [services](frontend/src/app/services/page.tsx), accessible local quick search, lazy PDF preview, and an email-app enquiry form with copy/manual-email fallbacks. The selected PDF/DOCX are preserved byte-for-byte, including the diploma disclosure “Pursued; qualification pending”. See [contact workflow and limitations](frontend/CONTACT_SETUP.md). Implementation prompts, private notes and QA artifacts are preserved locally and excluded from Git.
