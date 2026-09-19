/**
 * services.js — "/services/" · WEBSITE_PLAN.md §5.4, CONTENT_PLAN.md §5.
 *
 * Single page, four in-page anchor sections (DEC-011). Overview band reuses
 * the same component as Home §04 (service-bands.js) — both are a jump list
 * into the four disciplines. Per brand principle this is never a 2x2 card
 * grid (WEBSITE_PLAN.md §5.4).
 *
 * Discipline copy (standfirst / condition / "what we do") is CONTENT_PLAN.md
 * §5 E-02…E-05, `REWRITTEN FROM SOURCE`/`APPROVED FROM SOURCE` — interface
 * copy, not a data-model fact, so it lives here rather than in services.json
 * (compare HERO_TAGS in home.js for the same convention). Parameters and
 * standards are never hardcoded here — both read live from services.json /
 * standards.json.
 *
 * Sound insulation's condition paragraph omits the deck's "flanking" line:
 * CONTENT_PLAN.md §5 E-03 flags that term `CLIENT TO CONFIRM before body
 * use`, so it is left unpublished rather than reworded without approval.
 *
 * Evidence per discipline needs a published case-tier project on that
 * service (projectsForService). None exist yet (Q-08/Q-09/Q-18), so every
 * evidence slot renders the site-wide devFixture gated state.
 */

import { esc, each, when, join } from "../lib/html.js";
import { eyebrow, cta, tagRow, devFixture } from "../components/ui.js";
import { serviceBandList } from "../components/service-bands.js";
import { servicePlate } from "../components/service-plate.js";
import { recordRows } from "../components/record-row.js";
import {
  publishedServices,
  standardsForService,
  projectsForService,
  isProduction
} from "../lib/data.js";

/* Interface copy — CONTENT_PLAN.md §5 E-02…E-05. Not a data-model fact. */
const DISCIPLINE_COPY = {
  "architectural-acoustics": {
    standfirst: "Room geometry, absorption and use are resolved against a stated acoustic criterion.",
    condition: [
      "Reverberation is not a finish-selection problem. Volume, occupancy, geometry and absorption act together; a room can be quiet and still fail speech."
    ],
    whatWeDo: [
      "Set RT60 and intelligibility criteria",
      "Assess geometry",
      "Select absorption by frequency",
      "Document treatment",
      "Review mock-ups",
      "Verify after completion"
    ]
  },
  "sound-insulation-and-noise-control": {
    standfirst: "Separation, background noise and vibration criteria are coordinated with architecture and MEP.",
    // Condition paragraph intentionally omitted — see file header note on "flanking".
    condition: [],
    whatWeDo: [
      "Set STC and NC criteria",
      "Mark floor separations",
      "Review wall and door build-ups",
      "Coordinate HVAC noise and vibration control",
      "Assess environmental noise",
      "Test airborne separation"
    ]
  },
  "simulation-and-modelling": {
    standfirst: "Predictive models test the room before the room exists.",
    condition: [
      "Geometry, source position, material behaviour and background noise change how sound reaches a listener. Late correction is expensive because those decisions are already built."
    ],
    whatWeDo: [
      "Build 3D acoustic models",
      "Assign absorption and reflection data",
      "Model loudspeaker and source positions",
      "Review RT, SPL, clarity and frequency response",
      "Test treatment and geometry options"
    ],
    tools: ["EASE", "ODEON"]
  },
  "measurement-and-verification": {
    standfirst: "The completed condition is measured, compared and reported.",
    condition: [
      "A specification describes intent. Measurement establishes whether the installed room, partition or system meets it."
    ],
    whatWeDo: [
      "Measure reverberation",
      "Evaluate STI and speech privacy",
      "Assess ambient and environmental noise",
      "Analyse NC curves",
      "Test airborne sound insulation",
      "Report compliance"
    ]
  }
};

function overview(list) {
  return `<section class="section ground-dust" aria-labelledby="services-title">
  <div class="section__head">
    ${eyebrow(1, "Services")}
    <h1 class="t-h2" id="services-title">Acoustic performance, from criterion to handover.</h1>
    <p class="t-standfirst measure-46">Four connected disciplines carry the brief from the first target to the final measurement.</p>
  </div>
  ${serviceBandList(list, "#")}
</section>`;
}

function evidence(data, service) {
  const projects = projectsForService(data, service.id).filter((project) => project.tier === "case");
  if (projects.length > 0) {
    return `<div>
      <p class="t-label">Evidence</p>
      <div class="record-list">${recordRows(projects.slice(0, 3), data)}</div>
    </div>`;
  }
  return when(!isProduction, () => devFixture(
    `Evidence for ${service.name.toLowerCase()} publishes here once a matching project record exists.`,
    servicePlate(service.id)
  ));
}

function discipline(data, service, index) {
  const copy = DISCIPLINE_COPY[service.id];
  if (!copy) return "";

  const standards = standardsForService(data, service.id);
  const flip = index % 2 === 1;
  const ground = index % 2 === 1 ? "ground-dust-warm" : "ground-dust";

  return `<section class="section ${ground}" id="${esc(service.slug)}" aria-labelledby="service-${esc(service.slug)}">
  <div class="grid grid--editorial${flip ? " grid--flip" : ""}">
    <div class="stack-lg">
      <span class="band__swatch plate plate--${esc(servicePlate(service.id))}" aria-hidden="true"></span>
      ${eyebrow(index + 1, service.name)}
      <h2 class="t-h3" id="service-${esc(service.slug)}">${esc(service.name)}</h2>
      <p class="t-standfirst measure-46">${esc(copy.standfirst)}</p>
      ${join(copy.condition.map((paragraph) => `<p class="t-body measure-55">${esc(paragraph)}</p>`), "\n")}
    </div>
    <div class="stack-lg">
      <div>
        <p class="t-label">What we do</p>
        <ul class="stack t-body">${each(copy.whatWeDo, (item) => `<li>${esc(item)}</li>`)}</ul>
      </div>
      ${tagRow(service.parameters, `${service.name} parameters`)}
      ${tagRow(standards.map((standard) => standard.designation), `${service.name} standards`)}
      ${when(copy.tools, () => tagRow(copy.tools, `${service.name} tools`))}
      ${evidence(data, service)}
    </div>
  </div>
  <div class="section__foot">
    ${eyebrow(null, "Appointment")}
    <p class="t-lead">Set the criterion before the detail closes.</p>
    <p>${cta("/contact/", "Send us a drawing set", "primary")}</p>
  </div>
</section>`;
}

export function servicesPage(data) {
  const list = publishedServices(data);

  return {
    route: "/services/",
    title: "Services",
    description: "Four connected disciplines carry the brief from the first target to the final measurement.",
    body: join([
      overview(list),
      join(list.map((service, index) => discipline(data, service, index)))
    ])
  };
}
