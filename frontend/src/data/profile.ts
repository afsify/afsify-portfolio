const email = "afsify2000@gmail.com";
const phoneE164 = "+916235448008";
export const profile = {
  name: "Muhammed Afsal",
  brand: "afsify",
  role: "Frontend Developer @ Bizforz",
  secondaryRole: "Full Stack Web Developer",
  headline: "Frontend Developer · React & TypeScript",
  availability: "Open to Frontend / Full-Stack opportunities",
  location: "Calicut, Kerala, India",
  email,
  phone: { display: "+91 6235448008", e164: phoneE164, href: `tel:${phoneE164}` },
  whatsapp: `https://wa.me/${phoneE164.slice(1)}`,
  hiringEmail: `mailto:${email}?subject=${encodeURIComponent("Frontend / Full-Stack opportunity")}`,
  projectEmail: `mailto:${email}?subject=${encodeURIComponent("Freelance project enquiry")}`,
  timezone: "India Standard Time · UTC +05:30",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.afsify.com").replace(/\/+$/, ""),
  resume: { pdf: "/documents/muhammed-afsal-resume.pdf", docx: "/documents/muhammed-afsal-resume.docx" },
  summary: "Frontend Developer with 1.5+ years of professional experience shipping React and TypeScript business applications across ERP, ticketing, hospitality and institutional workflows.",
  introduction: "I build dependable React and TypeScript interfaces at Bizforz, with full-stack capability grounded in independent web applications.",
  narrative: [
    "I’m Muhammed Afsal, a frontend developer at Bizforz based in Calicut, Kerala. My work sits where interfaces meet real operations: attendance, payroll, institutional workflows and the everyday details people depend on.",
    "A diploma in Computer Engineering gave me my technical foundation. Project-based MERN training at Brototype took that foundation into end-to-end web development. At Bizforz, I’ve brought those skills into production software and learned directly from the teams and clients who use it.",
    "Alongside my professional frontend work, I develop EkaVio, a multi-tenant operations platform built with React, TypeScript, Express and PostgreSQL. It brings together secure sessions, tenant boundaries and repeatable delivery practices in an independent full-stack project.",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/afsify", description: "Code, projects & engineering work" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/afsify/", description: "Professional experience & connections" },
    { label: "Solo.to", href: "https://solo.to/afsify", description: "Find me elsewhere" },
  ],
} as const;

export const skillGroups = [
  { title: "Interfaces", description: "Production UI, reusable components and connected workflows.", skills: ["React", "Next.js", "TypeScript", "JavaScript", "Redux Toolkit", "Tailwind CSS", "HTML & CSS", "Vite"] },
  { title: "Systems", description: "APIs, data models and the boundaries that keep systems reliable.", skills: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Socket.IO", "REST APIs", "Session auth & RBAC"] },
  { title: "Delivery", description: "From understanding the requirement to validating the release.", skills: ["Git & GitHub", "Docker Compose", "Postman", "Vercel", "Render", "UAT & testing", "Client collaboration"] },
] as const;

export const principles = [
  { title: "Understand the workflow.", text: "Requirement discussions, client demos and UAT help me understand what people need the software to do before refining how it looks." },
  { title: "Make complexity usable.", text: "I work on clear interfaces for operational details: approvals, attendance, tasks and the connections between them." },
  { title: "Think beyond the screen.", text: "API integration and production debugging inform my frontend work. EkaVio extends that thinking into authorization, persistence and deployment." },
] as const;
