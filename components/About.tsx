import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkedInIcon, XIcon } from "@/components/ui/icons";

const { about } = site;

/**
 * Positioning narrative.
 *
 * Set at a wider measure and a larger size than body copy elsewhere — this is
 * the one place on the site someone reads three paragraphs in a row, and it
 * should feel like an argument rather than a feature list.
 */
export function Story() {
  return (
    <Section id="story">
      <div className="max-w-3xl space-y-7">
        {about.story.map((paragraph, index) => (
          <Reveal key={paragraph.slice(0, 32)} delay={index * 70}>
            <p className="text-lg leading-relaxed text-muted sm:text-xl">{paragraph}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/**
 * Operating principles.
 *
 * Each one is written with a consequence attached — "you own everything" is a
 * slogan, "if you leave, you leave with the assets" is a commitment. Keep that
 * pattern if you edit the copy.
 */
export function Principles() {
  return (
    <Section id="principles" heading={about.principles.heading} bordered>
      <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        {about.principles.items.map((item, index) => (
          <Reveal
            key={item.title}
            as="li"
            delay={index * 70}
            className="group bg-canvas p-8 transition-colors duration-300 hover:bg-surface"
          >
            <span className="tabular label text-faint transition-colors duration-300 group-hover:text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-lg">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/**
 * Founders.
 *
 * Initials tiles rather than photos: three consistent, well-lit headshots are
 * a real production job, and mismatched ones look worse than none. Drop images
 * in here once they exist — the tile is already the right aspect ratio.
 *
 * Social icons render only for a founder with a non-empty URL, so an
 * unfinished profile leaves no dead link on the page.
 */
export function Founders() {
  const { team } = about;

  return (
    <Section id="founders" eyebrow={team.eyebrow} heading={team.heading} intro={team.intro} bordered>
      <ul className="mt-16 grid gap-5 md:grid-cols-3">
        {team.members.map((member, index) => (
          <Reveal key={member.name} as="li" delay={index * 80}>
            <div className="flex h-full flex-col rounded-xl border border-line bg-surface/40 p-7 transition-colors duration-300 hover:border-line-strong hover:bg-surface">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex h-14 w-14 items-center justify-center rounded-lg border border-line-strong bg-canvas font-display text-base font-extrabold tracking-[0.08em] text-accent"
                >
                  {member.initials}
                </span>
                <span className="rounded-full border border-line-strong px-3 py-1 label text-faint">
                  {member.focus}
                </span>
              </div>

              <h3 className="mt-6 text-lg">{member.name}</h3>
              <p className="mt-1 text-sm text-accent">{member.role}</p>
              <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-muted">{member.bio}</p>

              {(member.links.linkedin || member.links.x) && (
                <div className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                  {member.links.linkedin && (
                    <a
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="rounded p-1.5 text-faint transition-colors hover:text-accent"
                    >
                      <LinkedInIcon className="h-4 w-4" />
                    </a>
                  )}
                  {member.links.x && (
                    <a
                      href={member.links.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on X`}
                      className="rounded p-1.5 text-faint transition-colors hover:text-accent"
                    >
                      <XIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
