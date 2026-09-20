/**
 * contact.js — "/contact/" · DEC-020 redesign of WEBSITE_PLAN.md §5.6.
 *
 * An interactive, four-step enquiry with a live summary. Submission composes a
 * pre-filled email (src/js/contact-flow.js): no server is involved, so there is
 * no third-party script and no stored data. The recipients come from
 * settings.enquiryEmail, falling back to settings.emails.
 *
 * Without JavaScript the same fields render as one plain form whose action is a
 * mailto:, so the page is complete and usable with scripting blocked.
 *
 * "What happens next" ships only its first two lines; the third (a response
 * time) is not supplied, so no commitment is implied. The office address is
 * omitted until a legal address is provided (Q-01).
 */

import { esc, each, when, join } from "../lib/html.js";
import { eyebrow } from "../components/ui.js";
import { arcs, edge } from "../components/wave.js";

const PROJECT_TYPES = [
  "Corporate", "Auditorium / assembly", "Healthcare", "Education", "Hospitality",
  "Airport / transport", "Residential", "Industrial", "Other"
];

const PROJECT_STAGES = [
  "Concept", "Design development", "Tender", "Under construction", "Complete / remedial"
];

const STEPS = ["The space", "Stage and scope", "The project", "You"];

const NEXT_STEPS = [
  "We review the project stage and scope.",
  "We identify the criteria, information and site inputs required."
];

const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/* ─── Hero ─── */

function reachItem(kind, value, href) {
  return `<li class="reach__item">
    <a class="reach__link" href="${esc(href)}"><span class="t-label">${esc(kind)}</span><span class="reach__value">${esc(value)}</span></a>
    <button class="reach__copy" type="button" data-copy="${esc(value)}" aria-label="Copy ${esc(kind.toLowerCase())} ${esc(value)}" hidden>Copy</button>
  </li>`;
}

function hero(settings) {
  const place = join([settings.city, settings.country].filter(Boolean), ", ");
  return `<section class="hero hero--solid hero--medium has-lines on-dark" aria-labelledby="contact-title">
  <div class="hero__shade"></div>
  ${arcs()}
  <div class="hero__inner">
    <div class="hero__split">
      <div class="hero__body">
        ${eyebrow(null, "Contact")}
        <h1 class="hero__title t-h1" id="contact-title">Start a <em>conversation.</em></h1>
        <p class="hero__lead t-lead">Send us a plan. A programme. A problem that has not happened yet.</p>
        <p class="t-body hero__note">Include the project type, location and current stage. A drawing set, room schedule or acoustic brief gives the conversation a useful starting point.</p>
        <p><a class="cta cta--gold" href="#enquiry">Start the enquiry <span class="cta__glyph" aria-hidden="true">↓</span></a></p>
      </div>
      <div class="reach panel panel--dark ticks" data-reveal>
        <p class="t-label reach__title">Reach us directly</p>
        <ul class="reach__list">
${each(settings.phones, (phone) => reachItem("Call", phone, telHref(phone)))}
${each(settings.emails, (email) => reachItem("Email", email, `mailto:${email}`))}
        </ul>
        ${when(place, () => `<p class="reach__place t-meta">${esc(place)}</p>`)}
      </div>
    </div>
  </div>
</section>`;
}

/* ─── Form fields ─── */

function chip(name, value, { type = "radio", required = false } = {}) {
  return `<label class="chip"><input type="${type}" name="${esc(name)}" value="${esc(value)}"${required ? " required" : ""}><span>${esc(value)}</span></label>`;
}

function textField(id, label, type, { required = false, autocomplete = "" } = {}) {
  return `<div class="field">
    <label class="t-label" for="${id}">${esc(label)}${required ? "" : " (optional)"}</label>
    <input class="field__input" type="${type}" id="${id}" name="${id}"${required ? " required" : ""}${autocomplete ? ` autocomplete="${autocomplete}"` : ""}>
  </div>`;
}

function step(index, legend, hint, body) {
  return `<fieldset class="enq-step" data-step="${index}"${index === 0 ? "" : ""}>
    <legend class="enq-step__legend"><span class="t-label">Step ${index + 1} of ${STEPS.length}</span><span class="enq-step__title t-h4">${esc(legend)}</span></legend>
    <p class="t-body enq-step__hint">${esc(hint)}</p>
    ${body}
  </fieldset>`;
}

