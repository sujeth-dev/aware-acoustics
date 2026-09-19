/**
 * service-bands.js — the four-band discipline overview.
 *
 * Reused verbatim on Home (§04 Services, WEBSITE_PLAN.md §6) and on
 * /services/ (E-01 overview band, CONTENT_PLAN.md §5) — both are the same
 * content type, a numbered jump list into the four disciplines. Per brand
 * principle this is four full-width bands, never a 2x2 card grid
 * (WEBSITE_PLAN.md §5.4).
 */

import { esc, each, pad2 } from "../lib/html.js";
import { tagRow } from "./ui.js";
import { servicePlate } from "./service-plate.js";

export function serviceBandList(services, hrefPrefix) {
  return `<div class="band-list">
${each(services, (service, index) => `  <article class="band${index % 2 === 1 ? " band--flip" : ""}">
    <span class="band__swatch plate plate--${esc(servicePlate(service.id))}" aria-hidden="true">
      <span class="band__number t-meta">${pad2(index + 1)}</span>
    </span>
    <div class="band__body">
      <h3 class="t-h5">${esc(service.name)}</h3>
      <p class="t-body measure-34">${esc(service.summary)}</p>
      ${tagRow(service.parameters, `${service.name} parameters`)}
    </div>
    <a class="band__link" href="${esc(hrefPrefix)}${esc(service.slug)}">
      <span class="visually-hidden">${esc(service.name)}</span>
      <span aria-hidden="true">↗</span>
    </a>
  </article>`)}
</div>`;
}
