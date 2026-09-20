/**
 * footer.js — closing section: crimson call band, navy body, outlined wordmark.
 *
 * Every value comes from settings.json / services.json. No legal entity is
 * printed until one is supplied (DEC-014); the year and Privacy link render.
 * The call band is the site's single appointment prompt, so it is omitted on
 * /contact/ itself (`page.footerCta === false`).
 */

import { esc, each, when, join } from "../lib/html.js";
import { publishedServices } from "../lib/data.js";
import { cta } from "./ui.js";
import { arcs, edge } from "./wave.js";

function telHref(phone) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function callBand() {
  return `<div class="footer-cta ground-crimson on-crimson">
  ${edge("wave")}
  ${arcs()}
  <div class="footer-cta__inner">
    <h2 class="footer-cta__title">Send us a plan. A programme. A problem that has not <em>happened yet.</em></h2>
    ${cta("/contact/", "Start a conversation", "light")}
  </div>
</div>`;
}

export function siteFooter(data, { withCta = true } = {}) {
  const { settings } = data;
  const services = publishedServices(data);
  const year = new Date().getFullYear();
  const location = join([settings.city, settings.country].filter(Boolean), ", ");

  return `<footer class="site-footer">
  ${when(withCta, callBand)}
  <div class="site-footer__main">
    ${edge("skyline")}
    <div class="site-footer__inner">

      <div class="site-footer__col">
        <p class="site-footer__name">${esc(settings.tradingName)}</p>
        <p class="site-footer__note t-body">Independent acoustic consultancy for the built environment.</p>
      </div>

      <nav class="site-footer__col" aria-label="Footer, sections">
        <p class="site-footer__heading t-label">Explore</p>
        <a class="site-footer__link" href="/work/">Work</a>
        <a class="site-footer__link" href="/services/">Services</a>
        <a class="site-footer__link" href="/about/">About</a>
        <a class="site-footer__link" href="/contact/">Contact</a>
      </nav>

      <nav class="site-footer__col" aria-label="Footer, services">
        <p class="site-footer__heading t-label">Services</p>
        ${each(services, (service) => `<a class="site-footer__link" href="/services/#${esc(service.slug)}">${esc(service.name)}</a>`)}
      </nav>

      <div class="site-footer__col">
        <p class="site-footer__heading t-label">Contact</p>
        ${when(location, () => `<p class="site-footer__link">${esc(location)}</p>`)}
        ${when(settings.address, () => `<p class="site-footer__link">${esc(settings.address)}</p>`)}
        ${each(settings.phones, (phone) => `<a class="site-footer__link" href="${esc(telHref(phone))}">${esc(phone)}</a>`)}
        ${each(settings.emails, (email) => `<a class="site-footer__link" href="mailto:${esc(email)}">${esc(email)}</a>`)}
      </div>

    </div>

    <div class="site-footer__meta t-meta">
      <span>&copy; ${year} ${esc(settings.tradingName)}</span>
      ${when(settings.privacyEnabled, () => '<span aria-hidden="true">·</span><a href="/privacy/">Privacy</a>')}
    </div>

    <div class="site-footer__wordmark" aria-hidden="true">${esc(settings.tradingName)}</div>
  </div>
</footer>`;
}
