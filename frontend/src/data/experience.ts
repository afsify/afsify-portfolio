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
  summary: "Frontend ownership of Le’valor PMS, organization-specific Connect ERP interface maintenance and primary website delivery through Bizforz, with backend and wider product work handled collaboratively.",
  contributions: [
    "Owned the Le’valor Hotel & Resort PMS frontend from initial React development: reservations, guest profiles, occupancy, room status, check-in/checkout, room rates and booking requests.",
    "Built PMS operations and billing interfaces for OTA payment tracking, room charges, PDF billing, housekeeping tasks, staff workflows and cashbook screens, integrating REST APIs and reusable role-aware navigation.",
    "Primary website developer for Le'valor Hotels & Resorts, Paris Furnished Apartments LLC, Ajman, UAE and the Bizforz corporate website, delivered through my employment at Bizforz Solutions Pvt Ltd.",
    "Handle client requirement discussions and content coordination, responsive frontend implementation, hosting/deployment assistance, subsequent improvements and ongoing website support.",
    "Independently implement and maintain organization-specific React, TypeScript, Redux Toolkit and Tailwind CSS interfaces for staff and students on Connect ERP, a wider team product used across 10+ institutions.",
    "Contribute to HR/payroll, attendance and geo-face punching, task management, leave requests, bus passes and news workflows.",
    "Integrate REST APIs, debug production issues and improve UI/UX in collaboration with backend and product teams.",
    "Work with clients on requirements, product demos, testing/UAT and follow-ups, translating operational needs into practical software changes.",
    "Contribute to Bizforz CRM, Flow ERP and ticketing products through feature validation, end-to-end testing, rollout support and client coordination.",
    "Develop ticketing and field-service frontend workflows for creation, tracking, assignment and resolution, engineer dashboards, SLA/status timelines, spare-part requests, dispatch/returns and warranty views.",
    "Maintain institutional websites through content updates, UI improvements and ongoing support.",
  ],
};
export const domains = [
  { name: "Hospitality operations", detail: "Le’valor PMS", description: "Frontend ownership from initial development, covering reservations, rooms, guest workflows, billing and housekeeping." },
  { name: "Institutional ERP", detail: "Connect ERP", description: "HR, payroll, attendance, leave, tasks, bus passes and news across institutional workflows." },
  { name: "Business operations", detail: "CRM · Flow · Ticketing", description: "Feature validation, end-to-end testing, client coordination and support through rollout." },
  { name: "Professional websites", detail: "Hospitality · Corporate", description: "Primary website development for Le'valor, Home at Paris and Bizforz, from requirements and content to implementation, launch assistance and support." },
] as const;
