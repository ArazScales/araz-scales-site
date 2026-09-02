import { site } from "@/content/site";
import { Container, ButtonLink } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, BarMotif } from "@/components/ui/icons";

/**
 * Closing call to action, shared by every page.
 *
 * This is the second and last appearance of the ascending-bar motif — it opens
 * the site in the hero and closes it here, which is what makes it read as a
 * signature rather than as a decorative element that got reused.
 */
export function CtaBand() {
  const { cta } = site.home;

  return (
    <section className="relative overflow-hidden border-t border-line">
      {/* Motif, bled off the bottom edge and barely there. */}
      <BarMotif
        className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-[52rem] -translate-x-1/2 text-accent opacity-[0.09] [mask-image:linear-gradient(to_top,black,transparent_90%)] sm:h-56"
      />
      <div
        aria-hidden
        className="glow pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 opacity-50 blur-3xl"
      />

      <Container className="relative py-24 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-[1.75rem] sm:text-[2.5rem]">{cta.heading}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">{cta.body}</p>
          <div className="mt-10 flex justify-center">
            <ButtonLink href={cta.button.href}>
              {cta.button.label}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
