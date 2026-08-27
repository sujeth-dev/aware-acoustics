/** about.js — "/about/" · WEBSITE_PLAN.md §5.5, practice + method merged (DEC-011). Phase 8. */

import { eyebrow } from "../components/ui.js";

export function aboutPage() {
  return {
    route: "/about/",
    title: "About",
    description: "Independent in advice. Accountable in measurement.",
    body: `<section class="section ground-dust">
  ${eyebrow(1, "About")}
  <h1 class="t-h2">Independent in advice. Accountable in measurement.</h1>
</section>`
  };
}
