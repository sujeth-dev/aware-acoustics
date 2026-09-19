/**
 * about.js — "/about/" · WEBSITE_PLAN.md §5.5, CONTENT_PLAN.md §6.
 * Practice + Method merged (DEC-011).
 *
 * Copy is CONTENT_PLAN.md §6 (P-01…P-07, M-01…M-12), interface copy rather
 * than a data-model fact — same convention as services.js's DISCIPLINE_COPY.
 *
 * Gating, per the site-wide rule (never invent, never placeholder-publish):
 *   - Independence (P-03) omitted — CLIENT TO CONFIRM, Q-22.
 *   - Instrumentation (M-08) omitted entirely — no equipment source exists,
 *     Q-07, and WEBSITE_PLAN.md §5.5 says never ship it with placeholder copy.
 *   - "Where we work" renders only when at least one project is published;
 *     otherwise omitted silently (it is a derived fact, not a promised slot).
 *   - People (02) is a promised slot, so an empty publishedPeople() shows the
 *     devFixture gated state, same as Home §03/§05.
 *   - Standards register (M-09) and Compliance (M-11) are the same component:
 *     standardsRegister() groups by category, and standards.json already
 *     carries LEED/WELL/ISO 14001 under "green" — a separate M-11 table would
 *     duplicate it.
 *
 * CONTENT_PLAN.md §1 allows exactly one body-level appointment CTA per page.
 * The content hierarchy in WEBSITE_PLAN.md §5.5 places it once, at the very
 * end (M-12) — P-06's alternate CTA copy is not used, to honour that rule.
 */

import { when, join } from "../lib/html.js";
import {
  eyebrow,
  cta,
  stat,
  statementList,
  processSpine,
  standardsRegister,
  devFixture
} from "../components/ui.js";
import { peopleList } from "../components/people-row.js";
import { publishedProjects, publishedPeople, publishedStandards, isProduction } from "../lib/data.js";

const APPROACH = [
  { term: "Clarity.", body: "State the criterion." },
  { term: "Compliance.", body: "Work to the applicable standard." },
  { term: "Constructability.", body: "Carry the intent through the detail and site." }
];

const METHOD_STAGES = [
  { term: "Set the targets.", body: "Translate use, programme and compliance requirements into acoustic criteria." },
  { term: "Model. Specify. Document.", body: "Test geometry and material choices; issue the DBR, detailed drawings and sound-insulation layouts." },
  { term: "Keep the criterion intact.", body: "Review tender drawings, BOQ, material and sample submissions." },
  { term: "Review what will be built.", body: "Assess mock-ups, updated layouts and constructability before repetition." },
  { term: "Measure the completed condition.", body: "Report the result against the target and applicable standard." }
];

function whereWeWork(data) {
  const projects = publishedProjects(data);
  if (projects.length === 0) return "";
  const cities = new Set(projects.map((project) => project.city).filter(Boolean));
  const countries = new Set(projects.map((project) => project.country).filter(Boolean));
  if (cities.size === 0) return "";
  const label = countries.size > 1 ? `cities across ${countries.size} countries` : "cities";
  return stat(cities.size, label);
}

function practice(data) {
  return `<section class="section ground-dust" aria-labelledby="about-title">
  <div class="section__head">
    ${eyebrow(1, "About")}
    <h1 class="t-h2" id="about-title">Independent in advice. Accountable in measurement.</h1>
    <p class="t-standfirst measure-46">Aware Acoustics advises architects, PMCs, developers and engineers across design, tender, site review and handover.</p>
  </div>
  ${whereWeWork(data)}
</section>`;
}

function people(data) {
  const list = publishedPeople(data);
  const body = list.length > 0
    ? peopleList(list)
    : when(!isProduction, () => devFixture("Team profiles publish here once ready.", "wool"));

  return `<section class="section ground-dust-warm" aria-labelledby="about-people">
  <div class="section__head">
    ${eyebrow(2, "People")}
    <h2 class="t-h2" id="about-people">The people you appoint.</h2>
  </div>
  ${body}
</section>`;
}

function approach() {
  return `<section class="section ground-stone" aria-labelledby="about-approach">
  <div class="section__head">
    ${eyebrow(3, "Approach")}
    <h2 class="t-h2" id="about-approach">The test is practical.</h2>
  </div>
  ${statementList(APPROACH)}
</section>`;
}

function method() {
  return `<section class="section ground-dust-warm" aria-labelledby="about-method">
  <div class="grid grid--editorial">
    <div class="section__head">
      ${eyebrow(4, "Method")}
      <h2 class="t-h2" id="about-method">A room is designed twice.</h2>
      <p class="t-standfirst">First as a target and model. Then as a built condition that can be measured.</p>
    </div>
    <div class="stack-lg">
      ${processSpine(METHOD_STAGES)}
      <p class="t-body measure-46">Models account for reflection, absorption and diffraction, and test RT, SPL, intelligibility and response before construction.</p>
    </div>
  </div>
</section>`;
}

function standards(data) {
  const list = publishedStandards(data);
  if (list.length === 0) return "";
  return `<section class="section ground-dust" aria-labelledby="about-standards">
  <div class="section__head">
    ${eyebrow(5, "Standards")}
    <h2 class="t-h2" id="about-standards">Working to the applicable standard, in every discipline.</h2>
    <p class="t-standfirst measure-46">Recycled or renewable acoustic materials, low-VOC products and proximate compliant sourcing are preferred where the project permits.</p>
  </div>
  ${standardsRegister(list)}
</section>`;
}

function appointment() {
  return `<section class="section ground-navy on-dark centred" aria-labelledby="about-appointment">
  ${eyebrow(null, "Appointment")}
  <h2 class="t-h2" id="about-appointment">Bring the criterion into the room early.</h2>
  <p class="stack-lg">${cta("/contact/", "Start a conversation", "primary")}</p>
</section>`;
}

export function aboutPage(data) {
  return {
    route: "/about/",
    title: "About",
    description: "Independent in advice. Accountable in measurement.",
    body: join([
      practice(data),
      people(data),
      approach(),
      method(),
      standards(data),
      appointment()
    ])
  };
}
