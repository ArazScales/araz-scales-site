import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/* ---------------------------------------------------------------- layout -- */

/**
 * The single horizontal measure for the whole site. Every full-width band
 * paints its own background and nests a Container for its content, so the
 * gutter never has to be re-declared per section.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`}>{children}</div>
  );
}

/**
 * Shared section shell.
 *
 * Owns vertical rhythm, anchor id and the eyebrow/heading/intro lockup, so
 * every section is spaced and typeset identically. To change the page's
 * negative space globally, change --spacing-section in app/globals.css rather
 * than touching sections one at a time.
 */
type SectionProps = {
  /** Anchor target. Must match any in-page href pointing at this section. */
  id?: string;
  eyebrow?: string;
  /** Rendered as <h2>. Each page has exactly one <h1>, in its PageHeader. */
  heading?: string;
  intro?: string;
  /** Hairline above the section, faded at both ends. */
  bordered?: boolean;
  centered?: boolean;
  /** Trims the top padding — for a section that follows a PageHeader. */
  tight?: boolean;
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
  tight = false,
  className = "",
  children,
}: SectionProps) {
  const labelId = heading && id ? `${id}-heading` : undefined;
  const hasHeader = Boolean(eyebrow || heading || intro);

  return (
    <section
      id={id}
      aria-labelledby={labelId}
      /* scroll-mt keeps in-page anchors clear of the sticky nav on browsers
         that ignore scroll-padding during programmatic scrolls. */
      className={`relative scroll-mt-24 ${className}`}
    >
      {bordered && (
        <Container>
          <div aria-hidden className="rule-fade h-px" />
        </Container>
      )}

      <Container className={tight ? "pt-14 pb-section" : "py-section"}>
        {hasHeader && (
          /* Deliberately a <div>, not a <header>: Chromium exposes a nested
             <header> as a `banner` landmark, and six banner landmarks on one
             page is worse for screen reader navigation than none. */
          <Reveal className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {heading && (
              <h2
                id={labelId}
                className="mt-5 text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem]"
              >
                {heading}
              </h2>
            )}
            {intro && <p className="mt-6 text-lg text-muted sm:text-xl">{intro}</p>}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}

/**
 * Page-level header — the <h1> lockup at the top of every route except home,
 * where the Hero plays this role instead.
 */
export function PageHeader({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      {/* Same bloom as the hero, dialled well down — enough to keep the top of
          the page from reading as a flat rectangle, not enough to notice. */}
      <div
        aria-hidden
        className="glow pointer-events-none absolute -top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 opacity-40 blur-3xl"
      />
      <Container className="relative pt-20 pb-16 sm:pt-28 sm:pb-20">
        <Reveal className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-[2.125rem] sm:text-[3.25rem] lg:text-[3.75rem]">{heading}</h1>
          {intro && <p className="mt-7 max-w-2xl text-lg text-muted sm:text-xl">{intro}</p>}
        </Reveal>
      </Container>
    </header>
  );
}

/** Small uppercase label above a heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="label text-accent">{children}</p>;
}

/* --------------------------------------------------------------- buttons -- */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

/**
 * Anchor styled as a button.
 *
 * Internal routes go through next/link so navigation is client-side and the
 * target route is prefetched; hashes, mailto: and external URLs fall back to a
 * plain <a>, which is what those actually need.
 */
export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  const isExternal = href.startsWith("http");

  const styles = {
    primary:
      "bg-accent text-accent-ink hover:bg-accent-deep shadow-[0_0_0_0_transparent] hover:shadow-[0_8px_30px_-8px_var(--color-accent)]",
    secondary:
      "border border-line-strong text-ink hover:border-accent/70 hover:bg-surface hover:text-accent",
    ghost: "text-muted hover:text-ink",
  }[variant];

  const classes = `group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 label transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${styles} ${className}`;

  if (isInternal) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={classes}
    >
      {children}
    </a>
  );
}
