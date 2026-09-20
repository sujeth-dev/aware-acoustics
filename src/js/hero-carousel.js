/**
 * hero-carousel.js — crossfades the slides of an image hero.
 *
 * Slides are server-rendered stacked; this only moves `.is-active` and builds
 * the indicator strip. With reduced motion requested the first slide is held,
 * and the indicators still let a visitor step through by hand.
 */

const INTERVAL = 6500;

export function initHeroCarousels() {
  for (const hero of document.querySelectorAll("[data-hero-carousel]")) initOne(hero);
}

function initOne(hero) {
  const slides = [...hero.querySelectorAll(".hero__slide")];
  const dots = hero.querySelector("[data-hero-dots]");
  if (slides.length < 2) return;

  let current = 0;
  let timer = null;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const buttons = slides.map((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Show image ${index + 1} of ${slides.length}`);
    button.addEventListener("click", () => {
      show(index);
      restart();
    });
    dots?.append(button);
    return button;
  });

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
    buttons.forEach((button, i) => {
      if (i === current) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
  }

  function restart() {
    window.clearInterval(timer);
    if (reduced) return;
    timer = window.setInterval(() => show(current + 1), INTERVAL);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) window.clearInterval(timer);
    else restart();
  });

  show(0);
  restart();
}
