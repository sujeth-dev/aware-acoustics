/**
 * work-feature.js — "/work/<slug>/" for the six showcase projects.
 *
 * A showcase page is built from what the record really holds: every image,
 * the scope and the facts table. It has no Condition / Approach / Outcome
 * narrative because no such text exists yet, and none is invented. The
 * evidence-gated case template (work-record.js) is unchanged and unused until a
 * record earns it.
 */

import { esc, each, when, join } from "../lib/html.js";
import { eyebrow, cta, tagRow } from "../components/ui.js";
import { imageHero } from "../components/hero.js";
import { picture, bestImage } from "../components/picture.js";
import { edge } from "../components/wave.js";
import { projectFacts, factsTable, projectGallery, placeLabel } from "../components/project-view.js";
import { sectorLabel, serviceById } from "../lib/data.js";

function hero(project, data) {
  const cover = bestImage(project);
  const place = placeLabel(project);

  return imageHero({
    id: "project-title",
    label: sectorLabel(data, project.sector),
    title: esc(project.title),
    lead: esc(project.summary ?? ""),
    slides: cover ? [cover] : [],
    actions: `${cta("/contact/", "Discuss a similar space", "primary")}<a class="link-arrow" href="/work/">All work</a>`,
    tags: place ? `<p class="hero__place t-label">${esc(place)}</p>` : "",
    size: "medium",
    titleClass: "t-h1 hero__title--wide"
  });
}

function overview(project, data) {
  const services = (project.services ?? []).map((id) => serviceById(data, id)).filter(Boolean);
  return `<section class="section ground-mineral" aria-labelledby="project-scope">
  ${edge("wave", { live: true })}
  <div class="wrap grid grid--editorial grid--start">
    <div class="stack-xl">
      <div>
        ${eyebrow(null, "Scope of work")}
        <h2 class="t-h3" id="project-scope">What Aware Acoustics <em>advised on.</em></h2>
      </div>
      <ul class="scope-list">
${each(project.scope ?? [], (item) => `        <li class="scope-list__item" data-reveal>${esc(item)}</li>`)}
      </ul>
      ${tagRow(services.map((service) => service.name), "Disciplines")}
    </div>
    <aside class="panel ticks pv__aside" data-reveal aria-label="Project facts">
      <p class="t-label">Project facts</p>
      ${factsTable(projectFacts(project, data))}
    </aside>
  </div>
</section>`;
}

function gallery(project) {
  if ((project.images ?? []).length === 0) return "";
  return `<section class="section ground-navy has-lines on-dark" aria-labelledby="project-images">
  ${edge("wave", { seed: 1 })}
  <div class="wrap">
    <div class="section__head">
      ${eyebrow(null, "Project images")}
      <h2 class="t-h3" id="project-images">The <em>space.</em></h2>
    </div>
    ${projectGallery(project, { mode: "stack" })}
  </div>
</section>`;
}

function neighbour(project, data, direction) {
  if (!project) return "";
  const image = bestImage(project);
  return `<a class="pager__link pager__link--${direction}" href="/work/${esc(project.slug)}/">
    ${when(image, () => `<span class="pager__media">${picture(image, { alt: "", sizes: "(min-width: 900px) 40vw, 100vw" })}</span>`)}
    <span class="pager__text">
      <span class="t-label">${direction === "prev" ? "Previous project" : "Next project"}</span>
      <span class="pager__title">${esc(project.title)}</span>
      <span class="t-meta">${esc(sectorLabel(data, project.sector))}</span>
    </span>
  </a>`;
}

function pager(project, data, showcase) {
  if (showcase.length < 2) return "";
  const index = showcase.findIndex((item) => item.slug === project.slug);
  const prev = showcase[(index - 1 + showcase.length) % showcase.length];
  const next = showcase[(index + 1) % showcase.length];
  return `<section class="section section--tight ground-mineral-light" aria-label="More featured projects">
  ${edge("wave", { seed: 2 })}
  <div class="wrap pager">
    ${neighbour(prev, data, "prev")}
    ${neighbour(next, data, "next")}
  </div>
</section>`;
}

export function workFeaturePage(project, data, showcase) {
  const cover = bestImage(project);
  return {
    route: `/work/${project.slug}/`,
    title: project.title,
    description: project.summary ?? `${project.title}: an Aware Acoustics project.`,
    bodyClass: "page--work-feature",
    preload: cover?.src,
    body: join([
      hero(project, data),
      overview(project, data),
      gallery(project),
      pager(project, data, showcase)
    ])
  };
}
