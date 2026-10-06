// Aligned with the approved October 2026 PDF/DOCX in public/documents.
export const resume = {
  strengths: "Strong in REST API integration, Redux Toolkit, production debugging, responsive UI/UX, client requirements, demos and UAT. Full-stack project experience with Node.js, Express.js, PostgreSQL, Docker, Socket.IO, multi-tenant authorization, secure sessions and data migration.",
  flagshipPoints: [
    "React/Vite PWA and Express/TypeScript backend with PostgreSQL as the sole normal runtime data authority. MongoDB is retained only for explicit legacy migration, reconciliation, archive/recovery and compatibility tooling.",
    "Revocable server-side sessions, HttpOnly refresh cookies, organization/branch-aware multi-tenancy, membership-based RBAC, commercial entitlements, tenant-aware Socket.IO and secure account recovery/invitation flows.",
    "Transactional migrations and cutover tooling, Docker Compose health/readiness checks, and repeatable lint, typecheck, test, build, migration and browser acceptance gates.",
  ],
  skills: [
    { title: "Frontend", items: "React, Next.js, TypeScript, JavaScript, Redux Toolkit, Tailwind CSS, HTML, CSS, Vite" },
    { title: "Backend", items: "Node.js, Express.js, REST APIs, JWT/session auth, Socket.IO" },
    { title: "Data & platform", items: "PostgreSQL, MongoDB, Docker / Docker Compose, Vercel, Render, Firebase, Cloudinary" },
    { title: "Workflow", items: "Git, GitHub, Postman, API integration, multi-tenant SaaS, RBAC/authorization, UAT, Agile" },
  ],
} as const;
