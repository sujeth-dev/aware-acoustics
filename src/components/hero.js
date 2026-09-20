/**
 * hero.js — the page-opening composition (see hero.css for the layer order).
 *
 * `title` and `lead` may carry inline markup (an <em> for the italic accent),
 * so callers pass trusted, already-escaped HTML for them and plain text for the
 * eyebrow. Slides are project image records; with none, the hero is the solid
 * navy variant and the sound arcs carry the composition.
 */

import { esc, each, when } from "../lib/html.js";
import { eyebrow, factsStrip } from "./ui.js";
import { picture } from "./picture.js";
import { arcs } from "./wave.js";

/**
 * @param {object} options
 * @param {string} options.id            Heading id (aria-labelledby target).
 * @param {string} options.label         Eyebrow text.
 * @param {string} options.title         h1 inner HTML.
 * @param {string} [options.lead]        Lead paragraph inner HTML.
 * @param {object[]} [options.slides]    Image records; several crossfade.
 * @param {string} [options.actions]     Pre-built button markup.
 * @param {string} [options.tags]        Pre-built tag row markup.
 * @param {{figure: *, label: string}[]} [options.facts]  Figures for the base strip.
 * @param {"tall"|"medium"|"compact"} [options.size]
 * @param {string} [options.titleClass]  Type class for the h1.
 */
export function imageHero({
  id,
  label,
  title,
  lead = "",
  slides = [],
  actions = "",
  tags = "",
  facts = [],
  size = "medium",
  titleClass = "t-hero"
}) {
  const hasMedia = slides.length > 0;
  const strip = factsStrip(facts, { dark: true });

  return `<section class="hero hero--${esc(size)}${hasMedia ? "" : " hero--solid"} has-lines on-dark" aria-labelledby="${esc(id)}"${slides.length > 1 ? " data-hero-carousel" : ""}>
  ${when(hasMedia, () => `<div class="hero__media" aria-hidden="true">
${each(slides, (image, index) => `    <div class="hero__slide${index === 0 ? " is-active" : ""}">${picture(image, { alt: "", eager: index === 0, sizes: "100vw" })}</div>`)}
  </div>`)}
  <div class="hero__shade"></div>
  ${arcs()}
  <div class="hero__inner">
    <div class="hero__body">
      ${eyebrow(null, label)}
      <h1 class="hero__title ${esc(titleClass)}" id="${esc(id)}">${title}</h1>
      ${when(lead, () => `<p class="hero__lead t-lead">${lead}</p>`)}
      ${tags}
      ${when(actions, () => `<div class="cta-row">${actions}</div>`)}
    </div>
    ${when(slides.length > 1, () => '<div class="hero__dots" data-hero-dots></div>')}
  </div>
  ${when(strip, () => `<div class="hero__facts"><div class="hero__facts-wrap">${strip}</div></div>`)}
</section>`;
}
