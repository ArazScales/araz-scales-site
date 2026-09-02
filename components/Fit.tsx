import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CheckIcon, SlashIcon } from "@/components/ui/icons";

/**
 * Qualification section.
 *
 * A marketing page that only lists reasons to buy reads as a brochure. Naming
 * the cases we're wrong for is the cheapest credibility on the page — and it
 * filters the leads that would otherwise burn a call each.
 *
 * The "don't" column is styled at the same weight as the "do" column on
 * purpose: dimming it would undercut the point of printing it.
 */
export function Fit() {
  const { fit } = site.home;

  const columns = [
    { ...fit.good, tone: "positive" as const, Icon: CheckIcon },
    { ...fit.bad, tone: "caution" as const, Icon: SlashIcon },
  ];

  return (
    <Section id="fit" eyebrow={fit.eyebrow} heading={fit.heading} bordered>
      <div className="mt-16 grid gap-5 lg:grid-cols-2">
        {columns.map((column, index) => (
          <Reveal key={column.title} delay={index * 90}>
            <div
              className={`h-full rounded-xl border bg-surface/40 p-8 ${
                column.tone === "positive" ? "border-positive/25" : "border-line"
              }`}
            >
              <h3
                className={`text-lg ${
                  column.tone === "positive" ? "text-positive" : "text-faint"
                }`}
              >
                {column.title}
              </h3>

              <ul className="mt-7 space-y-5">
                {column.items.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <column.Icon
                      className={`mt-1 h-4 w-4 shrink-0 ${
                        column.tone === "positive" ? "text-positive" : "text-faint"
                      }`}
                    />
                    <span className="text-[0.95rem] leading-relaxed text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
