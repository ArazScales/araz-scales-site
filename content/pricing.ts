/**
 * ---------------------------------------------------------------------------
 * ARAZ Scales — pricing
 * ---------------------------------------------------------------------------
 * HOW TO SHOW OR HIDE A PRICE
 *
 *   Hidden : set `setup` and `monthly` to null. The card renders `priceNote`
 *            ("Contact us") instead, and the CTA points at the contact form.
 *   Shown  : set `setup` and `monthly` to the display strings you want.
 *            Write them exactly as they should appear, e.g. "$2,500".
 *
 * IMPORTANT — why the hidden numbers are commented out rather than left in
 * the object with a `visible: false` flag:
 *
 *   This site is statically exported. Anything present in this file ends up in
 *   the shipped HTML/JS payload whether or not it is rendered, so a flag would
 *   leave your real Standard and Scale numbers readable in page source by
 *   anyone who opens devtools. Commenting them out is the only way to keep an
 *   unpublished price genuinely unpublished.
 *
 *   To publish a tier: uncomment its two lines and delete the `null` lines
 *   above them. That is the whole change.
 * ---------------------------------------------------------------------------
 */

export type PricingTier = {
  id: string;
  name: string;
  /** Short qualifier shown beside the tier name, e.g. scarcity or scope. */
  badge?: string;
  /** One-time onboarding fee. `null` hides the price and shows `priceNote`. */
  setup: string | null;
  /** Recurring retainer. `null` hides the price and shows `priceNote`. */
  monthly: string | null;
  /** Rendered in place of the numbers when either price is null. */
  priceNote: string;
  /** One-line positioning under the tier name. */
  blurb: string;
  /** Bullet list. Keep these parallel in length across tiers. */
  features: string[];
  /** Conditions attached to the tier, shown in smaller type. */
  conditions?: string;
  cta: { label: string; href: string };
  /** Exactly one tier should be featured — it gets the accent treatment. */
  featured: boolean;
};

export const pricing = {
  eyebrow: "Pricing",
  heading: "Three ways in.",
  intro:
    "Every engagement includes the custom build, the hosting, the human editorial pass and the approval queue. Setup is one-time; the retainer covers operation and iteration.",

  tiers: [
    {
      id: "pilot",
      name: "Pilot",
      badge: "Limited spots",
      setup: "$1,000",
      monthly: "$900",
      priceNote: "Contact us",
      blurb: "Founding-client rate for teams willing to go on the record.",
      features: [
        "One repository",
        "All four artifacts per shipped feature",
        "Human editorial pass before your queue",
        "Slack digest or publishing queue",
        "Founding rate held for 12 months",
      ],
      conditions:
        "Requires a written testimonial and permission to name you as a client. A small number of spots, then this tier closes.",
      cta: { label: "Claim a pilot spot", href: "#contact" },
      featured: true,
    },

    {
      id: "standard",
      name: "Standard",
      badge: "Most common",
      // Hidden. To publish, delete the two `null` lines and uncomment the two below.
      setup: null,
      monthly: null,
      // setup: "$2,500",
      // monthly: "$2,000",
      priceNote: "Contact us",
      blurb: "The default engagement for a single-product Series A team.",
      features: [
        "One repository",
        "Roughly 12–20 pieces per month",
        "All four artifacts per shipped feature",
        "Human editorial pass before your queue",
        "Monthly review call",
      ],
      conditions: "Month-to-month after the first 90 days.",
      cta: { label: "Talk to us", href: "#contact" },
      featured: false,
    },

    {
      id: "scale",
      name: "Scale",
      badge: "Multi-repo",
      // Hidden. To publish, delete the two `null` lines and uncomment the two below.
      setup: null,
      monthly: null,
      // setup: "$5,000",
      // monthly: "$4,000",
      priceNote: "Contact us",
      blurb: "For teams shipping across several repositories and tracking work in Jira or Linear.",
      features: [
        "Multiple repositories",
        "Jira and Linear integration",
        "Weekly call and priority turnaround",
        "Custom voice tuning per author",
        "Named editor on your account",
      ],
      conditions: "Scoped per engagement. Annual agreements available.",
      cta: { label: "Talk to us", href: "#contact" },
      featured: false,
    },
  ] satisfies PricingTier[],

  /** Shown directly beneath the pricing grid, in small muted type. */
  footnote:
    "Prices in USD, billed monthly. Setup covers the custom build and voice calibration. Cancel with 30 days' notice.",
};
// Note: deliberately not `as const`. Deep-readonly tiers would not satisfy the
// mutable `PricingTier` shape the Pricing component takes as a prop.
