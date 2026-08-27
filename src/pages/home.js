/**
 * home.js — "/" · WEBSITE_PLAN.md §5.1 and §6, CONTENT_PLAN.md §3.
 *
 * Six sections plus the shared footer. Copy is CONTENT_PLAN H-01…H-06; every
 * project fact, service name, parameter, standard designation and contact
 * detail is read from data/*.json (WEBSITE_PLAN.md §9).
 *
 * Two sections are gated on client evidence:
 *   §03 Selected work — needs Q-08/Q-09. Renders whatever published case-tier
 *     featured records exist. With none, development shows a dev-fixture marker
 *     and production fails the build at validate-data V-14.
 *   §05 Verification — the target/measured block needs Q-09. Until then the
 *     section publishes the process and the standards register only; no
 *     demonstration numbers, industry averages or example results.
 */

import { esc, each, when, join, pad2 } from "../lib/html.js";
import { eyebrow, cta, tagRow, devFixture } from "../components/ui.js";
import { recordRows } from "../components/record-row.js";
import {
  featuredProjects,
  publishedServices,
  publishedStandards,
  isProduction
} from "../lib/data.js";

/* Interface copy — CONTENT_PLAN.md H-01. Not a project or contact fact. */
const HERO_TAGS = ["Room acoustics", "Noise & vibration", "Simulation", "Measurement"];

function heroCaption(settings) {
  const place = join([settings.city, settings.country].filter(Boolean), ", ");
  const founded = settings.foundedYear ? `Est. ${settings.foundedYear}` : null;
  const line = join([place, founded].filter(Boolean), " · ");
  if (!line) return "";
  return `<div class="field-caption hero__caption">
    <p class="field-caption__title">${esc(settings.tradingName)}</p>
    <p class="field-caption__meta t-meta">${esc(line)}</p>
  </div>`;
}

function hero(settings) {
  return `<section class="hero plate plate--veiled on-dark" aria-labelledby="hero-title">
  <div class="hero__body">
    ${eyebrow(null, "Independent acoustic consultancy")}
    <h1 class="t-hero" id="hero-title">Performance is specified. Then measured.</h1>
    <p class="t-lead">We set acoustic criteria, model the design, document what must be built and verify the result on site.</p>
    ${tagRow(HERO_TAGS, "Disciplines")}
    <p>${cta("/contact/", "Send us a drawing set", "primary")}</p>
  </div>
  ${heroCaption(settings)}
</section>`;
}

function about() {
  // The independence triad (H-02 detail panel) is CLIENT TO CONFIRM under Q-22.
  // Documented fallback: omit the panel. Do not soften it into a weaker claim.
  return `<section class="section ground-dust-warm" aria-labelledby="home-about">
  <div class="grid grid--practice">
    <div class="section__head">
      ${eyebrow(1, "About")}
      <h2 class="t-h2" id="home-about">Between the drawing and the room as built.</h2>
    </div>
    <div class="stack-lg">
      <p class="t-body">Aware Acoustics works with architects, project managers, developers and engineers to define acoustic performance within architectural and MEP design.</p>
      <p class="t-body">The appointment can begin with criteria and simulation, continue through DBR, drawings, BOQ and submissions, and close with site measurement and compliance reporting.</p>
      <p class="t-body">The test is practical: clarity in the document, compliance in the calculation, constructability on site.</p>
      <p>${cta("/about/", "About the practice")}</p>
    </div>
  </div>
</section>`;
}

function selectedWork(data) {
  const featured = featuredProjects(data);

  // Every seeded project is tier "record", published: false, with no year and
  // no target/measured pair — nothing qualifies as a featured case record yet.
  // Blocked on Q-08 · Q-09 · Q-18 (see DEFERRED.md). Renders real records the
  // moment two or more exist; production build fails here by design
  // (validate-data V-14) rather than falling back to the ten shallow deck
  // entries. None of that detail belongs in the rendered placeholder itself.
  const body = featured.length > 0
    ? `<div class="record-list">${recordRows(featured)}</div>`
    : when(!isProduction, () => devFixture("Selected work publishes here once records are ready."));

  return `<section class="section ground-stone" aria-labelledby="home-work">
  <div class="grid grid--projects-head section__head">
    <div>
      ${eyebrow(2, "Selected work")}
      <h2 class="t-h2" id="home-work">The record is the result.</h2>
    </div>
    <p class="t-body">A selection of rooms, workplaces and transport projects, each published with its design condition, scope and measured evidence.</p>
  </div>
  ${body}
  <div class="section__foot">${cta("/work/", "See all work")}</div>
</section>`;
}

