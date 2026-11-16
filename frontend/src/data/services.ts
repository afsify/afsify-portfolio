export const services = [
  {
    slug: "business-websites", title: "Business websites",
    description: "Responsive websites for businesses that need a clear online home and an easy way for visitors to get in touch.",
    deliverables: ["Responsive pages built around your content", "Accessible navigation, metadata and SEO basics", "Deployment and domain connection with handover notes"],
    requirements: "Your approved copy, brand assets, page list and access to your domain or hosting.",
    boundaries: "Copywriting, paid advertising, hosting fees and guaranteed search rankings are not included. Scope is agreed before work begins.",
  },
  {
    slug: "application-features", title: "React/Next.js & full-stack features",
    description: "Focused features for dashboards, internal tools and web apps, from Figma-to-code interfaces to API integration and Node/Express backends.",
    deliverables: ["Reusable React/Next.js interfaces and responsive states", "API integration or agreed Node.js/Express endpoints", "Relevant validation, tests and technical handover"],
    requirements: "A workflow or design, repository access, API documentation and clear acceptance criteria.",
    boundaries: "A complete SaaS platform, complex migrations or ongoing infrastructure operations need their own proposal. My backend experience comes from independent projects.",
  },
  {
    slug: "fixes-maintenance", title: "Fixes & maintenance",
    description: "Targeted bug fixes, responsive cleanup and maintenance for an existing website or JavaScript application.",
    deliverables: ["Reproduction and diagnosis of agreed issues", "Focused fixes with regression checks", "A change summary and practical maintenance notes"],
    requirements: "Reproduction steps, affected devices, repository access and a safe testing environment.",
    boundaries: "Major redesigns and 24/7 support are not included. Ongoing support is discussed separately.",
  },
] as const;
