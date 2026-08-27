/**
 * data.js — build-time loading of data/*.json with runtime guards.
 *
 * Contract (PROJECT_DATA.md §1, §6, DEC-004, DEC-010):
 *   - `data/*.json` is the build input. Public pages make zero runtime reads.
 *   - Every record passes a shape guard before a template can see it.
 *   - `client` is stripped from every project whose `clientPublic` is false,
 *     at the boundary — templates never receive the private value, so they
 *     cannot leak it into HTML, metadata, asset names or structured data.
 *   - A guard failure is fatal in production and loud in development. Nothing
 *     is defaulted, coerced or invented to make a page render.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const dataDir = path.join(root, "data");

/**
 * Content gating switch.
 *
 * Deliberately NOT NODE_ENV: Vite sets NODE_ENV=production for every `vite
 * build`, including the development builds used while pages are still gated on
 * client evidence. AWARE_ENV is set only by `npm run build:production`, so the
 * gates below mean "a build intended for review or launch", not "a minified
 * build". NODE_ENV is still honoured for CI runners that set it explicitly
 * alongside AWARE_ENV.
 */
export const isProduction = process.env.AWARE_ENV === "production";

const problems = [];

function fail(message) {
  problems.push(message);
}

function readJson(name) {
  const file = path.join(dataDir, name);
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`${name}: ${error.message}`);
    return null;
  }
}

/* ─── Guards ───────────────────────────────────────────────────────────── */