function services(data) {
  const list = publishedServices(data);

  return `<section class="section ground-dust-warm" aria-labelledby="home-services">
  <div class="section__head">
    ${eyebrow(3, "Services")}
    <h2 class="t-h2" id="home-services">Four disciplines. One performance brief.</h2>
  </div>

  <div class="band-list">
    ${each(list, (service, index) => `<article class="band${index % 2 === 1 ? " band--flip" : ""}">
      <span class="band__number t-meta">${pad2(index + 1)}</span>
      <div class="band__body">
        <h3 class="t-h5">${esc(service.name)}</h3>
        <p class="t-body measure-34">${esc(service.summary)}</p>
        ${tagRow(service.parameters, `${service.name} parameters`)}
      </div>
      <a class="band__link" href="/services/#${esc(service.slug)}">
        <span class="visually-hidden">${esc(service.name)}</span>
        <span aria-hidden="true">↗</span>
      </a>
    </article>`)}
  </div>

  <div class="section__foot">${cta("/services/", "See all services")}</div>
</section>`;
}

function verification(data) {
  const standards = publishedStandards(data);

  // The target/measured grid requires Q-09 (see DEFERRED.md). No published
  // project carries a target/measured pair, so there is no real result to
  // show. Production behaviour is omission: the section publishes the
  // process and the standards register only; the numeric grid appears once
  // measured evidence exists. Never a demonstration number.
  const metrics = when(!isProduction, () => devFixture("Target-versus-measured evidence publishes here once available."));

  return `<section class="section ground-navy on-dark" aria-labelledby="home-verification">
  <div class="grid grid--verification">
    <div>
      <div class="section__head">
        ${eyebrow(4, "Verification")}
        <h2 class="t-h2" id="home-verification">Quiet is measured at the end.</h2>
      </div>
      <div class="stack-lg">
        <p class="t-body">Design intent is translated into criteria: RT60, STI, STC, NC or the parameter appropriate to the space.</p>
        <p class="t-body">Simulation tests the design before construction. Documentation carries the requirement into tender and site review.</p>
        <p class="t-body">Field measurement closes the loop. The measured value is reported against the target and the governing standard.</p>
      </div>
    </div>

    <div class="stack-lg">
      ${metrics}
      <div>
        <p class="t-label">Standards register · ${standards.length} entries</p>
        <ul class="standards-strip t-meta">
          ${each(standards, (standard) => `<li>${esc(standard.designation)}</li>`)}
        </ul>
      </div>
    </div>
  </div>

  <div class="section__foot">${cta("/about/", "How we verify")}</div>
</section>`;
}

function appointment(data) {
  const { settings } = data;
  return `<section class="section ground-dust centred" aria-labelledby="home-appointment">
  ${eyebrow(5, "Appointment")}
  <h2 class="t-h2" id="home-appointment">Send us a plan. A programme. A problem that has not happened yet.</h2>
  <p class="stack-lg">${cta("/contact/", "Start a conversation", "primary")}</p>
  <p class="t-meta home-appointment__direct">
    ${each(settings.phones, (phone) => `<a href="tel:${esc(phone.replace(/[^\d+]/g, ""))}">${esc(phone)}</a>`)}
    ${each(settings.emails, (email) => `<a href="mailto:${esc(email)}">${esc(email)}</a>`)}
  </p>
</section>`;
}

export function homePage(data) {
  return {
    route: "/",
    title: null,
    description: "Independent acoustic consultancy for the built environment. Aware Acoustics sets acoustic criteria, models the design, documents what must be built and verifies the result on site.",
    bodyClass: "page--hero-dark",
    body: join([
      hero(data.settings),
      about(),
      selectedWork(data),
      services(data),
      verification(data),
      appointment(data)
    ])
  };
}
