/**
 * home.js — "/" · DEC-020 redesign of WEBSITE_PLAN.md §5.1 / CONTENT_PLAN.md §3.
 *
 * Section order: image hero → standards ticker → About → Selected work →
 * Services → Verification. The appointment prompt is the footer's call band.
 *
 * Copy is CONTENT_PLAN H-01…H-06 where it survives; every project fact, service
 * name, parameter, standard designation and contact detail is read from
 * data/*.json. The hero facts strip is computed from published projects.
 */

import { esc, each, when, join } from "../lib/html.js";
import { eyebrow, cta, tagRow } from "../components/ui.js";
import { imageHero } from "../components/hero.js";
import { picture, bestImage } from "../components/picture.js";
import { arcs, edge, signature } from "../components/wave.js";
import { placeLabel } from "../components/project-view.js";
import { sectorFacts } from "../lib/facts.js";
import {
  publishedProjects,
  showcaseProjects,
  publishedServices,
  publishedStandards,
  projectHref,
  sectorLabel
} from "../lib/data.js";

/* Interface copy — CONTENT_PLAN.md H-01. Not a project or contact fact. */
const HERO_TAGS = ["Room acoustics", "Noise & vibration", "Simulation", "Measurement"];

const STANDARD_GROUPS = [
  { category: "design", label: "Design" },
  { category: "measurement", label: "Measurement" },
  { category: "green", label: "Green and compliance" }
];

function hero(data, projects, showcase) {
  const facts = sectorFacts(data, projects);
  return imageHero({
    id: "hero-title",
    label: "Independent acoustic consultancy",
    title: "Performance is specified. Then <em>measured.</em>",
    lead: "We set acoustic criteria, model the design, document what must be built and verify the result on site.",
    slides: showcase.map(bestImage).filter(Boolean).slice(0, 5),
    tags: tagRow(HERO_TAGS, "Disciplines"),
    actions: `${cta("/contact/", "Send us a drawing set", "primary")}${cta("/work/", "See our work", "secondary")}`,
    facts: [
      { figure: facts.projects, label: "Projects" },
      { figure: facts.sectors, label: "Sectors" },
      { figure: facts.cities, label: "Cities" },
      { figure: facts.founded, label: "Established" }
    ],
    size: "tall"
  });
}

function ticker(standards) {
  if (standards.length === 0) return "";
  const items = each(standards, (standard) => `<li class="marquee__item">${esc(standard.designation)}</li>`);
  return `<div class="marquee" role="group" aria-label="Standards we work to">
  <ul class="marquee__track" data-marquee>
    ${items}
    ${items.replace(/<li /g, '<li aria-hidden="true" ')}
  </ul>
</div>`;
}

function about(data, showcase) {
  const image = bestImage(showcase[1] ?? showcase[0]);
  const { settings } = data;
  const place = join([settings.city, settings.country].filter(Boolean), ", ");

  return `<section class="section ground-dust" id="about" aria-labelledby="home-about">
  ${edge()}
  <div class="wrap grid grid--editorial grid--start">
    <div class="stack-xl">
      <div>
        ${eyebrow(null, "About")}
        <h2 class="t-h2" id="home-about">Between the drawing and the room <em>as built.</em></h2>
      </div>
      <div class="stack-lg">
        <p class="t-body">Aware Acoustics works with architects, project managers, developers and engineers to define acoustic performance within architectural and MEP design.</p>
        <p class="t-body">The appointment can begin with criteria and simulation, continue through DBR, drawings, BOQ and submissions, and close with site measurement and compliance reporting.</p>
      </div>
      <blockquote class="pull">The test is practical: clarity in the document, compliance in the calculation, constructability on site.</blockquote>
      <p>${cta("/about/", "About the practice", "secondary")}</p>
    </div>
    ${when(image, () => `<figure class="about-figure ticks" data-reveal>
      ${picture(image, { alt: image.alt, sizes: "(min-width: 900px) 40vw, 100vw" })}
      <figcaption class="about-figure__caption">
        <span class="t-label">${esc(settings.tradingName)}</span>
        <span class="t-meta">${esc(place)}${settings.foundedYear ? ` · Est. ${esc(settings.foundedYear)}` : ""}</span>
      </figcaption>
    </figure>`)}
  </div>
</section>`;
}

function tile(project, index, data) {
  const image = bestImage(project);
  return `<a class="tile tile--${index + 1}" href="${esc(projectHref(project))}" data-reveal style="--i:${index}">
    ${picture(image, { alt: "", sizes: index === 0 ? "(min-width: 900px) 60vw, 100vw" : "(min-width: 900px) 30vw, 100vw" })}
    <span class="tile__body">
      <span class="tile__sector t-label">${esc(sectorLabel(data, project.sector))}</span>
      <span class="tile__title">${esc(project.title)}</span>
      <span class="tile__meta t-meta">${esc(placeLabel(project) ?? "")}</span>
    </span>
    <span class="tile__glyph" aria-hidden="true">↗</span>
  </a>`;
}

