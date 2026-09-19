/**
 * record-row.js — the numbered project row (brand A7).
 *
 * Two compositions, chosen by tier (DEC-007):
 *   case   — thumbnail, title, meta, ↗ link into /work/[slug]/
 *   record — texture plate, title, meta, NOT a link (there is no page to reach)
 *
 * Every rendered value comes from the project record. A missing value drops out
 * of the meta line rather than rendering a label with nothing after it.
 */

import { esc, each, when, pad2, join } from "../lib/html.js";
import { clientLabel, sectorLabel } from "../lib/data.js";

/** The one headline measured value, when the record carries one. */
export function headlineMeasured(project) {
  const first = (project.measured ?? [])[0];
  if (!first) return null;
  return `${first.parameter} ${first.value}${first.unit}`;
}

function image(item) {
  return `<img class="record-row__thumb" src="${esc(item.src)}" alt="${esc(item.alt)}" width="${esc(item.width)}" height="${esc(item.height)}" loading="lazy" decoding="async">`;
}

function thumbnail(project, isCase) {
  const images = project.images ?? [];
  // A case row is one thumbnail into its record; a list row shows the exterior
  // and interior side by side, so the pair reads as one facility.
  if (isCase && images[0]) return image(images[0]);
  if (images.length > 0) return `<span class="record-row__thumbs">${each(images.slice(0, 2), image)}</span>`;
  // A list-tier record shows a texture plate, never a grey placeholder box.
  return `<span class="record-row__thumb record-row__thumb--plate plate plate--slab" aria-hidden="true"></span>`;
}

/** A photo of a related site says so on the row — it is not the project's own photography. */
function basisNote(project) {
  const shown = (project.images ?? []).find((item) => item.representative);
  return shown ? `<span class="record-row__basis t-meta">Representative image · ${esc(shown.depicts)}</span>` : "";
}

export function recordRow(project, index, data) {
  const isCase = project.tier === "case";
  const meta = isCase
    ? [clientLabel(project), project.city, project.year, headlineMeasured(project)]
    : [project.location, sectorLabel(data, project.sector), ...(project.scope ?? []).slice(0, 1)];

  const inner = `<span class="record-row__number t-meta">${pad2(index + 1)}</span>
  ${thumbnail(project, isCase)}
  <span class="record-row__info">
    <span class="record-row__title">${esc(project.title)}</span>
    <span class="record-row__meta t-meta">${esc(join(meta.filter(Boolean).map(String), " · "))}</span>
    ${basisNote(project)}
  </span>
  ${when(isCase, '<span class="record-row__glyph" aria-hidden="true">↗</span>')}`;

  return isCase
    ? `<a class="record-row record-row--case" data-sector="${esc(project.sector)}" href="/work/${esc(project.slug)}/">${inner}</a>`
    : `<div class="record-row record-row--list" data-sector="${esc(project.sector)}">${inner}</div>`;
}

export function recordRows(projects, data) {
  return each(projects, (project, index) => recordRow(project, index, data));
}
