/**
 * ui.js — the small shared components.
 *
 * DEC-020 retired the numbered red eyebrow and the text-only CTA: the eyebrow
 * is now a mono label with a gold rule, and the primary CTA is a filled button.
 */

import { esc, each } from "../lib/html.js";

/**
 * Section eyebrow: a mono label with a leading gold rule.
 * The first argument is kept for older call sites and is ignored — section
 * numbering is no longer part of the design language.
 */
export function eyebrow(_number, label) {
  return `<p class="eyebrow">${esc(label)}</p>`;
}

/** Button link. `tier` is "primary" (crimson fill) or "secondary" (outline); `extra` adds modifier classes. */
export function cta(href, label, tier = "secondary", extra = "") {
  const modifiers = [`cta--${esc(tier)}`, extra].filter(Boolean).join(" ");
  return `<a class="cta ${modifiers}" href="${esc(href)}">${esc(label)}<span class="cta__glyph" aria-hidden="true">↗</span></a>`;
}

/** Outlined tag row — discipline tags, parameters, standards. */
export function tagRow(items, label) {
  if (!Array.isArray(items) || items.length === 0) return "";
  return `<ul class="tag-row"${label ? ` aria-label="${esc(label)}"` : ""}>
${each(items, (item) => `<li class="tag">${esc(item)}</li>`)}
</ul>`;
}

/** Field caption card — semi-transparent overlay over an image. */
export function fieldCaption(title, metaLines) {
  return `<div class="field-caption">
  <p class="field-caption__title">${esc(title)}</p>
  ${each(metaLines, (line) => `<p class="field-caption__meta t-meta">${esc(line)}</p>`)}
</div>`;
}

/** Two-column key/value data row set. */
export function dataList(rows) {
  const present = (rows ?? []).filter((row) => row && row.value !== null && row.value !== undefined && row.value !== "");
  if (present.length === 0) return "";
  return `<dl class="data-list t-data">
${each(present, (row) => `  <div class="data-list__row">
    <dt class="data-list__label">${esc(row.label)}</dt>
    <dd class="data-list__value">${esc(row.value)}</dd>
  </div>`)}
</dl>`;
}

/** A single large figure with a mono label. */
export function stat(figure, label) {
  if (figure === null || figure === undefined || figure === "") return "";
  return `<div class="stat">
    <p class="stat__figure">${esc(figure)}</p>
    <p class="stat__label t-label">${esc(label)}</p>
  </div>`;
}

/**
 * Ruled strip of figures — the replacement for the old numbered squares.
 * Every figure is computed from data by the caller; nothing is hardcoded here.
 * @param {{figure: string|number, label: string}[]} items
 */
export function factsStrip(items, { dark = false } = {}) {
  const present = (items ?? []).filter((item) => item && item.figure !== null && item.figure !== undefined && item.figure !== "");
  if (present.length === 0) return "";
  return `<ul class="facts${dark ? " facts--dark on-dark" : ""}" style="--cols:${present.length}">
${each(present, (item) => `  <li class="facts__cell" data-reveal>${stat(item.figure, item.label)}</li>`)}
</ul>`;
}

/**
 * Development placeholder — retained for templates that still gate on client
 * evidence. Rendered only outside production builds; no current page uses it.
 */
export function devFixture(heading, plateVariant = "felt") {
  return `<div class="dev-fixture plate plate--${esc(plateVariant)}" role="note" aria-label="Placeholder, not final content">
  <p class="dev-fixture__flag t-label">Placeholder — content pending</p>
  <p class="dev-fixture__heading t-h5">${esc(heading)}</p>
</div>`;
}
