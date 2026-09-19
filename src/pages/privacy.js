/**
 * privacy.js — "/privacy/" · CONTENT_PLAN.md §8 U-01.
 * Legal copy is CLIENT TO PROVIDE under Q-30 and is not drafted here.
 */

import { eyebrow, tagRow } from "../components/ui.js";

// The minimum section set required by CONTENT_PLAN.md §8 U-01, named here
// only as a scope preview — no policy text is drafted until counsel and the
// client supply it (Q-30). Listing the sections is not the same as
// publishing their content.
const SECTIONS = [
  "Data collected", "Purpose", "Lawful basis and consent", "Retention",
  "Processors", "Security", "Access, correction and deletion", "Contact"
];

export function privacyPage() {
  return {
    route: "/privacy/",
    title: "Privacy",
    description: "How Aware Acoustics handles enquiry data.",
    body: `<section class="section ground-dust" aria-labelledby="privacy-title">
  <div class="section__head">
    ${eyebrow(1, "Privacy")}
    <h1 class="t-h2" id="privacy-title">Privacy and data handling.</h1>
    <p class="t-standfirst measure-46">This page is published in full once the practice's data-handling terms are confirmed with counsel. It will cover:</p>
  </div>
  ${tagRow(SECTIONS, "Sections this page will cover")}
</section>`
  };
}
