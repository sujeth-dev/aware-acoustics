/**
 * check-contrast.mjs — WCAG contrast for every colour pair the DEC-021 mineral and
 * sound-divider layers introduce.
 *
 *   node scripts/check-contrast.mjs        (also: npm run test:contrast)
 *
 * Colours are read from src/css/tokens.css, so a token change is re-tested rather
 * than silently drifting. Translucent layers (glass plate, hairlines, grain) are
 * composited, and text over a textured band is tested against the WORST pixel the
 * texture can produce, not the flat colour. Text needs 4.5:1, large text 3:1, and
 * meaningful graphics 3:1; purely decorative marks are listed but not gated.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { GRAIN_MAX_ALPHA } from "./build-grain.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const css = fs.readFileSync(path.join(root, "src/css/tokens.css"), "utf8");

const tokens = {};
for (const match of css.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6})\b/gi)) tokens[match[1]] = match[2].toLowerCase();

const rgb = (hex) => [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16));
const token = (name) => {
  if (!tokens[name]) throw new Error(`token --${name} not found in tokens.css`);
  return rgb(tokens[name]);
};

const over = (fg, alpha, bg) => fg.map((channel, index) => channel * alpha + bg[index] * (1 - alpha));

const linear = (value) => {
  const unit = value / 255;
  return unit <= 0.03928 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4;
};
const luminance = ([r, g, b]) => 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/* Texture overlays, as authored in CSS. */
const GRAIN_DARK = { rgb: [22, 18, 12], alpha: GRAIN_MAX_ALPHA };
const GRAIN_LIGHT = { rgb: [255, 250, 240], alpha: GRAIN_MAX_ALPHA };
const HAIRLINE_DARK = { rgb: [56, 52, 46], alpha: 0.06 };
const HAIRLINE_LIGHT = { rgb: [255, 255, 255], alpha: 0.16 };

/** A flat background plus the worst pixels its overlays can produce. */
function variants(bg, overlays = []) {
  const results = [bg];
  for (const overlay of overlays) results.push(over(overlay.rgb, overlay.alpha, bg));
  // grain on top of a hairline
  for (const first of overlays) for (const second of overlays) if (first !== second) results.push(over(second.rgb, second.alpha, over(first.rgb, first.alpha, bg)));
  return results;
}

const TEXTURED = [GRAIN_DARK, GRAIN_LIGHT, HAIRLINE_DARK, HAIRLINE_LIGHT];

const checks = [];
/**
 * @param {string} name   what is being tested
 * @param {number[]} fg   foreground colour
 * @param {number[][]} bgs background candidates (worst is used)
 * @param {number} min    required ratio
 */
function check(name, fg, bgs, min = 4.5) {
  const worst = Math.min(...bgs.map((bg) => ratio(fg, bg)));
  checks.push({ name, ratio: worst, min, pass: worst >= min });
}

const ink = token("ink");
const inverse = rgb("#f3ede0");
const white = [255, 255, 255];
const stops = (...names) => names.map(token);

/* ─── Stone band (grain + hairline) ─── */
const stone = stops("mat-stone");
const stoneLift = rgb("#d3cbbe");
const stoneBgs = [...stone, stoneLift].flatMap((bg) => variants(bg, TEXTURED));
check("ink on stone band", ink, stoneBgs);
check("secondary text (slate-mineral) on stone band", token("slate-mineral"), stoneBgs);
check("crimson italic accent (red-mineral) on stone band", token("red-mineral"), stoneBgs);
check("mono labels / eyebrow (slate-mineral) on stone band", token("slate-mineral"), stoneBgs);

/* ─── Light mineral band (hairline only) ─── */
const dust = [token("mat-dust"), rgb("#e8e2d8")];
const dustBgs = dust.flatMap((bg) => variants(bg, [HAIRLINE_DARK]));
check("ink on light mineral band", ink, dustBgs);
check("secondary text (slate-mineral) on light mineral band", token("slate-mineral"), dustBgs);
check("crimson accent (red-text) on light mineral band", token("red-text"), dustBgs);

/* ─── Paper cards on the bands ─── */
check("ink on paper card", ink, [token("paper")]);
check("secondary text (slate) on paper card", token("slate"), [token("paper")]);

