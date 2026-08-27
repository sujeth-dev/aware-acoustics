/**
 * privacy.js — "/privacy/" · CONTENT_PLAN.md §8 U-01.
 * Legal copy is CLIENT TO PROVIDE under Q-30 and is not drafted here.
 */

import { eyebrow } from "../components/ui.js";

export function privacyPage() {
  return {
    route: "/privacy/",
    title: "Privacy",
    description: "How Aware Acoustics handles enquiry data.",
    body: `<section class="section ground-dust">
  ${eyebrow(1, "Privacy")}
  <h1 class="t-h2">Privacy and data handling.</h1>
</section>`
  };
}
