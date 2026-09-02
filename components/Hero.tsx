import { site } from "@/content/site";
import { Container, ButtonLink } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, BarMotif } from "@/components/ui/icons";

/**
 * Home hero.
 *
 * Three layers sit behind the type, in this order:
 *   1. a masked technical grid, for texture
 *   2. the ascending-bar motif from the logo, bled off the right edge
 *   3. a soft blue bloom sitting directly under the headline
 *
 * All three are absolutely positioned, pointer-events-none and aria-hidden, so
 * they never interfere with selection, hit targets or the accessibility tree.
 */
export function Hero() {
  const { hero } = site.home;

  return (
    <section id="top" className="relative overflow-hidden">
      {/* 1 — grid, faded toward the bottom so it doesn't collide with the
             commitments row. */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)]"
      />

      {/* 2 — the mark's ascending bars, oversized and cropped by the section.
             At 5% opacity this reads as structure, not as a logo pasted on. */}
      <BarMotif className="pointer-events-none absolute -right-24 bottom-0 h-[26rem] w-[34rem] text-accent opacity-[0.07] [mask-image:linear-gradient(to_top,black,transparent_85%)] lg:h-[34rem] lg:w-[44rem]" />

      {/* 3 — bloom under the headline. */}
      <div
        aria-hidden
        className="glow pointer-events-none absolute top-24 left-0 h-[28rem] w-[46rem] opacity-70 blur-3xl sm:top-28"
      />

      <Container className="relative pt-20 pb-20 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-28">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/70 py-1.5 pr-4 pl-2 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="label text-faint">{hero.badge}</span>
          </p>
        </Reveal>

        {/* The page's single h1. The explicit {" "} between the two spans is
            load-bearing: without it the accessible name computes as one
            run-on string with no word break between the clauses. */}
        <Reveal delay={60}>
          <h1 className="mt-9 max-w-4xl text-[2.125rem] sm:text-[3.5rem] lg:text-[4.25rem]">
            <span className="block">{hero.headline}</span>{" "}
            <span className="block text-accent">{hero.headlineAccent}</span>
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {hero.subhead}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={hero.ctaPrimary.href}>
              {hero.ctaPrimary.label}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href={hero.ctaSecondary.href} variant="secondary">
              {hero.ctaSecondary.label}
            </ButtonLink>
          </div>
        </Reveal>

        {/* Commitments. Deliberately not "results" — these are three things we
            control, stated as facts, rather than performance claims we would
            have to substantiate. */}
        <Reveal delay={240}>
          <dl className="mt-20 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {hero.commitments.map((item) => (
              <div key={item.value} className="bg-canvas px-6 py-7">
                <dt className="tabular font-display text-3xl font-extrabold tracking-[-0.03em] text-accent">
                  {item.value}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{item.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
