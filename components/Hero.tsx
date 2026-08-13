import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Section";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Hero.
 *
 * The secondary CTA reads its URL from NEXT_PUBLIC_CAL_URL at build time. If
 * that variable is unset the button is omitted entirely rather than rendering a
 * dead link — an empty href would scroll to the top and look broken.
 */
export function Hero() {
  const calUrl = process.env.NEXT_PUBLIC_CAL_URL?.trim();

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Technical grid, faded out toward the bottom of the section. */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-28 sm:px-8 sm:pt-32 lg:pt-40 lg:pb-36">
        {/* Product badge ------------------------------------------------- */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/60 py-1.5 pr-4 pl-2">
          <span className="rounded-full bg-accent px-2.5 py-0.5 font-display text-[0.65rem] font-extrabold tracking-[0.12em] text-accent-ink uppercase">
            {site.hero.product}
          </span>
          <span className="font-display text-[0.7rem] font-bold tracking-[0.18em] text-faint uppercase">
            {site.meta.tagline}
          </span>
        </div>

        {/* Pitch line as the page's single h1 ----------------------------- */}
        {/* The explicit {" "} between spans is load-bearing: without it the
            accessible name computes as one run-on string with no word breaks
            ("Tuesday.The content"), which screen readers read back wrong. */}
        <h1 className="max-w-4xl text-[2.5rem] leading-[1.02] sm:text-6xl lg:text-7xl">
          <span className="block">{site.hero.headline}</span>{" "}
          <span className="block text-accent">{site.hero.headlineAccent}</span>{" "}
          <span className="block">{site.hero.headlineTail}</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-muted sm:text-xl">
          {site.hero.subhead}
        </p>

        {/* CTAs ------------------------------------------------------------ */}
        <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={site.hero.ctaPrimary.href} className="group">
            {site.hero.ctaPrimary.label}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </ButtonLink>

          {calUrl && (
            <ButtonLink href={calUrl} variant="secondary">
              {site.hero.ctaSecondary.label}
            </ButtonLink>
          )}
        </div>

        <p className="mt-10 max-w-md border-l-2 border-accent pl-4 text-sm text-faint">
          {site.hero.positioning}
        </p>
      </div>
    </section>
  );
}
