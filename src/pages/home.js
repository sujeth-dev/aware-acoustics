/**
 * home.js — "/" · WEBSITE_PLAN.md §5.1 and §6, CONTENT_PLAN.md §3.
 * Phase 3a: shell and hero head only. Full six-section build is Phase 5.
 */

import { eyebrow } from "../components/ui.js";

export function homePage() {
  return {
    route: "/",
    title: null,
    description: "Independent acoustic consultancy for the built environment.",
    body: `<section class="section ground-dust">
  ${eyebrow(null, "Independent acoustic consultancy")}
  <h1 class="t-hero">Performance is specified. Then measured.</h1>
</section>`
  };
}
