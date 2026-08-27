/** work.js — "/work/" · WEBSITE_PLAN.md §5.2. Phase 6 builds the record rows. */

import { eyebrow } from "../components/ui.js";

export function workPage() {
  return {
    route: "/work/",
    title: "Work",
    description: "Project records organised by sector, discipline and the evidence available to publish.",
    body: `<section class="section ground-dust">
  ${eyebrow(1, "Work")}
  <h1 class="t-h2">Work held to a number.</h1>
</section>`
  };
}
