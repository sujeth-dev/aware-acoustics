/**
 * main.js — the only public script.
 *
 * Progressive enhancement only: every page is complete and navigable with this
 * file blocked. Each module below is a no-op when its markup is absent, so one
 * entry point serves every page.
 */

import { initHeader } from "./header.js";
import { initReveal } from "./reveal.js";
import { initHeroCarousels } from "./hero-carousel.js";
import { initWorkExplorer } from "./work-explorer.js";
import { initWorkOverlay } from "./work-overlay.js";
import { initScrollspy } from "./scrollspy.js";
import { initStandardsTabs } from "./standards-tabs.js";
import { initContactFlow } from "./contact-flow.js";
import { initCopyButtons } from "./copy.js";

function initNavOverlay() {
  const toggle = document.querySelector(".nav-toggle");
  const overlay = document.getElementById("nav-overlay");
  if (!toggle || !overlay) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    overlay.hidden = !open;
    document.body.classList.toggle("nav-open", open);
    if (open) {
      const first = overlay.querySelector("a");
      if (first) first.focus();
    } else {
      toggle.focus();
    }
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  overlay.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setOpen(false);
  });

  // The overlay is a mobile composition; leaving that width closes it.
  const wide = window.matchMedia("(min-width: 901px)");
  wide.addEventListener("change", (event) => {
    if (event.matches && toggle.getAttribute("aria-expanded") === "true") setOpen(false);
  });
}

initNavOverlay();
initHeader();
initReveal();
initHeroCarousels();
initWorkExplorer();
initWorkOverlay();
initScrollspy();
initStandardsTabs();
initContactFlow();
initCopyButtons();
