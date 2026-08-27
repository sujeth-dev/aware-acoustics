/**
 * work-record.js — "/work/[slug]/" · WEBSITE_PLAN.md §5.3, CONTENT_PLAN.md W-02.
 *
 * Reached only by tier "case" records, which by DEC-007 and the data guards
 * already carry a year, condition, approach, outcome, at least one paired
 * target/measured result and at least one cleared image. The template therefore
 * never needs a placeholder: if a value is absent its row or section is omitted.
 *
 * §03 Verification is the reason this page exists (WEBSITE_PLAN.md §5.3).
 */

import { esc, each, when, join } from "../lib/html.js";
import { eyebrow, cta, tagRow, dataList, fieldCaption } from "../components/ui.js";
import { clientLabel, serviceById } from "../lib/data.js";

/** "airport-and-transport" -> "Airport and transport". Presentation only. */
function humanise(value) {
  const words = String(value).replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

const STATUS_LABELS = {
  "unknown": null,
  "in-progress": "In progress",
  "completed": "Completed"
};

function measureLabel(project) {
  if (project.area && project.areaUnit) {
    const unit = project.areaUnit === "sq-ft" ? "sq ft" : "sq m";
    return `${project.area.toLocaleString("en-IN")} ${unit}`;
  }
  if (project.capacity && project.capacityUnit) {
    return `${project.capacity.toLocaleString("en-IN")} ${project.capacityUnit}`;
  }
  return null;
}

function hero(project) {
  const cover = (project.images ?? [])[0];
  const plate = cover
    ? `<img class="record-hero__image" src="${esc(cover.src)}" alt="${esc(cover.alt)}" width="${esc(cover.width)}" height="${esc(cover.height)}" decoding="async">`
    : "";

  const caption = fieldCaption(
    clientLabel(project),
    [project.location, project.year, measureLabel(project)].filter(Boolean).map(String)
  );

  return `<section class="record-hero plate plate--veiled on-dark">
  ${plate}
  <div class="record-hero__body">
    ${eyebrow(null, "Project record")}
    <h1 class="t-h3">${esc(project.title)}</h1>
  </div>
  ${caption}
</section>`;
}

function facts(project, data) {
  const services = project.services
    .map((id) => serviceById(data, id))
    .filter(Boolean)
    .map((service) => service.name);

  return dataList([
    { label: "Sector", value: humanise(project.sector) },
    { label: project.area ? "Area" : "Capacity", value: measureLabel(project) },
    { label: "Status", value: STATUS_LABELS[project.status] ?? null },
    { label: "Scope", value: (project.scope ?? []).join(" · ") },
    { label: "Appointed by", value: project.appointedBy },
    { label: "Disciplines", value: services.join(" · ") }
  ]);
}

function narrative(number, label, heading, text) {
  if (!text) return "";
  return `<section class="section section--tight ground-dust">
  ${eyebrow(number, label)}
  <h2 class="t-h5 record-narrative__heading">${esc(heading)}</h2>
  <p class="t-body record-narrative__body">${esc(text)}</p>
</section>`;
}

/** §03 — the target/measured table. Rendered only from paired results. */
function verification(project, data) {
  const targets = project.targets ?? [];
  const measured = project.measured ?? [];
  if (measured.length === 0) return "";

  const rows = measured.map((result) => {
    const target = targets.find(
      (candidate) =>
        candidate.parameter === result.parameter &&
        candidate.space === result.space &&
        candidate.unit === result.unit
    );
    const standard = result.standard
      ? data.standards.find((entry) => entry.id === result.standard)
      : null;
    return { result, target, standard };
  });

  return `<section class="section ground-navy on-dark">
  ${eyebrow(3, "Verification")}
  <h2 class="t-h5">Target against measured result.</h2>
  <table class="result-table t-data">
    <thead>
      <tr>
        <th scope="col">Parameter</th>
        <th scope="col">Space</th>
        <th scope="col">Target</th>
        <th scope="col">Measured</th>
        <th scope="col">Standard</th>
      </tr>
    </thead>
    <tbody>
${each(rows, ({ result, target, standard }) => `      <tr>
        <th scope="row" data-label="Parameter">${esc(result.parameter)}</th>
        <td data-label="Space">${esc(result.space)}</td>
        <td data-label="Target">${target ? esc(`${target.value} ${target.unit}`) : ""}</td>
        <td data-label="Measured">${esc(`${result.value} ${result.unit}`)}</td>
        <td data-label="Standard">${standard ? esc(standard.designation) : ""}</td>
      </tr>`)}
    </tbody>
  </table>
</section>`;
}

function standardsAndTools(project, data) {
  const designations = (project.standards ?? [])
    .map((id) => data.standards.find((standard) => standard.id === id))
    .filter(Boolean)
    .map((standard) => standard.designation);

  if (designations.length === 0 && (project.tools ?? []).length === 0) return "";

  return `<section class="section section--tight ground-dust-warm">
  ${eyebrow(4, "Standards and tools")}
  <div class="stack-lg record-tags">
    ${tagRow(designations, "Standards applied")}
    ${tagRow(project.tools, "Software used")}
  </div>
</section>`;
}

function gallery(project) {
  const images = (project.images ?? []).slice(1);
  if (images.length === 0) return "";
  return `<section class="section section--tight ground-dust">
  <h2 class="visually-hidden">Gallery</h2>
  <div class="gallery">
${each(images, (image) => `    <figure class="gallery__item">
      <img src="${esc(image.src)}" alt="${esc(image.alt)}" width="${esc(image.width)}" height="${esc(image.height)}" loading="lazy" decoding="async">
      ${when(image.caption, () => `<figcaption class="t-meta">${esc(image.caption)}</figcaption>`)}
    </figure>`)}
  </div>
</section>`;
}

function pagination(project, siblings) {
  const index = siblings.findIndex((candidate) => candidate.slug === project.slug);
  const previous = index > 0 ? siblings[index - 1] : null;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null;
  if (!previous && !next) return "";

  return `<nav class="record-pagination section section--tight ground-dust-warm" aria-label="Adjacent project records">
  ${when(previous, () => `<a class="record-pagination__link" href="/work/${esc(previous.slug)}/"><span class="t-label">Previous</span><span>${esc(previous.title)}</span></a>`)}
  ${when(next, () => `<a class="record-pagination__link record-pagination__link--next" href="/work/${esc(next.slug)}/"><span class="t-label">Next</span><span>${esc(next.title)}</span></a>`)}
</nav>`;
}

/** Reverse link into the Services page — WEBSITE_PLAN.md §7. */
function serviceLinks(project, data) {
  const services = project.services.map((id) => serviceById(data, id)).filter(Boolean);
  if (services.length === 0) return "";
  return `<p class="record-services t-meta">${each(services, (service) => `<a href="/services/#${esc(service.slug)}">${esc(service.name)}</a>`)}</p>`;
}

export function workRecordPage(project, data, siblings = []) {
  return {
    route: `/work/${project.slug}/`,
    title: project.title,
    description: project.summary ?? `${project.title} — acoustic project record.`,
    bodyClass: "page--hero-dark",
    body: join([
      hero(project),
      `<section class="section section--tight ground-dust">${facts(project, data)}${serviceLinks(project, data)}</section>`,
      narrative(1, "Condition", "What the space presented.", project.condition),
      narrative(2, "Approach", "What was specified, and why.", project.approach),
      verification(project, data),
      standardsAndTools(project, data),
      gallery(project),
      pagination(project, siblings),
      `<section class="section ground-dust centred">
  <h2 class="t-h5">Bring us the next drawing set.</h2>
  <p class="stack-lg">${cta("/contact/", "Start a conversation", "primary")}</p>
</section>`
    ])
  };
}