function form(data) {
  const { settings } = data;
  const recipients = settings.enquiryEmail ? [settings.enquiryEmail] : settings.emails;
  const action = recipients.length > 0 ? `mailto:${recipients.join(",")}` : "";

  return `<form class="enq-form panel" id="enquiry-form" data-enquiry data-to="${esc(recipients.join(","))}" data-site="${esc(settings.tradingName)}" aria-label="Send a project enquiry"${action ? ` action="${esc(action)}" method="post" enctype="text/plain"` : ""}>

    <ol class="enq-progress" aria-label="Enquiry steps" data-progress hidden>
${each(STEPS, (label, index) => `      <li><button class="enq-progress__btn" type="button" data-goto="${index}"><span class="enq-progress__dot" aria-hidden="true"></span><span class="enq-progress__label">${esc(label)}</span></button></li>`)}
    </ol>

    ${step(0, "What kind of space?", "Choose the closest match. You can add detail in the message.",
      `<div class="chips" role="radiogroup" aria-label="Project type">${each(PROJECT_TYPES, (type) => chip("project-type", type, { required: true }))}</div>`)}

    ${step(1, "Where is it, and what do you need?", "Tell us the stage, and tick any disciplines you already know you need.",
      `<div class="stack-lg">
        <div><p class="t-label">Project stage</p><div class="chips" role="radiogroup" aria-label="Project stage">${each(PROJECT_STAGES, (stage) => chip("project-stage", stage, { required: true }))}</div></div>
        <div><p class="t-label">Disciplines of interest (optional)</p><div class="chips" role="group" aria-label="Disciplines of interest">${each(data.services.filter((service) => service.published), (service) => chip("services", service.name, { type: "checkbox" }))}</div></div>
      </div>`)}

    ${step(2, "Tell us about the project.", "A few lines are enough. Mention the location, size and any acoustic concern.",
      `${textField("location", "Project location", "text", { autocomplete: "off" })}
      <div class="field">
        <label class="t-label" for="message">Message</label>
        <textarea class="field__textarea" id="message" name="message" required rows="5"></textarea>
      </div>`)}

    ${step(3, "How do we reach you?", "We use these details only to respond to this enquiry.",
      `${textField("name", "Name", "text", { required: true, autocomplete: "name" })}
      ${textField("organisation", "Organisation", "text", { required: true, autocomplete: "organization" })}
      ${textField("email", "Email", "email", { required: true, autocomplete: "email" })}
      ${textField("phone", "Phone", "tel", { autocomplete: "tel" })}
      <div class="field field--consent">
        <input class="field__checkbox" type="checkbox" id="consent" name="consent" required>
        <label class="t-meta" for="consent">I agree that ${esc(settings.tradingName)} may use these details to respond to this enquiry.${when(settings.privacyEnabled, ' <a href="/privacy/">Privacy</a>.')}</label>
      </div>`)}

    <p class="enq-error" role="alert" data-error hidden></p>

    <div class="enq-actions">
      <button class="cta cta--secondary" type="button" data-back hidden>Back</button>
      <button class="cta cta--primary" type="button" data-next hidden>Continue <span class="cta__glyph" aria-hidden="true">→</span></button>
      <button class="cta cta--primary" type="submit" data-send>Send the enquiry <span class="cta__glyph" aria-hidden="true">↗</span></button>
    </div>

    <div class="enq-done" data-done hidden tabindex="-1">
      <p class="t-label">Ready to send</p>
      <h3 class="t-h4">Your email app should have opened with the enquiry <em>ready to send.</em></h3>
      <p class="t-body">If nothing opened, copy the text below into an email, or write to us directly.</p>
      <textarea class="enq-done__text field__textarea" readonly rows="8" data-done-text aria-label="Enquiry text"></textarea>
      <div class="cta-row">
        <button class="cta cta--primary" type="button" data-copy-enquiry>Copy enquiry</button>
        <a class="cta cta--secondary" href="mailto:${esc(recipients[0] ?? "")}" data-done-mailto>Email us directly</a>
        <button class="link-arrow" type="button" data-edit>Edit the enquiry</button>
      </div>
    </div>
  </form>`;
}

function summary() {
  const rows = [
    ["Space", "project-type"],
    ["Stage", "project-stage"],
    ["Disciplines", "services"],
    ["Location", "location"],
    ["Name", "name"],
    ["Organisation", "organisation"],
    ["Email", "email"]
  ];
  return `<aside class="enq-side" aria-label="Enquiry summary">
    <div class="panel panel--dark ticks enq-summary on-dark" data-summary hidden>
      <p class="t-label">Your enquiry</p>
      <dl class="rule-table">
${each(rows, ([label, key]) => `        <div class="rule-table__row"><dt class="rule-table__label t-label">${esc(label)}</dt><dd class="rule-table__value" data-summary-field="${key}">—</dd></div>`)}
      </dl>
      <p class="enq-summary__msg t-meta" data-summary-message></p>
    </div>

    <div class="next">
      <p class="t-label">What happens next</p>
      <ol class="next__list">
${each(NEXT_STEPS, (text, index) => `        <li class="next__item"><span class="next__dot" aria-hidden="true">${index + 1}</span><span class="t-body">${esc(text)}</span></li>`)}
      </ol>
    </div>
  </aside>`;
}

export function contactPage(data) {
  const { settings } = data;

  return {
    route: "/contact/",
    title: "Contact",
    description: "Send a plan, a programme or a problem that has not happened yet.",
    bodyClass: "page--contact",
    footerCta: false,
    body: join([
      hero(settings),
      `<section class="section ground-dust" id="enquiry" aria-labelledby="enquiry-title">
  ${edge()}
  <div class="wrap">
    <div class="section__head">
      ${eyebrow(null, "Enquiry")}
      <h2 class="t-h2" id="enquiry-title">Tell us about the <em>project.</em></h2>
    </div>
    <div class="enq-layout">
      ${form(data)}
      ${summary()}
    </div>
  </div>
</section>`
    ])
  };
}
