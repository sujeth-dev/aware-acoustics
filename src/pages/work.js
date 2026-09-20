/**
 * work.js — "/work/"
 *
 * Restructured under DEC-020:
 *   1. an image hero with computed facts,
 *   2. the six showcase projects, each linking to its own page,
 *   3. "Explore all work": every project as a card, filterable by sector and
 *      searchable, opening in an overlay (src/js/work-overlay.js).
 *
 * The overlay content is server-rendered into a <template> per project so it
 * needs no client-side data fetching. Without JavaScript every card still lists
 * and the showcase links still work; the controls stay hidden.
 */

import { esc, each, when, join } from "../lib/html.js";
import { eyebrow } from "../components/ui.js";
import { imageHero } from "../components/hero.js";
import { picture, bestImage } from "../components/picture.js";
import { waveform, edge } from "../components/wave.js";
import { projectPanel, placeLabel } from "../components/project-view.js";
import { sectorFacts } from "../lib/facts.js";
import {
  publishedProjects,
  showcaseProjects,
  isShowcase,
  projectHref,
  sectorLabel
} from "../lib/data.js";

const FILTER_MIN_PROJECTS = 12;

function hero(data, projects, showcase) {
  // Start on a different project from the homepage so the two heroes don't open identically.
  const rotated = [...showcase.slice(2), ...showcase.slice(0, 2)];
  const slides = rotated.map(bestImage).filter(Boolean);
  const facts = sectorFacts(data, projects);

  return imageHero({
    id: "work-title",
    label: "Work",
    title: "Rooms built to be <em>heard.</em>",
    lead: `Airports, auditoriums, hotels, workplaces and laboratories: the projects Aware Acoustics has advised on, across ${facts.sectors} sectors.`,
    slides,
    facts: [
      { figure: facts.projects, label: "Projects" },
      { figure: facts.sectors, label: "Sectors" },
      { figure: facts.cities, label: "Cities" }
    ],
    size: "medium",
    titleClass: "t-h1"
  });
}

/* ─── Featured rows ─── */

function featureRow(project, index, data) {
  const dark = index % 2 === 1;
  const image = bestImage(project);
  const href = projectHref(project);
  const detail = join(
    [placeLabel(project), (project.scope ?? [])[0]].filter(Boolean),
    " · "
  );

  return `<article class="feature${index % 2 === 1 ? " feature--flip" : ""}${dark ? " feature--dark" : ""}" data-reveal>
  <a class="feature__media" href="${esc(href)}" tabindex="-1" aria-hidden="true">
    ${picture(image, { alt: "", sizes: "(min-width: 900px) 56vw, 100vw", eager: index === 0 })}
    <span class="feature__chip t-label">${esc(sectorLabel(data, project.sector))}</span>
  </a>
  <div class="feature__info ticks${dark ? " on-dark" : ""}">
    <p class="eyebrow">${esc(sectorLabel(data, project.sector))}</p>
    <h3 class="feature__title t-h3"><a href="${esc(href)}">${esc(project.title)}</a></h3>
    ${when(detail, () => `<p class="feature__meta t-meta">${esc(detail)}</p>`)}
    ${when(project.summary, () => `<p class="feature__summary t-body">${esc(project.summary)}</p>`)}
    <a class="link-arrow" href="${esc(href)}">View project <span aria-hidden="true">↗</span></a>
  </div>
</article>`;
}

function featured(data, showcase, total) {
  if (showcase.length === 0) return "";
  return `<section class="section ground-dust" aria-labelledby="work-featured">
  ${edge()}
  <div class="wrap">
    <div class="section__head grid grid--projects-head grid--end">
      <div>
        ${eyebrow(null, "Featured projects")}
        <h2 class="t-h2" id="work-featured">Featured <em>projects.</em></h2>
      </div>
      <p class="t-body">Each opens as its own page, with every photograph and every fact we hold for the project.</p>
    </div>
    <div class="feature-list">
${each(showcase, (project, index) => featureRow(project, index, data))}
    </div>
    <p class="feature-more"><a class="cta cta--secondary" href="#explore">Explore all ${esc(total)} projects <span class="cta__glyph" aria-hidden="true">↓</span></a></p>
  </div>
</section>`;
}

/* ─── Explore all ─── */

