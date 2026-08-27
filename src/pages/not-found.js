/** not-found.js — "/404/" · CONTENT_PLAN.md §8 U-02. No joke copy, no illustration. */

import { eyebrow, cta } from "../components/ui.js";

export function notFoundPage() {
  return {
    route: "/404/",
    title: "Not found",
    description: "This address does not resolve.",
    body: `<section class="section ground-dust">
  ${eyebrow(null, "Not found")}
  <h1 class="t-h2">This address does not resolve.</h1>
  <p class="t-body">Continue through the work, the services or the appointment route.</p>
  <p class="stack-lg">
    ${cta("/work/", "Work")}
    ${cta("/services/", "Services")}
    ${cta("/contact/", "Contact")}
  </p>
</section>`
  };
}
