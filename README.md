# Muhammed Afsal — afsify

Personal portfolio of Muhammed Afsal, **Frontend Developer at Bizforz**, focused on React and TypeScript with independent full-stack project experience.

**Production URL:** [www.afsify.com](https://www.afsify.com/)

Open to the right Frontend / Full-Stack role and selected freelance web projects outside employment commitments.

## Application

The Next.js 16 / React 19 / TypeScript application lives in [frontend](frontend). It contains ten content routes and five projects: EkaVio, Codisify Devlearn, Chateph Messenger, Afssian E-Commerce and Taskent Dashboard. EkaVio is the flagship and is explicitly presented as active development / staging.

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
- Approved downloads: [PDF](frontend/public/documents/muhammed-afsal-resume.pdf) (primary) and [DOCX](frontend/public/documents/muhammed-afsal-resume.docx) (secondary).
- Asset preparation never overwrites the approved resume binaries.

The canonical origin defaults to `https://www.afsify.com`; `NEXT_PUBLIC_SITE_URL` intentionally overrides it. Do not use a preview URL for production metadata.

See [frontend/README.md](frontend/README.md) for setup, all routes, resume maintenance and deployment instructions, and [VALIDATION_REPORT.md](frontend/VALIDATION_REPORT.md) for the latest measured QA and deployment status.
