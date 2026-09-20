import fs from "node:fs/promises";
const names = ["ekavio", "codisify-devlearn", "chateph-messenger", "afssian-ecommerce", "taskent-dashboard", "expenseer-tracker"];
const urls = ["https://codisify.vercel.app", "https://chateph.vercel.app", "https://taskent.vercel.app", "https://expenseer.vercel.app", "https://github.com/afsify", "https://www.linkedin.com/in/afsify/", "https://solo.to/afsify", ...names.map((name) => `https://github.com/afsify/${name}`)];
const checks = await Promise.all(urls.map(async (url) => {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(25000), headers: { "User-Agent": "Afsify-Portfolio-Link-Check" } });
    const html = await response.text();
    return { url, status: response.status, finalUrl: response.url, title: html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1], unavailable: /DEPLOYMENT_NOT_FOUND|This deployment has been disabled|The deployment could not be found/.test(html) };
  } catch (error) { return { url, error: error.message }; }
}));
await fs.mkdir("artifacts", { recursive: true });
await fs.writeFile("artifacts/external-links.json", JSON.stringify({ checkedAt: new Date().toISOString(), checks }, null, 2));
console.log(JSON.stringify(checks, null, 2));
for (const name of ["taskent-dashboard", "expenseer-tracker", "afssian-ecommerce"]) {
  try {
    const response = await fetch(`https://api.github.com/repos/afsify/${name}/readme`, { signal: AbortSignal.timeout(20000), headers: { Accept: "application/vnd.github.raw+json", "User-Agent": "Afsify-Portfolio-Audit" } });
    const text = await response.text();
    await fs.writeFile(`artifacts/${name}-readme.txt`, text);
    console.log(`${name} README: ${response.status}\n${text.slice(0, 10000)}`);
  } catch (error) { console.log(`${name}: ${error.message}`); }
}
