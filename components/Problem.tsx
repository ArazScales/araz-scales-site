import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";

export function Problem() {
  const { eyebrow, heading, intro, points, kicker } = site.problem;

  return (
    <Section id="problem" eyebrow={eyebrow} heading={heading} intro={intro} bordered>
      <ul className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
        {points.map((point) => (
          <li key={point.title} className="bg-base p-8">
            <h3 className="text-base tracking-[0.04em] text-ink">{point.title}</h3>
            <p className="mt-4 text-muted">{point.body}</p>
          </li>
        ))}
      </ul>

      <p className="mt-14 font-display text-xl font-black tracking-[0.02em] text-ink uppercase sm:text-2xl">
        {kicker}
      </p>
    </Section>
  );
}
