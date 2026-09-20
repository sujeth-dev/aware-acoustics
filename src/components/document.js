/**
 * document.js — the shared HTML shell.
 *
 * Owns <head>, font loading, landmarks and the script/stylesheet entry points.
 * Carries no page content and no facts: title, description and body are passed
 * in by the page template, which sources them from data/*.json or CONTENT_PLAN.
 */

import { esc, join, when } from "../lib/html.js";
import { siteHeader } from "./header.js";
import { siteFooter } from "./footer.js";
import { isProduction } from "../lib/data.js";

const FONTS =
  "https://fonts.googleapis.com/css2" +
  // Spectral (headings, prose) · Manrope (UI) · JetBrains Mono (data). DEC-015 chose
  // Spectral + JetBrains Mono; DEC-020 adds Manrope for buttons and navigation and
  // opens up the heavier Spectral weights and italics for headline emphasis.
  "?family=Spectral:ital,wght@0,300;0,400;0,500;1,300;1,400" +
  "&family=Manrope:wght@500;700" +
  "&family=JetBrains+Mono:wght@400;500" +
  "&display=swap";

/**
 * @param {object} page
 * @param {string} page.title        Document title without the site suffix.
 * @param {string} page.description  Meta description.
 * @param {string} page.route        Canonical route, e.g. "/work/".
 * @param {string} page.body         Main-region markup.
 * @param {string} [page.bodyClass]  Optional class on <body>.
 * @param {boolean} [page.footerCta] Set false to omit the footer call band.
 * @param {string} [page.preload]    Hero image to preload.
 * @param {object} data              Loaded site data.
 */
export function renderDocument(page, data) {
  const { settings } = data;
  const suffix = settings.defaultSeo.titleSuffix;
  const title = page.title ? `${page.title} · ${suffix}` : suffix;
  const description = page.description || settings.defaultSeo.description;

  // Canonical URLs wait on Q-05 / settings.domainConfirmed. A guessed origin
  // is worse than no canonical, so the tag is omitted until the domain is
  // confirmed (SEO_PLAN.md §4).
  const canonical = settings.domainConfirmed
    ? `https://${settings.domain}${page.route}`
    : null;

  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#08131f">
${when(!isProduction, '<meta name="robots" content="noindex, nofollow">')}
${when(canonical, () => `<link rel="canonical" href="${esc(canonical)}">`)}
<script>document.documentElement.classList.add("js")</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="icon" href="/assets/brand/logo.png" type="image/png">
${when(page.preload, () => `<link rel="preload" as="image" href="${esc(page.preload)}" type="image/webp" fetchpriority="high">`)}
<link rel="stylesheet" href="/src/css/main.css">
</head>
<body${page.bodyClass ? ` class="${esc(page.bodyClass)}"` : ""}>
<a class="skip-link" href="#main">Skip to content</a>
${siteHeader(page.route, data)}
<main id="main">
${page.body}
</main>
${siteFooter(data, { withCta: page.footerCta !== false })}
<script type="module" src="/src/js/main.js"></script>
</body>
</html>
`;
}

export { join };
