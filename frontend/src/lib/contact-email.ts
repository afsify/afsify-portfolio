import { profile } from "../data/profile";
import type { Enquiry } from "./contact-validation";

// Conservative interoperability limit; mail clients have different URL limits.
export const MAILTO_LIMIT = 1800;
const subjects: Record<string, string> = {
  "Full-time role": "Full-Time Role Enquiry",
  "Freelance project": "Freelance Project Enquiry",
  Collaboration: "Collaboration Enquiry",
  "General enquiry": "General Enquiry",
};
export function composeEnquiry(data: Enquiry) {
  const subject = `AFSIFY — ${subjects[data.type] || subjects["General enquiry"]}`;
  const lines = [`Name: ${data.name}`, `Email: ${data.email}`, `Enquiry Type: ${data.type}`];
  for (const [label, value] of [["Company", data.company], ["Budget", data.budget], ["Timeline", data.timeframe], ["Website / Project URL", data.website]]) {
    if (value) lines.push(`${label}: ${value}`);
  }
  lines.push("", data.type === "Freelance project" ? "Project Details:" : "Message:", data.message, "", `Source: ${profile.siteUrl}/contact`);
  const body = lines.join("\n").replace(/\r?\n/g, "\r\n");
  const plainHref = `mailto:${profile.email}`;
  const href = `${plainHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { subject, body, href, plainHref, tooLong: href.length > MAILTO_LIMIT, text: `To: ${profile.email}\nSubject: ${subject}\n\n${body}` };
}
