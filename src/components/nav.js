/**
 * nav.js — the four primary navigation items (DEC-011).
 * Labels are fixed IA, not editable content: CONTENT_PLAN.md §2.
 */

export const NAV_ITEMS = [
  { href: "/work/", label: "Work" },
  { href: "/services/", label: "Services" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" }
];

/** A route is current when it is the item itself or a descendant record. */
export function isCurrent(route, href) {
  return route === href || (href !== "/" && route.startsWith(href));
}
