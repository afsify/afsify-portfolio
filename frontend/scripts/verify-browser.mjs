import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import ts from "typescript";
import { verifyThemes, assertTheme } from "./verify-theme-behavior.mjs";

const base = process.env.QA_BASE_URL || "http://localhost:3100";
const rootOutput = process.env.QA_OUTPUT_DIR || "artifacts/master-update/production";
const output = rootOutput;
await fs.mkdir(output, { recursive: true });
const chrome = process.env.QA_CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const summaries = [];
try {
for (const theme of process.argv.includes("--themes") ? [] : ["dark", "light"]) {
const output = `${rootOutput}/${theme}`;
await fs.mkdir(output, { recursive: true });
const context = await browser.newContext({ colorScheme: theme, viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await context.addInitScript((theme) => { if (!localStorage.getItem("afsify-theme")) localStorage.setItem("afsify-theme", theme); }, theme);
const page = await context.newPage();
const exceptions = [];
const consoleErrors = [];
page.on("pageerror", (error) => exceptions.push(error.message));
page.on("console", (message) => { if (message.type() === "error") consoleErrors.push({ url: page.url(), text: message.text() }); });
async function load(route, width) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.decode());
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await assertTheme(page, theme, theme);
}
try {
  if (process.argv.includes("--preview")) {
    for (const width of [1440, 768, 390]) {
      await load("/", width);
      await page.screenshot({ path: `${output}/home-${width}.png`, fullPage: true });
      await page.screenshot({ path: `${output}/home-viewport-${width}.png`, fullPage: false });
      console.log(`${theme} preview saved: ${width}px`);
    }
  } else if (process.argv.includes("--audit")) {
    const audit = [];
    for (const route of ["/", "/about", "/experience", "/projects", "/contact", "/resume", "/projects/ekavio", "/projects/codisify", "/projects/chateph", "/projects/afssian"]) {
      await load(route, 390);
      const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      const violations = result.violations.map((item) => ({ id: item.id, nodes: item.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })) }));
      audit.push({ route, violations });
      console.log(JSON.stringify({ route, violations }));
    }
    await fs.writeFile(`${output}/audit.json`, JSON.stringify(audit, null, 2));
  } else {
    const source = await fs.readFile("src/data/projects.ts", "utf8");
    const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
    const { projects, detailedProjects, projectCategories } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
    const routes = ["/", "/about", "/experience", "/projects", "/contact", "/resume", ...detailedProjects.map((project) => `/projects/${project.slug}`)];
    const widths = [360, 390, 430, 768, 1024, 1280, 1440];
    const checks = [];
    const accessibility = [];
    for (const width of widths) {
      for (const route of routes) {
        await load(route, width);
        const state = await page.evaluate(() => ({
          viewport: innerWidth, width: document.documentElement.scrollWidth,
          h1: document.querySelectorAll("h1").length,
          headingLevels: [...document.querySelectorAll("main h1,main h2,main h3,main h4")].map((node) => Number(node.tagName.slice(1))),
          brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.getAttribute("src")),
          smallTargets: [...document.querySelectorAll("main a,main button")].filter((node) => node.getBoundingClientRect().width > 0 && node.getBoundingClientRect().height < 24).length,
        }));
        assert(state.width <= width, `${route} at ${width}: overflow ${state.width}`);
        assert.equal(state.h1, 1, `${route}: H1`);
        assert(state.headingLevels.every((level, index, levels) => index === 0 ? level === 1 : level <= levels[index - 1] + 1), `${route}: skipped heading level`);
        assert.equal(state.brokenImages.length, 0, `${theme} ${route}: broken images ${state.brokenImages.join(", ")}`);
        assert.equal(state.smallTargets, 0, `${route}: small interaction targets`);
        if ([390, 768, 1440].includes(width)) await page.screenshot({ path: `${output}/${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-${width}.png`, fullPage: true });
        if ([390, 1440].includes(width)) {
          const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
          accessibility.push({ route, width, violations: axe.violations });
          await fs.writeFile(`${output}/accessibility.json`, JSON.stringify(accessibility, null, 2));
          assert.equal(axe.violations.length, 0, `${route} ${width}px axe: ${axe.violations.map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.target.join(" ")).join(", ")}`).join("; ")}`);
        }
        checks.push({ route, width, ...state });
      }
      console.log(`PASS: ${theme}, ${routes.length} routes at ${width}px`);
    }
    await load("/", 390);
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Navigation menu" });
    assert(await dialog.isVisible());
    assert.equal(await page.getByRole("button", { name: "Open menu", exact: true }).getAttribute("aria-expanded"), "true");
    assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");
    await page.screenshot({ path: `${output}/mobile-menu-390.png` });
    const menuAxe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    assert.equal(menuAxe.violations.length, 0, `Mobile menu accessibility: ${menuAxe.violations.map((item) => item.id).join(", ")}`);
    const opposite = theme === "dark" ? "light" : "dark";
    await dialog.getByRole("button", { name: `Switch to ${opposite} theme` }).focus();
    await page.keyboard.press("Space");
    await assertTheme(page, opposite, opposite);
    assert(await dialog.isVisible(), "Theme toggle keeps menu open");
    await dialog.getByRole("button", { name: `Switch to ${theme} theme` }).click();
    await assertTheme(page, theme, theme);
    const first = dialog.getByRole("button", { name: "Close menu" });
    await first.focus();
    await page.keyboard.press("Shift+Tab");
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("href")), "mailto:afsify2000@gmail.com");
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("aria-label")), "Close menu");
    for (let i = 0; i < 18; i++) { await page.keyboard.press("Tab"); assert(await page.evaluate(() => !!document.activeElement?.closest("dialog")), "Focus escaped menu"); }
    await page.keyboard.press("Escape");
    assert.equal(await dialog.count(), 0);
    assert.equal(await page.evaluate(() => document.body.style.overflow), "");
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("aria-label")), "Open menu");
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await dialog.getByRole("link", { name: "03 Experience" }).click();
    await page.waitForURL(`${base}/experience`);
    assert.equal(await page.getByRole("dialog").count(), 0);
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await page.getByRole("button", { name: "Close menu", exact: true }).click();
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await page.setViewportSize({ width: 1024, height: 1000 });
    await page.getByRole("dialog").waitFor({ state: "detached" });
    assert.equal(await page.evaluate(() => document.body.style.overflow), "");
    await load("/projects", 390);
    for (const filter of [...projectCategories.slice(1), "All work"]) {
      const count = projects.filter((project) => filter === "All work" || project.category === filter).length;
      await page.getByRole("button", { name: filter, exact: true }).click();
      assert.equal(await page.locator("#project-results article").count(), count, filter);
      assert.equal(await page.getByRole("button", { name: filter, exact: true }).getAttribute("aria-pressed"), "true");
    }
    await page.goto(`${base}/resume`);
    for (const format of ["pdf", "docx"]) {
      const downloadEvent = page.waitForEvent("download");
      await page.getByRole("link", { name: `Download CV (${format.toUpperCase()})`, exact: true }).click();
      const download = await downloadEvent;
      assert.equal(download.suggestedFilename(), `muhammed-afsal-resume.${format}`);
      assert.equal(await download.failure(), null);
      const downloadBytes = await fs.readFile(await download.path());
      assert(downloadBytes.equals(await fs.readFile(`public/documents/muhammed-afsal-resume.${format}`)), "Downloaded approved bytes");
    }
    for (const [slug, url] of [["ekavio", "https://ekavio.afsify.com/"], ["afssian", "https://afssian.onrender.com/"]]) {
      assert(await page.locator(`.resume-project a[href="${url}"]`).count() === 1);
      await load(`/projects/${slug}`, 390);
      assert(await page.locator(`.project-hero a[href="${url}"]`).count() === 1);
      await load("/resume", 390);
    }
    assert((await page.locator(".resume-header").innerText()).includes("+91 6235448008"));
    assert((await page.locator(".resume-paper").innerText()).includes("sole normal runtime data authority"));
    await page.emulateMedia({ media: "print" });
    assert.equal(await page.locator(".site-header").isVisible(), false);
    assert.equal(await page.locator(".resume-toolbar").isVisible(), false);
    assert(await page.locator(".resume-header").isVisible());
    await page.pdf({ path: `${output}/resume-print.pdf`, format: "A4", printBackground: true });
    await page.emulateMedia({ media: "screen" });
    await load("/contact", 390);
    for (const href of ["mailto:afsify2000@gmail.com", "tel:+916235448008", "https://wa.me/916235448008", "https://www.linkedin.com/in/afsify/", "https://github.com/afsify"]) assert(await page.locator(`main a[href="${href}"]`).count() > 0, `Contact link ${href}`);
    assert(await page.getByRole("link", { name: "Discuss a role", exact: true }).count() === 1);
    assert(await page.getByRole("link", { name: "Discuss a project", exact: true }).count() === 1);
    await page.goto(base);
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement?.textContent), "Skip to content");
    await page.keyboard.press("Enter");
    assert.equal(await page.evaluate(() => document.activeElement?.id), "main-content");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    assert.equal(await page.locator(".hero-copy").evaluate((node) => getComputedStyle(node).animationName), "none");
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), "auto");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await load("/missing-page", 390);
    assert(await page.getByRole("heading", { level: 1, name: "This page is off the map." }).isVisible());
    assert.equal(exceptions.length, 0, exceptions.join("\n"));
    const unexpectedConsole = consoleErrors.filter((error) => !(error.url.endsWith("/missing-page") && /404/.test(error.text)));
    assert.equal(unexpectedConsole.length, 0, JSON.stringify(unexpectedConsole));
    await fs.writeFile(`${output}/results.json`, JSON.stringify({ checkedAt: new Date().toISOString(), theme, browser: browser.version(), checks, accessibilityChecks: accessibility.length, menuAccessibilityChecks: 1, interactions: ["menu open", "mobile theme toggle", "close", "Escape", "focus trap forward/reverse", "focus restoration", "scroll lock", "menu navigation", "desktop resize", "all project filters", "resume download", "skip link", "reduced motion", "not-found"], exceptions, consoleErrors: unexpectedConsole }, null, 2));
    summaries.push(JSON.parse(await fs.readFile(`${output}/results.json`, "utf8")));
    console.log(`PASS: ${theme}: ${checks.length} responsive route checks; ${accessibility.length} axe accessibility scans; menu, filters, download, skip link, reduced motion and not-found; zero runtime/console errors.`);
  }
} finally { await context.close(); }
}
if (!process.argv.includes("--preview") && !process.argv.includes("--audit")) {
  const behavior = await verifyThemes(browser, base, rootOutput);
  const summary = {
    checkedAt: new Date().toISOString(), browser: browser.version(),
    responsiveChecks: summaries.reduce((count, result) => count + result.checks.length, 0),
    accessibilityChecks: summaries.reduce((count, result) => count + result.accessibilityChecks + result.menuAccessibilityChecks, 0),
    themes: summaries, themeBehavior: behavior,
  };
  await fs.writeFile(`${rootOutput}/${summaries.length === 2 ? "results" : "theme-results"}.json`, JSON.stringify(summary, null, 2));
  console.log(`PASS: ${summary.responsiveChecks} responsive checks; ${summary.accessibilityChecks} axe scans in both themes; ${behavior.checks.length} theme behavior checks.`);
}
} finally { await browser.close(); }
