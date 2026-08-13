/**
 * Inline SVG icons — deliberately not an icon library.
 *
 * A package like lucide-react would add a dependency and ship a runtime for the
 * eight glyphs this site actually uses. These are hand-rolled, tree-shaken by
 * definition, and render as part of the HTML with no extra request.
 *
 * All icons inherit `currentColor` and size to 1em unless given a className.
 * They are decorative: every one is aria-hidden, and the surrounding component
 * supplies the accessible name.
 */

type IconProps = {
  className?: string;
};

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

/* ------------------------------------------------------------ brand mark -- */

/**
 * Placeholder ARAZ Scales mark: an ascending three-bar "scale" in brand blue.
 * Replace /public/logo.svg with the real mark from the business cards; this
 * component is only used for the inline nav/footer lockup.
 */
export function Logo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable={false} className={className}>
      <rect x="2" y="14" width="5" height="8" rx="1.5" fill="currentColor" opacity="0.5" />
      <rect x="9.5" y="9" width="5" height="13" rx="1.5" fill="currentColor" opacity="0.75" />
      <rect x="17" y="2" width="5" height="20" rx="1.5" fill="currentColor" />
    </svg>
  );
}

/* ---------------------------------------------------------- artifact set -- */

export function ChangelogIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 3.5h9.5L19 8v12.5H5z" />
      <path d="M14 3.5V8h5" />
      <path d="M8.5 12.5h7M8.5 16h4.5" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M8 10.5V16M8 7.6v.1" />
      <path d="M12 16v-3.2a2.3 2.3 0 0 1 4.5 0V16" />
    </svg>
  );
}

export function ThreadIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 6.5A2.5 2.5 0 0 1 6 4h8a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 14 12H8l-3 2.5V12H6a2.5 2.5 0 0 1-2.5-2.5z" />
      <path d="M19 9.5a2.5 2.5 0 0 1 1.5 2.3v3a2.5 2.5 0 0 1-2.5 2.5h-1v2.2L14 17.3" />
    </svg>
  );
}

export function NewsletterIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

/** Maps the `icon` key in content/site.ts to a component. */
export const artifactIcons = {
  changelog: ChangelogIcon,
  linkedin: LinkedInIcon,
  thread: ThreadIcon,
  newsletter: NewsletterIcon,
} as const;

export type ArtifactIconName = keyof typeof artifactIcons;

/* ------------------------------------------------------------------ ui --- */

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/* --------------------------------------------------------------- social -- */

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} className={className}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.72c-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.28 9.28 0 0 1 5.01 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} className={className}>
      <path d="M17.53 3h3.16l-6.9 7.89L21.7 21h-6.24l-4.9-6.41L4.96 21H1.8l7.38-8.44L1.9 3h6.4l4.43 5.86L17.53 3Zm-1.11 16.06h1.75L7.36 4.83H5.48l10.94 14.23Z" />
    </svg>
  );
}
