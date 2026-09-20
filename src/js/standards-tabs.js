/**
 * standards-tabs.js — filters the /about/ standards register by category.
 *
 * Every row is server-rendered and visible; the controls are `hidden` until this
 * runs, so a visitor without JavaScript sees the whole register and no dead tabs.
 */

export function initStandardsTabs() {
  const tabs = document.querySelector("[data-standards-tabs]");
  const table = document.querySelector("[data-standards-table]");
  if (!tabs || !table) return;

  const rows = [...table.querySelectorAll("[data-standard-category]")];
  const buttons = [...tabs.querySelectorAll("[data-standards-filter]")];

  const apply = (category) => {
    for (const row of rows) row.hidden = Boolean(category) && row.dataset.standardCategory !== category;
    for (const button of buttons) button.setAttribute("aria-pressed", String(button.dataset.standardsFilter === category));
  };

  tabs.hidden = false;
  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-standards-filter]");
    if (button) apply(button.dataset.standardsFilter);
  });
}
