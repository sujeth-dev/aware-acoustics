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
import { clientLabel } from "../lib/data.js";

/** The one headline measured value, when the record carries one. */
export function headlineMeasured(project) {
  const first = (project.measured ?? [])[0];
  if (!first) return null;
  return `${first.parameter} ${first.value}${first.unit}`;
}

function thumbnail(project) {
  const image = (project.images ?? [])[0];
  if (image) {
    return `<img class="record-row__thumb" src="${esc(image.src)}" alt="${esc(image.alt)}" width="${esc(image.width)}" height="${esc(image.height)}" loading="lazy" decoding="async">`;
  }
  // A list-tier record shows a texture plate, never a grey placeholder box.
  return `<span class="record-row__thumb record-row__thumb--plate plate plate--slab" aria-hidden="true"></span>`;
}

export function recordRow(project, index) {
  const isCase = project.tier === "case";
  const meta = isCase
    ? [clientLabel(project), project.city, project.year, headlineMeasured(project)]
    : [project.location, project.sector, ...(project.scope ?? []).slice(0, 1)];

  const inner = `<span class="record-row__number t-meta">${pad2(index + 1)}</span>
  ${thumbnail(project)}
  <span class="record-row__info">
    <span class="record-row__title">${esc(project.title)}</span>
    <span class="record-row__meta t-meta">${esc(join(meta.filter(Boolean).map(String), " · "))}</span>
  </span>
  ${when(isCase, '<span class="record-row__glyph" aria-hidden="true">↗</span>')}`;

  return isCase
    ? `<a class="record-row record-row--case" href="/work/${esc(project.slug)}/">${inner}</a>`
    : `<div class="record-row record-row--list">${inner}</div>`;
}

export function recordRows(projects) {
  return each(projects, (project, index) => recordRow(project, index));
}