/* ─── Light plate: initials and build-up text ─── */
const plateTwo = stops("mat-dust", "mat-stone", "mat-fibre").flatMap((bg) => variants(bg, [GRAIN_DARK, GRAIN_LIGHT, HAIRLINE_LIGHT]));
check("ink on light plate (monogram, build-up captions)", ink, plateTwo);
check("monogram initials (large text) on light plate", ink, plateTwo, 3);

/* ─── Build-up layers ─── */
check("ink on lining layer", ink, [token("mat-dust")].flatMap((bg) => variants(bg, [HAIRLINE_DARK])));
const absorbent = variants(rgb("#aaa294"), [GRAIN_DARK, GRAIN_LIGHT, HAIRLINE_LIGHT, { rgb: [20, 23, 29], alpha: 0.09 }]);
check("ink on absorbent layer (fibre)", ink, absorbent);
check("ink on cavity layer (translucent white over plate)", ink, stops("mat-dust", "mat-stone", "mat-fibre").flatMap((bg) => variants(over(white, 0.2, bg), [GRAIN_DARK, GRAIN_LIGHT])));
const structure = variants(token("mat-earth"), [GRAIN_LIGHT, { rgb: [243, 237, 224], alpha: 0.05 }]);
check("light text on structure layer (earth)", inverse, structure);

/* ─── Glass plate over the brightest and darkest possible backdrop ─── */
const glass = [white, [0, 0, 0], token("mat-stone")].map((backdrop) => over(rgb("#08131f"), 0.82, backdrop));
check("caption text on glass plate", inverse, glass);
check("caption meta (86% light) on glass plate", over(inverse, 0.86, glass[0]), glass);
check("sector label (gold) on glass plate", token("gold"), glass);

/* ─── Dark grounds ─── */
const navies = stops("navy", "navy-deep", "navy-mid");
check("muted text (66% light) on navy grounds", inverse.map((channel, index) => channel * 0.66 + navies[0][index] * 0.34), navies, 4.5);
check("muted data-list label on dark feature row", over(inverse, 0.66, token("navy-mid")), [token("navy-mid"), token("navy-deep")]);
check("gold eyebrow on navy grounds", token("gold"), navies);
check("light text on earth plate", inverse, stops("mat-earth").concat([rgb("#2a2622"), rgb("#4a443c")]));

/* ─── Graphics (>= 3:1) ─── */
const earthStops = [rgb("#2a2622"), token("mat-earth"), rgb("#4a443c")];
check("gold signature stroke on earth plate", token("gold"), earthStops, 3);
check("dust signature stroke on earth plate", over(rgb("#e2dbd0"), 0.92, token("mat-earth")), earthStops, 3);
check("crimson ticks / sound line (red-mineral) on light plate", token("red-mineral"), plateTwo, 3);
check("gold-ink line on stone band", token("gold-ink"), stoneBgs, 3);
check("gold-ink line on light mineral band", token("gold-ink"), dustBgs, 3);
check("gold-ink line on beige grounds", token("gold-ink"), [token("dust"), token("dust-warm")], 3);

/* ─── Sound dividers: lines and marks sit on the section's own ground ─── */
check("gold -60 dB line / trace on navy", token("gold"), navies, 3);
check("gold trace on crimson", token("gold-light"), [token("red"), token("red-dark")], 3);
check("T60 mark and octave axis on navy (gold)", token("gold"), navies);
check("T60 mark and octave axis on stone (slate-mineral)", token("slate-mineral"), stoneBgs);
check("T60 mark and octave axis on light band (slate-mineral)", token("slate-mineral"), dustBgs);
check("T60 mark and octave axis on dust (slate)", token("slate"), [token("dust"), token("dust-warm")]);

/* ─── Report ─── */
const width = Math.max(...checks.map((entry) => entry.name.length));
let failed = 0;
for (const entry of checks) {
  if (!entry.pass) failed += 1;
  console.log(`${entry.pass ? "PASS" : "FAIL"}  ${entry.ratio.toFixed(2).padStart(5)}:1  (needs ${entry.min})  ${entry.name.padEnd(width)}`);
}
console.log(`\ncontrast: ${checks.length - failed}/${checks.length} pairs pass`);
if (failed > 0) process.exitCode = 1;
