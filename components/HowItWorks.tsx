import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";

/**
 * The five-step pipeline.
 *
 * Renders as a horizontal pipeline at lg and above, and as a vertical timeline
 * below that — the horizontal form would either overflow or shrink the type
 * past readability on a phone. Both forms come from the same markup and the
 * same DOM order, so the reading order is identical for screen readers.
 *
 * The "review" step is visually accented because it is the one the client
 * performs; the section heading promises exactly that.
 */
export function HowItWorks() {
  const { eyebrow, heading, intro, steps } = site.howItWorks;

  return (
    <Section id="how-it-works" eyebrow={eyebrow} heading={heading} intro={intro} bordered>
      <ol className="mt-16 grid gap-10 lg:grid-cols-5 lg:gap-6">
        {steps.map((step, i) => {
          const isYours = step.id === "review";

          return (
            <li key={step.id} className="relative flex gap-5 lg:block">
              {/* Rail — vertical on mobile, horizontal on desktop --------- */}
              <div className="flex flex-col items-center lg:mb-6 lg:flex-row">
                <span
                  aria-hidden
                  className={`tabular flex h-11 w-11 shrink-0 items-center justify-center rounded font-display text-sm font-black ${
                    isYours
                      ? "bg-accent text-accent-ink"
                      : "border border-line-strong bg-surface text-accent"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Connector to the next step. */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="mt-2 w-px flex-1 bg-line lg:mt-0 lg:ml-4 lg:h-px lg:w-auto lg:flex-1"
                  />
                )}
              </div>

              <div className="pb-2 lg:pb-0">
                <h3 className="text-lg tracking-[0.06em] text-ink">{step.title}</h3>

                <p
                  className={`mt-2 font-display text-[0.7rem] font-bold tracking-[0.14em] uppercase ${
                    isYours ? "text-accent" : "text-faint"
                  }`}
                >
                  {isYours ? `${step.detail} — your step` : step.detail}
                </p>

                <p className="mt-4 text-sm text-muted">{step.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
