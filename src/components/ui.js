/**
 * ui.js — the small shared components named in brand Part A §A7.
 * Text-only CTAs with a red underline. No filled buttons on the public site.
 */

import { esc, when, each, pad2 } from "../lib/html.js";

/** Section eyebrow: red number · label. `number` may be omitted (e.g. 404). */
export function eyebrow(number, label) {
  const prefix = number === null || number === undefined
    ? ""
    : `<span class="eyebrow__number">${esc(typeof number === "number" ? pad2(number) : number)}</span>`;
  return `<p class="eyebrow">${prefix}${esc(label)}</p>`;
}

/** Text CTA with the red underline. `tier` is "primary" or "secondary". */
export function cta(href, label, tier = "secondary") {
  return `<a class="cta cta--${esc(tier)}" href="${esc(href)}">${esc(label)}<span class="cta__glyph" aria-hidden="true">↗</span></a>`;
}

/** Bordered tag row — discipline tags, parameters, standards. No fill. */
export function tagRow(items, label) {
  if (!Array.isArray(items) || items.length === 0) return "";
  return `<ul class="tag-row"${label ? ` aria-label="${esc(label)}"` : ""}>
${each(items, (item) => `<li class="tag">${esc(item)}</li>`)}
</ul>`;
}

/** Field caption card — semi-transparent overlay over a texture plate. */
export function fieldCaption(title, metaLines) {
  return `<div class="field-caption">
  <p class="field-caption__title">${esc(title)}</p>
  ${each(metaLines, (line) => `<p class="field-caption__meta t-meta">${esc(line)}</p>`)}
</div>`;
}

/** Two-column key/value data row set — A7 "Data table". */
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

/**
 * Development-fixture marker.
 *
 * Used where a section's real content is blocked on a client answer. It states
 * the gap and the blocking question ID; it never stands in for the content with
 * sample prose or demonstration numbers (MASTER_PLAN.md §1, CONTENT_PLAN.md §1).
 * Rendered only when NODE_ENV !== "production" — the production behaviour for
 * each gated section is documented alongside its call site.
 */
export function devFixture(heading, detail, blockedOn) {
  return `<aside class="dev-fixture" role="note" aria-label="Development fixture">
  <p class="dev-fixture__flag t-label">Dev fixture · not for review or production</p>
  <p class="dev-fixture__heading">${esc(heading)}</p>
  <p class="dev-fixture__detail t-meta">${esc(detail)}</p>
  ${when(blockedOn, () => `<p class="dev-fixture__blocked t-label">Blocked on ${esc(blockedOn)}</p>`)}
</aside>`;
}
