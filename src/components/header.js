/**
 * header.js — wordmark, primary navigation and the sub-900px overlay panel.
 *
 * Per the brand direction the header is absolute, not fixed: it scrolls away
 * with the hero. The overlay is a full-screen panel, not a drawer, and the
 * hamburger is two 1px rules.
 */

import { esc, each } from "../lib/html.js";
import { NAV_ITEMS, isCurrent } from "./nav.js";

function navLink(item, route, className) {
  const current = isCurrent(route, item.href);
  return `<a class="${className}${current ? " is-current" : ""}" href="${item.href}"${current ? ' aria-current="page"' : ""}>${esc(item.label)}</a>`;
}

export function siteHeader(route, data) {
  const name = data.settings.tradingName;

  return `<header class="site-header">
  <div class="site-header__inner">
    <a class="wordmark" href="/">
      <img class="wordmark__mark" src="/assets/brand/logo.png" alt="" width="1261" height="724" decoding="async">
      <span class="wordmark__text">${esc(name)}</span>
    </a>

    <nav class="site-nav" aria-label="Primary">
      ${each(NAV_ITEMS, (item) => navLink(item, route, "site-nav__link"))}
    </nav>

    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-overlay">
      <span class="nav-toggle__rules" aria-hidden="true"><span></span><span></span></span>
      <span class="visually-hidden">Menu</span>
    </button>
  </div>

  <div class="nav-overlay on-dark" id="nav-overlay" hidden>
    <nav class="nav-overlay__nav" aria-label="Primary, overlay">
      ${each(NAV_ITEMS, (item) => navLink(item, route, "nav-overlay__link"))}
    </nav>
  </div>
</header>`;
}
