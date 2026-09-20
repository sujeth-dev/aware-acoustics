/**
 * about.js — "/about/" · DEC-020 redesign of WEBSITE_PLAN.md §5.5.
 * Practice + Method merged (DEC-011).
 *
 * Copy is CONTENT_PLAN.md §6 (P-01…P-07, M-01…M-12), interface copy rather than
 * a data-model fact. Gating that still holds:
 *   - Independence (P-03) is omitted — CLIENT TO CONFIRM, Q-22.
 *   - Instrumentation (M-08) is omitted — no equipment source exists, Q-07.
 *
 * The practice figures in the hero are computed from published projects. People
 * have no portraits yet, so each gets a monogram plate rather than an empty
 * image slot. The method is a connected timeline and the standards register is a
 * filterable table (src/js/standards-tabs.js); without JavaScript every row shows.
 */

import { esc, each, when, join } from "../lib/html.js";
import { eyebrow, tagRow } from "../components/ui.js";
import { imageHero } from "../components/hero.js";
import { bestImage } from "../components/picture.js";
import { arcs, edge } from "../components/wave.js";
import { sectorFacts } from "../lib/facts.js";
import {
  publishedProjects,
  showcaseProjects,
  publishedPeople,
  publishedStandards
} from "../lib/data.js";

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

const CATEGORY_LABELS = {
  design: "Design",
  measurement: "Measurement",
  green: "Green and compliance"
};

const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("");

function hero(data, projects, showcase) {
  const facts = sectorFacts(data, projects);
  return imageHero({
    id: "about-title",
    label: "About",
    title: "Independent in advice. Accountable in <em>measurement.</em>",
    lead: "Aware Acoustics advises architects, PMCs, developers and engineers across design, tender, site review and handover.",
    slides: [showcase[5], showcase[3]].filter(Boolean).map(bestImage).filter(Boolean),
    facts: [
      { figure: facts.projects, label: "Projects" },
      { figure: facts.sectors, label: "Sectors" },
      { figure: facts.cities, label: "Cities" },
      { figure: facts.founded, label: "Established" }
    ],
    size: "medium",
    titleClass: "t-h1 hero__title--wide"
  });
}

function person(entry) {
  const meta = join([entry.role, entry.experienceYears ? `${entry.experienceYears}+ years` : null].filter(Boolean), " · ");
  return `<article class="person ticks" data-reveal>
    <div class="person__mark" aria-hidden="true">
      ${arcs()}
      <span class="person__initials">${esc(initials(entry.name))}</span>
    </div>
    <div class="person__body">
      ${when(meta, () => `<p class="t-label">${esc(meta)}</p>`)}
      <h3 class="person__name t-h4">${esc(entry.name)}</h3>
      <p class="t-body">${esc(entry.bio)}</p>
      ${tagRow(entry.credentials, `${entry.name} credentials`)}
      ${when((entry.tools ?? []).length > 0, () => `<div class="person__tools"><p class="t-label">Tools</p>${tagRow(entry.tools, `${entry.name} tools`)}</div>`)}
    </div>
  </article>`;
}

function people(data) {
  const list = publishedPeople(data);
  if (list.length === 0) return "";
  return `<section class="section ground-dust" aria-labelledby="about-people">
  ${edge()}
  <div class="wrap">
    <div class="section__head">
      ${eyebrow(null, "People")}
      <h2 class="t-h2" id="about-people">The people you <em>appoint.</em></h2>
    </div>
    <div class="people-grid">
${each(list, person)}
    </div>
  </div>
</section>`;
}

function approach() {
  return `<section class="section ground-navy has-lines on-dark" aria-labelledby="about-approach">
  ${edge()}
  <div class="wrap">
    <div class="section__head">
      ${eyebrow(null, "Approach")}
      <h2 class="t-h2" id="about-approach">The test is <em>practical.</em></h2>
    </div>
    <div class="approach">
${each(APPROACH, (item, index) => `      <article class="approach__item ticks" data-reveal style="--i:${index}">
        <h3 class="approach__term">${esc(item.term)}</h3>
        <p class="t-lead">${esc(item.body)}</p>
      </article>`)}
    </div>
  </div>
</section>`;
}

function method() {
  return `<section class="section ground-dust-warm" aria-labelledby="about-method">
  ${edge()}
  <div class="wrap">
    <div class="section__head grid grid--projects-head grid--end">
      <div>
        ${eyebrow(null, "Method")}
        <h2 class="t-h2" id="about-method">A room is designed <em>twice.</em></h2>
      </div>
      <p class="t-standfirst">First as a target and model. Then as a built condition that can be measured.</p>
    </div>
    <ol class="timeline">
${each(METHOD_STAGES, (stage, index) => `      <li class="timeline__item" data-reveal style="--i:${index}">
        <span class="timeline__node" aria-hidden="true"></span>
        <h3 class="timeline__term t-h5">${esc(stage.term)}</h3>
        <p class="t-body">${esc(stage.body)}</p>
      </li>`)}
    </ol>
    <p class="t-body measure-55 timeline__foot">Models account for reflection, absorption and diffraction, and test RT, SPL, intelligibility and response before construction.</p>
  </div>
</section>`;
}

function standards(data) {
  const list = publishedStandards(data);
  if (list.length === 0) return "";
  const categories = ["design", "measurement", "green"].filter((category) => list.some((standard) => standard.category === category));

  return `<section class="section ground-dust" aria-labelledby="about-standards">
  ${edge()}
  <div class="wrap">
    <div class="section__head grid grid--projects-head grid--end">
      <div>
        ${eyebrow(null, "Standards")}
        <h2 class="t-h2" id="about-standards">Working to the applicable <em>standard.</em></h2>
      </div>
      <p class="t-standfirst">Recycled or renewable acoustic materials, low-VOC products and proximate compliant sourcing are preferred where the project permits.</p>
    </div>

    <div class="register-tabs" role="group" aria-label="Filter standards by category" data-standards-tabs hidden>
      <button class="register-tabs__btn" type="button" data-standards-filter="" aria-pressed="true">All <span>${list.length}</span></button>
${each(categories, (category) => `      <button class="register-tabs__btn" type="button" data-standards-filter="${esc(category)}" aria-pressed="false">${esc(CATEGORY_LABELS[category])} <span>${list.filter((standard) => standard.category === category).length}</span></button>`)}
    </div>

    <div class="register-table" data-standards-table>
${each(list, (standard) => `      <div class="register-table__row" data-standard-category="${esc(standard.category)}">
        <span class="register-table__designation">${esc(standard.designation)}</span>
        <span class="register-table__subject">${esc(standard.subject)}</span>
        <span class="register-table__category t-label">${esc(CATEGORY_LABELS[standard.category])}</span>
      </div>`)}
    </div>
  </div>
</section>`;
}

export function aboutPage(data) {
  const projects = publishedProjects(data);
  const showcase = showcaseProjects(data);
  const first = bestImage(showcase[5]);

  return {
    route: "/about/",
    title: "About",
    description: "Independent in advice. Accountable in measurement.",
    bodyClass: "page--about",
    preload: first?.src,
    body: join([
      hero(data, projects, showcase),
      people(data),
      approach(),
      method(),
      standards(data)
    ])
  };
}
