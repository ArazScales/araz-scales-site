"use client";

import { useId, useState } from "react";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";

/**
 * Contact form — posts directly to Formspree.
 *
 * There is no API route here on purpose: an API route would require a Node
 * runtime and break `output: "export"`. Formspree accepts a browser fetch with
 * `Accept: application/json`, which keeps the whole site static.
 *
 * Configure NEXT_PUBLIC_FORMSPREE_ID in .env.local. Without it the form renders
 * disabled with a visible setup notice rather than silently swallowing leads.
 */

type Status = "idle" | "submitting" | "success" | "error";

const { contact } = site;

export function Contact() {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim();
  const isConfigured = Boolean(formId);

  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isConfigured || status === "submitting") return;

    const form = event.currentTarget;
    setStatus("submitting");

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact" eyebrow={contact.eyebrow} heading={contact.heading} bordered>
      <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Pitch ------------------------------------------------------------ */}
        <div>
          <p className="text-lg text-muted">{contact.body}</p>

          <p className="mt-8 text-sm text-faint">
            Prefer email?{" "}
            <a
              href={`mailto:${contact.email}`}
              className="rounded text-accent underline underline-offset-4 transition-colors hover:text-accent-deep"
            >
              {contact.email}
            </a>
          </p>
        </div>

        {/* Form ------------------------------------------------------------- */}
        <div>
          {status === "success" ? (
            <SuccessPanel />
          ) : (
            <form onSubmit={handleSubmit} noValidate={false} className="space-y-6">
              {!isConfigured && (
                <p className="rounded border border-pending/40 bg-pending/10 px-4 py-3 text-sm text-pending">
                  {contact.unconfiguredNote}
                </p>
              )}

              <Field config={contact.fields.name} type="text" autoComplete="name" />
              <Field config={contact.fields.email} type="email" autoComplete="email" />
              <Field config={contact.fields.company} type="text" autoComplete="organization" />
              <Field config={contact.fields.repo} type="url" autoComplete="off" />
              <Field config={contact.fields.notes} type="textarea" autoComplete="off" />

              {/* Formspree's honeypot: bots fill it, humans never see it. */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="hidden"
              />

              <button
                type="submit"
                disabled={!isConfigured || status === "submitting"}
                className="group inline-flex w-full items-center justify-center gap-2 rounded bg-accent px-6 py-4 font-display text-sm font-extrabold tracking-[0.08em] text-accent-ink uppercase transition-colors duration-150 hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "submitting" ? contact.submitting : contact.submit}
                {status !== "submitting" && (
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                )}
              </button>

              {/* Announced to screen readers the moment it appears. */}
              <p aria-live="polite" className="sr-only">
                {status === "submitting" ? contact.submitting : ""}
              </p>

              {status === "error" && (
                <p
                  role="alert"
                  className="rounded border border-pending/40 bg-pending/10 px-4 py-3 text-sm text-pending"
                >
                  {contact.errorBody}
                </p>
              )}

              <p className="text-xs leading-relaxed text-faint">{contact.privacyNote}</p>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function SuccessPanel() {
  return (
    <div
      role="status"
      className="rounded-lg border border-approved/30 bg-approved/5 p-8"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-approved/40 bg-approved/10 text-approved">
        <CheckIcon className="h-5 w-5" />
      </span>
      <h3 className="mt-6 text-lg tracking-[0.05em] text-ink">{contact.successHeading}</h3>
      <p className="mt-3 text-muted">{contact.successBody}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

type FieldConfig = {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  help?: string;
};

function Field({
  config,
  type,
  autoComplete,
}: {
  config: FieldConfig;
  type: "text" | "email" | "url" | "textarea";
  autoComplete: string;
}) {
  const id = useId();
  const helpId = config.help ? `${id}-help` : undefined;

  const shared = {
    id,
    name: config.name,
    required: config.required,
    placeholder: config.placeholder,
    autoComplete,
    "aria-describedby": helpId,
    // The global :focus-visible ring in globals.css is intentionally left in
    // place here — a border colour change alone is a weak focus indicator.
    className:
      // placeholder:text-faint at full opacity, not /70 — at 70% it composites
      // to 3.0:1 against the input background, which fails WCAG AA.
      "w-full rounded border border-line bg-surface/60 px-4 py-3 text-ink placeholder:text-faint transition-colors duration-150 hover:border-line-strong focus:border-accent",
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-display text-[0.7rem] font-bold tracking-[0.14em] text-muted uppercase"
      >
        {config.label}
        {!config.required && <span className="ml-2 text-faint normal-case">(optional)</span>}
      </label>

      {type === "textarea" ? (
        <textarea {...shared} rows={3} />
      ) : (
        <input {...shared} type={type} />
      )}

      {config.help && (
        <p id={helpId} className="mt-2 text-xs text-faint">
          {config.help}
        </p>
      )}
    </div>
  );
}
