import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The four-step engagement, laid out as a numbered run.
 *
 * The connecting rule is drawn with a border on the list rather than per-item
 * pseudo-elements, so it never gets out of step with a wrapped grid row.
 */
export function Method() {
  const { method } = site.home;

  return (
    <Section
      id="method"
      eyebrow={method.eyebrow}
      heading={method.heading}
      intro={method.intro}
      bordered
    >
      <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {method.steps.map((step, index) => (
          <Reveal
            key={step.id}
            as="li"
            delay={index * 70}
            className="group relative flex flex-col bg-canvas p-7 transition-colors duration-300 hover:bg-surface"
          >
            <span className="tabular label text-faint transition-colors duration-300 group-hover:text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="mt-5 text-lg">{step.title}</h3>
            <p className="mt-3 flex-1 text-[0.925rem] leading-relaxed text-muted">{step.body}</p>

            {/* mt-auto pins the pill to the bottom of the cell, so all four sit
                on one baseline regardless of how long the body copy runs. */}
            <p className="mt-6 inline-flex self-start rounded-full border border-line-strong px-3 py-1 text-xs text-faint">
              {step.detail}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