function selectedWork(data, showcase) {
  if (showcase.length === 0) return "";
  return `<section class="section ground-navy has-lines on-dark" aria-labelledby="home-work">
  ${edge()}
  <div class="wrap">
    <div class="grid grid--projects-head grid--end section__head">
      <div>
        ${eyebrow(null, "Selected work")}
        <h2 class="t-h2" id="home-work">The record is the <em>result.</em></h2>
      </div>
      <p class="t-body">Airports, campuses, hotels, workplaces and laboratories. Each project opens in full, with its images and the facts we hold for it.</p>
    </div>
    <div class="mosaic">
${each(showcase.slice(0, 6), (project, index) => tile(project, index, data))}
    </div>
    <div class="section__foot">${cta("/work/", "See all work", "secondary")}</div>
  </div>
</section>`;
}

function services(data) {
  const list = publishedServices(data);
  return `<section class="section ground-dust-warm" aria-labelledby="home-services">
  ${edge()}
  <div class="wrap">
    <div class="section__head grid grid--projects-head grid--end">
      <div>
        ${eyebrow(null, "Services")}
        <h2 class="t-h2" id="home-services">Four disciplines. One performance <em>brief.</em></h2>
      </div>
      <p class="t-body">Room acoustics, sound insulation, simulation and measurement, coordinated so the criterion set at the start is the one checked at the end.</p>
    </div>
    <div class="svc-grid">
${each(list, (service, index) => `      <article class="svc-card" data-reveal style="--i:${index}">
        <a class="svc-card__link" href="/services/#${esc(service.slug)}">
          <span class="svc-card__art ticks">${signature(service.id)}</span>
          <span class="svc-card__body">
            <span class="svc-card__title t-h5">${esc(service.name)}</span>
            <span class="svc-card__summary t-body">${esc(service.summary)}</span>
            ${tagRow(service.parameters, `${service.name} parameters`)}
          </span>
          <span class="svc-card__go link-arrow">Read more <span aria-hidden="true">↗</span></span>
        </a>
      </article>`)}
    </div>
    <div class="section__foot">${cta("/services/", "See all services", "secondary")}</div>
  </div>
</section>`;
}

function verification(data) {
  const standards = publishedStandards(data);
  const groups = STANDARD_GROUPS
    .map((group) => ({ ...group, items: standards.filter((standard) => standard.category === group.category) }))
    .filter((group) => group.items.length > 0);

  return `<section class="section ground-navy-deep has-lines on-dark" aria-labelledby="home-verification">
  ${edge()}
  ${arcs()}
  <div class="wrap grid grid--verification grid--start">
    <div class="stack-xl">
      <div>
        ${eyebrow(null, "Verification")}
        <h2 class="t-h2" id="home-verification">Quiet is measured at the <em>end.</em></h2>
      </div>
      <div class="stack-lg">
        <p class="t-body">Design intent is translated into criteria: RT60, STI, STC, NC or the parameter appropriate to the space.</p>
        <p class="t-body">Simulation tests the design before construction. Documentation carries the requirement into tender and site review.</p>
        <p class="t-body">Field measurement closes the loop. The measured value is reported against the target and the governing standard.</p>
      </div>
      <p>${cta("/about/", "How we verify", "secondary")}</p>
    </div>

    <div class="panel panel--dark ticks register" data-reveal>
      <div class="register__head">
        <p class="t-label">Standards register</p>
        <p class="register__count"><span class="stat__figure">${esc(standards.length)}</span></p>
      </div>
      <dl class="rule-table">
${each(groups, (group) => `        <div class="rule-table__row">
          <dt class="rule-table__label t-label">${esc(group.label)}</dt>
          <dd class="rule-table__value">${tagRow(group.items.map((standard) => standard.designation), `${group.label} standards`)}</dd>
        </div>`)}
      </dl>
    </div>
  </div>
</section>`;
}

export function homePage(data) {
  const projects = publishedProjects(data);
  const showcase = showcaseProjects(data);
  const first = bestImage(showcase[0]);

  return {
    route: "/",
    title: null,
    description: "Independent acoustic consultancy for the built environment. Aware Acoustics sets acoustic criteria, models the design, documents what must be built and verifies the result on site.",
    bodyClass: "page--home",
    preload: first?.src,
    body: join([
      hero(data, projects, showcase),
      ticker(publishedStandards(data)),
      about(data, showcase),
      selectedWork(data, showcase),
      services(data),
      verification(data)
    ])
  };
}
