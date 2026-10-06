import assert from "node:assert/strict";
import fs from "node:fs/promises";
import sharp from "sharp";
import { chromium } from "playwright";

const base = process.env.QA_BASE_URL || "http://localhost:3100";
const output = process.env.QA_OUTPUT_DIR || "artifacts/master-update/production";
await fs.mkdir(`${output}/images`, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.QA_CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const checks = [], exceptions = [], consoleErrors = [];
try {
  for (const [width, dpr] of [[390, 1], [390, 2], [390, 3], [768, 1], [768, 2], [1440, 1], [1440, 2]]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, deviceScaleFactor: dpr, colorScheme: "dark" });
    const page = await context.newPage();
    page.on("pageerror", (error) => exceptions.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
    for (const route of ["/", "/about", "/experience"]) {
      await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator("main img").all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((node) => node.decode());
        const state = await image.evaluate((node) => {
          const box = node.getBoundingClientRect();
          return { src: node.currentSrc, sizes: node.sizes, alt: node.alt, cssWidth: box.width, cssHeight: box.height, fit: getComputedStyle(node).objectFit };
        });
        const response = await context.request.get(state.src, { headers: { Accept: "image/webp" } });
        assert.equal(response.status(), 200);
        const bytes = await response.body();
        const meta = await sharp(bytes).metadata();
        assert.equal(meta.format, "webp");
        assert.equal(new URL(state.src).searchParams.get("q"), "90", "Photo delivery quality");
        const density = Math.min(meta.width / state.cssWidth, meta.height / state.cssHeight);
        const check = { route, width, dpr, ...state, deliveredWidth: meta.width, deliveredHeight: meta.height, bytes: bytes.length, effectiveDensity: density };
        checks.push(check);
        assert(density >= dpr * 0.98, `Image stretched beyond its pixel budget: ${JSON.stringify(check)}`);
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}: overflow`);
      if (dpr === 2) {
        // Capture from the top so sticky navigation cannot cover a tall grid.
        // Crop the full-page screenshot without changing any application styles.
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        const screenshot = await page.screenshot({ fullPage: true, animations: "disabled" });
        async function capture(selector, name) {
          const box = await page.locator(selector).boundingBox();
          await sharp(screenshot).extract({ left: Math.round(box.x * dpr), top: Math.round(box.y * dpr),
            width: Math.round(box.width * dpr), height: Math.round(box.height * dpr) })
            .toFile(`${output}/images/${name}-${width}-2x.png`);
        }
        if (route === "/") {
          await capture(".recognition-grid", "recognition");
          await capture(".hero-portrait", "hero");
        } else if (route === "/about") {
          await capture(".about-photo", "about");
        }
      }
    }
    await context.close();
    console.log(`PASS: photograph resolution at ${width}px / DPR ${dpr}`);
  }
  assert.equal(exceptions.length, 0, JSON.stringify(exceptions));
  assert.equal(consoleErrors.length, 0, JSON.stringify(consoleErrors));
  await fs.writeFile(`${output}/image-results.json`, JSON.stringify({ checkedAt: new Date().toISOString(), checks, exceptions, consoleErrors }, null, 2));
  console.log(`PASS: ${checks.length} photo delivery checks; full crop resolution; zero runtime/console errors.`);
} finally { await browser.close(); }
