import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { loadSource } from "./load-source.mjs";
const { searchIndex } = await import(await loadSource("src/data/search.ts"));
const base = process.env.QA_BASE_URL || "http://localhost:3100";
const output = process.env.QA_OUTPUT_DIR || "artifacts/v2/features";
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.QA_CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const checks = [], errors = [], performance = [];
try {
  for (const theme of ["dark", "light"]) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: theme });
    await context.addInitScript(theme => localStorage.setItem("afsify-theme", theme), theme);
    const page = await context.newPage();
    page.on("pageerror", error => errors.push(error.message));
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base, { waitUntil: "networkidle" });
      const initialResources = await page.evaluate(() => performance.getEntriesByType("resource").filter(e => e.initiatorType === "script").map(e => ({ url: e.name, encodedBytes: e.encodedBodySize })));
      const beforeLayout = await page.locator(".hero-copy").boundingBox();
      const trigger = page.getByRole("button", { name: "Search portfolio", exact: true });
      await trigger.click();
      const dialog = page.getByRole("dialog", { name: "Search portfolio" });
      await dialog.waitFor();
      const afterLayout = await page.locator(".hero-copy").boundingBox();
      assert.equal(afterLayout.x, beforeLayout.x, "Opening search does not shift the page horizontally");
      performance.push({ theme, width, initialScriptBytes: initialResources.reduce((sum, e) => sum + e.encodedBytes, 0), initialScriptRequests: initialResources.length, scriptsAfterSearch: await page.evaluate(() => performance.getEntriesByType("resource").filter(e => e.initiatorType === "script").length), horizontalShiftOnOpen: afterLayout.x - beforeLayout.x });
      const input = dialog.getByRole("combobox");
      assert(await input.evaluate(node => node === document.activeElement));
      assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");
      assert.equal((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze()).violations.length, 0, "search accessibility");
      await page.screenshot({ path: `${output}/search-${theme}-${width}.png` });
      await input.fill("nothingmatcheszz");
      assert.equal(await dialog.getByRole("option").count(), 0);
      assert((await dialog.getByRole("status").innerText()).includes("No results"));
      await input.press("Enter"); assert(await dialog.isVisible());
      await input.fill("React"); assert(await dialog.getByRole("option").count() > 1);
      const first = await input.getAttribute("aria-activedescendant");
      await input.press("ArrowDown"); assert.notEqual(await input.getAttribute("aria-activedescendant"), first);
      await input.press("ArrowUp"); assert.equal(await input.getAttribute("aria-activedescendant"), first);
      for (let i = 0; i < 6; i++) { await page.keyboard.press(i % 2 ? "Shift+Tab" : "Tab"); assert(await page.evaluate(() => !!document.activeElement?.closest("dialog"))); }
      await page.keyboard.press("Escape"); await dialog.waitFor({ state: "detached" });
      assert(await trigger.evaluate(node => node === document.activeElement));
      assert.equal(await page.evaluate(() => document.body.style.overflow), "");
      for (const shortcut of ["Control+k", "Meta+k"]) { await page.keyboard.press(shortcut); await dialog.waitFor(); await page.keyboard.press("Escape"); }
      await page.keyboard.press("Control+f"); assert.equal(await dialog.count(), 0); await page.keyboard.press("Escape");
      await trigger.click(); await dialog.waitFor(); await page.mouse.click(2, 2); await dialog.waitFor({ state: "detached" });
      await trigger.click(); await input.fill("resume"); await input.press("Enter"); await page.waitForURL(`${base}/resume`);
      const pdfRequests = [];
      page.on("request", request => { if (request.url().endsWith(".pdf")) pdfRequests.push(request.url()); });
      await page.reload({ waitUntil: "networkidle" });
      assert.equal(await page.locator("iframe").count(), 0);
      assert.equal(pdfRequests.length, 0, "PDF not fetched before preview");
      const overview = page.getByRole("tab", { name: "Resume Overview" });
      await overview.focus(); await overview.press("ArrowRight");
      assert.equal(await page.getByRole("tab", { name: "PDF Preview" }).getAttribute("aria-selected"), "true");
      assert.equal(await page.locator("iframe").count(), width >= 768 ? 1 : 0);
      assert(await page.getByRole("link", { name: /Open PDF in new tab/ }).isVisible());
      await page.screenshot({ path: `${output}/resume-preview-${theme}-${width}.png` });
      await page.emulateMedia({ media: "print" });
      assert(await page.locator(".resume-paper").isVisible()); assert.equal(await page.locator(".pdf-panel").isVisible(), false);
      await page.emulateMedia({ media: "screen" });
      await page.getByRole("tab", { name: "PDF Preview" }).press("Home"); assert(await page.locator(".resume-paper").isVisible());
      await page.goto(`${base}/contact`, { waitUntil: "networkidle" });
      assert(await page.getByRole("button", { name: "Open Email App" }).isEnabled());
      assert(await page.getByRole("button", { name: "Copy Enquiry" }).isEnabled());
      await page.screenshot({ path: `${output}/contact-${theme}-${width}.png`, fullPage: true });
      checks.push(`${theme} ${width}: palette keyboard/focus/trap/outside/empty/filter/shortcuts, lazy PDF, mobile fallback, print, contact email handoff`);
    }
    for (const entry of searchIndex.filter(e => e.href.startsWith("/"))) {
      const response = await context.request.get(`${base}${entry.href.split("#")[0]}`);
      assert.equal(response.status(), 200, entry.href);
      if (entry.href.includes("#")) { await page.goto(`${base}${entry.href}`); assert.equal(await page.locator(`[id="${entry.href.split("#")[1]}"]`).count(), 1, entry.href); }
    }
    await page.goto(`${base}/projects`);
    await page.getByRole("button", { name: "Professional Websites", exact: true }).click();
    await page.getByRole("button", { name: "Search portfolio", exact: true }).click();
    await page.getByRole("combobox").fill("Taskent");
    await page.getByRole("combobox").press("Enter");
    await page.waitForURL(`${base}/projects#taskent`);
    await page.locator("#taskent").waitFor({ state: "visible" });
    assert.equal(await page.getByRole("button", { name: "All work", exact: true }).getAttribute("aria-pressed"), "true");
    await page.getByRole("button", { name: "Search portfolio", exact: true }).click();
    await page.getByRole("combobox").fill("Boxlist");
    await page.getByRole("combobox").press("Enter");
    await page.waitForURL(`${base}/projects/boxlist-scheduler`);
    assert(await page.getByRole("heading", { level: 1, name: "Boxlist Scheduler." }).isVisible());
    assert.equal(await page.locator('.project-hero a[href="https://github.com/afsify/boxlist-scheduler"]').count(), 1);
    assert.equal(await page.locator('.project-hero a[href="https://boxlist.vercel.app/"]').count(), 0);
    checks.push(`${theme}: Boxlist keyboard search navigation, source link, unverified demo omitted`);
    for (const width of [320, 360, 375, 390, 414, 430, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${base}/resume`, { waitUntil: "networkidle" });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.getByRole("tab", { name: "PDF Preview" }).click();
      await page.emulateMedia({ media: "print" });
      assert(await page.locator(".resume-paper").isVisible(), `${theme} ${width}: print overview from preview`);
      assert.equal(await page.locator(".pdf-panel").isVisible(), false);
      await page.emulateMedia({ media: "screen" });
      assert.equal(await page.locator(".resume-paper").isVisible(), false);
      await page.getByRole("tab", { name: "Resume Overview" }).click();
      assert(await page.locator(".resume-paper").isVisible());
      checks.push(`${theme} ${width}: final resume responsive/preview/print/return regression`);
    }
    await context.close();
  }
  const request = await browser.newContext();
  const pdf = await request.request.get(`${base}/documents/muhammed-afsal-resume.pdf`);
  assert.equal(pdf.headers()["x-frame-options"], "SAMEORIGIN");
  assert.equal(pdf.headers()["content-security-policy"], "frame-ancestors 'self'");
  const retired = await request.request.post(`${base}/api/contact`, { data: {} });
  assert.equal(retired.status(), 404, "Removed contact API has no handler");
  assert.equal(errors.length, 0, errors.join("\n"));
  await fs.writeFile(`${output}/results.json`, JSON.stringify({ checks, errors, performance, localSearchDestinations: searchIndex.filter(e => e.href.startsWith("/")).length, emailHandoff: "No website delivery; visitor sends in their email app" }, null, 2));
  console.log(`PASS: ${checks.length} feature flows; search destinations, same-origin PDF headers, retired API, zero runtime exceptions.`);
} finally { await browser.close(); }
