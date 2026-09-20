/**
 * material.js — the mineral / material components (DEC-021).
 *
 *   plateClass(seed)   the class list for a fallback plate, varied by seed so a
 *                      grid of projects without photographs does not repeat itself
 *   buildUp()          the generic ceiling build-up diagram
 *
 * Nothing here carries a figure. Layer names are generic, layers are drawn at equal
 * height, and the caption says so: an illustration of order and kind, not a
 * specification. See mineral.css for the drawing.
 */

import { esc, each } from "../lib/html.js";

const VARIANTS = 4;

/** Class list for a decorative plate: `mineral-plate mineral-plate--N ticks`. */
export function plateClass(seed = 0) {
  const variant = ((Math.abs(Math.trunc(seed)) % VARIANTS) + 1);
  return `mineral-plate mineral-plate--${variant} ticks`;
}

/* Room side → structure side. Names and one-line roles only. */
const LAYERS = [
  { id: "lining", name: "Lining", role: "Board or tile facing the room" },
  { id: "absorbent", name: "Absorbent layer", role: "Mineral or fibre material" },
  { id: "cavity", name: "Air cavity", role: "Void behind the absorber" },
  { id: "structure", name: "Structure", role: "Slab or soffit" }
];

/** The layer stack. Caption text is fixed: the diagram must never read as a spec. */
export function buildUp() {
  return `<figure class="buildup">
  <p class="buildup__end t-label">Room side</p>
  <ol class="buildup__stack" aria-label="Layers from the room to the structure">
${each(LAYERS, (layer, index) => `    <li class="buildup__layer buildup__layer--${esc(layer.id)}" data-reveal style="--i:${index}">
      <span class="buildup__name">${esc(layer.name)}</span>
      <span class="buildup__role">${esc(layer.role)}</span>
    </li>`)}
  </ol>
  <p class="buildup__end t-label">Structure side</p>
  <figcaption class="buildup__caption">
    <span class="t-label">Illustrative build-up</span>
    <span class="t-meta">Layers are drawn at equal height. Not to scale, and not a specification.</span>
  </figcaption>
</figure>`;
}
