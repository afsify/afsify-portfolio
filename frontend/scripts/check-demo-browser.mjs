import fs from "node:fs/promises";
import { chromium } from "playwright";
const browser = await chromium.launch({ executablePath: process.env.QA_CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const results = [];
try {
  for (const url of ["https://codisify.vercel.app", "https://chateph.vercel.app", "https://taskent.vercel.app", "https://afssian.onrender.com"]) {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    try {
      const response = await page.goto(url, { waitUntil: "load", timeout: 25000 });
      await page.waitForFunction(() => document.body.innerText.trim().length > 100, { timeout: 12000 }).catch(() => {});
      const result = { url, status: response?.status(), title: await page.title(), text: (await page.locator("body").innerText()).slice(0, 2500), errors };
      results.push(result);
      console.log(JSON.stringify(result));
    } catch (error) { results.push({ url, error: error.message, errors }); console.log(url, error.message); }
    await page.close();
  }
} finally { await browser.close(); }
await fs.mkdir("artifacts", { recursive: true });
await fs.writeFile("artifacts/external-browser.json", JSON.stringify(results, null, 2));
