/**
 * services.js — "/services/" · DEC-020 redesign of WEBSITE_PLAN.md §5.4.
 *
 * Single page, four in-page anchor sections (DEC-011). The numbered squares are
 * gone: each discipline is drawn as its own signature graphic (wave.js), the hero
 * indexes all four, a sticky sub-nav follows the reader, and every discipline is a
 * signature panel beside a ruled spec table.
 *
 * Discipline copy (standfirst / condition / "what we do") is CONTENT_PLAN.md
 * §5 E-02…E-05 — interface copy, not a data-model fact — so it lives here.
 * Parameters, standards and the sector index are read live from data/*.json.
 *
 * Sound insulation's condition paragraph omits the deck's "flanking" line:
 * CONTENT_PLAN.md §5 E-03 flags that term `CLIENT TO CONFIRM before body use`.
 */

import { esc, each, when, join } from "../lib/html.js";
import { eyebrow, cta, tagRow } from "../components/ui.js";
import { picture, bestImage } from "../components/picture.js";
import { arcs, edge, signature } from "../components/wave.js";
import { placeLabel } from "../components/project-view.js";
import {
  publishedServices,
  publishedProjects,
  standardsForService,
  projectsForService,
  isShowcase,
  projectHref
} from "../lib/data.js";

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

/* ─── Hero ─── */

function hero(list) {
  return `<section class="hero hero--solid hero--medium has-lines on-dark" aria-labelledby="services-title">
  <div class="hero__shade"></div>
  ${arcs()}
  <div class="hero__inner">
    <div class="hero__split">
      <div class="hero__body">
        ${eyebrow(null, "Services")}
        <h1 class="hero__title t-h1" id="services-title">Acoustic performance, from criterion to <em>handover.</em></h1>
        <p class="hero__lead t-lead">Four connected disciplines carry the brief from the first target to the final measurement.</p>
        <div class="cta-row">${cta("/contact/", "Send us a drawing set", "primary")}${cta("/work/", "See our work", "secondary")}</div>
      </div>
      <nav class="svc-index" aria-label="Disciplines">
${each(list, (service, index) => `        <a class="svc-index__item ticks" href="#${esc(service.slug)}" data-reveal style="--i:${index}">
          <span class="svc-index__art">${signature(service.id)}</span>
          <span class="svc-index__name">${esc(service.name)}</span>
        </a>`)}
      </nav>
    </div>
  </div>
</section>`;
}

function subnav(list) {
  return `<nav class="subnav" aria-label="Jump to a discipline" data-scrollspy>
  <div class="subnav__inner">
${each(list, (service) => `    <a class="subnav__link" href="#${esc(service.slug)}" data-spy="${esc(service.slug)}">${esc(service.name)}</a>`)}
  </div>
</nav>`;
}

/* ─── Disciplines ─── */

function relatedProjects(data, service) {
  const withImages = projectsForService(data, service.id).filter((project) => bestImage(project));
  const ranked = [
    ...withImages.filter(isShowcase).sort((a, b) => a.showcaseRank - b.showcaseRank),
    ...withImages.filter((project) => !isShowcase(project))
  ].slice(0, 4);
  if (ranked.length === 0) return "";

  return `<div class="svc-projects">
    <p class="t-label">Selected projects</p>
    <ul class="svc-projects__list">
${each(ranked, (project) => `      <li><a class="svc-projects__item" href="${esc(projectHref(project))}">
        <span class="svc-projects__media">${picture(bestImage(project), { alt: "", sizes: "(min-width: 900px) 20vw, 45vw" })}</span>
        <span class="svc-projects__title">${esc(project.title)}</span>
        <span class="t-meta">${esc(placeLabel(project) ?? "")}</span>
      </a></li>`)}
    </ul>
  </div>`;
}

function discipline(data, service, index) {
  const copy = DISCIPLINE_COPY[service.id];
  if (!copy) return "";

  const standards = standardsForService(data, service.id);
  const flip = index % 2 === 1;
  const ground = flip ? "ground-dust-warm" : "ground-dust";

  const rows = [
    { label: "What we do", html: `<ul class="do-list">${each(copy.whatWeDo, (item) => `<li>${esc(item)}</li>`)}</ul>` },
    { label: "Parameters", html: tagRow(service.parameters, `${service.name} parameters`) },
    { label: "Standards", html: tagRow(standards.map((standard) => standard.designation), `${service.name} standards`) },
    { label: "Tools", html: copy.tools ? tagRow(copy.tools, `${service.name} tools`) : "" }
  ].filter((row) => row.html);

  return `<section class="section ${ground}" id="${esc(service.slug)}" aria-labelledby="service-${esc(service.slug)}">
  ${edge()}
  <div class="wrap svc-disc${flip ? " svc-disc--flip" : ""}">
    <aside class="svc-disc__sig panel panel--dark ticks on-dark" data-reveal>
      <div class="svc-disc__art">${signature(service.id)}</div>
      ${eyebrow(null, "Discipline")}
      <h2 class="t-h3" id="service-${esc(service.slug)}">${esc(service.name)}</h2>
      <p class="t-standfirst">${esc(copy.standfirst)}</p>
    </aside>
    <div class="svc-disc__body stack-xl">
      ${when(copy.condition.length > 0, () => `<div class="stack">${join(copy.condition.map((paragraph) => `<p class="t-lead">${esc(paragraph)}</p>`), "\n")}</div>`)}
      <dl class="rule-table svc-spec">
${each(rows, (row) => `        <div class="rule-table__row" data-reveal><dt class="rule-table__label t-label">${esc(row.label)}</dt><dd class="rule-table__value">${row.html}</dd></div>`)}
      </dl>
      ${relatedProjects(data, service)}
      <p>${cta("/contact/", "Set the criterion early", "secondary")}</p>
    </div>
  </div>
</section>`;
}

/* ─── Sector index ─── */

function sectorIndex(data) {
  const projects = publishedProjects(data);
  const counts = new Map();
  for (const project of projects) counts.set(project.sector, (counts.get(project.sector) ?? 0) + 1);
  const sectors = data.sectors.filter((sector) => counts.has(sector.id));
  if (sectors.length === 0) return "";

  return `<section class="section ground-navy has-lines on-dark" aria-labelledby="services-sectors">
  ${edge()}
  <div class="wrap">
    <div class="section__head grid grid--projects-head grid--end">
      <div>
        ${eyebrow(null, "Where it applies")}
        <h2 class="t-h2" id="services-sectors">Applied across <em>sectors.</em></h2>
      </div>
      <p class="t-body">The same four disciplines, brought to different kinds of space. Open a sector to see its projects.</p>
    </div>
    <ul class="sector-list">
${each(sectors, (sector, index) => `      <li data-reveal style="--i:${index % 4}"><a class="sector-list__item" href="/work/?sector=${esc(sector.id)}#explore">
        <span class="sector-list__name">${esc(sector.label)}</span>
        <span class="sector-list__count t-meta">${counts.get(sector.id)} ${counts.get(sector.id) === 1 ? "project" : "projects"}</span>
        <span class="sector-list__glyph" aria-hidden="true">↗</span>
      </a></li>`)}
    </ul>
  </div>
</section>`;
}

export function servicesPage(data) {
  const list = publishedServices(data);

  return {
    route: "/services/",
    title: "Services",
    description: "Four connected disciplines carry the brief from the first target to the final measurement.",
    bodyClass: "page--services",
    body: join([
      hero(list),
      subnav(list),
      join(list.map((service, index) => discipline(data, service, index))),
      sectorIndex(data)
    ])
  };
}
