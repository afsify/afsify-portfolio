import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.env.QA_BASE_URL || "http://localhost:3100";
const output = process.env.QA_OUTPUT_DIR || "artifacts/polish/contact";
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.QA_CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const checks = [], exceptions = [];
const types = ["Full-time role", "Freelance project", "Collaboration", "General enquiry"];
const subjects = ["Full-Time Role Enquiry", "Freelance Project Enquiry", "Collaboration Enquiry", "General Enquiry"];
const message = "Hello — നമസ്കാരം 👋\nPlease discuss ₹20,000 & a website + improvements #? = 50%.";
try {
  for (const theme of ["dark", "light"]) for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme });
    // Capture only the OS handoff and clipboard boundary; run the real form code.
    // This prevents opening email applications or sending any test enquiry.
    await context.addInitScript(theme => {
      localStorage.setItem("afsify-theme", theme);
      window.handoffs = []; window.copied = []; window.clipboardMode = "success";
      const click = HTMLAnchorElement.prototype.click;
      HTMLAnchorElement.prototype.click = function () {
        if (this.protocol === "mailto:") { window.handoffs.push(this.href); return; }
        return click.call(this);
      };
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async text => {
        if (window.clipboardMode === "denied") throw new DOMException("Denied", "NotAllowedError");
        window.copied.push(text);
      } } });
    }, theme);
    const page = await context.newPage();
    page.on("pageerror", error => exceptions.push(error.message));
    const unwanted = [];
    page.on("request", request => { if (request.method() !== "GET" || !request.url().startsWith(base)) unwanted.push({ url: request.url(), method: request.method() }); });
    await page.goto(`${base}/contact`, { waitUntil: "networkidle" });
    const form = page.locator("#enquiry form"), status = form.getByRole("status");
    const email = page.getByRole("textbox", { name: "Email address", exact: true });
    const name = page.getByRole("textbox", { name: "Name", exact: true });
    const body = page.getByRole("textbox", { name: "Message", exact: true });
    const open = page.getByRole("button", { name: "Open Email App", exact: true });
    const copy = page.getByRole("button", { name: "Copy Enquiry", exact: true });
    assert(await open.isEnabled()); assert.equal(await page.getByText("Online submission is not available yet.", { exact: false }).count(), 0);
    assert.equal(await page.evaluate(() => window.handoffs.length), 0, "No automatic handoff");
    await open.click(); assert(await name.evaluate(e => e === document.activeElement));
    assert.equal(await form.locator('[aria-invalid="true"]').count(), 3);
    await name.fill("Alex Thomas"); await email.fill("invalid"); await body.fill(message); await open.click();
    assert(await email.evaluate(e => e === document.activeElement)); assert.equal(await email.getAttribute("aria-invalid"), "true");
    assert.equal(await page.evaluate(() => window.handoffs.length), 0);
    await email.fill("alex@example.com");
    assert.equal(await email.getAttribute("type"), "email"); assert.equal(await email.getAttribute("autocomplete"), "email");
    assert.equal(await page.getByLabel("Website / project URL (optional)").getAttribute("type"), "url");
    await body.focus(); await page.keyboard.press("Control+k"); assert.equal(await page.locator("dialog[open]").count(), 0, "Typing shortcut stays in field");
    assert(await body.evaluate(e => e === document.activeElement));
    for (const [i, type] of types.entries()) {
      await page.getByLabel("Enquiry type", { exact: true }).selectOption(type);
      assert.equal(await page.getByLabel("Project budget range (optional)").isVisible(), type === "Freelance project");
      await open.focus(); await page.keyboard.press("Enter");
      const href = await page.evaluate(() => window.handoffs.at(-1)), parsed = new URL(href);
      assert.equal(parsed.pathname, "afsify2000@gmail.com"); assert.equal(parsed.searchParams.get("subject"), `AFSIFY — ${subjects[i]}`);
      assert(parsed.searchParams.get("body").includes(message.replaceAll("\n", "\r\n")));
      assert(!/Company:|Budget:|Timeline:|undefined/.test(parsed.searchParams.get("body")));
      assert.equal(await body.inputValue(), message, "Handoff retains entered message");
      assert((await status.innerText()).includes("If nothing opens")); assert(!/success|sent successfully|message sent/i.test(await status.innerText()));
    }
    await page.getByLabel("Enquiry type", { exact: true }).selectOption("Freelance project");
    await page.getByLabel("Company / organization (optional)").fill("Example Business");
    await page.getByLabel("Website / project URL (optional)").fill("javascript:alert(1)");
    await open.click(); assert.equal(await page.getByLabel("Website / project URL (optional)").getAttribute("aria-invalid"), "true");
    await page.getByLabel("Website / project URL (optional)").fill("https://example.com/?a=1&b=2");
    await page.getByLabel("Project budget range (optional)").fill("₹20,000–₹40,000");
    await page.getByLabel("Preferred timeline (optional)").fill("Within 4 weeks");
    await copy.click(); await page.waitForFunction(() => window.copied.length === 1);
    let copied = await page.evaluate(() => window.copied.at(-1));
    for (const text of ["To: afsify2000@gmail.com", "Company: Example Business", "Budget: ₹20,000–₹40,000", "Timeline: Within 4 weeks", "Website / Project URL: https://example.com/?a=1&b=2"]) assert(copied.includes(text));
    assert((await status.innerText()).startsWith("Enquiry copied."));
    // Hidden optional values are retained in memory, excluded from other enquiry types.
    await page.getByLabel("Enquiry type", { exact: true }).selectOption("General enquiry"); await copy.click();
    assert(!(await page.evaluate(() => window.copied.at(-1))).includes("Budget:"));
    await page.getByLabel("Enquiry type", { exact: true }).selectOption("Freelance project");
    assert.equal(await page.getByLabel("Project budget range (optional)").inputValue(), "₹20,000–₹40,000");
    const long = "A complete enquiry with Unicode ₹ and 👋.\n".repeat(180);
    await body.fill(long); const before = await page.evaluate(() => window.handoffs.length); await open.click();
    assert.equal(await page.evaluate(() => window.handoffs.length), before, "No oversized URI opened");
    const manual = page.getByRole("textbox", { name: "Complete enquiry — select and copy" });
    assert((await manual.inputValue()).includes(long.trim())); assert(await manual.evaluate(e => e === document.activeElement));
    assert((await status.innerText()).includes("too long"));
    assert.equal(await page.getByRole("link", { name: "Open a blank email" }).getAttribute("href"), "mailto:afsify2000@gmail.com");
    await copy.click(); copied = await page.evaluate(() => window.copied.at(-1)); assert(copied.includes(long.trim().replaceAll("\n", "\r\n")));
    await body.fill(message); await page.evaluate(() => { window.clipboardMode = "denied"; }); await copy.click();
    await manual.waitFor(); assert((await status.innerText()).includes("Automatic copying is unavailable"));
    assert((await manual.inputValue()).includes(message));
    assert(await manual.evaluate(e => e.selectionStart === 0 && e.selectionEnd === e.value.length));
    await page.evaluate(() => { Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined }); });
    await body.fill(message + " More detail."); await copy.click(); assert((await manual.inputValue()).includes("More detail."));
    assert(!/successfully sent|message sent|enquiry sent/i.test(await status.innerText()));
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    assert.equal(axe.violations.length, 0, JSON.stringify(axe.violations));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(await page.evaluate(() => Object.keys(localStorage)), ["afsify-theme"]);
    assert.equal(await page.evaluate(() => sessionStorage.length), 0);
    assert.deepEqual(unwanted, [], "No enquiry network submission or third-party scripts");
    await page.screenshot({ path: `${output}/${theme}-${width}-manual-fallback.png`, fullPage: true });
    checks.push({ theme, width, enquiryTypes: types, validation: true, unicode: true, longText: true, copySuccess: true, copyDenied: true, copyUnavailable: true, noFalseDelivery: true, noStorageOrNetwork: true, axeViolations: 0 });
    await context.close();
  }
  const responsive = [];
  for (const theme of ["dark", "light"]) {
    const context = await browser.newContext({ colorScheme: theme });
    const page = await context.newPage();
    page.on("pageerror", error => exceptions.push(error.message));
    for (const width of [320, 360, 375, 390, 414, 430, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base + "/contact", { waitUntil: "networkidle" });
      assert(await page.getByRole("button", { name: "Open Email App" }).isEnabled());
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert(await page.locator('#enquiry-email').evaluate(e => parseFloat(getComputedStyle(e).fontSize) >= 16), "Avoid mobile input zoom");
      const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      assert.equal(axe.violations.length, 0, JSON.stringify(axe.violations));
      if ([390, 1440].includes(width)) await page.screenshot({ path: output + "/" + theme + "-" + width + "-form.png", fullPage: true });
      responsive.push({ theme, width, axeViolations: 0 });
    }
    await context.close();
    const noJs = await browser.newContext({ javaScriptEnabled: false, colorScheme: theme });
    const plain = await noJs.newPage();
    await plain.goto(base + "/contact");
    assert(await plain.getByRole("button", { name: "Open Email App" }).isDisabled());
    assert(await plain.getByLabel("Name", { exact: true }).isDisabled());
    // Playwright's text engine excludes noscript descendants, even with JS off.
    const noScriptNotice = plain.locator("noscript .form-notice");
    assert(await noScriptNotice.isVisible());
    assert((await noScriptNotice.innerText()).includes("Enable JavaScript to compose"));
    assert.equal(await plain.getByRole("link", { name: "Open a blank email" }).getAttribute("href"), "mailto:afsify2000@gmail.com");
    await noJs.close();
  }
  assert.deepEqual(exceptions, []);
  await fs.writeFile(`${output}/results.json`, JSON.stringify({ checks, responsive, noJavaScriptChecks: 2, exceptions, nativeMailClient: "Handoff captured; no email opened or sent" }, null, 2));
  console.log(`PASS: ${checks.length} desktop/mobile theme flows, 16 enquiry-type handoffs, clipboard fallbacks, validation, privacy 18 axe scans, 14 responsive checks and 2 no-JavaScript safeguards.`);
} finally { await browser.close(); }
