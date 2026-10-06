import fs from "node:fs/promises";
import ts from "typescript";
async function data(name) {
  const source = await fs.readFile(`src/data/${name}.ts`, "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
}
const { projects } = await data("projects");
const { profile } = await data("profile");
const urls = [...new Set([...projects.flatMap((p) => [p.github, ...(p.live ? [p.live.url] : [])]), ...profile.socials.map((s) => s.href)])];
const checks = await Promise.all(urls.map(async (url) => {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(30000), headers: { "User-Agent": "Afsify-Portfolio-Link-Check" } });
    const html = await response.text();
    return { url, status: response.status, finalUrl: response.url, title: html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1], unavailable: /DEPLOYMENT_NOT_FOUND|This deployment has been disabled|The deployment could not be found/.test(html) };
  } catch (error) { return { url, error: error.message }; }
}));
const output = process.env.QA_OUTPUT_DIR || "artifacts/master-update";
await fs.mkdir(output, { recursive: true });
await fs.writeFile(`${output}/external-links.json`, JSON.stringify({ checkedOn: "2026-10-06", checkedAt: new Date().toISOString(), checks }, null, 2));
console.log(JSON.stringify(checks, null, 2));
