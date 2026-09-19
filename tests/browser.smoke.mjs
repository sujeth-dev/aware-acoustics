/**
 * browser.smoke.mjs — real-browser checks against the built site.
 *
 * Serves dist/ with `vite preview`, then for every route at desktop and phone
 * width asserts: no console errors, no failed requests, no horizontal overflow,
 * exactly one <h1>, and the non-production noindex meta. It also exercises the
 * /work/ sector filter (filter, URL state, back button, deep link) and confirms
 * the JavaScript-off page keeps the full list with no dead filter control.
 *
 * Run `npm run build` first, or use `npm run test:browser`.
 * Optional: `--shots <dir>` saves a full-page screenshot per route and width.
 */

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const PORT = 4173;
const BASE = `http://localhost:${PORT}`;
const ROUTES = ["/", "/work/", "/services/", "/about/", "/contact/", "/privacy/", "/404/"];
const VIEWPORTS = [
  { tag: "desktop", width: 1440, height: 900 },
  { tag: "phone", width: 375, height: 812 }
];

const shotsIndex = process.argv.indexOf("--shots");
const shotsDir = shotsIndex > -1 ? process.argv[shotsIndex + 1] : null;
if (shotsDir) fs.mkdirSync(shotsDir, { recursive: true });

const failures = [];
const fail = (message) => failures.push(message);

const server = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "preview", "--port", String(PORT), "--strictPort"], {
  stdio: "ignore"
});

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(BASE);
      if (response.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("vite preview did not start");
}

let browser;
try {
  await waitForServer();
  browser = await chromium.launch();

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
    const page = await context.newPage();
    let where = "";

    page.on("console", (message) => {
      if (message.type() === "error") fail(`${where}: console error: ${message.text()}`);
    });
    page.on("pageerror", (error) => fail(`${where}: page error: ${error.message}`));
    page.on("requestfailed", (request) => fail(`${where}: request failed: ${request.url()}`));

    for (const route of ROUTES) {
      where = `${viewport.tag} ${route}`;
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 1) fail(`${where}: horizontal overflow of ${overflow}px`);

      const h1 = await page.locator("h1").count();
      if (h1 !== 1) fail(`${where}: expected one <h1>, found ${h1}`);

      const noindex = await page.locator('meta[name="robots"][content*="noindex"]').count();
      if (noindex !== 1) fail(`${where}: missing noindex meta on a non-production build`);

      if (shotsDir) {
        const name = `${viewport.tag}${route === "/" ? "-home" : route.replace(/\//g, "-").replace(/-$/, "")}.png`;
        await page.screenshot({ path: path.join(shotsDir, name), fullPage: true });
      }
    }
    await context.close();
  }

  // /work/ sector filter, with JavaScript
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    const visibleRows = () => page.evaluate(() => [...document.querySelectorAll(".record-row")].filter((row) => !row.hidden).length);

    await page.goto(`${BASE}/work/`, { waitUntil: "networkidle" });
    const total = await visibleRows();
    if (total < 12) fail(`work: expected the full list, saw ${total} rows`);
    if (!(await page.locator("[data-work-filter]").isVisible())) fail("work: filter strip is not visible with JavaScript on");

    const expected = await page.locator('.record-row[data-sector="airport-and-transport"]').count();
    await page.click('[data-sector-filter="airport-and-transport"]');
    if ((await visibleRows()) !== expected) fail(`work: airport filter should show ${expected} rows`);
    if (!page.url().includes("sector=airport-and-transport")) fail("work: filter did not record state in the URL");

    await page.goBack();
    if ((await visibleRows()) !== total) fail("work: back button did not restore the full list");

    await page.goto(`${BASE}/work/?sector=banking`, { waitUntil: "networkidle" });
    const banking = await page.locator('.record-row[data-sector="banking"]').count();
    if ((await visibleRows()) !== banking) fail("work: ?sector=banking deep link did not filter");
    await context.close();
  }

  // /work/ without JavaScript
  {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/work/`, { waitUntil: "networkidle" });
    if ((await page.locator(".record-row").count()) < 12) fail("work (no JS): full list is missing");
    if (await page.locator("[data-work-filter]").isVisible()) fail("work (no JS): dead filter control is visible");
    await context.close();
  }

  // Every /work/ row photograph decodes. Rows lazy-load, so force them eager first —
  // otherwise a broken path below the fold never requests and never fails.
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/work/`, { waitUntil: "load" });
    const broken = await page.evaluate(async () => {
      const images = [...document.querySelectorAll(".record-row img")];
      images.forEach((image) => { image.loading = "eager"; });
      await Promise.all(images.map((image) => image.decode().catch(() => null)));
      return { total: images.length, bad: images.filter((image) => !image.naturalWidth).map((image) => image.getAttribute("src")) };
    });
    if (broken.total === 0) fail("work: no row photographs rendered");
    for (const src of broken.bad) fail(`work: photograph did not load: ${src}`);

    // A row that shows a related site must say so on the row itself.
    const projects = JSON.parse(fs.readFileSync("data/projects.json", "utf8"));
    const expected = projects.filter((project) => project.published && (project.images ?? []).some((image) => image.representative)).length;
    const labelled = await page.locator(".record-row__basis").count();
    if (labelled !== expected) fail(`work: ${expected} rows show a representative image but ${labelled} carry the label`);
    await context.close();
  }
} catch (error) {
  fail(`harness: ${error.message}`);
} finally {
  if (browser) await browser.close();
  server.kill();
}

if (failures.length > 0) {
  console.error(`browser smoke: ${failures.length} failure(s)\n - ${failures.join("\n - ")}`);
  process.exitCode = 1;
} else {
  console.log(`browser smoke: pass (${ROUTES.length} routes × ${VIEWPORTS.length} widths, filter with and without JS)`);
}
