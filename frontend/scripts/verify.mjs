import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import ts from "typescript";

const base = process.env.QA_BASE_URL || "http://localhost:3100";
async function data(file) {
  const source = await fs.readFile(`src/data/${file}.ts`, "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
}
const { projects, detailedProjects } = await data("projects");
const { coreRoutes } = await data("navigation");
const { profile } = await data("profile");
const routes = [...coreRoutes, ...detailedProjects.map((project) => `/projects/${project.slug}`)];
assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
assert.equal(projects.filter((project) => project.flagship).length, 1);
assert.equal(projects[0].slug, "ekavio");
assert.equal(projects[0].live, undefined);
assert.equal(projects.find((project) => project.slug === "expenseer").live, undefined);
assert(projects.every((project) => project.stack.length));
const sha = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
assert.equal(sha(await fs.readFile(`public${profile.resume}`)), sha(await fs.readFile("../ref-files/Muhammed_Afsal_Resume.docx")), "Current resume must match source exactly");

const sourceFiles = await fs.readdir("src", { recursive: true });
const oldBrandColors = /#(?:c7ef80|d9f7a7|81b83b|bfd49f|60714d|52643f|738260|668448|b6df6c|445b2d|5f802c|6f8950)\b/i;
for (const file of sourceFiles.filter((file) => /\.(tsx?|css)$/.test(file))) {
  const source = await fs.readFile(path.join("src", file), "utf8");
  assert(!oldBrandColors.test(source), `Old brand color: ${file}`);
  assert(!/r[ée]sum[ée]/i.test(source.replace(/resume/gi, "")), `Accented resume UI copy: ${file}`);
  assert(!/mhdafs|codeverse|edentu|brototype-id-card|birthday-momento|ref-files|6\+ months|TODO|FIXME/i.test(source), `Disallowed public source: ${file}`);
  if (/\.tsx?$/.test(file)) {
    const syntax = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const inspect = (node) => {
      assert.notEqual(node.kind, ts.SyntaxKind.AnyKeyword, `Unbounded type: ${file}`);
      ts.forEachChild(node, inspect);
    };
    inspect(syntax);
  }
}
const globals = await fs.readFile("src/app/globals.css", "utf8");
assert(!/#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?)\(/i.test(globals), "Component color declarations must consume semantic tokens");
assert(!oldBrandColors.test(await fs.readFile("scripts/prepare-assets.mjs", "utf8")), "Asset generator must preserve new branding");
const publicFiles = (await fs.readdir("public", { recursive: true })).filter((file) => /\.(webp|png|docx|pdf|jpg)$/i.test(file));
assert(!publicFiles.some((file) => /id-card|birthday|\.pdf$/i.test(file)), "Private or obsolete asset published");
const links = new Set();
const images = new Set();
const results = [];
for (const route of routes) {
  const response = await fetch(`${base}${route}`);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one H1`);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert(canonical, `${route}: canonical missing`);
  assert.equal(new URL(canonical).toString(), new URL(route, profile.siteUrl).toString(), `${route}: canonical`);
  assert(/name="description" content="[^"]+"/.test(html), `${route}: description`);
  assert(/property="og:image"/.test(html), `${route}: OG image`);
  assert(/name="twitter:card" content="summary_large_image"/.test(html), `${route}: Twitter`);
  assert(/application\/ld\+json/.test(html), `${route}: Person JSON-LD`);
  assert(html.indexOf('id="afsify-theme-init"') > 0 && html.indexOf('id="afsify-theme-init"') < html.indexOf("<body"), `${route}: theme initializer before body`);
  const themeMetadata = html.match(/<meta\b[^>]*name="theme-color"[^>]*>/g) || [];
  assert(themeMetadata.some((tag) => tag.includes('media="(prefers-color-scheme: dark)"') && tag.includes('content="#111315"')), `${route}: dark theme metadata`);
  assert(themeMetadata.some((tag) => tag.includes('media="(prefers-color-scheme: light)"') && tag.includes('content="#F4F4F1"')), `${route}: light theme metadata`);
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) if (match[1].startsWith("/") && !match[1].startsWith("//")) links.add(match[1].split("#")[0]);
  for (const match of html.matchAll(/<img\b[^>]*src="([^"]+)"/g)) images.add(match[1].replaceAll("&amp;", "&"));
  results.push({ route, status: 200, metadata: "pass", h1: "pass" });
}
for (const url of [...links, ...images]) {
  const response = await fetch(new URL(url, base));
  assert.equal(response.status, 200, `Broken local link/image ${url}`);
}
for (const route of ["/missing-page", "/projects/missing-project", "/projects/constructor", "/projects/__proto__"]) {
  assert.equal((await fetch(`${base}${route}`)).status, 404, `404 handling: ${route}`);
}
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
assert.equal((sitemap.match(/<url>/g) || []).length, routes.length);
for (const route of routes) assert(sitemap.includes(`<loc>${new URL(route, profile.siteUrl)}</loc>`));
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert(robots.includes(`Sitemap: ${profile.siteUrl}/sitemap.xml`));
for (const route of ["/icon.svg", "/apple-icon.png", "/images/brand/social-preview.png", profile.resume]) assert.equal((await fetch(`${base}${route}`)).status, 200, route);
const expectedHashes = JSON.parse((await fs.readFile("../.reference-hashes.json", "utf8")).replace(/^\uFEFF/, ""));
for (const entry of expectedHashes) assert.equal(sha(await fs.readFile(entry.Path)).toUpperCase(), entry.Hash, `Reference changed: ${entry.Path}`);
const output = process.env.QA_OUTPUT_DIR || "artifacts/image-theme-fix/production";
await fs.mkdir(output, { recursive: true });
await fs.writeFile(`${output}/route-results.json`, JSON.stringify({ checkedAt: new Date().toISOString(), routes: results, localLinks: links.size, images: images.size, referencesUnchanged: expectedHashes.length, resumeByteIdentical: true, semanticColors: "pass", oldLimeValues: 0, prePaintThemeScript: "pass", conditionalThemeMetadata: "pass" }, null, 2));
console.log(`PASS: ${routes.length} routes; single H1, metadata and JSON-LD on every route; ${links.size} local links; ${images.size} image requests; 4 not-found cases; sitemap/robots/icons; byte-identical current résumé; ${expectedHashes.length} reference files unchanged.`);
