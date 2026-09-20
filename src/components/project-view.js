/**
 * project-view.js — everything a visitor sees when they open a project.
 *
 * One implementation feeds both surfaces: the /work/ overlay (rendered into a
 * <template> per project and cloned by src/js/work-overlay.js) and the six
 * showcase pages. Nothing here invents copy: a fact that is absent from the
 * record simply has no row, and a project with no photograph gets a mineral
 * plate rather than a grey box.
 *
 * Attribution: open-licence images (CC BY / CC BY-SA) carry a small credit line
 * beside the image, because those licences require it. CC0 needs none.
 */

import { esc, each, when, join } from "../lib/html.js";
import { picture } from "./picture.js";
import { plateClass } from "./material.js";
import { cta } from "./ui.js";
import { sectorLabel, serviceById } from "../lib/data.js";

const STATUS_LABELS = { "in-progress": "In progress", "completed": "Completed" };

const slideClass = (image) => `pv-gallery__slide${image.height > image.width * 1.05 ? " is-portrait" : ""}`;

const formatNumber = (value) => Number(value).toLocaleString("en-IN");

function areaLabel(project) {
  if (!project.area || !project.areaUnit) return null;
  return `${formatNumber(project.area)} ${project.areaUnit === "sq-ft" ? "sq ft" : "sq m"}`;
}

function capacityLabel(project) {
  if (!project.capacity || !project.capacityUnit) return null;
  return `${formatNumber(project.capacity)} ${project.capacityUnit}`;
}

/** "Guwahati, Assam, India" without repeating a city already named in the location. */
export function placeLabel(project) {
  const { city, location } = project;
  if (city && location) return location.toLowerCase().includes(city.toLowerCase()) ? location : `${city}, ${location}`;
  return location || city || null;
}

/** One-line meta for cards: place, sector, first scope item. */
export function projectMeta(project, data) {
  return join([placeLabel(project), sectorLabel(data, project.sector)].filter(Boolean), " · ");
}

/** Rows for the facts table. Each is { label, html } — html already escaped. */
export function projectFacts(project, data) {
  const services = (project.services ?? [])
    .map((id) => serviceById(data, id))
    .filter(Boolean)
    .map((service) => `<a class="pv__service" href="/services/#${esc(service.slug)}">${esc(service.name)}</a>`);

  const rows = [
    { label: "Location", html: esc(placeLabel(project) ?? "") },
    { label: "Sector", html: esc(sectorLabel(data, project.sector)) },
    { label: "Client", html: project.clientPublic ? esc(project.client ?? "") : "" },
    { label: "Scope", html: esc(join(project.scope ?? [], " · ")) },
    { label: "Services", html: join(services, "<br>") },
    { label: "Area", html: esc(areaLabel(project) ?? "") },
    { label: "Capacity", html: esc(capacityLabel(project) ?? "") },
    { label: "Status", html: esc(STATUS_LABELS[project.status] ?? "") },
    { label: "Year", html: esc(project.year ?? "") },
    { label: "Appointed by", html: esc(project.appointedBy ?? "") }
  ];
  return rows.filter((row) => row.html);
}

export function factsTable(rows) {
  if (rows.length === 0) return "";
  return `<dl class="rule-table pv__facts">
${each(rows, (row) => `  <div class="rule-table__row"><dt class="rule-table__label t-label">${esc(row.label)}</dt><dd class="rule-table__value">${row.html}</dd></div>`)}
</dl>`;
}

/** Credit line — only for licences that require attribution. */
function creditLine(image) {
  if (!image || !/^CC BY/i.test(image.licence ?? "")) return "";
  return `<figcaption class="pv-gallery__credit t-meta">Photo: <a href="${esc(image.source)}" rel="noopener">${esc(image.credit)}</a> · ${esc(image.licence)}</figcaption>`;
}

/**
 * Image gallery.
 *   "stage"  — one large image with thumbnails that swap it (overlay)
 *   "stack"  — every image full width, one after another (showcase page)
 */
export function projectGallery(project, { mode = "stage", seed = 1 } = {}) {
  const images = project.images ?? [];

  if (images.length === 0) {
    return `<div class="pv-gallery pv-gallery--plate ${plateClass(seed)}" aria-hidden="true"></div>`;
  }

  if (mode === "stack") {
    return `<div class="pv-gallery pv-gallery--stack">
${each(images, (image, index) => `  <figure class="${slideClass(image)}" data-reveal>${picture(image, { sizes: "(min-width: 1100px) 1200px, 100vw", eager: index === 0 })}${creditLine(image)}</figure>`)}
</div>`;
  }

  const thumbs = images.length > 1
    ? `<ul class="pv-gallery__thumbs">
${each(images, (image, index) => `    <li><button class="pv-gallery__thumb" type="button" data-gallery-thumb="${index}" aria-label="Show image ${index + 1} of ${images.length}" aria-current="${index === 0}">${picture(image, { alt: "", sizes: "120px" })}</button></li>`)}
  </ul>`
    : "";

  return `<div class="pv-gallery" data-gallery>
  <div class="pv-gallery__stage ticks">
${each(images, (image, index) => `    <figure class="${slideClass(image)}" data-gallery-slide${index === 0 ? "" : " hidden"}>${picture(image, { sizes: "(min-width: 900px) 55vw, 100vw", eager: index === 0 })}${creditLine(image)}</figure>`)}
  </div>
  ${thumbs}
</div>`;
}

/** The overlay body: gallery beside the facts. */
export function projectPanel(project, data, { seed = 1 } = {}) {
  return `<article class="pv" data-project-panel="${esc(project.slug)}">
  <div class="pv__media">${projectGallery(project, { mode: "stage", seed })}</div>
  <div class="pv__info">
    <p class="eyebrow">${esc(sectorLabel(data, project.sector))}</p>
    <h2 class="pv__title t-h3" id="pv-title">${esc(project.title)}</h2>
    ${when(project.summary, () => `<p class="pv__lead t-body">${esc(project.summary)}</p>`)}
    ${factsTable(projectFacts(project, data))}
    <div class="cta-row">${cta("/contact/", "Discuss a similar space", "primary")}</div>
  </div>
</article>`;
}
