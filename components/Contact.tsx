"use client";

import { useId, useState } from "react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, CheckIcon, MailIcon } from "@/components/ui/icons";

/**
 * Contact form — posts directly to Formspree.
 *
 * There is no API route here on purpose: an API route needs a Node runtime and
 * would break `output: "export"`. Formspree accepts a browser fetch with
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
    <Container className="py-20 sm:py-24">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        {/* What happens next -------------------------------------------- */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <p className="text-lg leading-relaxed text-muted">{contact.body}</p>

            <ol className="mt-12 space-y-8">
              {contact.expectations.map((step, index) => (
                <li key={step.title} className="flex gap-5">
                  <span className="tabular mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line-strong text-xs font-bold text-accent">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-semibold tracking-[-0.01em]">{step.title}</span>
                    <span className="mt-1 block text-[0.95rem] leading-relaxed text-muted">
                      {step.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <p className="mt-12 border-t border-line pt-8 text-sm text-faint">
              Prefer email?{" "}
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-1.5 rounded text-accent underline underline-offset-4 transition-colors hover:text-accent-deep"
              >
                <MailIcon className="h-4 w-4" />
                {contact.email}
              </a>
            </p>
          </div>
        </Reveal>

        {/* Form ---------------------------------------------------------- */}
        <Reveal delay={80}>
          {status === "success" ? (
            <SuccessPanel />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-xl border border-line bg-surface/40 p-7 sm:p-9"
            >
              {!isConfigured && (
                <p className="rounded-lg border border-caution/40 bg-caution/10 px-4 py-3 text-sm text-caution">
                  {contact.unconfiguredNote}
                </p>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <Field config={contact.fields.name} type="text" autoComplete="name" />
                <Field config={contact.fields.email} type="email" autoComplete="email" />
              </div>

              <Field config={contact.fields.business} type="text" autoComplete="organization" />
              <Field config={contact.fields.website} type="text" autoComplete="url" />
              <Field config={contact.fields.service} type="select" autoComplete="off" />
              <Field config={contact.fields.message} type="textarea" autoComplete="off" />

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
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-4 label text-accent-ink transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-accent-deep hover:shadow-[0_10px_30px_-10px_var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                {status === "submitting" ? contact.submitting : contact.submit}
                {status !== "submitting" && (
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                )}
              </button>

              {/* Announced to screen readers the moment it appears. */}
              <p aria-live="polite" className="sr-only">
                {status === "submitting" ? contact.submitting : ""}
              </p>

              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-lg border border-caution/40 bg-caution/10 px-4 py-3 text-sm text-caution"
                >
                  {contact.errorBody}
                </p>
              )}

              <p className="text-xs leading-relaxed text-faint">{contact.privacyNote}</p>
            </form>
          )}
        </Reveal>
      </div>
    </Container>
  );
}

/* -------------------------------------------------------------------------- */

function SuccessPanel() {
  return (
    <div role="status" className="rounded-xl border border-positive/30 bg-positive/5 p-9">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-positive/40 bg-positive/10 text-positive">
        <CheckIcon className="h-5 w-5" />
      </span>
      <h2 className="mt-6 text-2xl">{contact.successHeading}</h2>
      <p className="mt-3 leading-relaxed text-muted">{contact.successBody}</p>
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
  options?: readonly string[];
};

/* Shared with <select> so the closed control matches the inputs exactly. */
const controlClasses =
  "w-full rounded-lg border border-line bg-canvas px-4 py-3 text-ink transition-colors duration-200 hover:border-line-strong focus:border-accent " +
  // placeholder:text-faint at full opacity, not /70 — at 70% it composites to
  // roughly 3:1 against the field background, which fails WCAG AA.
  "placeholder:text-faint";

function Field({
  config,
  type,
  autoComplete,
}: {
  config: FieldConfig;
  type: "text" | "email" | "textarea" | "select";
  autoComplete: string;
}) {
  const id = useId();
  const helpId = config.help ? `${id}-help` : undefined;

  const shared = {
    id,
    name: config.name,
    required: config.required,
    autoComplete,
    "aria-describedby": helpId,
    // The global :focus-visible ring in globals.css is intentionally left in
    // place here — a border colour change alone is a weak focus indicator.
    className: controlClasses,
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block label text-muted">
        {config.label}
        {!config.required && <span className="ml-2 normal-case text-faint">(optional)</span>}
      </label>

      {type === "select" ? (
        /* defaultValue="" plus a disabled empty option gives a real "nothing
           chosen yet" state, so `required` can actually catch an empty select
           instead of silently submitting the first option. */
        <select {...shared} defaultValue="">
          <option value="" disabled>
            Choose one…
          </option>
          {config.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea {...shared} rows={4} placeholder={config.placeholder} />
      ) : (
        <input {...shared} type={type} placeholder={config.placeholder} />
      )}

      {config.help && (
        <p id={helpId} className="mt-2 text-xs text-faint">
          {config.help}
        </p>
      )}
    </div>
  );
}
