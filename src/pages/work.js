/**
 * work.js — "/work/" · WEBSITE_PLAN.md §5.2, CONTENT_PLAN.md W-01.
 *
 * Lists every published project in both tiers. Case-tier rows link to their
 * record; list-tier rows do not, because there is no page behind them (DEC-007).
 *
 * Filters ship only above the §5.2 threshold — 12 published projects and at
 * least four sectors carrying two projects each. Below that a filter row is
 * furniture that makes a small list look smaller, so it is not rendered.
 */

import { esc, each, join, when } from "../lib/html.js";
import { eyebrow, cta, stat, devFixture } from "../components/ui.js";
import { recordRows } from "../components/record-row.js";
import { publishedProjects, isProduction } from "../lib/data.js";

const FILTER_MIN_PROJECTS = 12;
const FILTER_MIN_SECTORS = 4;
const FILTER_MIN_PER_SECTOR = 2;

export function filtersQualify(projects) {
  if (projects.length < FILTER_MIN_PROJECTS) return false;
  const counts = new Map();
  for (const project of projects) counts.set(project.sector, (counts.get(project.sector) ?? 0) + 1);
  const populated = [...counts.values()].filter((count) => count >= FILTER_MIN_PER_SECTOR).length;
  return populated >= FILTER_MIN_SECTORS;
}

function counter(projects) {
  // Never a zero counter — an empty publish state is omitted, not printed as
  // "0 projects", and the measured clause only appears once a record has one.
  if (projects.length === 0) return "";
  const measured = projects.filter((project) => (project.measured ?? []).length > 0).length;
  const noun = projects.length === 1 ? "project" : "projects";
  const label = measured > 0
    ? `${noun} · ${measured} measured ${measured === 1 ? "record" : "records"}`
    : `${noun} listed`;
  return stat(projects.length, label);
}

/**
 * Sector filter — WEBSITE_PLAN.md §5.2, DESIGN_GUIDE.md §10.5. Rendered only
 * above the threshold and `hidden` until src/js/work-filter.js enables it, so
 * a visitor without JavaScript sees the complete list and no dead controls.
 */
function filterStrip(data, projects) {
  if (!filtersQualify(projects)) return "";
  const counts = new Map();
  for (const project of projects) counts.set(project.sector, (counts.get(project.sector) ?? 0) + 1);
  const sectors = data.sectors.filter((sector) => counts.has(sector.id));

  return `<nav class="filter-strip" aria-label="Filter by sector" data-work-filter hidden>
  <a class="filter-strip__link" href="/work/" data-sector-filter="" aria-current="true">All <span class="t-meta">${projects.length}</span></a>
  ${each(sectors, (sector) => `<a class="filter-strip__link" href="/work/?sector=${esc(sector.id)}" data-sector-filter="${esc(sector.id)}">${esc(sector.label)} <span class="t-meta">${counts.get(sector.id)}</span></a>`)}
</nav>
<p class="t-meta" data-work-filter-status aria-live="polite" hidden></p>`;
}

/**
 * Photographs on a list-tier row show the named facility, not Aware Acoustics
 * project photography. Credits are printed because open licences (CC BY-SA)
 * require attribution on the page.
 */
function imageNote(projects) {
  const credited = projects.flatMap((project) => (project.images ?? []).map((image) => ({ project, image })));
  if (credited.length === 0) return "";

  return `<div class="work-note t-meta">
  <p>Photographs show the facilities named and are credited to their sources. They are not Aware Acoustics project photography.</p>
  <ul class="work-note__credits">
${each(credited, ({ project, image }) => `    <li>${esc(project.title)} — <a href="${esc(image.source)}" rel="noopener">${esc(image.credit)}</a>${image.licence.startsWith("CC") ? ` · ${esc(image.licence)}` : ""}</li>`)}
  </ul>
</div>`;
}

export function workPage(data) {
  const projects = publishedProjects(data);

  // Every published project renders in both tiers. Projects are list-tier
  // until Q-08 · Q-09 · Q-18 supply the evidence a case record requires
  // (see DEFERRED.md); the dev-fixture only shows when nothing is published.
  const list = projects.length > 0
    ? `${counter(projects)}${filterStrip(data, projects)}<div class="record-list">${recordRows(projects, data)}</div>${imageNote(projects)}`
    : when(!isProduction, () => devFixture("Work index publishes here once a project is ready.", "slab"));

  return {
    route: "/work/",
    title: "Work",
    description: "Project records organised by sector, discipline and the evidence available to publish.",
    body: `<section class="section ground-dust" aria-labelledby="work-title">
  <div class="section__head">
    ${eyebrow(1, "Work")}
    <h1 class="t-h2" id="work-title">Work held to a number.</h1>
    <p class="t-standfirst measure-46">Project records organised by sector, discipline and the evidence available to publish.</p>
  </div>
</section>

<section class="section section--tight ground-dust-warm">
  ${list}

  <div class="section__foot">${cta("/contact/", "Discuss a project", "primary")}</div>
</section>`
  };
}
