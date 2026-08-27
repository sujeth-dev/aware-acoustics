/**
 * generate-pages.js — writes one HTML file per route from src/pages/*.
 *
 * The repository holds no checked-in HTML. Templates plus data/*.json are the
 * source of truth; this script materialises the route tree that Vite then
 * treats as a multi-page application:
 *
 *   /            -> index.html
 *   /work/       -> work/index.html
 *   /work/:slug/ -> work/<slug>/index.html
 *   /404/        -> 404/index.html and 404.html (host fallback)
 *
 * Generated files are gitignored. Run it directly (`node scripts/generate-pages.js`)
 * or let the Vite plugin call it on start and on template/data change.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { loadData } from "../src/lib/data.js";
import { renderDocument } from "../src/components/document.js";
import { allPages } from "../src/pages/index.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Directories this script owns and may replace wholesale. */
const OWNED = ["work", "services", "about", "contact", "privacy", "404"];
const OWNED_FILES = ["index.html", "404.html"];

function routeToFile(route) {
  if (route === "/") return "index.html";
  return path.join(route.replace(/^\/|\/$/g, ""), "index.html");
}

function clean() {
  for (const dir of OWNED) fs.rmSync(path.join(root, dir), { recursive: true, force: true });
  for (const file of OWNED_FILES) fs.rmSync(path.join(root, file), { force: true });
}

export function generatePages({ silent = false } = {}) {
  const data = loadData();
  const pages = allPages(data);

  clean();

  const written = [];
  for (const page of pages) {
    const relative = routeToFile(page.route);
    const target = path.join(root, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, renderDocument(page, data), "utf8");
    written.push(relative);
  }

  // Host-level 404 fallback: same document, served from the site root.
  const notFound = pages.find((page) => page.route === "/404/");
  if (notFound) {
    fs.writeFileSync(path.join(root, "404.html"), renderDocument(notFound, data), "utf8");
    written.push("404.html");
  }

  if (!silent) console.log(`Generated ${written.length} page(s): ${written.join(", ")}`);
  return { written, data };
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) generatePages();
