import assert from "node:assert/strict";
import fs from "node:fs/promises";

const colors = { dark: "rgb(17, 19, 21)", light: "rgb(244, 244, 241)" };
export async function assertTheme(page, theme, preference) {
  // Cross-tab checks observe an inactive tab; do not depend on its animation frames.
  await page.waitForFunction((expected) => document.documentElement.dataset.theme === expected, theme, { polling: 100 });
  // Development navigation streams React-managed metadata after the URL changes.
  await page.waitForFunction(() => document.querySelectorAll('meta[name="theme-color"]').length === 3, null, { polling: 100 });
  const state = await page.evaluate(() => ({
    preference: document.documentElement.dataset.themePreference,
    scheme: getComputedStyle(document.documentElement).colorScheme,
    background: getComputedStyle(document.body).backgroundColor,
    meta: [...document.querySelectorAll('meta[name="theme-color"]')].map((node) => ({ id: node.id, color: node.content.toLowerCase(), media: node.getAttribute("media") })),
  }));
  assert.equal(state.scheme, theme);
  assert.equal(state.background, colors[theme], "Visible root background matches selected theme");
  assert.equal(state.preference, preference);
  assert.equal(state.meta.length, 3, "One explicit override and two system fallbacks");
  assert.equal(state.meta[0].id, "afsify-theme-color");
  assert.equal(state.meta[0].color, colors[theme]);
  assert.equal(state.meta[0].media, null);
  assert(state.meta.slice(1).every((item) => item.media?.includes("prefers-color-scheme")), JSON.stringify(state));
  const scope = await page.locator("dialog").count() ? page.locator("dialog") : page.locator(".nav-actions");
  const button = scope.getByRole("button", { name: `Switch to ${theme === "dark" ? "light" : "dark"} theme`, exact: true });
  assert(await button.isVisible(), `Correct accessible theme label: ${theme}`);
  const box = await button.boundingBox();
  assert(box.width >= 44 && box.height >= 44, "44px theme target");
}

