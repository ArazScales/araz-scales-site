import Link from "next/link";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { serviceIcons, ArrowRightIcon } from "@/components/ui/icons";

/**
 * Home-page overview of the three services.
 *
 * Each card is a single link to its section on /services rather than a card
 * with a "learn more" link inside it — one target, one hover state, no nested
 * interactive elements to trap a keyboard user.
 */
export function Pillars() {
  const { pillars } = site.home;

  return (
    <Section id="services" eyebrow={pillars.eyebrow} heading={pillars.heading} intro={pillars.intro}>
      <ul className="mt-16 grid gap-5 md:grid-cols-3">
        {site.services.pillars.map((pillar, index) => {
          const Icon = serviceIcons[pillar.icon];

          return (
            <Reveal key={pillar.id} as="li" delay={index * 80}>
              <Link
                href={`/services#${pillar.id}`}
                className="group flex h-full flex-col rounded-xl border border-line bg-surface/50 p-7 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-strong hover:bg-surface"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line-strong bg-canvas text-accent transition-colors duration-300 group-hover:border-accent/50">
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="mt-6 text-xl">{pillar.name}</h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                  {pillar.summary}
                </p>

                <span className="mt-7 flex items-center justify-between border-t border-line pt-5">
                  <span className="tabular text-sm font-semibold text-ink">{pillar.price}</span>
                  <span className="inline-flex items-center gap-1.5 label text-accent">
                    Detail
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
