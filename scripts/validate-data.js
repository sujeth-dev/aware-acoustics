import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "data");
const production = process.env.NODE_ENV === "production";
const errors = [];
const warnings = [];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function readJson(name) {
  const filename = path.join(dataDir, name);
  try {
    return JSON.parse(fs.readFileSync(filename, "utf8"));
  } catch (error) {
    errors.push(`${name}: ${error.message}`);
    return [];
  }
}

function duplicateValues(records, key) {
  const seen = new Set();
  return records.map((record) => record[key]).filter((value) => seen.size === seen.add(value).size);
}

function requireFields(record, fields, label) {
  for (const field of fields) {
    if (!(field in record)) errors.push(`${label}: missing required field "${field}"`);
  }
}

function pairKey(result) {
  return `${result.parameter}\u0000${result.space}\u0000${result.unit}`;
}

const projects = readJson("projects.json");
const services = readJson("services.json");
const standards = readJson("standards.json");
const people = readJson("people.json");
const settings = readJson("settings.json");

for (const [name, value, expectedArray] of [
  ["projects.json", projects, true],
  ["services.json", services, true],
  ["standards.json", standards, true],
  ["people.json", people, true],
  ["settings.json", settings, false]
]) {
  if (expectedArray !== Array.isArray(value)) errors.push(`${name}: unexpected root type`);
}

const serviceIds = new Set(services.map((service) => service.id));
const standardIds = new Set(standards.map((standard) => standard.id));
const currentYear = new Date().getFullYear();
const requiredProjectFields = [
  "slug", "title", "client", "clientAnonymised", "clientPublic", "sector", "location", "city",
  "country", "year", "status", "area", "areaUnit", "capacity", "capacityUnit", "appointedBy",
  "tier", "scope", "services", "standards", "tools", "targets", "measured", "summary",
  "condition", "approach", "outcome", "images", "featured", "published", "order"
];

for (const duplicate of duplicateValues(projects, "slug")) errors.push(`projects.json: duplicate slug "${duplicate}"`);
for (const duplicate of duplicateValues(services, "id")) errors.push(`services.json: duplicate id "${duplicate}"`);
for (const duplicate of duplicateValues(standards, "id")) errors.push(`standards.json: duplicate id "${duplicate}"`);

for (const project of projects) {
  const label = `project ${project.slug || "<missing-slug>"}`;
  requireFields(project, requiredProjectFields, label);
  if (!slugPattern.test(project.slug || "")) errors.push(`${label}: slug must be lowercase kebab-case`);
  if (!Array.isArray(project.scope) || project.scope.length === 0) errors.push(`${label}: scope requires at least one item`);
  if (!Array.isArray(project.services) || project.services.length === 0) errors.push(`${label}: services requires at least one item`);
  for (const service of project.services || []) if (!serviceIds.has(service)) errors.push(`${label}: unknown service "${service}"`);
  for (const standard of project.standards || []) if (!standardIds.has(standard)) errors.push(`${label}: unknown standard "${standard}"`);
  if (project.year !== null && (!Number.isInteger(project.year) || project.year < 1900 || project.year > currentYear)) {
    errors.push(`${label}: year must be between 1900 and ${currentYear}`);
  }
  if ((project.area === null) !== (project.areaUnit === null)) errors.push(`${label}: area and areaUnit must be supplied together`);
  if ((project.capacity === null) !== (project.capacityUnit === null)) errors.push(`${label}: capacity and capacityUnit must be supplied together`);
  if (!project.clientPublic && !project.clientAnonymised) errors.push(`${label}: anonymised client label is required`);
  if (project.featured && (project.tier !== "case" || !project.published)) errors.push(`${label}: featured requires a published case record`);

  const targetKeys = new Set((project.targets || []).map(pairKey));
  for (const result of [...(project.targets || []), ...(project.measured || [])]) {
    if (!result.parameter || !result.space || !result.unit || !Number.isFinite(result.value)) {
      errors.push(`${label}: every target/measured entry requires parameter, space, finite value and unit`);
    }
    if (result.standard && !standardIds.has(result.standard)) errors.push(`${label}: result references unknown standard "${result.standard}"`);
  }
  for (const measured of project.measured || []) {
    if (!targetKeys.has(pairKey(measured))) errors.push(`${label}: measured result has no matching target for ${measured.parameter} / ${measured.space}`);
  }

  if (project.tier === "case") {
    if ((project.measured || []).length === 0) errors.push(`${label}: case record requires a measured result`);
    if ((project.images || []).length === 0) errors.push(`${label}: case record requires an image`);
    if (!project.year || !project.condition || !project.approach || !project.outcome) errors.push(`${label}: case record requires year, condition, approach and outcome`);
  }

  for (const image of project.images || []) {
    const fields = ["id", "category", "src", "fallback", "width", "height", "alt", "source", "licence", "cleared", "order"];
    requireFields(image, fields, `${label} image`);
    if (project.published && !image.cleared) errors.push(`${label}: published image is not rights-cleared`);
    for (const assetPath of [image.src, image.fallback]) {
      if (!assetPath?.startsWith("/assets/")) errors.push(`${label}: image path must begin /assets/`);
      const diskPath = assetPath ? path.join(root, "public", assetPath.replace(/^\//, "")) : null;
      if (project.published && diskPath && !fs.existsSync(diskPath)) errors.push(`${label}: missing image file ${assetPath}`);
    }
  }
}

for (const service of services) {
  requireFields(service, ["id", "slug", "name", "summary", "parameters", "standards", "published", "order"], `service ${service.id}`);
  for (const standard of service.standards || []) if (!standardIds.has(standard)) errors.push(`service ${service.id}: unknown standard "${standard}"`);
}

for (const standard of standards) {
  requireFields(standard, ["id", "designation", "subject", "category", "services", "editionStatus", "published", "order"], `standard ${standard.id}`);
  for (const service of standard.services || []) if (!serviceIds.has(service)) errors.push(`standard ${standard.id}: unknown service "${service}"`);
}

const featured = projects.filter((project) => project.featured && project.published && project.tier === "case").length;
if (production && featured < 2) errors.push(`production requires at least 2 featured case records; found ${featured}`);
else if (production && featured < 4) warnings.push(`production recommends 4 featured case records; found ${featured}`);
if (featured > 4) errors.push(`no more than 4 featured case records are allowed; found ${featured}`);

for (const warning of warnings) console.warn(`WARN: ${warning}`);
for (const error of errors) console.error(`ERROR: ${error}`);
if (errors.length) process.exitCode = 1;
else console.log(`Validated ${projects.length} projects, ${services.length} services, ${standards.length} standards, ${people.length} people and site settings.`);
