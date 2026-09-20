/**
 * scrollspy.js — marks the sub-nav link of the section currently in view.
 */

export function initScrollspy() {
  const nav = document.querySelector("[data-scrollspy]");
  if (!nav || !("IntersectionObserver" in window)) return;

  const links = new Map([...nav.querySelectorAll("[data-spy]")].map((link) => [link.dataset.spy, link]));
  const sections = [...links.keys()].map((id) => document.getElementById(id)).filter(Boolean);

  const activate = (id) => {
    for (const [key, link] of links) {
      link.classList.toggle("is-active", key === id);
      if (key === id) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    }
    const active = links.get(id);
    // Keep the active link visible on a scrollable (phone) strip.
    if (active && nav.firstElementChild) {
      const strip = nav.firstElementChild;
      if (strip.scrollWidth > strip.clientWidth) strip.scrollTo({ left: active.offsetLeft - 24, behavior: "smooth" });
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activate(entry.target.id);
        // Scrolled back above the first discipline: nothing is current.
        else if (entry.target === sections[0] && entry.boundingClientRect.top > 0) activate(null);
      }
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}
