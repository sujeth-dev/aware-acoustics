/**
 * contact-flow.js — the four-step enquiry on /contact/.
 *
 * Progressive enhancement over a complete plain form: without this script all
 * four steps show at once and the form posts to a mailto: action. With it, one
 * step shows at a time, a live summary builds beside the form, and sending
 * composes a pre-filled email addressed to the practice. Nothing is sent to a
 * server and nothing is stored.
 */

const MAILTO_LIMIT = 1900;

const FIELD_LABELS = {
  "project-type": "a project type",
  "project-stage": "a project stage",
  message: "a message",
  name: "your name",
  organisation: "your organisation",
  email: "your email address",
  consent: "your consent"
};

export function initContactFlow() {
  const form = document.querySelector("[data-enquiry]");
  if (!form) return;

  const steps = [...form.querySelectorAll(".enq-step")];
  const progress = form.querySelector("[data-progress]");
  const progressButtons = [...form.querySelectorAll("[data-goto]")];
  const back = form.querySelector("[data-back]");
  const next = form.querySelector("[data-next]");
  const send = form.querySelector("[data-send]");
  const error = form.querySelector("[data-error]");
  const done = form.querySelector("[data-done]");
  const doneText = form.querySelector("[data-done-text]");
  const doneMailto = form.querySelector("[data-done-mailto]");
  const summary = document.querySelector("[data-summary]");
  const recipients = (form.dataset.to || "").split(",").filter(Boolean);
  const last = steps.length - 1;

  let index = 0;
  let reached = 0;

  // Enhanced mode: the mailto action is replaced by our own submit handling.
  form.setAttribute("data-enhanced", "");
  form.noValidate = true;
  form.removeAttribute("action");
  form.removeAttribute("method");
  form.removeAttribute("enctype");
  progress.hidden = false;
  if (summary) summary.hidden = false;

  /* ─── Reading the form ─── */

  const values = () => {
    const data = new FormData(form);
    return {
      space: data.get("project-type") || "",
      stage: data.get("project-stage") || "",
      services: data.getAll("services"),
      location: (data.get("location") || "").toString().trim(),
      message: (data.get("message") || "").toString().trim(),
      name: (data.get("name") || "").toString().trim(),
      organisation: (data.get("organisation") || "").toString().trim(),
      email: (data.get("email") || "").toString().trim(),
      phone: (data.get("phone") || "").toString().trim()
    };
  };

  function refreshSummary() {
    if (!summary) return;
    const v = values();
    const map = {
      "project-type": v.space,
      "project-stage": v.stage,
      services: v.services.join(", "),
      location: v.location,
      name: v.name,
      organisation: v.organisation,
      email: v.email
    };
    for (const cell of summary.querySelectorAll("[data-summary-field]")) {
      const value = map[cell.dataset.summaryField];
      cell.textContent = value || "—";
      cell.classList.toggle("is-empty", !value);
    }
    const preview = summary.querySelector("[data-summary-message]");
    if (preview) preview.textContent = v.message.length > 160 ? `${v.message.slice(0, 160)}…` : v.message;
  }

  /* ─── Steps ─── */

  function showError(message) {
    error.textContent = message;
    error.hidden = !message;
  }

  function show(target, { focus = true } = {}) {
    index = Math.max(0, Math.min(last, target));
    reached = Math.max(reached, index);

    steps.forEach((step, i) => {
      step.hidden = i !== index;
    });

    back.hidden = index === 0;
    next.hidden = index === last;
    send.hidden = index !== last;
    showError("");

    progressButtons.forEach((button, i) => {
      button.classList.toggle("is-done", i < index);
      button.disabled = i > reached;
      if (i === index) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });

    if (focus) {
      const title = steps[index].querySelector(".enq-step__title");
      if (title) {
        title.setAttribute("tabindex", "-1");
        title.focus({ preventScroll: true });
      }
      form.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  }

  /** Returns the first invalid control in a step, or null. */
  function firstInvalid(stepIndex) {
    for (const field of steps[stepIndex].querySelectorAll("input, textarea, select")) {
      if (!field.checkValidity()) return field;
    }
    return null;
  }

  function messageFor(field) {
    if (field.type === "email" && field.value) return "Enter a valid email address.";
    if (field.type === "checkbox") return "Please confirm your consent to continue.";
    if (field.type === "radio") return "Choose one option to continue.";
    return `Please enter ${FIELD_LABELS[field.name] ?? "this field"}.`;
  }

  function validateStep(stepIndex) {
    const field = firstInvalid(stepIndex);
    if (!field) return true;
    showError(messageFor(field));
    field.focus({ preventScroll: false });
    return false;
  }

  /* ─── Composing the email ─── */

  function compose() {
    const v = values();
    const site = form.dataset.site || "Aware Acoustics";
    const subject = `Enquiry: ${[v.space, v.stage].filter(Boolean).join(" · ") || "new project"}`;
    const lines = [
      `Name: ${v.name}`,
      `Organisation: ${v.organisation}`,
      `Email: ${v.email}`,
      v.phone && `Phone: ${v.phone}`,
      v.location && `Project location: ${v.location}`,
      `Project type: ${v.space}`,
      `Project stage: ${v.stage}`,
      v.services.length > 0 && `Disciplines of interest: ${v.services.join(", ")}`
    ].filter(Boolean);

    const head = `${lines.join("\n")}\n\nMessage:\n`;
    const tail = `\n\n— Sent from the ${site} website enquiry form`;
    return { subject, head, message: v.message, tail };
  }

  function mailtoUrl({ subject, head, message, tail }) {
    const build = (text) =>
      `mailto:${recipients.join(",")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(head + text + tail)}`;
    let url = build(message);
    if (url.length > MAILTO_LIMIT) {
      // Very long messages are trimmed in the link only; the full text stays on
      // screen, ready to copy.
      let text = message;
      while (url.length > MAILTO_LIMIT && text.length > 40) {
        text = text.slice(0, Math.floor(text.length * 0.85));
        url = build(`${text}… [message continues — see the full text on the website confirmation]`);
      }
    }
    return url;
  }

  function finish() {
    const parts = compose();
    const url = mailtoUrl(parts);
    const full = `To: ${recipients.join(", ")}\nSubject: ${parts.subject}\n\n${parts.head}${parts.message}${parts.tail}`;

    doneText.value = full;
    if (doneMailto) doneMailto.href = url;

    steps.forEach((step) => {
      step.hidden = true;
    });
    progress.hidden = true;
    back.hidden = true;
    next.hidden = true;
    send.hidden = true;
    showError("");
    done.hidden = false;
    done.focus({ preventScroll: true });

    window.location.href = url;
  }

  /* ─── Events ─── */

  form.addEventListener("input", refreshSummary);
  form.addEventListener("change", refreshSummary);

  next.addEventListener("click", () => {
    if (validateStep(index)) show(index + 1);
  });

  back.addEventListener("click", () => show(index - 1));

  progressButtons.forEach((button, i) => {
    button.addEventListener("click", () => {
      if (i <= reached) show(i);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // Enter inside a field on an earlier step advances rather than sends.
    if (index < last) {
      if (validateStep(index)) show(index + 1);
      return;
    }
    for (let i = 0; i <= last; i += 1) {
      if (firstInvalid(i)) {
        show(i, { focus: false });
        validateStep(i);
        return;
      }
    }
    finish();
  });

  form.querySelector("[data-edit]")?.addEventListener("click", () => {
    done.hidden = true;
    progress.hidden = false;
    show(last);
  });

  form.querySelector("[data-copy-enquiry]")?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    try {
      await navigator.clipboard.writeText(doneText.value);
    } catch {
      doneText.select();
      document.execCommand?.("copy");
    }
    const label = button.textContent;
    button.textContent = "Copied";
    window.setTimeout(() => {
      button.textContent = label;
    }, 1800);
  });

  show(0, { focus: false });
  refreshSummary();
}
