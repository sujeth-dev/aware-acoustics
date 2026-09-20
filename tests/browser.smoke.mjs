/**
 * browser.smoke.mjs — real-browser checks against the built site.
 *
 * Serves dist/ with `vite preview`, then:
 *   1. for every route (including each showcase page) at desktop and phone
 *      width asserts: no console errors, no failed requests, no horizontal
 *      overflow, exactly one <h1>, and the non-production noindex meta;
 *   2. exercises /work/: the six featured rows, the "Explore all work"
 *      explorer (sector filter, URL state, back button, deep link, search,
 *      show-more), the project overlay (open, page through, Esc, deep link) and
 *      that every photograph on the page decodes;
 *   3. confirms the JavaScript-off page keeps the full collection with no dead
 *      controls, and that no image disclaimer copy is printed (DEC-020);
 *   4. walks the four-step contact enquiry and checks the composed email;
 *   5. confirms scroll-reveal (and the divider draw-in) never leaves content hidden;
 *   6. checks the DEC-021 layers: dividers static under reduced motion and without
 *      JavaScript, full-width and gap-free; no SVG-noise grain; the generic build-up;
 *      mineral plates in place of waveforms.
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

const projects = JSON.parse(fs.readFileSync("data/projects.json", "utf8")).filter((project) => project.published);
const showcase = projects.filter((project) => Number.isInteger(project.showcaseRank)).sort((a, b) => a.showcaseRank - b.showcaseRank);
const airportCount = projects.filter((project) => project.sector === "airport-and-transport").length;
const bankingCount = projects.filter((project) => project.sector === "banking").length;
const overlayCount = projects.length - showcase.length;

const ROUTES = [
  "/", "/work/", "/services/", "/about/", "/contact/", "/privacy/", "/404/",
  ...showcase.map((project) => `/work/${project.slug}/`)
];
const VIEWPORTS = [
  { tag: "desktop", width: 1440, height: 900 },
  { tag: "phone", width: 375, height: 812 }
];
const BATCH = 12;

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

const visibleCards = (page) => page.evaluate(() => [...document.querySelectorAll(".work-card")].filter((card) => !card.hidden).length);

let browser;
try {
  await waitForServer();
  browser = await chromium.launch();

  // 1 ─ Every route at both widths ─────────────────────────────────────────
  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: "reduce"
    });
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

  // 2 ─ /work/ with JavaScript ─────────────────────────────────────────────
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const page = await context.newPage();

    await page.goto(`${BASE}/work/`, { waitUntil: "networkidle" });

    // Featured
    const featured = await page.locator(".feature").count();
    if (featured !== showcase.length) fail(`work: expected ${showcase.length} featured rows, found ${featured}`);
    for (const project of showcase) {
      if ((await page.locator(`.feature a[href="/work/${project.slug}/"]`).count()) === 0) fail(`work: no featured link to ${project.slug}`);
    }

    // Explorer starts at one batch of the full collection
    const total = await page.locator(".work-card").count();
    if (total !== projects.length) fail(`work: expected ${projects.length} cards, found ${total}`);
    if ((await visibleCards(page)) !== Math.min(BATCH, projects.length)) fail(`work: expected ${BATCH} cards shown initially`);
    if (!(await page.locator("[data-work-filter]").isVisible())) fail("work: filter strip is not visible with JavaScript on");

    await page.click("[data-work-more] button");
    if ((await visibleCards(page)) !== Math.min(BATCH * 2, projects.length)) fail("work: show more did not add a batch");

    // Sector filter, URL state, back button
    await page.click('[data-sector-filter="airport-and-transport"]');
    if ((await visibleCards(page)) !== Math.min(airportCount, BATCH)) fail(`work: airport filter should show ${airportCount} cards`);
    if (!page.url().includes("sector=airport-and-transport")) fail("work: filter did not record state in the URL");
    await page.goBack();
    if ((await visibleCards(page)) !== Math.min(BATCH, projects.length)) fail("work: back button did not restore the list");

    // Search
    await page.fill("[data-work-search] input", "lucknow");
    if ((await visibleCards(page)) !== 1) fail("work: searching 'lucknow' should leave one card");
    await page.fill("[data-work-search] input", "zzzz-no-such-project");
    if ((await visibleCards(page)) !== 0 || (await page.locator("[data-work-empty]").isHidden())) fail("work: an empty search should show the empty state");

    // Deep-linked sector
    await page.goto(`${BASE}/work/?sector=banking`, { waitUntil: "networkidle" });
    if ((await visibleCards(page)) !== Math.min(bankingCount, BATCH)) fail("work: ?sector=banking deep link did not filter");

    // Overlay: open, page through, Esc, focus returns, deep link
    await page.goto(`${BASE}/work/`, { waitUntil: "networkidle" });
    const link = page.locator("[data-project-link]").first();
    const slug = await link.getAttribute("data-project-link");
    await link.scrollIntoViewIfNeeded();
    await link.click();
    if (!(await page.evaluate(() => document.querySelector("[data-project-dialog]").open))) fail("overlay: did not open");
    if (!page.url().includes(`project=${slug}`)) fail("overlay: URL did not record the project");
    if ((await page.locator("#pv-title").count()) !== 1) fail("overlay: project title missing");
    const before = await page.locator("#pv-title").textContent();
    await page.keyboard.press("ArrowRight");
    if ((await page.locator("#pv-title").textContent()) === before) fail("overlay: next did not change the project");
    await page.keyboard.press("Escape");
    if (await page.evaluate(() => document.querySelector("[data-project-dialog]").open)) fail("overlay: Esc did not close it");
    // The dialog fires its close event asynchronously; wait for the URL to settle.
    await page.waitForFunction(() => !window.location.search.includes("project="), null, { timeout: 2000 })
      .catch(() => fail("overlay: URL still carries the project after closing"));
    if (!(await page.evaluate(() => document.activeElement?.matches("[data-project-link]")))) fail("overlay: focus did not return to the card");

    await page.goto(`${BASE}/work/?project=${slug}`, { waitUntil: "networkidle" });
    if (!(await page.evaluate(() => document.querySelector("[data-project-dialog]").open))) fail("overlay: deep link did not open the project");
    await context.close();
  }

  // 3 ─ /work/ without JavaScript, and no disclaimer copy ──────────────────
  {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/work/`, { waitUntil: "networkidle" });
    if ((await page.locator(".work-card").count()) !== projects.length) fail("work (no JS): full collection is missing");
    if ((await visibleCards(page)) !== projects.length) fail("work (no JS): cards are hidden");
    if (await page.locator("[data-work-filter]").isVisible()) fail("work (no JS): dead filter control is visible");
    if ((await page.locator(".feature").count()) !== showcase.length) fail("work (no JS): featured rows are missing");

    const text = await page.locator("main").innerText();
    for (const phrase of ["None of these photographs", "Representative image", "not Aware Acoustics project photography"]) {
      if (text.includes(phrase)) fail(`work: disclaimer copy is still printed ("${phrase}")`);
    }

    // The contact form is a complete plain form without scripting.
    await page.goto(`${BASE}/contact/`, { waitUntil: "networkidle" });
    if ((await page.locator(".enq-step:visible").count()) !== 4) fail("contact (no JS): all four steps should show");
    if (!(await page.locator("#enquiry-form").getAttribute("action"))?.startsWith("mailto:")) fail("contact (no JS): form has no mailto action");
    await context.close();
  }

  // 4 ─ Every /work/ photograph decodes ────────────────────────────────────
  // Cards lazy-load, so force them eager first; otherwise a broken path below the
  // fold never requests and never fails.
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/work/`, { waitUntil: "load" });
    const broken = await page.evaluate(async () => {
      const images = [...document.querySelectorAll(".feature img, .work-card img, .hero__slide img")];
      images.forEach((image) => { image.loading = "eager"; });
      await Promise.all(images.map((image) => image.decode().catch(() => null)));
      return { total: images.length, bad: images.filter((image) => !image.naturalWidth).map((image) => image.getAttribute("src")) };
    });
    if (broken.total === 0) fail("work: no photographs rendered");
    for (const src of broken.bad) fail(`work: photograph did not load: ${src}`);
    await context.close();
  }

  // 5 ─ Contact enquiry flow ───────────────────────────────────────────────
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(`${BASE}/contact/`, { waitUntil: "networkidle" });

    if ((await page.locator(".enq-step:visible").count()) !== 1) fail("contact: only step 1 should show when enhanced");

    // Advancing without an answer is blocked with a message.
    await page.click("[data-next]");
    if (await page.locator("[data-error]").isHidden()) fail("contact: step 1 should require a project type");
    if ((await page.locator(".enq-step:visible").count()) !== 1) fail("contact: advanced without a project type");

    await page.check('input[name="project-type"][value="Hospitality"]', { force: true });
    await page.click("[data-next]");
    await page.check('input[name="project-stage"][value="Tender"]', { force: true });
    await page.check('input[name="services"] >> nth=0', { force: true });
    await page.click("[data-next]");
    await page.fill("#location", "Bengaluru");
    await page.fill("#message", "Ballroom, 600 seats. Concerned about reverberation.");
    await page.click("[data-next]");
    await page.fill("#name", "Test Person");
    await page.fill("#organisation", "Test Studio");
    await page.fill("#email", "test@example.com");
    await page.check("#consent", { force: true });

    const summaryText = await page.locator("[data-summary]").innerText();
    for (const expected of ["Hospitality", "Tender", "Bengaluru", "Test Person", "test@example.com"]) {
      if (!summaryText.includes(expected)) fail(`contact: live summary is missing "${expected}"`);
    }

    // Sending shows the confirmation and a well-formed mailto link.
    await page.click("[data-send]");
    await page.waitForSelector("[data-done]:not([hidden])");
    const mailto = await page.locator("[data-done-mailto]").getAttribute("href");
    if (!mailto?.startsWith("mailto:") || !mailto.includes("subject=") || !mailto.includes("Test%20Person")) fail(`contact: malformed mailto link: ${mailto}`);
    const composed = await page.locator("[data-done-text]").inputValue();
    if (!composed.includes("Test Studio") || !composed.includes("Ballroom, 600 seats")) fail("contact: composed enquiry text is incomplete");
    await context.close();
  }

  // 6 ─ Scroll reveal never strands content hidden ─────────────────────────
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
    const page = await context.newPage();
    for (const route of ["/", "/services/", "/about/"]) {
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 40));
        }
      });
      // Observer callbacks are asynchronous; give them a moment to drain.
      await page.waitForFunction(
        () => [...document.querySelectorAll("[data-reveal], [data-draw]")].every((element) => element.classList.contains("is-in")),
        null,
        { timeout: 4000 }
      ).catch(async () => {
        const stranded = await page.evaluate(() => [...document.querySelectorAll("[data-reveal], [data-draw]")].filter((element) => !element.classList.contains("is-in")).length);
        fail(`reveal ${route}: ${stranded} element(s) never revealed`);
      });
    }
    await context.close();
  }
  // 7 ─ Sound dividers and the mineral layer (DEC-021) ─────────────────────
  {
    // Reduced motion: dividers are static and complete, nothing clipped or animating.
    const still = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const page = await still.newPage();
    for (const route of ["/", "/about/", "/services/", "/work/"]) {
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
      const state = await page.evaluate(() => {
        const edges = [...document.querySelectorAll(".edge")];
        const boxes = [...document.querySelectorAll("[data-draw] .edge__box")];
        const live = [...document.querySelectorAll(".edge--live .edge__svg")];
        const problems = [];
        for (const box of boxes) if (getComputedStyle(box).clipPath !== "none") problems.push("a divider is still clipped under reduced motion");
        for (const svg of live) if (getComputedStyle(svg).animationName !== "none") problems.push("a live wave animates under reduced motion");
        for (const item of edges) {
          const rect = item.getBoundingClientRect();
          const section = item.parentElement.getBoundingClientRect();
          if (rect.left > 0.5 || rect.right < window.innerWidth - 0.5) problems.push("a divider does not span the full width");
          if (rect.bottom < section.top - 0.5) problems.push("a divider leaves a gap above its section");
        }
        if (document.querySelector(".edge--skyline, .edge--decay")) problems.push("a divider that is not the wave is on the page");
        const texts = [...document.querySelectorAll(".eyebrow")].map((element) => element.textContent.trim());
        if (texts.some((text) => /^\d/.test(text))) problems.push("a numbered eyebrow is back");
        return { count: edges.length, problems: [...new Set(problems)] };
      });
      if (state.count === 0) fail(`dividers ${route}: no section dividers rendered`);
      for (const problem of state.problems) fail(`dividers ${route}: ${problem}`);
    }

    // The mineral layer: no SVG-noise grain, a single grain file, a generic build-up.
    await page.goto(`${BASE}/services/`, { waitUntil: "networkidle" });
    const stylesheet = await page.evaluate(async () => {
      const href = document.querySelector('link[rel="stylesheet"][href*="/assets/"]').href;
      return (await fetch(href)).text();
    });
    if (/feTurbulence|fractalNoise/i.test(stylesheet)) fail("mineral: an SVG-noise grain is back in the stylesheet");
    if ((stylesheet.match(/grain\.png/g) ?? []).length === 0) fail("mineral: the pre-rendered grain is not referenced");
    const buildUp = await page.evaluate(() => {
      const figure = document.querySelector(".buildup");
      return figure ? { text: figure.innerText, layers: figure.querySelectorAll(".buildup__layer").length } : null;
    });
    if (!buildUp) fail("services: the build-up diagram is missing");
    else {
      if (buildUp.layers !== 4) fail(`services: build-up should have 4 layers, found ${buildUp.layers}`);
      if (!/illustrative build-up/i.test(buildUp.text)) fail("services: build-up is not captioned 'Illustrative build-up'");
      if (/\d/.test(buildUp.text)) fail("services: build-up carries a figure; it must name layers only");
    }

    // Projects without a photograph get a mineral plate, not a waveform.
    await page.goto(`${BASE}/work/`, { waitUntil: "networkidle" });
    const plates = await page.evaluate(() => ({
      plates: document.querySelectorAll(".work-card__plate.mineral-plate").length,
      svgPlates: document.querySelectorAll(".work-card__plate svg").length
    }));
    const withoutImage = projects.filter((project) => (project.images ?? []).length === 0).length;
    if (plates.plates !== withoutImage) fail(`work: expected ${withoutImage} mineral plates, found ${plates.plates}`);
    if (plates.svgPlates !== 0) fail("work: a waveform plate is still rendered");
    await still.close();

    // Motion allowed: every wave is an infinite loop (paused only while off screen).
    const moving = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
    const loopPage = await moving.newPage();
    await loopPage.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const loops = await loopPage.evaluate(() =>
      [...document.querySelectorAll(".edge--live .edge__svg")].map((svg) => {
        const style = getComputedStyle(svg);
        return style.animationName === "wave-drift" && style.animationIterationCount === "infinite";
      })
    );
    if (loops.length === 0 || loops.some((looping) => !looping)) fail("dividers: every wave should loop forever when motion is allowed");

    // A loop is only a loop if the drawing still covers its box at every phase, including the
    // frame before it wraps. (An svg capped at 100% wide once left the far end empty mid-drift.)
    const coverage = await loopPage.evaluate(() =>
      [...document.querySelectorAll(".edge--live")].map((wave) => {
        const svg = wave.querySelector(".edge__svg");
        const box = wave.querySelector(".edge__box").getBoundingClientRect();
        const animation = svg.getAnimations()[0];
        const duration = animation.effect.getTiming().duration;
        animation.pause();
        const gaps = [];
        for (const fraction of [0, 0.25, 0.5, 0.75, 0.999]) {
          animation.currentTime = duration * fraction;
          const rect = svg.getBoundingClientRect();
          if (rect.left > box.left + 0.5 || rect.right < box.right - 0.5) gaps.push(fraction);
        }
        const twoPeriods = svg.getBoundingClientRect().width >= box.width * 2 - 1;
        animation.play();
        return { gaps, twoPeriods };
      })
    );
    for (const wave of coverage) {
      if (!wave.twoPeriods) fail("dividers: a live wave is not two periods wide, so it cannot loop");
      if (wave.gaps.length > 0) fail(`dividers: a live wave leaves its far end empty at phase ${wave.gaps.join(", ")}`);
    }
    await moving.close();

    // JavaScript off: dividers and their T60 marks are visible, nothing waits for a script.
    const plain = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
    const bare = await plain.newPage();
    await bare.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const hidden = await bare.evaluate(() =>
      [...document.querySelectorAll("[data-draw] .edge__box")].filter((box) => getComputedStyle(box).clipPath !== "none").length +
      [...document.querySelectorAll("[data-draw] .edge__t60")].filter((mark) => getComputedStyle(mark).opacity !== "1").length
    );
    if (hidden !== 0) fail(`dividers (no JS): ${hidden} divider part(s) are hidden`);
    await plain.close();
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
  console.log(
    `browser smoke: pass (${ROUTES.length} routes × ${VIEWPORTS.length} widths, ${showcase.length} showcase pages, ` +
    `explorer, overlay (${overlayCount} projects), no-JS fallback, contact flow, reveal, dividers and mineral layer)`
  );
}
