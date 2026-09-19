/**
 * contact.js — "/contact/" · WEBSITE_PLAN.md §5.6/§5.6.1, CONTENT_PLAN.md §7.
 *
 * The form here is structural only — field markup and layout per §5.6.1.
 * Submission (endpoint, spam protection, success/failure states) is Phase 9
 * (DEC-009: a Vercel serverless function, no third-party JS, no CAPTCHA per
 * DEC-006). Nothing in this file wires a submit handler.
 *
 * "What happens next" ships only its first two lines. The third
 * (CONTENT_PLAN.md §7 "Next 03") is `CLIENT TO CONFIRM` — response time is
 * not supplied — so per the status-label rule (§1.1, "may ship? No") it is
 * left unpublished rather than implying a commitment that isn't confirmed.
 * Office address is omitted — legal address is Q-01, CLIENT TO PROVIDE.
 */

import { esc, each, when, join } from "../lib/html.js";
import { eyebrow } from "../components/ui.js";

const PROJECT_TYPES = [
  "Corporate", "Auditorium / assembly", "Healthcare", "Education", "Hospitality",
  "Airport / transport", "Residential", "Industrial", "Other"
];

const PROJECT_STAGES = [
  "Concept", "Design development", "Tender", "Under construction", "Complete / remedial"
];

const NEXT_STEPS = [
  "We review the project stage and scope.",
  "We identify the criteria, information and site inputs required."
];

function textField(id, label, type, required = false) {
  return `<div class="field">
    <label class="t-label" for="${id}">${esc(label)}${required ? "" : " (optional)"}</label>
    <input class="field__input" type="${type}" id="${id}" name="${id}"${required ? " required" : ""}>
  </div>`;
}

function selectField(id, label, options, required = false) {
  return `<div class="field">
    <label class="t-label" for="${id}">${esc(label)}</label>
    <select class="field__select" id="${id}" name="${id}"${required ? " required" : ""}>
      <option value="" disabled selected hidden></option>
      ${each(options, (option) => `<option value="${esc(option)}">${esc(option)}</option>`)}
    </select>
  </div>`;
}

function textareaField(id, label, required = false) {
  return `<div class="field">
    <label class="t-label" for="${id}">${esc(label)}</label>
    <textarea class="field__textarea" id="${id}" name="${id}"${required ? " required" : ""}></textarea>
  </div>`;
}

function form() {
  // Structural only — see file header. No action/handler is wired here.
  return `<form class="form" aria-label="Send a project enquiry">
    ${textField("name", "Name", "text", true)}
    ${textField("organisation", "Organisation", "text", true)}
    ${textField("email", "Email", "email", true)}
    ${textField("phone", "Phone", "tel")}
    ${textField("location", "Project location", "text")}
    ${selectField("project-type", "Project type", PROJECT_TYPES, true)}
    ${selectField("project-stage", "Project stage", PROJECT_STAGES, true)}
    ${textareaField("message", "Message", true)}
    <div class="field field--consent">
      <input class="field__checkbox" type="checkbox" id="consent" name="consent" required>
      <label class="t-meta" for="consent">I agree that Aware Acoustics may use these details to respond to this enquiry. <a href="/privacy/">Privacy</a>.</label>
    </div>
    <p class="form__foot"><button class="cta cta--primary" type="submit">Send the enquiry<span class="cta__glyph" aria-hidden="true">↗</span></button></p>
  </form>`;
}

function directRoutes(settings) {
  return `<div class="stack-lg">
    <div>
      <p class="t-label">Direct</p>
      <p class="t-meta home-appointment__direct">
        ${each(settings.phones, (phone) => `<a href="tel:${esc(phone.replace(/[^\d+]/g, ""))}">${esc(phone)}</a>`)}
        ${each(settings.emails, (email) => `<a href="mailto:${esc(email)}">${esc(email)}</a>`)}
      </p>
    </div>
    ${when(settings.address, () => `<div>
      <p class="t-label">Office</p>
      <p class="t-body">${esc(settings.address)}</p>
    </div>`)}
    <div>
      <p class="t-label">What happens next</p>
      <ol class="process-spine">
        ${each(NEXT_STEPS, (step, index) => `<li class="process-spine__item">
          <span class="process-spine__number t-meta">${esc(String(index + 1).padStart(2, "0"))}</span>
          <p class="t-body">${esc(step)}</p>
        </li>`)}
      </ol>
    </div>
  </div>`;
}

export function contactPage(data) {
  const { settings } = data;

  return {
    route: "/contact/",
    title: "Contact",
    description: "Send a plan, a programme or a problem that has not happened yet.",
    body: join([
      `<section class="section ground-dust" aria-labelledby="contact-title">
  <div class="section__head">
    ${eyebrow(1, "Appointment")}
    <h1 class="t-h2" id="contact-title">Send us a plan. A programme. A problem that has not happened yet.</h1>
    <p class="t-standfirst measure-46">Include the project type, location and current stage. A drawing set, room schedule or acoustic brief gives the conversation a useful starting point.</p>
  </div>
</section>`,
      `<section class="section section--tight ground-dust-warm">
  <div class="grid grid--contact">
    ${form()}
    ${directRoutes(settings)}
  </div>
</section>`
    ])
  };
}
