/**
 * privacy.js — "/privacy/" · CONTENT_PLAN.md §8 U-01.
 * Legal copy is CLIENT TO PROVIDE under Q-30 and is not drafted here.
 */

import { eyebrow, tagRow } from "../components/ui.js";
import { arcs } from "../components/wave.js";

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
    bodyClass: "page--solid-header",
    body: `<section class="section ground-navy-deep has-lines on-dark util" aria-labelledby="privacy-title">
  ${arcs()}
  <div class="wrap stack-xl">
    <div class="section__head">
      ${eyebrow(null, "Privacy")}
      <h1 class="t-h1" id="privacy-title">Privacy and data <em>handling.</em></h1>
      <p class="t-standfirst measure-46">This page is published in full once the practice's data-handling terms are confirmed with counsel. It will cover:</p>
    </div>
    ${tagRow(SECTIONS, "Sections this page will cover")}
  </div>
</section>`
  };
}