function card(project, index, data) {
  const image = bestImage(project);
  const href = projectHref(project);
  const showcase = isShowcase(project);
  const search = join(
    [project.title, project.city, project.location, sectorLabel(data, project.sector), ...(project.scope ?? [])],
    " "
  ).toLowerCase();

  return `<li class="work-card${image ? "" : " work-card--plate"}" data-slug="${esc(project.slug)}" data-sector="${esc(project.sector)}" data-search="${esc(search)}">
  <a class="work-card__link" href="${esc(href)}"${showcase ? "" : ` data-project-link="${esc(project.slug)}"`}>
    <span class="work-card__media">
      ${image
        ? picture(image, { alt: "", sizes: "(min-width: 1100px) 30vw, (min-width: 700px) 45vw, 100vw" })
        : `<span class="work-card__plate" aria-hidden="true">${waveform(index + 1)}</span>`}
      ${when(showcase, '<span class="work-card__flag t-label">Featured</span>')}
    </span>
    <span class="work-card__body">
      <span class="work-card__sector t-label">${esc(sectorLabel(data, project.sector))}</span>
      <span class="work-card__title">${esc(project.title)}</span>
      <span class="work-card__meta t-meta">${esc(placeLabel(project) ?? (project.scope ?? [])[0] ?? "")}</span>
    </span>
    <span class="work-card__glyph" aria-hidden="true">↗</span>
  </a>
</li>`;
}

function filterStrip(data, projects) {
  if (projects.length < FILTER_MIN_PROJECTS) return "";
  const counts = new Map();
  for (const project of projects) counts.set(project.sector, (counts.get(project.sector) ?? 0) + 1);
  const sectors = data.sectors.filter((sector) => counts.has(sector.id));

  return `<nav class="filter-strip" aria-label="Filter by sector" data-work-filter hidden>
  <a class="filter-strip__link" href="/work/" data-sector-filter="" aria-current="true">All <span>${projects.length}</span></a>
  ${each(sectors, (sector) => `<a class="filter-strip__link" href="/work/?sector=${esc(sector.id)}" data-sector-filter="${esc(sector.id)}">${esc(sector.label)} <span>${counts.get(sector.id)}</span></a>`)}
</nav>`;
}

function dialog() {
  return `<dialog class="pv-dialog on-dark" data-project-dialog aria-labelledby="pv-title">
  <div class="pv-dialog__bar">
    <p class="t-label" data-pv-position aria-live="polite"></p>
    <div class="pv-dialog__actions">
      <button class="pv-dialog__btn" type="button" data-pv-prev aria-label="Previous project"><span aria-hidden="true">←</span></button>
      <button class="pv-dialog__btn" type="button" data-pv-next aria-label="Next project"><span aria-hidden="true">→</span></button>
      <button class="pv-dialog__btn pv-dialog__btn--close" type="button" data-pv-close aria-label="Close project"><span aria-hidden="true">✕</span></button>
    </div>
  </div>
  <div class="pv-dialog__body" data-pv-body></div>
</dialog>`;
}

function explore(data, projects) {
  return `<section class="section ground-navy has-lines on-dark" id="explore" aria-labelledby="work-explore">
  ${edge()}
  <div class="wrap">
    <div class="section__head grid grid--projects-head grid--end">
      <div>
        ${eyebrow(null, "Explore all work")}
        <h2 class="t-h2" id="work-explore">The complete <em>record.</em></h2>
      </div>
      <p class="t-body">All ${projects.length} projects, by sector. Open any project to see its images and facts.</p>
    </div>

    <div class="explorer" data-explorer>
      <div class="explorer__controls">
        ${filterStrip(data, projects)}
        <label class="explorer__search" data-work-search hidden>
          <span class="visually-hidden">Search projects by name, city or scope</span>
          <input type="search" placeholder="Search projects" autocomplete="off" spellcheck="false">
        </label>
      </div>
      <p class="explorer__status t-meta" data-work-status aria-live="polite"></p>

      <ul class="work-grid" data-work-grid>
${each(projects, (project, index) => card(project, index, data))}
      </ul>

      <p class="explorer__empty t-body" data-work-empty hidden>No project matches. <button class="link-arrow" type="button" data-work-reset>Clear filters</button></p>
      <p class="explorer__more" data-work-more hidden><button class="cta cta--secondary" type="button">Show more projects</button></p>
    </div>
  </div>
</section>

${each(projects.filter((project) => !isShowcase(project)), (project, index) => `<template data-project-template="${esc(project.slug)}">${projectPanel(project, data, { seed: index + 1 })}</template>`)}
${dialog()}`;
}

export function workPage(data) {
  const projects = publishedProjects(data);
  const showcase = showcaseProjects(data);
  const first = bestImage(showcase[2] ?? showcase[0]);

  return {
    route: "/work/",
    title: "Work",
    description: "Airports, auditoriums, hotels, workplaces and laboratories: the projects Aware Acoustics has advised on, by sector.",
    bodyClass: "page--work",
    preload: first?.src,
    body: join([
      hero(data, projects, showcase),
      featured(data, showcase, projects.length),
      explore(data, projects)
    ])
  };
}
