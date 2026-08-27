/**
 * services.js — "/services/" · WEBSITE_PLAN.md §5.4, CONTENT_PLAN.md §5.
 *
 * One page, four in-page anchor sections (DEC-011). Discipline names,
 * summaries, parameters and standards come from data/*.json; the condition and
 * deliverable copy is CONTENT_PLAN E-02…E-05, keyed by service id.
 *
 * Layout note from the plan: four full-width horizontal bands, never a 2x2 card
 * grid. Sibling cross-links are in-page jumps, not navigations.
 */

import { esc, each, when, join, pad2 } from "../lib/html.js";
import { eyebrow, cta, tagRow, devFixture } from "../components/ui.js";
import {
  publishedServices,
  standardsForService,
  projectsForService,
  glossaryForService,
  isProduction
} from "../lib/data.js";

/**
 * Discipline copy — CONTENT_PLAN.md E-02…E-05.
 *
 * E-03's sourced condition line uses the word "flanking", which CONTENT_PLAN
 * marks CLIENT TO CONFIRM before body use. The clause is rewritten here to keep
 * the meaning without the gated term; it is not softened or dropped.
 */
const COPY = {
  "architectural-acoustics": {
    condition: [
      "Reverberation is not a finish-selection problem.",
      "Volume, occupancy, geometry and absorption act together; a room can be quiet and still fail speech."
    ],
    deliverables: [
      "Set RT60 and intelligibility criteria",
      "Assess geometry",
      "Select absorption by frequency",
      "Document treatment",
      "Review mock-ups",
      "Verify after completion"
    ],
    related: ["simulation-and-modelling", "measurement-and-verification"]
  },
  "sound-insulation-and-noise-control": {
    condition: [
      "A partition rating alone does not resolve the sound paths around a junction, the services penetrations through it, or plant noise arriving by another route.",
      "The criterion must survive the junction, the detail and the installation."
    ],
    deliverables: [
      "Set STC and NC criteria",
      "Mark floor separations",
      "Review wall and door build-ups",
      "Coordinate HVAC noise and vibration control",
      "Assess environmental noise",
      "Test airborne separation"
    ],
    related: ["architectural-acoustics", "measurement-and-verification"]
  },
  "simulation-and-modelling": {
    condition: [
      "Geometry, source position, material behaviour and background noise change how sound reaches a listener.",
      "Late correction is expensive because those decisions are already built."
    ],
    deliverables: [
      "Build 3D acoustic models",
      "Assign absorption and reflection data",
      "Model loudspeaker and source positions",
      "Review RT, SPL, clarity and frequency response",
      "Test treatment and geometry options"
    ],
    related: ["architectural-acoustics", "measurement-and-verification"]
  },
  "measurement-and-verification": {
    condition: [
      "A specification describes intent.",
      "Measurement establishes whether the installed room, partition or system meets it."
    ],
    deliverables: [
      "Measure reverberation",
      "Evaluate STI and speech privacy",
      "Assess ambient and environmental noise",
      "Analyse NC curves",
      "Test airborne sound insulation",
      "Report compliance"
    ],
    related: ["sound-insulation-and-noise-control", "simulation-and-modelling"]
  }
};

function overviewBand(service, index) {
  return `<article class="band${index % 2 === 1 ? " band--flip" : ""}">
  <span class="band__number t-meta">${pad2(index + 1)}</span>
  <div class="band__body">
    <h2 class="t-h5">${esc(service.name)}</h2>
    <p class="t-body measure-34">${esc(service.summary)}</p>
    ${tagRow(service.parameters, `${service.name} parameters`)}
  </div>
  <a class="band__link" href="#${esc(service.slug)}">
    <span class="visually-hidden">Jump to ${esc(service.name)}</span>
    <span aria-hidden="true">↓</span>
  </a>
</article>`;
}

function glossary(data, service) {
  const entries = glossaryForService(data, service);
  if (entries.length === 0) return "";
  return `<div class="glossary">
  <h3 class="t-label">Parameters</h3>
  <dl class="glossary__list">
${each(entries, (parameter) => `    <div class="glossary__item">
      <dt><span class="glossary__label">${esc(parameter.label)}</span> <span class="t-meta">${esc(parameter.name)} · ${esc(parameter.unit)}</span></dt>
      <dd class="t-body">${esc(parameter.definition)}${when(parameter.range, () => ` ${esc(parameter.range)}`)}</dd>
    </div>`)}
  </dl>
</div>`;
}

