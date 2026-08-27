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

import { esc, join, when } from "../lib/html.js";
import { eyebrow, cta, devFixture } from "../components/ui.js";
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
  if (projects.length === 0) return "";
  const measured = projects.filter((project) => (project.measured ?? []).length > 0).length;
  return `<p class="work-counter t-meta">${projects.length} ${projects.length === 1 ? "project" : "projects"} · ${measured} measured ${measured === 1 ? "record" : "records"}</p>`;
}

export function workPage(data) {
  const projects = publishedProjects(data);

  // All ten seeded projects are published: false at tier "record" pending
  // client evidence. Blocked on Q-04 · Q-08 · Q-09 · Q-18 (see DEFERRED.md).
  // Renders every published project in both tiers as soon as one exists;
  // nothing here is populated from the unpublished seeds.
  const list = projects.length > 0
    ? `<div class="record-list">${recordRows(projects)}</div>${counter(projects)}`
    : when(!isProduction, () => devFixture("Work index publishes here once a project is ready."));

  return {
    route: "/work/",
    title: "Work",
    description: "Project records organised by sector, discipline and the evidence available to publish.",
    body: `<section class="section ground-dust">
  <div class="section__head">
    ${eyebrow(1, "Work")}
    <h1 class="t-h2">Work held to a number.</h1>
    <p class="t-standfirst">Project records organised by sector, discipline and the evidence available to publish.</p>
  </div>

  ${when(filtersQualify(projects), '<!-- filter strip renders above the §5.2 threshold -->')}
  ${list}

  <div class="section__foot">${cta("/contact/", "Discuss a project", "primary")}</div>
</section>`
  };
}
