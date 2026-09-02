import { site } from "@/content/site";
import { Container, ButtonLink } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { serviceIcons, CheckIcon, ArrowRightIcon } from "@/components/ui/icons";

type Pillar = (typeof site.services.pillars)[number];

/**
 * One service, in full, on /services.
 *
 * Two columns on desktop: the argument on the left, the contract on the right.
 * The left column is sticky so the deliverables list — the long one — scrolls
 * against a heading that stays put, which is what keeps the reader oriented
 * when all three services use the same layout.
 */
export function ServiceDetail({ pillar, index }: { pillar: Pillar; index: number }) {
  const Icon = serviceIcons[pillar.icon];
  const headingId = `${pillar.id}-heading`;

  return (
    <section
      id={pillar.id}
      aria-labelledby={headingId}
      className="scroll-mt-24 border-t border-line"
    >
      <Container className="py-20 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1fr] lg:gap-20">
          {/* Argument ----------------------------------------------------- */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-line-strong bg-surface text-accent">
                  <Icon className="h-5.5 w-5.5" />
                </span>
                <span className="tabular label text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h2 id={headingId} className="mt-7 text-[1.75rem] sm:text-[2.5rem]">
                {pillar.name}
              </h2>
              <p className="mt-4 text-lg text-accent">{pillar.summary}</p>

              <div className="mt-7 space-y-5">
                {pillar.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>

              <p className="mt-8 inline-flex items-center gap-3 rounded-lg border border-line bg-surface/60 px-4 py-3">
                <span className="tabular text-sm font-semibold text-ink">{pillar.price}</span>
                <span aria-hidden className="h-4 w-px bg-line-strong" />
                <span className="text-sm text-muted">{pillar.timeline}</span>
              </p>
            </div>
          </Reveal>

          {/* Contract ----------------------------------------------------- */}
          <Reveal delay={80}>
            <div className="rounded-xl border border-line bg-surface/40 p-8 sm:p-9">
              <h3 className="label text-faint">What you get</h3>
              <ul className="mt-6 space-y-4">
                {pillar.deliverables.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-[0.95rem] leading-relaxed text-muted">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-line pt-8">
                <h3 className="label text-faint">What we need from you</h3>
                <ul className="mt-6 space-y-3">
                  {pillar.requirements.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3.5 text-[0.95rem] leading-relaxed text-muted"
                    >
                      <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-faint" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-9 border-l-2 border-accent pl-4 text-sm leading-relaxed text-faint">
                {pillar.note}
              </p>

              <div className="mt-9">
                <ButtonLink href="/contact" variant="secondary" className="w-full sm:w-auto">
                  Start with {pillar.name.toLowerCase()}
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
