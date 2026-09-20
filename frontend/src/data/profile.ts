export const profile = {
  name: "Muhammed Afsal",
  brand: "afsify",
  role: "Frontend Developer @ Bizforz",
  secondaryRole: "Full Stack Web Developer",
  location: "Calicut, Kerala, India",
  email: "afsify2000@gmail.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://afsify.vercel.app",
  resume: "/documents/muhammed-afsal-resume.docx",
  summary: "Frontend Developer with 1.5+ years of professional experience building production ERP, ticketing, hospitality, and institutional applications using React, TypeScript, Redux, and Tailwind CSS.",
  introduction: "I build production web interfaces and full-stack systems that turn operational workflows into usable software.",
  narrative: [
    "I’m Muhammed Afsal, a frontend developer at Bizforz based in Calicut, Kerala. My work sits where interfaces meet real operations: attendance, payroll, institutional workflows and the everyday details people depend on.",
    "A diploma in Computer Engineering gave me my technical foundation. Project-based MERN training at Brototype took that foundation into end-to-end web development. At Bizforz, I’ve brought those skills into production software and learned directly from the teams and clients who use it.",
    "Alongside my professional work, I’m building EkaVio, a multi-tenant operations platform. It’s where I’m taking a deeper look at the whole system: identity, authorization, data boundaries and the path from development to deployment.",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/afsify", description: "Code, projects & engineering work" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/afsify/", description: "Professional experience & connections" },
    { label: "Solo.to", href: "https://solo.to/afsify", description: "Find me elsewhere" },
  ],
} as const;

export const skillGroups = [
  { title: "Interfaces", description: "Production UI, reusable components and connected workflows.", skills: ["React", "TypeScript", "JavaScript", "Redux Toolkit", "Tailwind CSS", "HTML & CSS", "Vite"] },
  { title: "Systems", description: "APIs, data models and the boundaries that keep systems reliable.", skills: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Socket.IO", "REST APIs", "Session auth & RBAC"] },
  { title: "Delivery", description: "From understanding the requirement to validating the release.", skills: ["Git & GitHub", "Docker Compose", "Postman", "Vercel", "Render", "UAT & testing", "Client collaboration"] },
] as const;

export const principles = [
  { title: "Understand the workflow.", text: "Requirement discussions, client demos and UAT help me understand what people need the software to do before refining how it looks." },
  { title: "Make complexity usable.", text: "I work on clear interfaces for operational details: approvals, attendance, tasks and the connections between them." },
  { title: "Think beyond the screen.", text: "API integration and production debugging inform my frontend work. EkaVio extends that thinking into authorization, persistence and deployment." },
] as const;
