/**
 * work-filter.js — progressive sector filter for /work/ (WEBSITE_PLAN.md §5.2).
 *
 * The complete list is server-rendered; this only hides rows. State lives in
 * `?sector=` so a filtered view is linkable, but the canonical URL is /work/.
 * The strip is `hidden` in the markup and shown here, so without JavaScript
 * there are no dead controls.
 */

export function initWorkFilter() {
  const strip = document.querySelector("[data-work-filter]");
  if (!strip) return;

  const status = document.querySelector("[data-work-filter-status]");
  const rows = [...document.querySelectorAll(".record-row[data-sector]")];
  const links = [...strip.querySelectorAll("[data-sector-filter]")];
  const known = new Set(links.map((link) => link.dataset.sectorFilter));

  const apply = (requested) => {
    const active = known.has(requested) ? requested : "";
    let shown = 0;

    for (const row of rows) {
      const match = !active || row.dataset.sector === active;
      row.hidden = !match;
      if (match) shown += 1;
    }

    for (const link of links) {
      if (link.dataset.sectorFilter === active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    }

    if (status) {
      status.hidden = !active;
      status.textContent = active ? `Showing ${shown} of ${rows.length}` : "";
    }
  };

  const fromUrl = () => new URLSearchParams(window.location.search).get("sector") ?? "";

  strip.hidden = false;
  apply(fromUrl());

  strip.addEventListener("click", (event) => {
    const link = event.target.closest("[data-sector-filter]");
    if (!link) return;
    event.preventDefault();
    const sector = link.dataset.sectorFilter;
    window.history.pushState({}, "", sector ? `?sector=${encodeURIComponent(sector)}` : window.location.pathname);
    apply(sector);
  });

  window.addEventListener("popstate", () => apply(fromUrl()));
}
