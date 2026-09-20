/**
 * picture.js — responsive image markup and image selection helpers.
 *
 * Project images ship as a webp `src` plus a jpg `fallback`
 * (public/assets/projects/<slug>/). Rows used to render only `src`.
 */

import { esc, attrs } from "../lib/html.js";

/**
 * @param {object} image  A project image record.
 * @param {object} [options]
 * @param {string} [options.className]   Class for the <img>.
 * @param {string} [options.alt]         Override; defaults to the record's alt text.
 * @param {boolean} [options.eager]      Above-the-fold image: eager + high priority.
 * @param {string} [options.sizes]       `sizes` hint for the browser.
 */
export function picture(image, { className = "", alt, eager = false, sizes = "100vw" } = {}) {
  if (!image) return "";
  const text = alt === undefined ? image.alt : alt;
  const img = attrs({
    class: className,
    src: image.fallback || image.src,
    width: image.width,
    height: image.height,
    sizes,
    loading: eager ? "eager" : "lazy",
    fetchpriority: eager ? "high" : null,
    decoding: "async"
  });
  // alt is written outside attrs(): an empty alt marks a decorative image and must survive.
  return `<picture><source type="image/webp" srcset="${esc(image.src)}"><img ${img} alt="${esc(text ?? "")}"></picture>`;
}

const isLandscape = (image) => image.width >= image.height * 1.15;

/** Images that suit a wide crop, widest first. Falls back to every image. */
export function landscapeImages(project) {
  const images = project?.images ?? [];
  const wide = images.filter(isLandscape).sort((a, b) => b.width - a.width);
  return wide.length > 0 ? wide : images;
}

/** The single best image for a card or hero: landscape and widest. */
export function bestImage(project) {
  return landscapeImages(project)[0] ?? null;
}
