/**
 * render-record.smoke.mjs — renders the /work/[slug]/ template against the
 * synthetic fixture and asserts the structure the plan requires.
 *
 * Run: node tests/render-record.smoke.mjs
 * This writes nothing and never touches data/. Replaced by Vitest in Phase 3b.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadData } from "../src/lib/data.js";
import { workRecordPage } from "../src/pages/work-record.js";
import { renderDocument } from "../src/components/document.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixture = JSON.parse(fs.readFileSync(path.join(here, "fixtures/case-record.fixture.json"), "utf8"));

const data = loadData();
const page = workRecordPage(fixture, data, [fixture]);
const html = renderDocument(page, data);

assert.equal(page.route, "/work/fixture-case-record/");
assert.match(html, /01 · Condition|Condition/, "condition section renders");
assert.match(html, /Verification/, "verification section renders");
assert.match(html, /result-table/, "target/measured table renders");
assert.match(html, /ISO 3382/, "standard designation renders from standards.json");
assert.match(html, /services\/#architectural-acoustics/, "reverse service link renders");
assert.match(html, /href="\/contact\/"/, "appointment CTA renders");

// DEC-010: the private client name must never reach the markup.
assert.ok(!html.includes("FIXTURE Client"), "private client name is not rendered");
assert.ok(html.includes("FIXTURE anonymised client descriptor"), "anonymised label is rendered");

console.log("record template smoke: pass");
