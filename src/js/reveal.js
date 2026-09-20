/**
 * reveal.js — fades `[data-reveal]` elements in as they enter the viewport.
 *
 * The hidden starting state exists only under `.js` and only when the visitor
 * has not asked for reduced motion (see motion.css), so with scripting blocked,
 * or with reduced motion, every element is simply visible.
 *
 * An IntersectionObserver does the work, but it only reports what is in view at the
 * moment it samples: a fast scroll, a slow frame or an anchor jump can carry an
 * element past the viewport unseen. A rAF-throttled sweep on scroll reveals anything
 * the visitor has already scrolled to or past, so nothing waits for the failsafe.
 */

const SELECTOR = "[data-reveal]";
const VISIBLE_FRACTION = 0.94;

export function initReveal() {
  const items = [...document.querySelectorAll(SELECTOR)];
  if (items.length === 0) return;

  const showAll = () => items.forEach((item) => item.classList.add("is-in"));

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showAll();
    return;
  }

  const pending = new Set(items);

  const reveal = (item) => {
    item.classList.add("is-in");
    pending.delete(item);
    observer.unobserve(item);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target);
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
  );

  items.forEach((item) => observer.observe(item));

  let queued = false;
  const sweep = () => {
    queued = false;
    const limit = window.innerHeight * VISIBLE_FRACTION;
    for (const item of [...pending]) {
      if (item.getBoundingClientRect().top < limit) reveal(item);
    }
    if (pending.size === 0) window.removeEventListener("scroll", onScroll);
  };

  const onScroll = () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(sweep);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}
