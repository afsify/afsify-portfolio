import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { loadSource } from "./load-source.mjs";
const { searchEntries, safeSearchHref } = await import(await loadSource("src/lib/search.ts"));
const { searchIndex } = await import(await loadSource("src/data/search.ts"));
const { projects } = await import(await loadSource("src/data/projects.ts"));
const { services } = await import(await loadSource("src/data/services.ts"));
const { validateEnquiry } = await import(await loadSource("src/lib/contact-validation.ts"));
const { composeEnquiry, MAILTO_LIMIT } = await import(await loadSource("src/lib/contact-email.ts"));
const { enquiryTypes } = await import(await loadSource("src/lib/contact-validation.ts"));
const checks = [];
function check(name, fn) { fn(); checks.push(name); }
check("search index follows project/service data", () => {
  assert.equal(searchIndex.filter(e => e.group === "Projects").length, projects.length);
  assert.equal(searchIndex.filter(e => e.group === "Services").length, services.length);
});
check("empty search has all groups and unique routes", () => { const r = searchEntries(searchIndex, ""); assert.equal(new Set(r.map(e => e.group)).size, 4); assert.equal(new Set(r.map(e => e.href)).size, r.length); });
check("search synonyms and token matching", () => { for (const q of ["React", "Next.js", "Node", "backend", "EkaVio", "full stack", "hire", "freelance", "resume"]) assert(searchEntries(searchIndex, q).length, q); assert.equal(searchEntries(searchIndex, "nonexistent-flamingo").length, 0); assert.equal(searchEntries(searchIndex, "ekavio")[0].title, "EkaVio"); });
check("malformed URLs and duplicate routes excluded", () => {
  for (const href of ["javascript:alert(1)", "//evil.com", "/\\evil", "https://github.com@evil.com", "https://github.com.evil.com", "https://user:pass@github.com", "data:text/html,x", "https://github.com:123", "/x\n"]) assert.equal(safeSearchHref(href), false, href);
  assert.equal(searchEntries([...searchIndex, searchIndex[0], { title: "unsafe", href: "//evil.com", group: "Actions", keywords: "" }], "unsafe").length, 0);
});
const valid = { type: "Freelance project", name: "Alex Thomas", email: "alex@example.com", message: "I need a responsive business website.", company: "", budget: "", timeframe: "", website: "" };
const expectedSubjects = ["Full-Time Role Enquiry", "Freelance Project Enquiry", "Collaboration Enquiry", "General Enquiry"];
for (const [index, type] of enquiryTypes.entries()) check(`email handoff: ${type}`, () => {
  const result = validateEnquiry({ ...valid, type }); assert(result.data);
  const email = composeEnquiry(result.data), parsed = new URL(email.href);
  assert.equal(parsed.protocol, "mailto:"); assert.equal(parsed.pathname, "afsify2000@gmail.com");
  assert.equal(parsed.searchParams.get("subject"), `AFSIFY — ${expectedSubjects[index]}`);
  assert.equal(parsed.searchParams.get("body"), `Name: Alex Thomas\r\nEmail: alex@example.com\r\nEnquiry Type: ${type}\r\n\r\n${type === "Freelance project" ? "Project Details:" : "Message:"}\r\nI need a responsive business website.\r\n\r\nSource: https://www.afsify.com/contact`);
  assert(!email.tooLong); assert(!/undefined|Company:|Budget:|Timeline:|Website \/ Project URL:/.test(email.body));
});
for (const [name, change] of Object.entries({ missingName: { name: "" }, missingEmail: { email: "" }, missingMessage: { message: "" }, invalidEmail: { email: "wrong@" }, headerInjection: { email: "a@b.com\r\nBcc:someone@x.com" }, shortMessage: { message: "short" }, oversized: { message: "x".repeat(20001) }, invalidType: { type: "unknown" }, objectValue: { name: {} }, multilineName: { name: "Hi\nBcc: x" }, unsafeWebsite: { website: "javascript:alert(1)" } })) check(`validation: ${name}`, () => assert.equal(validateEnquiry({ ...valid, ...change }).data, undefined));
check("optional company, project URL, budget and timeline", () => {
  const result = validateEnquiry({ ...valid, company: "Example Business", website: "https://example.com/?a=1&b=2", budget: "₹20,000–₹40,000", timeframe: "Within 4 weeks" }); assert(result.data);
  const email = composeEnquiry(result.data);
  for (const line of ["Company: Example Business", "Website / Project URL: https://example.com/?a=1&b=2", "Budget: ₹20,000–₹40,000", "Timeline: Within 4 weeks"]) assert(email.body.includes(line));
  assert.equal(validateEnquiry({ ...valid, type: "Full-time role", budget: "old" }).data.budget, "");
});
check("Unicode, punctuation, newlines and query delimiters round-trip", () => {
  const message = "Hello — നമസ്കാരം 👋\nBudget ₹20,000 & 50% + #? = <script>alert(1)</script>";
  const email = composeEnquiry({ ...valid, message }); const url = new URL(email.href);
  assert.equal(url.searchParams.get("body"), email.body); assert(email.body.includes(message.replaceAll("\n", "\r\n")));
  assert.deepEqual([...url.searchParams.keys()], ["subject", "body"]); assert.equal(url.hash, "");
});
check("long messages retain all text and trigger manual fallback", () => {
  const message = "സന്ദേശം ₹ 👋 ".repeat(300), result = validateEnquiry({ ...valid, message }); assert(result.data);
  const email = composeEnquiry(result.data); assert(email.tooLong && email.href.length > MAILTO_LIMIT);
  assert(email.text.includes(message.trim())); assert.equal(email.plainHref, "mailto:afsify2000@gmail.com");
});
check("Boxlist indexes as independent full-stack source-first project", () => {
  const project = projects.find(p => p.slug === "boxlist-scheduler"); assert(project.detail); assert.equal(project.ownership, "independent"); assert.equal(project.category, "Full-stack"); assert.equal(project.live, undefined); assert(!project.flagship);
  assert.deepEqual(project.stack, ["React", "Redux", "Tailwind CSS", "Ant Design", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT"]);
  assert.equal(searchEntries(searchIndex, "Boxlist")[0].href, "/projects/boxlist-scheduler");
});
await fs.mkdir("artifacts/polish", { recursive: true });
await fs.writeFile("artifacts/polish/unit-results.json", JSON.stringify({ checks }, null, 2));
console.log(`PASS: ${checks.length} search/email/project scenarios; no provider or delivery requests.`);
