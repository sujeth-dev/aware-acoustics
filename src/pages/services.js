/** services.js — "/services/" · WEBSITE_PLAN.md §5.4. Four in-page anchors, Phase 7. */

import { eyebrow } from "../components/ui.js";

export function servicesPage() {
  return {
    route: "/services/",
    title: "Services",
    description: "Four connected disciplines carry the brief from the first target to the final measurement.",
    body: `<section class="section ground-dust">
  ${eyebrow(1, "Services")}
  <h1 class="t-h2">Acoustic performance, from criterion to handover.</h1>
</section>`
  };
}
