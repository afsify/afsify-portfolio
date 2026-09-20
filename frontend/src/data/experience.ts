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
  summary: "Building and maintaining frontend features for production business software, with a direct connection to the people and workflows behind it.",
  contributions: [
    "Build and maintain React, Redux and Tailwind features for Connect ERP, used across 10+ institutions including colleges, hospitals and businesses.",
    "Contribute to HR/payroll, attendance and geo-face punching, task management, leave requests, bus passes and news workflows.",
    "Integrate REST APIs, debug production issues and improve UI/UX in collaboration with backend and product teams.",
    "Work with clients on requirements, product demos, testing/UAT and follow-ups, translating operational needs into practical software changes.",
    "Contribute to Bizforz CRM, Flow ERP and ticketing products through feature validation, end-to-end testing, rollout support and client coordination.",
    "Work across hospitality/property-management and business websites, including Le’Valor and Bizforz properties, through pull requests and frontend feature work.",
  ],
};
export const domains = [
  { name: "Institutional ERP", detail: "Connect ERP", description: "HR, payroll, attendance, leave, tasks, bus passes and news across institutional workflows." },
  { name: "Business operations", detail: "CRM · Flow · Ticketing", description: "Feature validation, end-to-end testing, client coordination and support through rollout." },
  { name: "Hospitality & web", detail: "Property management", description: "Frontend contributions to hospitality software and business websites, including Le’Valor-related work." },
] as const;
