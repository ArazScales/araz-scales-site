import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { artifactIcons } from "@/components/ui/icons";

export function Artifacts() {
  const { eyebrow, heading, intro, items, footnote } = site.artifacts;

  return (
    <Section id="what-you-get" eyebrow={eyebrow} heading={heading} intro={intro} bordered>
      <ul className="mt-16 grid gap-5 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = artifactIcons[item.icon];

          return (
            <li
              key={item.id}
              className="group rounded-lg border border-line bg-surface/50 p-8 transition-colors duration-150 hover:border-line-strong hover:bg-surface"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded border border-line-strong bg-base text-accent transition-colors duration-150 group-hover:border-accent">
                <Icon className="h-5 w-5" />
              </span>

              <h3 className="mt-6 text-lg tracking-[0.05em] text-ink">{item.title}</h3>
              <p className="mt-3 text-muted">{item.body}</p>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 text-sm text-faint">{footnote}</p>
    </Section>
  );
}
