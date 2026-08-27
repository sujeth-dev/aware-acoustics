/**
 * html.js — string helpers for the static template layer.
 *
 * Templates own presentation only. Every fact comes from data/*.json
 * (PROJECT_DATA.md §1); nothing here supplies a default value for a
 * missing fact — absent data returns an empty string so the calling
 * template can omit the component.
 */

const ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

/** Escape a value for HTML text or a double-quoted attribute. */
export function esc(value) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/[&<>"']/g, (character) => ESCAPES[character]);
}

/** Join truthy fragments with a separator. Empty fragments disappear entirely. */
export function join(fragments, separator = "\n") {
  return fragments.filter((fragment) => fragment !== null && fragment !== undefined && fragment !== "").join(separator);
}

/** Render `fragment` only when `condition` is truthy. Never renders a placeholder. */
export function when(condition, fragment) {
  if (!condition) return "";
  return typeof fragment === "function" ? fragment() : fragment;
}

/** Map an array to markup, returning "" for an empty or absent array. */
export function each(items, render) {
  if (!Array.isArray(items) || items.length === 0) return "";
  return items.map(render).join("\n");
}

/** Two-digit section number: 1 -> "01". */
export function pad2(value) {
  return String(value).padStart(2, "0");
}

/** Build an attribute string from a plain object, dropping null/undefined/false. */
export function attrs(map) {
  return Object.entries(map)
    .filter(([, value]) => value !== null && value !== undefined && value !== false && value !== "")
    .map(([key, value]) => (value === true ? key : `${key}="${esc(value)}"`))
    .join(" ");
}

/** Collapse runs of whitespace in a one-line string (titles, descriptions). */
export function oneLine(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}
