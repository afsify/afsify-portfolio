import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium, webkit } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3100";
const output = process.env.QA_OUTPUT_DIR || "artifacts/mobile-release/mobile";
const baseline = process.argv.includes("--baseline");
const engine = process.argv.includes("--webkit") ? "webkit" : "chromium";
const browser = await (engine === "webkit" ? webkit.launch() : chromium.launch({ executablePath: process.env.QA_CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--disable-extensions"] }));
const results = [], errors = [];
await fs.mkdir(output, { recursive: true });
try {
  for (const theme of ["dark", "light"]) {
    const context = await browser.newContext({ colorScheme: theme, reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
    await context.addInitScript(theme => localStorage.setItem("afsify-theme", theme), theme);
    const page = await context.newPage();
    page.on("pageerror", e => errors.push(e.message));
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    for (const width of [320, 360, 375, 390, 414, 430]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(base, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => {
        const box = selector => { const r = document.querySelector(selector).getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, bottom: r.bottom }; };
        return { header: box(".nav-inner"), title: box(".hero h1"), portrait: box(".hero-portrait"), work: box("#selected-work"), overflow: document.documentElement.scrollWidth > innerWidth, extensionAttributes: document.body.hasAttribute("data-gr-ext-installed") || document.body.hasAttribute("data-new-gr-c-s-check-loaded"), targets: [...document.querySelectorAll(".nav-inner button,.nav-inner .nav-resume")].filter(n => n.getBoundingClientRect().width).map(n => ({ name: n.getAttribute("aria-label") || n.textContent, width: n.getBoundingClientRect().width, height: n.getBoundingClientRect().height, right: n.getBoundingClientRect().right })) };
      });
      assert.equal(layout.extensionAttributes, false);
      if (!baseline) assert.equal(layout.overflow, false);
      if (!baseline) for (const target of layout.targets) { assert(target.width >= 44 && target.height >= 44, `${width}: small header target ${target.name}`); assert(target.right <= width, "header target clipped"); }
      results.push({ theme, width, ...layout });
      if ([320, 390].includes(width)) {
        await page.screenshot({ caret: "initial", path: `${output}/home-${theme}-${width}.png`, fullPage: true });
        await page.screenshot({ caret: "initial", path: `${output}/home-top-${theme}-${width}.png` });
      }
    }
    for (const route of ["/projects", "/projects/boxlist-scheduler", "/services", "/contact", "/resume"]) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(base + route, { waitUntil: "networkidle" });
      await page.screenshot({ caret: "initial", path: `${output}/${route.slice(1).replaceAll("/", "-")}-${theme}.png`, fullPage: true });
    }
    if (!baseline) {
      await page.setViewportSize({ width: 320, height: 568 });
      await page.goto(base, { waitUntil: "networkidle" });
      const menu = page.getByRole("button", { name: "Open menu", exact: true });
      await menu.click();
      const nav = page.getByRole("dialog", { name: "Navigation menu" });
      await nav.getByRole("link", { name: /resume/i }).scrollIntoViewIfNeeded();
      assert.equal((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze()).violations.length, 0);
      await page.screenshot({ caret: "initial", path: `${output}/menu-short-${theme}.png` });
      await page.keyboard.press("Escape");
      assert(await menu.evaluate(n => document.activeElement === n));
      const search = page.getByRole("button", { name: "Search portfolio", exact: true });
      await search.click();
      const dialog = page.getByRole("dialog", { name: "Search portfolio" });
      await dialog.getByRole("combobox").fill("Boxlist");
      const bounds = await dialog.boundingBox();
      assert(bounds.y >= 0 && bounds.y + bounds.height <= 568, "short-screen search fits");
      assert.equal((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze()).violations.length, 0);
      await page.screenshot({ caret: "initial", path: `${output}/search-short-${theme}.png` });
      await page.keyboard.press("Escape");
      assert(await search.evaluate(n => document.activeElement === n));
      results.push({ theme, shortScreenMenuAndSearch: "passed" });
    }
    await context.close();
  }
  assert.deepEqual(errors, [], "Extension-free console and hydration errors");
} finally {
  await fs.writeFile(`${output}/results.json`, JSON.stringify({ engine, base, baseline, results, errors }, null, 2));
  await browser.close();
}
console.log(`PASS: ${engine}, ${results.length} mobile checks; extension-free console clean in both themes.`);
