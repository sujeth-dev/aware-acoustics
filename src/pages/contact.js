/** contact.js — "/contact/" · WEBSITE_PLAN.md §5.6. Form and endpoint are Phase 9. */

import { eyebrow } from "../components/ui.js";

export function contactPage() {
  return {
    route: "/contact/",
    title: "Contact",
    description: "Send a plan, a programme or a problem that has not happened yet.",
    body: `<section class="section ground-dust">
  ${eyebrow(1, "Appointment")}
  <h1 class="t-h2">Send us a plan. A programme. A problem that has not happened yet.</h1>
</section>`
  };
}
