/**
 * header.js — wordmark tab, primary navigation and the sub-900px overlay panel.
 *
 * DEC-020: the header is fixed. It is transparent over a hero and turns to navy
 * glass once the page scrolls (src/js/header.js toggles `.is-scrolled`). The
 * logo hangs from the top edge on a beige tab. Contact is the one filled item.
 */

import { esc, each, when } from "../lib/html.js";
import { NAV_ITEMS, isCurrent } from "./nav.js";

function navLink(item, route, className) {
  const current = isCurrent(route, item.href);
  const cta = item.href === "/contact/" && className === "site-nav__link" ? " site-nav__link--cta" : "";
  return `<a class="${className}${cta}${current ? " is-current" : ""}" href="${item.href}"${current ? ' aria-current="page"' : ""}>${esc(item.label)}</a>`;
}

const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export function siteHeader(route, data) {
  const { settings } = data;

  return `<header class="site-header" data-site-header>
  <div class="site-header__inner">
    <a class="wordmark" href="/">
      <img class="wordmark__mark" src="/assets/brand/logo.png" alt="" width="1261" height="724" decoding="async">
      <span class="wordmark__text">${esc(settings.tradingName)}</span>
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
    <div class="nav-overlay__contact t-meta">
      ${each(settings.phones, (phone) => `<a href="${esc(telHref(phone))}">${esc(phone)}</a>`)}
      ${each(settings.emails, (email) => `<a href="mailto:${esc(email)}">${esc(email)}</a>`)}
      ${when(settings.city, () => `<span>${esc(settings.city)}${settings.country ? `, ${esc(settings.country)}` : ""}</span>`)}
    </div>
  </div>
</header>`;
}
