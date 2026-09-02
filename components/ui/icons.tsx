/**
 * Inline SVG icons — deliberately not an icon library.
 *
 * A package like lucide-react would add a dependency and ship a runtime for the
 * dozen glyphs this site actually uses. These are hand-rolled, tree-shaken by
 * definition, and render as part of the HTML with no extra request.
 *
 * All icons inherit `currentColor` and size from their className. They are
 * decorative: every one is aria-hidden, and the surrounding component supplies
 * the accessible name.
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
 * The ARAZ Scales mark: an "A" formed by an ascending three-bar chart.
 * The same three-bar rhythm recurs as a background motif in <BarMotif>.
 */
export function Logo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable={false} className={className}>
      <rect x="2" y="14" width="5" height="8" rx="1.5" fill="currentColor" opacity="0.45" />
      <rect x="9.5" y="9" width="5" height="13" rx="1.5" fill="currentColor" opacity="0.72" />
      <rect x="17" y="2" width="5" height="20" rx="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Decorative echo of the logo — an ascending run of bars, drawn oversized and
 * at very low opacity behind the hero and above the footer.
 *
 * Restraint is the point. This appears twice on the site. If you find yourself
 * adding a third, delete one of the other two first: repeated often enough it
 * stops reading as a signature and starts reading as wallpaper.
 *
 * Both call sites apply a linear-gradient mask. Without one the bars end on a
 * hard horizontal edge where the section is cropped, which reads as a
 * rendering glitch rather than as a deliberate element — always mask it.
 */
export function BarMotif({ className }: IconProps) {
  /* Heights ascend on an ease-out curve rather than linearly — a straight ramp
     reads as a chart axis, a curved one reads as growth. */
  const bars = [
    { x: 0, h: 22 },
    { x: 14, h: 34 },
    { x: 28, h: 43 },
    { x: 42, h: 58 },
    { x: 56, h: 69 },
    { x: 70, h: 88 },
    { x: 84, h: 100 },
  ];

  return (
    <svg
      viewBox="0 0 98 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      focusable={false}
      className={className}
    >
      {bars.map((bar) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={100 - bar.h}
          width="5.5"
          height={bar.h}
          rx="1"
          fill="currentColor"
          /* Later bars sit slightly more solid, so the run reads left to right. */
          opacity={0.35 + (bar.x / 84) * 0.65}
        />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------- services -- */

/** Websites — a browser frame. */
export function SiteIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M2.5 8.75h19" />
      <path d="M5.75 6.4h.01M8.25 6.4h.01M10.75 6.4h.01" />
      <path d="M6 12.5h7M6 16h4.5" />
    </svg>
  );
}

/** Ghostwriting — a nib. */
export function PenIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20.5 5.2 16 16.4 4.8a2.3 2.3 0 0 1 3.3 3.3L8.5 19.3z" />
      <path d="m14.6 6.6 3.3 3.3" />
      <path d="M5.2 16 8.5 19.3" />
    </svg>
  );
}

/** Meta ads — an ascending bar chart, echoing the mark. */
export function ChartIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 20.5h17" />
      <rect x="5" y="13" width="3.6" height="5" rx="1" />
      <rect x="10.2" y="9" width="3.6" height="9" rx="1" />
      <rect x="15.4" y="4.5" width="3.6" height="13.5" rx="1" />
    </svg>
  );
}

/** Maps the `icon` key in content/site.ts to a component. */
export const serviceIcons = {
  site: SiteIcon,
  pen: PenIcon,
  chart: ChartIcon,
} as const;

export type ServiceIconName = keyof typeof serviceIcons;

/* ------------------------------------------------------------------- ui --- */

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

/** Used on the "don't work with us if" list — a slash, not a red X. */
export function SlashIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M18 6 6 18" />
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

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

/* ---------------------------------------------------------------- social -- */

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0" />
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
