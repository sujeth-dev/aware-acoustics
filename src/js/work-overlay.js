/**
 * work-overlay.js — the project view on /work/.
 *
 * Project content is server-rendered into a <template> per project
 * (project-view.js), so opening one is a clone, never a fetch. The overlay is a
 * native <dialog>: focus is trapped, Esc closes it, and focus returns to the
 * card that opened it. `?project=<slug>` makes a project linkable; Back closes it.
 */

const PARAM = "project";

export function initWorkOverlay() {
  const dialog = document.querySelector("[data-project-dialog]");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const body = dialog.querySelector("[data-pv-body]");
  const position = dialog.querySelector("[data-pv-position]");
  const templates = new Map(
    [...document.querySelectorAll("[data-project-template]")].map((template) => [template.dataset.projectTemplate, template])
  );

  let opener = null;

  /** Slugs the visitor can page through: every card matching the current filter. */
  const sequence = () =>
    [...document.querySelectorAll(".work-card")]
      .filter((card) => card.dataset.match !== "0")
      .map((card) => card.querySelector("[data-project-link]")?.dataset.projectLink)
      .filter(Boolean);

  const slugFromUrl = () => new URLSearchParams(window.location.search).get(PARAM);

  const urlWith = (slug) => {
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set(PARAM, slug);
    else url.searchParams.delete(PARAM);
    return `${url.pathname}${url.search}${url.hash}`;
  };

  function render(slug) {
    const template = templates.get(slug);
    if (!template) return false;
    body.replaceChildren(template.content.cloneNode(true));
    body.scrollTop = 0;

    const list = sequence();
    const index = list.indexOf(slug);
    if (position) position.textContent = index >= 0 ? `Project ${index + 1} of ${list.length}` : "";
    dialog.querySelector("[data-pv-prev]").disabled = list.length < 2;
    dialog.querySelector("[data-pv-next]").disabled = list.length < 2;
    return true;
  }

  function open(slug, { push = true } = {}) {
    if (!render(slug)) return;
    if (!dialog.open) {
      document.body.classList.add("pv-open");
      dialog.showModal();
      if (push) window.history.pushState({ project: slug }, "", urlWith(slug));
    } else {
      window.history.replaceState({ project: slug }, "", urlWith(slug));
    }
    dialog.querySelector("[data-pv-close]").focus({ preventScroll: true });
  }

  function step(direction) {
    const list = sequence();
    const current = body.querySelector("[data-project-panel]")?.dataset.projectPanel;
    const index = list.indexOf(current);
    if (list.length < 2) return;
    const target = list[(index + direction + list.length) % list.length];
    open(target, { push: false });
  }

  // Open from any project card.
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-project-link]");
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (!templates.has(link.dataset.projectLink)) return;
    event.preventDefault();
    opener = link;
    open(link.dataset.projectLink);
  });

  dialog.querySelector("[data-pv-close]").addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-pv-prev]").addEventListener("click", () => step(-1));
  dialog.querySelector("[data-pv-next]").addEventListener("click", () => step(1));

  // Backdrop click closes; a click inside the panel never targets the dialog element itself.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.target.matches("input, textarea, select")) return;
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  });

  // Gallery thumbnails swap the large image.
  body.addEventListener("click", (event) => {
    const thumb = event.target.closest("[data-gallery-thumb]");
    if (!thumb) return;
    const gallery = thumb.closest("[data-gallery]");
    const index = Number(thumb.dataset.galleryThumb);
    gallery.querySelectorAll("[data-gallery-slide]").forEach((slide, i) => {
      slide.hidden = i !== index;
    });
    gallery.querySelectorAll("[data-gallery-thumb]").forEach((button, i) => {
      button.setAttribute("aria-current", String(i === index));
    });
  });

  // Any way of closing (button, Esc, backdrop, Back) ends here.
  dialog.addEventListener("close", () => {
    document.body.classList.remove("pv-open");
    if (slugFromUrl()) window.history.replaceState({}, "", urlWith(null));
    if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    opener = null;
    body.replaceChildren();
  });

  window.addEventListener("popstate", () => {
    const slug = slugFromUrl();
    if (slug && templates.has(slug)) open(slug, { push: false });
    else if (dialog.open) dialog.close();
  });

  // Deep link.
  const initial = slugFromUrl();
  if (initial && templates.has(initial)) open(initial, { push: false });
}
