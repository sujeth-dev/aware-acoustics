/**
 * facts.js — figures shown in heroes and stat strips, computed from the data.
 *
 * Nothing here is typed in by hand: every number is a count over published
 * records, so it can never drift from the Work page it summarises.
 */

/**
 * @param {object} data      Loaded site data.
 * @param {object[]} projects  Published projects.
 */
export function sectorFacts(data, projects) {
  const sectors = new Set(projects.map((project) => project.sector));
  const cities = new Set(projects.map((project) => project.city).filter(Boolean));
  return {
    projects: projects.length,
    sectors: sectors.size,
    cities: cities.size,
    founded: data.settings.foundedYear ?? null
  };
}
