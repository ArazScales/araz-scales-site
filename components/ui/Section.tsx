import type { ReactNode } from "react";

/**
 * Shared section shell.
 *
 * Owns the vertical rhythm, max width, anchor id and the eyebrow/heading/intro
 * lockup so every section on the page is spaced and typeset identically. If you
 * want to change the page's negative space globally, change --spacing-section
 * in app/globals.css rather than touching individual sections.
 */

type SectionProps = {
  /** Anchor target — must match the href in site.nav.links. */
  id: string;
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  /** Section heading. Rendered as <h2>; the page has exactly one <h1>. */
  heading?: string;
  /** Optional lead paragraph under the heading. */
  intro?: string;
  /** Adds a hairline above the section to separate it from the previous one. */
  bordered?: boolean;
  /** Centres the header lockup. Defaults to left-aligned. */
  centered?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Section({
  id,
  eyebrow,
  heading,
  intro,
  bordered = false,
  centered = false,
  className = "",
  children,
}: SectionProps) {
  const labelId = heading ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={labelId}
      className={`${bordered ? "border-t border-line" : ""} ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-section sm:px-8">
        {(eyebrow || heading || intro) && (
          /* Deliberately a <div>, not a <header>: Chromium exposes a nested
             <header> as a `banner` landmark, and eight banner landmarks on one
             page is worse for screen reader navigation than none. */
          <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
            {eyebrow && (
              <p className="mb-5 font-display text-xs font-bold tracking-[0.22em] text-accent uppercase">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                id={labelId}
                className="text-3xl leading-[1.05] sm:text-4xl lg:text-[2.75rem]"
              >
                {heading}
              </h2>
            )}
            {intro && (
              <p className="mt-6 text-lg text-muted sm:text-xl">{intro}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

/**
 * Anchor styled as a button. Everything on this page is a link to another
 * section or an external URL, so there is no <button> variant here — the one
 * real button on the site is the form submit, which styles itself.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const isExternal = href.startsWith("http");

  const styles =
    variant === "primary"
      ? "bg-accent text-accent-ink hover:bg-accent-deep"
      : "border border-line-strong text-ink hover:border-accent hover:text-accent";

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded px-6 py-3.5 font-display text-sm font-extrabold tracking-[0.08em] uppercase transition-colors duration-150 ${styles} ${className}`}
    >
      {children}
    </a>
  );
}