/** Evidence module — real records only, with the documented text-list fallback. */
function evidence(data, service) {
  const projects = projectsForService(data, service.id).slice(0, 3);

  if (projects.length >= 2) {
    return `<div class="evidence">
  <h3 class="t-label">Evidence</h3>
  <ul class="evidence__list">
${each(projects, (project) => `    <li>${project.tier === "case"
      ? `<a href="/work/${esc(project.slug)}/">${esc(project.title)}</a>`
      : esc(project.title)}</li>`)}
  </ul>
</div>`;
  }

  if (projects.length === 1) {
    // Documented fallback: a compact project-name list, not an empty card.
    return `<div class="evidence">
  <h3 class="t-label">Evidence</h3>
  <ul class="evidence__list"><li>${esc(projects[0].title)}</li></ul>
</div>`;
  }

  // Evidence module renders 2-3 related project records the moment they
  // publish, falling back to the compact name list above that. Blocked on
  // Q-08 · Q-09 (see DEFERRED.md). Never filled with example projects.
  return when(!isProduction, () => devFixture(`Evidence for ${service.name.toLowerCase()} publishes here once available.`));
}

function relatedLinks(data, service) {
  const siblings = (COPY[service.id]?.related ?? [])
    .map((id) => data.services.find((candidate) => candidate.id === id && candidate.published))
    .filter(Boolean);
  if (siblings.length === 0) return "";
  return `<p class="related-links t-meta">${each(siblings, (sibling) => `<a href="#${esc(sibling.slug)}">${esc(sibling.name)}</a>`)}</p>`;
}

function disciplineSection(data, service, index) {
  const copy = COPY[service.id];
  if (!copy) return "";
  const standards = standardsForService(data, service.id).map((standard) => standard.designation);
  const ground = index % 2 === 0 ? "ground-dust" : "ground-dust-warm";

  return `<section class="section ${ground}" id="${esc(service.slug)}" aria-labelledby="${esc(service.slug)}-title">
  <div class="section__head">
    ${eyebrow(index + 2, service.name)}
    <h2 class="t-h2" id="${esc(service.slug)}-title">${esc(service.name)}</h2>
    <p class="t-standfirst">${esc(service.summary)}</p>
  </div>

  <div class="grid grid--editorial">
    <div class="stack-lg">
      <h3 class="t-label">The condition</h3>
      ${each(copy.condition, (paragraph) => `<p class="t-body">${esc(paragraph)}</p>`)}

      <h3 class="t-label">What we do</h3>
      <ul class="deliverables t-data">
${each(copy.deliverables, (item) => `        <li>${esc(item)}</li>`)}
      </ul>
    </div>

    <div class="stack-xl">
      ${glossary(data, service)}
      ${when(standards.length > 0, () => `<div>
        <h3 class="t-label">Standards</h3>
        ${tagRow(standards, `${service.name} standards`)}
      </div>`)}
      ${evidence(data, service)}
      ${relatedLinks(data, service)}
    </div>
  </div>

  <div class="section__foot">
    ${eyebrow(null, "Appointment")}
    <p class="t-h5 service-foot__line">Set the criterion before the detail closes.</p>
    ${cta("/contact/", "Send us a drawing set", "primary")}
  </div>
</section>`;
}

export function servicesPage(data) {
  const services = publishedServices(data).filter((service) => COPY[service.id]);

  return {
    route: "/services/",
    title: "Services",
    description: "Four connected disciplines carry the brief from the first target to the final measurement.",
    body: join([
      `<section class="section ground-dust">
  <div class="section__head">
    ${eyebrow(1, "Services")}
    <h1 class="t-h2">Acoustic performance, from criterion to handover.</h1>
    <p class="t-standfirst">Four connected disciplines carry the brief from the first target to the final measurement.</p>
  </div>
  <div class="band-list">
${each(services, (service, index) => overviewBand(service, index))}
  </div>
</section>`,
      ...services.map((service, index) => disciplineSection(data, service, index))
    ])
  };
}
