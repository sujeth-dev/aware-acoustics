/**
 * work-record.js — "/work/[slug]/" · WEBSITE_PLAN.md §5.3.
 * Only tier "case" records reach this template (DEC-007). Phase 6 builds it out.
 */

import { esc } from "../lib/html.js";
import { clientLabel } from "../lib/data.js";

export function workRecordPage(project) {
  return {
    route: `/work/${project.slug}/`,
    title: project.title,
    description: project.summary ?? "",
    body: `<section class="section ground-dust">
  <h1 class="t-h3">${esc(project.title)}</h1>
  <p class="t-meta">${esc(clientLabel(project))}</p>
</section>`
  };
}