function isString(value) {
  return typeof value === "string" && value.length > 0;
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isBool(value) {
  return typeof value === "boolean";
}

function isInt(value) {
  return Number.isInteger(value);
}

function guardArray(value, name) {
  if (!Array.isArray(value)) {
    fail(`${name}: expected an array at the document root`);
    return [];
  }
  return value;
}

function guardResult(result, label) {
  return (
    isString(result?.parameter) &&
    isString(result?.space) &&
    isString(result?.unit) &&
    Number.isFinite(result?.value)
  ) || (fail(`${label}: malformed target/measured entry`), false);
}

function guardProject(project) {
  const label = `project ${project?.slug ?? "<missing-slug>"}`;
  let ok = true;
  const check = (condition, message) => {
    if (!condition) {
      fail(`${label}: ${message}`);
      ok = false;
    }
  };

  check(isString(project?.slug), "slug must be a non-empty string");
  check(isString(project?.title), "title must be a non-empty string");
  check(isString(project?.clientAnonymised), "clientAnonymised is required (DEC-010)");
  check(isBool(project?.clientPublic), "clientPublic must be a boolean");
  check(isString(project?.sector), "sector is required");
  check(isString(project?.location), "location is required");
  check(project?.tier === "record" || project?.tier === "case", 'tier must be "record" or "case"');
  check(isStringArray(project?.services) && project.services.length > 0, "services requires at least one key");
  check(isStringArray(project?.scope) && project.scope.length > 0, "scope requires at least one item");
  check(isStringArray(project?.standards), "standards must be an array of keys");
  check(Array.isArray(project?.targets), "targets must be an array");
  check(Array.isArray(project?.measured), "measured must be an array");
  check(Array.isArray(project?.images), "images must be an array");
  check(isBool(project?.featured) && isBool(project?.published), "featured and published must be booleans");
  check(isInt(project?.order), "order must be an integer");
  check(project?.year === null || isInt(project?.year), "year must be an integer or null");

  for (const result of [...(project?.targets ?? []), ...(project?.measured ?? [])]) guardResult(result, label);

  if (project?.tier === "case") {
    check((project?.measured ?? []).length > 0, "case tier requires a measured result (DEC-007)");
    check((project?.images ?? []).length > 0, "case tier requires a cleared image (DEC-007)");
    check(isString(project?.condition) && isString(project?.approach) && isString(project?.outcome),
      "case tier requires condition, approach and outcome");
    check(isInt(project?.year), "case tier requires a year");
  }

  if (project?.featured) {
    check(project?.tier === "case" && project?.published === true,
      "featured requires a published case record");
  }

  return ok;
}

function guardService(service) {
  const label = `service ${service?.id ?? "<missing-id>"}`;
  const ok =
    isString(service?.id) &&
    isString(service?.slug) &&
    isString(service?.name) &&
    isString(service?.summary) &&
    isStringArray(service?.parameters) &&
    isStringArray(service?.standards) &&
    isBool(service?.published) &&
    isInt(service?.order);
  if (!ok) fail(`${label}: malformed service record`);
  return ok;
}

function guardStandard(standard) {
  const label = `standard ${standard?.id ?? "<missing-id>"}`;
  const ok =
    isString(standard?.id) &&
    isString(standard?.designation) &&
    isString(standard?.subject) &&
    ["design", "measurement", "green"].includes(standard?.category) &&
    isStringArray(standard?.services) &&
    ["confirmed", "client-to-confirm"].includes(standard?.editionStatus) &&
    isBool(standard?.published) &&
    isInt(standard?.order);
  if (!ok) fail(`${label}: malformed standard record`);
  return ok;
}

function guardPerson(person) {
  const label = `person ${person?.id ?? "<missing-id>"}`;
  const ok =
    isString(person?.id) &&
    isString(person?.name) &&
    isString(person?.bio) &&
    isStringArray(person?.credentials) &&
    isStringArray(person?.tools) &&
    isBool(person?.published) &&
    isInt(person?.order);
  if (!ok) fail(`${label}: malformed person record`);
  return ok;
}

function guardSettings(settings) {
  if (!settings || typeof settings !== "object" || Array.isArray(settings)) {
    fail("settings.json: expected a single object");
    return false;
  }
  if (!isString(settings.tradingName)) fail("settings.json: tradingName is required");
  if (!Array.isArray(settings.phones) || !Array.isArray(settings.emails)) {
    fail("settings.json: phones and emails must be arrays");
  }
  if (!settings.defaultSeo || !isString(settings.defaultSeo.titleSuffix)) {
    fail("settings.json: defaultSeo.titleSuffix is required");
  }
  return true;
}

/* ─── Public-export boundary — DEC-010 ─────────────────────────────────── */

function sanitiseProject(project) {
  const { client, ...rest } = project;
  return project.clientPublic ? { ...rest, client } : { ...rest, client: null };
}

/** The client label a template is allowed to render. */
export function clientLabel(project) {
  return project.clientPublic ? project.client : project.clientAnonymised;
}

/* ─── Load ─────────────────────────────────────────────────────────────── */

function byOrder(a, b) {
  if (a.order !== b.order) return a.order - b.order;
  return String(a.title ?? a.name ?? a.designation ?? "").localeCompare(String(b.title ?? b.name ?? b.designation ?? ""));
}

export function loadData() {
  problems.length = 0;

  const projects = guardArray(readJson("projects.json"), "projects.json").filter(guardProject).map(sanitiseProject).sort(byOrder);
  const services = guardArray(readJson("services.json"), "services.json").filter(guardService).sort(byOrder);
  const standards = guardArray(readJson("standards.json"), "standards.json").filter(guardStandard).sort(byOrder);
  const people = guardArray(readJson("people.json"), "people.json").filter(guardPerson).sort(byOrder);
  const settings = readJson("settings.json");
  guardSettings(settings);

  // Foreign keys.
  const serviceIds = new Set(services.map((service) => service.id));
  const standardIds = new Set(standards.map((standard) => standard.id));
  for (const project of projects) {
    for (const key of project.services) if (!serviceIds.has(key)) fail(`project ${project.slug}: unknown service "${key}"`);
    for (const key of project.standards) if (!standardIds.has(key)) fail(`project ${project.slug}: unknown standard "${key}"`);
  }
  for (const service of services) {
    for (const key of service.standards) if (!standardIds.has(key)) fail(`service ${service.id}: unknown standard "${key}"`);
  }

  if (problems.length > 0) {
    const report = problems.map((problem) => `  - ${problem}`).join("\n");
    if (isProduction) throw new Error(`data guard failed in production build:\n${report}`);
    console.warn(`WARN: data guard reported ${problems.length} issue(s):\n${report}`);
  }

  return { projects, services, standards, people, settings, problems: [...problems] };
}

/* ─── Selectors ────────────────────────────────────────────────────────── */

export const publishedProjects = (data) => data.projects.filter((project) => project.published);
export const caseProjects = (data) => publishedProjects(data).filter((project) => project.tier === "case");
export const featuredProjects = (data) => caseProjects(data).filter((project) => project.featured).slice(0, 4);
export const publishedServices = (data) => data.services.filter((service) => service.published);
export const publishedStandards = (data) => data.standards.filter((standard) => standard.published);
export const publishedPeople = (data) => data.people.filter((person) => person.published);

export const standardsForService = (data, serviceId) =>
  publishedStandards(data).filter((standard) => standard.services.includes(serviceId));

export const projectsForService = (data, serviceId) =>
  publishedProjects(data).filter((project) => project.services.includes(serviceId));

export const serviceById = (data, id) => data.services.find((service) => service.id === id) ?? null;
