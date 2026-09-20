/**
 * copy.js — "Copy" buttons for phone numbers and email addresses.
 * Hidden in the markup and revealed only when the clipboard API exists.
 */

export function initCopyButtons() {
  if (!navigator.clipboard?.writeText) return;

  for (const button of document.querySelectorAll("[data-copy]")) {
    button.hidden = false;
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        const label = button.textContent;
        button.textContent = "Copied";
        button.classList.add("is-copied");
        window.setTimeout(() => {
          button.textContent = label;
          button.classList.remove("is-copied");
        }, 1800);
      } catch {
        /* Clipboard blocked: the number stays a working tel:/mailto: link. */
      }
    });
  }
}
