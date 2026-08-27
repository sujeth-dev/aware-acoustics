/**
 * main.js — the only public script.
 *
 * Progressive enhancement only: every page is complete and navigable with this
 * file blocked. The overlay navigation is the sole interactive component on the
 * public site; the toggle button is hidden by CSS above 900px.
 */

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
