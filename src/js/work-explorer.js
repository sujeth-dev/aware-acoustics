/**
 * work-explorer.js — "Explore all work" on /work/: sector filter, search and
 * a "show more" batch, all over server-rendered cards.
 *
 * Every card is in the markup, so without JavaScript the whole collection lists
 * and links; the controls are `hidden` until this runs. State lives in
 * `?sector=` so a filtered view is linkable. Each card also carries
 * `data-match` ("1"/"0") so the overlay can page through everything that matches,
 * not only the cards currently shown.
 */

const BATCH = 12;

function urlWith(mutate) {
  const url = new URL(window.location.href);
  mutate(url.searchParams);
  return `${url.pathname}${url.search}${url.hash}`;
}

export function initWorkExplorer() {
  const root = document.querySelector("[data-explorer]");
  if (!root) return;

  const cards = [...root.querySelectorAll(".work-card")];
  const strip = root.querySelector("[data-work-filter]");
  const searchBox = root.querySelector("[data-work-search]");
  const input = searchBox?.querySelector("input");
  const status = root.querySelector("[data-work-status]");
  const empty = root.querySelector("[data-work-empty]");
  const more = root.querySelector("[data-work-more]");
  const links = strip ? [...strip.querySelectorAll("[data-sector-filter]")] : [];
  const known = new Set(links.map((link) => link.dataset.sectorFilter));

  const state = { sector: "", query: "", limit: BATCH };

  function apply() {
    const query = state.query.trim().toLowerCase();
    const matches = cards.filter(
      (card) =>
        (!state.sector || card.dataset.sector === state.sector) &&
        (!query || card.dataset.search.includes(query))
    );
    const matched = new Set(matches);
    const shown = new Set(matches.slice(0, state.limit));

    for (const card of cards) {
      card.hidden = !shown.has(card);
      card.dataset.match = matched.has(card) ? "1" : "0";
    }

    for (const link of links) {
      if (link.dataset.sectorFilter === state.sector) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    }

    if (status) {
      const filtered = state.sector || query;
      status.textContent = matches.length === 0
        ? ""
        : `Showing ${shown.size} of ${matches.length}${filtered ? " matching" : ""} ${matches.length === 1 ? "project" : "projects"}`;
    }

    if (empty) empty.hidden = matches.length > 0;

    if (more) {
      const remaining = matches.length - shown.size;
      more.hidden = remaining <= 0;
      const button = more.querySelector("button");
      if (button && remaining > 0) button.textContent = `Show ${Math.min(BATCH, remaining)} more (${remaining} remaining)`;
    }
  }

  const sectorFromUrl = () => {
    const requested = new URLSearchParams(window.location.search).get("sector") ?? "";
    return known.has(requested) ? requested : "";
  };

  if (strip) strip.hidden = false;
  if (searchBox) searchBox.hidden = false;

  state.sector = sectorFromUrl();
  apply();

  strip?.addEventListener("click", (event) => {
    const link = event.target.closest("[data-sector-filter]");
    if (!link) return;
    event.preventDefault();
    state.sector = link.dataset.sectorFilter;
    state.limit = BATCH;
    window.history.pushState({}, "", urlWith((params) => (state.sector ? params.set("sector", state.sector) : params.delete("sector"))));
    apply();
  });

  input?.addEventListener("input", () => {
    state.query = input.value;
    state.limit = BATCH;
    apply();
  });

  more?.querySelector("button")?.addEventListener("click", () => {
    state.limit += BATCH;
    apply();
  });

  root.querySelector("[data-work-reset]")?.addEventListener("click", () => {
    state.sector = "";
    state.query = "";
    state.limit = BATCH;
    if (input) input.value = "";
    window.history.pushState({}, "", urlWith((params) => params.delete("sector")));
    apply();
  });

  window.addEventListener("popstate", () => {
    state.sector = sectorFromUrl();
    state.limit = BATCH;
    apply();
  });
}
