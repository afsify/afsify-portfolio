export const enquiryTypes = ["Full-time role", "Freelance project", "Collaboration", "General enquiry"] as const;
export type Enquiry = { type: string; name: string; email: string; message: string; company: string; budget: string; timeframe: string; website: string };
export type FieldErrors = Partial<Record<keyof Enquiry, string>>;

export function validateEnquiry(input: unknown): { data?: Enquiry; errors: FieldErrors } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { errors: { message: "Enter your enquiry details." } };
  const raw = input as Record<string, unknown>;
  const errors: FieldErrors = {};
  const text = (key: keyof Enquiry, min: number, max: number) => {
    const value = typeof raw[key] === "string" ? raw[key].trim() : "";
    if ((raw[key] !== undefined && typeof raw[key] !== "string") || value.length < min || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) errors[key] = `Use ${min}–${max} characters.`;
    return value;
  };
  const data: Enquiry = { type: text("type", 1, 40), name: text("name", 2, 100), email: text("email", 3, 254), message: text("message", 20, 20000), company: text("company", 0, 160), budget: text("budget", 0, 100), timeframe: text("timeframe", 0, 100), website: text("website", 0, 1000) };
  if (!(enquiryTypes as readonly string[]).includes(data.type)) errors.type = "Choose an enquiry type.";
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  for (const key of ["name", "company", "budget", "timeframe", "website"] as const) if (/[\r\n]/.test(data[key])) errors[key] = "Use one line for this field.";
  if (data.website) {
    try { const url = new URL(data.website); if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) throw new Error(); }
    catch { errors.website = "Enter a full http:// or https:// website URL."; }
  }
  if (data.type !== "Freelance project") { data.budget = ""; data.timeframe = ""; }
  return Object.keys(errors).length ? { errors } : { data, errors };
}
