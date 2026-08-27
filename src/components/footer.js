/**
 * footer.js — four columns collapsing to one below 600px.
 *
 * Every value comes from settings.json / services.json. The footer legal line
 * (© [year] [legal entity]) stays omitted until Q-01 supplies a legal entity —
 * DEC-014. The year and the Privacy link render; no entity name is invented.
 */

import { esc, each, when, join } from "../lib/html.js";
import { publishedServices } from "../lib/data.js";

function telHref(phone) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function siteFooter(data) {
  const { settings } = data;
  const services = publishedServices(data);
  const year = new Date().getFullYear();

  const location = join(
    [settings.city, settings.country].filter(Boolean),
    ", "
  );

  return `<footer class="site-footer">
  <div class="site-footer__inner">

    <div class="site-footer__col">
      <p class="site-footer__name">${esc(settings.tradingName)}</p>
      <p class="site-footer__note t-meta">Independent acoustic consultancy.</p>
    </div>

    <nav class="site-footer__col" aria-label="Footer, sections">
      <a class="site-footer__link" href="/work/">Work</a>
      <a class="site-footer__link" href="/about/">About</a>
      <a class="site-footer__link" href="/contact/">Contact</a>
    </nav>

    <nav class="site-footer__col" aria-label="Footer, services">
      ${each(services, (service) => `<a class="site-footer__link" href="/services/#${esc(service.slug)}">${esc(service.name)}</a>`)}
    </nav>

    <div class="site-footer__col">
      ${when(location, () => `<p class="site-footer__link">${esc(location)}</p>`)}
      ${when(settings.address, () => `<p class="site-footer__link">${esc(settings.address)}</p>`)}
      ${each(settings.phones, (phone) => `<a class="site-footer__link" href="${esc(telHref(phone))}">${esc(phone)}</a>`)}
      ${each(settings.emails, (email) => `<a class="site-footer__link" href="mailto:${esc(email)}">${esc(email)}</a>`)}
    </div>

  </div>

  <div class="site-footer__meta t-meta">
    <span>&copy; ${year}</span>
    ${when(settings.privacyEnabled, () => '<span aria-hidden="true">·</span><a href="/privacy/">Privacy</a>')}
  </div>
</footer>`;
}
