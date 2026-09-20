/** not-found.js — "/404/" · CONTENT_PLAN.md §8 U-02. No joke copy, no illustration. */

import { eyebrow, cta } from "../components/ui.js";
import { arcs } from "../components/wave.js";

export function notFoundPage() {
  return {
    route: "/404/",
    title: "Not found",
    description: "This address does not resolve.",
    bodyClass: "page--solid-header",
    footerCta: false,
    body: `<section class="section ground-navy-deep has-lines on-dark util" aria-labelledby="not-found-title">
  ${arcs()}
  <div class="wrap stack-lg">
    ${eyebrow(null, "Not found")}
    <h1 class="t-h1" id="not-found-title">This address does not <em>resolve.</em></h1>
    <p class="t-lead">Continue through the work, the services or the appointment route.</p>
    <div class="cta-row">
      ${cta("/work/", "Work", "primary")}
      ${cta("/services/", "Services", "secondary")}
      ${cta("/contact/", "Contact", "secondary")}
    </div>
  </div>
</section>`
  };
}
