/* The site's only script. Plain JavaScript, no dependencies.
 *
 * Three jobs:
 *   1. The mobile menu button.
 *   2. Scroll entrances: [data-animate] elements get .is-visible once.
 *   3. The contact form: inline validation and a fetch submit.
 *
 * None of it adds, removes or reorders content. With JavaScript off the menu
 * links sit in a row under the logo, nothing is hidden for animation (the
 * .js class is never set), and the form is a plain POST to Formspree.
 *
 * Bundled by Astro into one file on this origin, so the Content Security
 * Policy can stay at script-src 'self' plus the one hashed head snippet.
 */

/* Tells the fail-safe in the <head> that this file arrived, so it leaves the
   .js class alone. */
window.ARAZ_READY = true;

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------ mobile menu */

(() => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    /* The label stays "Menu". aria-expanded carries open or closed, and
       changing both would announce the state twice. */
    toggle.setAttribute("aria-expanded", String(open));
    if (open) nav.setAttribute("data-open", "");
    else nav.removeAttribute("data-open");
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  /* Picking a link closes the menu, so the section it jumps to is not hidden
     behind an open panel. */
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  /* Escape closes it and puts focus back on the button that opened it. */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  /* Widening the window past the breakpoint with the menu open would leave a
     stale data-open behind. Reset it. */
  window.matchMedia("(min-width: 64rem)").addEventListener("change", (query) => {
    if (query.matches) setOpen(false);
  });
})();

/* -------------------------------------------------------- scroll entrances */

(() => {
  const targets = document.querySelectorAll("[data-animate]");
  if (!targets.length) return;

  /* data-delay is in milliseconds. Copied to a custom property the CSS
     transition reads, so the stagger lives in the markup next to the
     element it staggers. */
  for (const el of targets) {
    const delay = Number(el.dataset.delay);
    if (delay > 0) el.style.setProperty("--delay", `${delay}ms`);
  }

  const showAll = () => {
    for (const el of targets) el.classList.add("is-visible");
  };

  /* Reduced motion: the CSS never hides anything in that case, but mark them
     visible anyway so the state is consistent.

     document.hidden: a tab opened in the background gets no
     IntersectionObserver callbacks at all until it is shown, which would
     leave every section invisible. Nobody is watching an animation in a tab
     they are not looking at, so show everything up front. */
  if (reduced || document.hidden || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        /* Once only. Nothing re-hides on the way back up. */
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15 }
  );

  for (const el of targets) observer.observe(el);
})();

/* ----------------------------------------------------------- contact form */

(() => {
  const form = document.getElementById("contact-form");
  /* No endpoint means the form is rendered disabled with a setup notice. */
  if (!form || !form.getAttribute("action")) return;

  const status = document.getElementById("form-status");
  const statusHeading = document.getElementById("status-heading");
  const statusBody = document.getElementById("status-body");
  const button = form.querySelector("button[type=submit]");
  const submitLabel = button.textContent.trim();

  /* Error text says how to fix the problem, not that a problem exists. */
  const rules = [
    {
      id: "name",
      empty: "Enter your name so we know who we are replying to.",
    },
    {
      id: "email",
      empty: "Enter your email address. It is the only way we can reply.",
      invalid:
        "That email address is missing something. Check it over, an @ or a .com for example.",
    },
    {
      id: "business",
      empty:
        "Enter the name of the business. If it does not have one yet, put your own name.",
    },
    {
      id: "message",
      empty:
        "Tell us what you need, even in one line. A website, posts and ads, or that you are not sure yet.",
    },
  ];

  function setError(rule, text) {
    const input = document.getElementById(rule.id);
    const wrap = input.closest(".field");
    const error = document.getElementById(`error-${rule.id}`);
    if (text) {
      wrap.setAttribute("data-invalid", "");
      input.setAttribute("aria-invalid", "true");
      error.textContent = text;
      error.hidden = false;
    } else {
      wrap.removeAttribute("data-invalid");
      input.removeAttribute("aria-invalid");
      error.textContent = "";
      error.hidden = true;
    }
  }

  function validate() {
    let firstInvalid = null;
    for (const rule of rules) {
      const input = document.getElementById(rule.id);
      const value = input.value.trim();
      let text = "";
      if (!value) text = rule.empty;
      else if (input.type === "email" && !input.checkValidity()) text = rule.invalid;
      setError(rule, text);
      if (text && !firstInvalid) firstInvalid = input;
    }
    return firstInvalid;
  }

  /* Clear a field's error as soon as it is corrected. */
  for (const rule of rules) {
    const input = document.getElementById(rule.id);
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") !== "true") return;
      const value = input.value.trim();
      const ok = value && (input.type !== "email" || input.checkValidity());
      if (ok) setError(rule, "");
    });
  }

  function announce(kind) {
    statusHeading.textContent = status.dataset[`${kind}Heading`];
    statusBody.textContent = status.dataset[`${kind}Body`];
    status.setAttribute("role", kind === "success" ? "status" : "alert");
    /* Drives the colour of the left bar. The words already say which
       outcome this is, so the colour is a second signal. */
    status.dataset.kind = kind;
    status.hidden = false;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.hidden = true;

    const firstInvalid = validate();
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    button.disabled = true;
    button.textContent = "Sending";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(String(response.status));
      form.hidden = true;
      announce("success");
      statusHeading.setAttribute("tabindex", "-1");
      statusHeading.focus();
    } catch {
      button.disabled = false;
      button.textContent = submitLabel;
      announce("error");
    }
  });
})();
