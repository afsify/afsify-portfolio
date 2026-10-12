export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  contributions: readonly string[];
}
export const experience: Experience = {
  company: "Bizforz",
  role: "Frontend Developer",
  period: "Mar 2025 — Present",
  location: "Kottakkal, Malappuram",
  summary: "Primary development of business websites and collaborative frontend work on production software, with direct client communication from requirements through delivery.",
  contributions: [
    "Primary website developer for LE’VALOR Hotels & Resorts, Home at Paris (Paris Furnished Apartments LLC, Ajman, UAE) and the Bizforz corporate website, delivered through my employment at Bizforz Solutions Pvt Ltd.",
    "Handle client requirement discussions and content coordination, responsive frontend implementation, hosting/deployment assistance, subsequent improvements and ongoing website support.",
    "Build and maintain React, TypeScript, Redux Toolkit and Tailwind CSS features for Connect ERP, used across 10+ institutions including colleges, hospitals and businesses.",
    "Contribute to HR/payroll, attendance and geo-face punching, task management, leave requests, bus passes and news workflows.",
    "Integrate REST APIs, debug production issues and improve UI/UX in collaboration with backend and product teams.",
    "Work with clients on requirements, product demos, testing/UAT and follow-ups, translating operational needs into practical software changes.",
    "Contribute to Bizforz CRM, Flow ERP and ticketing products through feature validation, end-to-end testing, rollout support and client coordination.",
    "Contribute frontend features to hospitality/property-management software through team workflows and pull requests.",
    "Maintain institutional websites through content updates, UI improvements and ongoing support.",
  ],
};
export const domains = [
  { name: "Institutional ERP", detail: "Connect ERP", description: "HR, payroll, attendance, leave, tasks, bus passes and news across institutional workflows." },
  { name: "Business operations", detail: "CRM · Flow · Ticketing", description: "Feature validation, end-to-end testing, client coordination and support through rollout." },
  { name: "Professional websites", detail: "Hospitality · Corporate", description: "Primary website development for LE’VALOR, Home at Paris and Bizforz, from requirements and content to implementation, launch assistance and support." },
] as const;
