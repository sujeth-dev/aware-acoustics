/**
 * header.js — turns the fixed header from transparent to navy glass once the
 * page has scrolled. Progressive: without JS the header stays transparent over
 * the hero, which is its resting state.
 */

const THRESHOLD = 24;

export function initHeader() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const update = () => header.classList.toggle("is-scrolled", window.scrollY > THRESHOLD);
  update();
  window.addEventListener("scroll", update, { passive: true });
}