export async function verifyThemes(browser, base, output) {
  const checks = [], exceptions = [], consoleErrors = [];
  function watch(page) {
    page.on("pageerror", (error) => exceptions.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  }
  const context = await browser.newContext({ colorScheme: "dark", viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage(); watch(page);
  await page.goto(base, { waitUntil: "networkidle" });
  await assertTheme(page, "dark", "system");
  assert.equal(await page.evaluate(() => localStorage.getItem("afsify-theme")), null);
  await page.emulateMedia({ colorScheme: "light" });
  await assertTheme(page, "light", "system");
  await page.emulateMedia({ colorScheme: "dark" });
  await assertTheme(page, "dark", "system");
  checks.push("Unsaved preference follows initial OS and live OS changes");

  const toggle = page.locator(".nav-actions .theme-toggle");
  const clickStates = [];
  for (const expected of ["light", "dark"]) {
    await toggle.click();
    await assertTheme(page, expected, expected);
    const state = await page.evaluate(() => ({ theme: document.documentElement.dataset.theme,
      saved: localStorage.getItem("afsify-theme"), background: getComputedStyle(document.body).backgroundColor }));
    assert.equal(state.saved, expected);
    clickStates.push(state);
  }
  await fs.writeFile(`${output}/navbar-clicks.json`, JSON.stringify(clickStates, null, 2));
  checks.push("Real navbar clicks change then restore root theme, visible background and localStorage after hydration");
  await toggle.focus();
  await page.keyboard.press("Enter");
  await assertTheme(page, "light", "light");
  assert.equal(await page.evaluate(() => localStorage.getItem("afsify-theme")), "light");
  const focus = await toggle.evaluate((node) => ({ visible: node.matches(":focus-visible"), outline: getComputedStyle(node).outlineWidth }));
  assert(focus.visible && focus.outline === "3px", "Keyboard focus ring");
  await page.screenshot({ path: `${output}/keyboard-focus-light.png` });
  await page.reload({ waitUntil: "networkidle" });
  await assertTheme(page, "light", "light");
  assert.equal(await page.evaluate(() => localStorage.getItem("afsify-theme")), "light");
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About" }).click();
  await page.waitForURL(`${base}/about`);
  await page.waitForLoadState("networkidle");
  await assertTheme(page, "light", "light");
  assert.equal(await page.evaluate(() => localStorage.getItem("afsify-theme")), "light");
  await page.emulateMedia({ colorScheme: "light" });
  await page.emulateMedia({ colorScheme: "dark" });
  await assertTheme(page, "light", "light");
  await toggle.focus();
  await page.keyboard.press("Space");
  await assertTheme(page, "dark", "dark");
  await page.reload({ waitUntil: "networkidle" });
  await assertTheme(page, "dark", "dark");
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Experience" }).click();
  await page.waitForURL(`${base}/experience`);
  await page.waitForLoadState("networkidle");
  await assertTheme(page, "dark", "dark");
  assert.equal(await page.evaluate(() => localStorage.getItem("afsify-theme")), "dark");
  checks.push("Enter and Space toggle both ways; correct accessible label, 44px target and 3px visible focus ring", "Explicit localStorage choice persists across reload and client navigation, overriding OS changes", "Theme-color metadata follows actual selected theme");

  const sibling = await context.newPage(); watch(sibling);
  await sibling.goto(base, { waitUntil: "networkidle" });
  await sibling.evaluate(() => localStorage.setItem("afsify-theme", "light"));
  await assertTheme(page, "light", "light");
  await sibling.evaluate(() => localStorage.removeItem("afsify-theme"));
  await assertTheme(page, "dark", "system");
  checks.push("Cross-tab storage synchronization and reset to system on preference removal");
  await context.close();

  // Hold hydration bundles. The document must already have the saved theme,
  // correct CSS and accessible label before React can execute.
  for (const saved of ["dark", "light"]) {
    const early = await browser.newContext({ colorScheme: saved === "dark" ? "light" : "dark" });
    await early.addInitScript((value) => localStorage.setItem("afsify-theme", value), saved);
    const first = await early.newPage(); watch(first);
    let release;
    const hydration = new Promise((resolve) => { release = resolve; });
    await first.route("**/_next/static/**/*.js", async (route) => { await hydration; await route.continue(); });
    await first.goto(base, { waitUntil: "commit" });
    await first.locator("h1").waitFor({ state: "visible" });
    await assertTheme(first, saved, saved);
    await first.screenshot({ path: `${output}/before-hydration-${saved}.png` });
    release();
    await first.waitForLoadState("networkidle");
    await assertTheme(first, saved, saved);
    checks.push(`Saved ${saved} overrides opposite OS before hydration and remains correct after hydration`);
    await early.close();
  }
  for (const mode of ["invalid", "unavailable"]) {
    const fallback = await browser.newContext({ colorScheme: "light" });
    await fallback.addInitScript((mode) => {
      if (mode === "invalid") localStorage.setItem("afsify-theme", "invalid-value");
      else {
        Storage.prototype.getItem = () => { throw new DOMException("Storage disabled", "SecurityError"); };
        Storage.prototype.setItem = () => { throw new DOMException("Storage disabled", "SecurityError"); };
      }
    }, mode);
    const tab = await fallback.newPage(); watch(tab);
    await tab.goto(base, { waitUntil: "networkidle" });
    await assertTheme(tab, "light", "system");
    await tab.getByRole("button", { name: "Switch to dark theme" }).click();
    await assertTheme(tab, "dark", "dark");
    checks.push(`${mode} storage falls back to OS; toggle remains usable`);
    await fallback.close();
  }
  assert.equal(exceptions.length, 0, JSON.stringify(exceptions));
  assert.equal(consoleErrors.length, 0, JSON.stringify(consoleErrors));
  const result = { checkedAt: new Date().toISOString(), checks, exceptions, consoleErrors };
  await fs.writeFile(`${output}/behavior.json`, JSON.stringify(result, null, 2));
  return result;
}
