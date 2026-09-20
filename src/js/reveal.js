/**
 * reveal.js — fades `[data-reveal]` elements in as they enter the viewport.
 *
 * The hidden starting state exists only under `.js` and only when the visitor
 * has not asked for reduced motion (see motion.css), so with scripting blocked,
 * or with reduced motion, every element is simply visible.
 */

export function initReveal() {
  const items = [...document.querySelectorAll("[data-reveal]")];
  if (items.length === 0) return;

  const showAll = () => items.forEach((item) => item.classList.add("is-in"));

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
  );

  items.forEach((item) => observer.observe(item));
}
