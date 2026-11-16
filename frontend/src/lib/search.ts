export type SearchEntry = { title: string; href: string; group: "Navigate" | "Projects" | "Services" | "Actions"; keywords: string };
const externalHosts = new Set(["github.com", "www.linkedin.com", "solo.to", "wa.me"]);
export function safeSearchHref(href: string): boolean {
  if (/[\s\\\u0000-\u001f]/.test(href)) return false;
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  if (href === "mailto:afsify2000@gmail.com") return true;
  try { const url = new URL(href); return url.protocol === "https:" && !url.username && !url.password && !url.port && externalHosts.has(url.hostname); } catch { return false; }
}
export function searchEntries(entries: readonly SearchEntry[], query: string): SearchEntry[] {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  const seen = new Set<string>();
  const candidates = entries.filter((entry) => {
    if (!safeSearchHref(entry.href) || seen.has(entry.href)) return false;
    seen.add(entry.href);
    return tokens.every((token) => normalize(`${entry.title} ${entry.keywords}`).includes(token));
  });
  if (!tokens.length) return candidates.filter((entry, index) => candidates.slice(0, index).filter((other) => other.group === entry.group).length < 2);
  return candidates.sort((a, b) => Number(normalize(b.title).includes(normalize(query))) - Number(normalize(a.title).includes(normalize(query)))).slice(0, 16);
}
