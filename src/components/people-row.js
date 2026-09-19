/**
 * people-row.js — full-width editorial team-bio row (WEBSITE_PLAN.md §5.5).
 *
 * A person with a portrait renders as an alternating two-column editorial
 * row, reusing grid--editorial/grid--flip so the image side flips per
 * index rather than repeating the same layout twice. A person without a
 * portrait renders as a text-only split (name left, biography right), no image slot — never
 * a placeholder box (portraits are CLIENT TO PROVIDE, Q-17).
 */

import { esc, each, when, join } from "../lib/html.js";

function metaLine(person) {
  const parts = [
    person.role,
    person.experienceYears ? `${person.experienceYears}+ years` : null
  ].filter(Boolean);
  return join(parts, " · ");
}

function heading(person) {
  const label = metaLine(person);
  return `${when(label, () => `<p class="t-label">${esc(label)}</p>`)}
    <p class="person-row__name t-h5">${esc(person.name)}</p>`;
}

function text(person) {
  return `<p class="person-row__bio t-body">${esc(person.bio)}</p>
    ${when((person.credentials ?? []).length > 0, () => `<p class="person-row__meta t-meta">${esc(join(person.credentials, " · "))}</p>`)}
    ${when((person.tools ?? []).length > 0, () => `<p class="person-row__meta t-meta">${esc(join(person.tools, " · "))}</p>`)}`;
}

export function personRow(person, index) {
  // No portrait: a text-only editorial split — name left, biography right. No image slot.
  if (!person.portrait) {
    return `<article class="grid person-row person-row--text">
    <div>${heading(person)}</div>
    <div>${text(person)}</div>
  </article>`;
  }

  const flip = index % 2 === 1;
  return `<article class="grid grid--editorial person-row${flip ? " grid--flip" : ""}">
    <img class="person-row__portrait" src="${esc(person.portrait)}" alt="" loading="lazy" decoding="async">
    <div>${heading(person)}${text(person)}</div>
  </article>`;
}

export function peopleList(people) {
  return `<div class="people-list">${each(people, (person, index) => personRow(person, index))}</div>`;
}
