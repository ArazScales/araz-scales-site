import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/ui/icons";

/**
 * Founders.
 *
 * Avatars are initials in a tile rather than photos — no stock imagery, no
 * headshot dependency, and nothing to optimise. Swap in real photos later by
 * replacing the tile with a next/image; the grid will not need to change.
 *
 * Social links are omitted individually when their URL is an empty string, so
 * an incomplete profile never renders a dead icon.
 */
export function Team() {
  const { eyebrow, heading, intro, members } = site.team;

  return (
    <Section id="team" eyebrow={eyebrow} heading={heading} intro={intro} bordered>
      <ul className="mt-16 grid gap-6 md:grid-cols-3">
        {members.map((member, i) => (
          <li
            key={`${member.name}-${i}`}
            className="rounded-lg border border-line bg-surface/40 p-8"
          >
            <span
              aria-hidden
              className="flex h-14 w-14 items-center justify-center rounded border border-line-strong bg-base font-display text-sm font-black tracking-[0.08em] text-accent"
            >
              {member.initials}
            </span>

            <h3 className="mt-6 text-lg tracking-[0.05em] text-ink">{member.name}</h3>
            <p className="mt-1.5 font-display text-[0.7rem] font-bold tracking-[0.14em] text-accent uppercase">
              {member.role}
            </p>
            <p className="mt-4 text-sm text-muted">{member.bio}</p>

            <SocialLinks name={member.name} links={member.links} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

type Links = { linkedin: string; github: string; x: string };

function SocialLinks({ name, links }: { name: string; links: Links }) {
  const entries = [
    { key: "linkedin", href: links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { key: "github", href: links.github, label: "GitHub", Icon: GitHubIcon },
    { key: "x", href: links.x, label: "X", Icon: XIcon },
  ].filter((entry) => entry.href.length > 0);

  if (entries.length === 0) return null;

  return (
    <ul className="mt-6 flex gap-4">
      {entries.map(({ key, href, label, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded text-faint transition-colors hover:text-accent"
          >
            <Icon className="h-4.5 w-4.5" />
            <span className="sr-only">{`${name} on ${label}`}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
