/**
 * ---------------------------------------------------------------------------
 * ARAZ Scales — pricing
 * ---------------------------------------------------------------------------
 * Two published prices:
 *
 *   Website          $300  one-time
 *   Growth retainer  $500  per month  (ghostwriting + AI-assisted Meta ads)
 *
 * HOW TO CHANGE A PRICE
 *   Edit `price` and `cadence` below. They are display strings — write them
 *   exactly as they should appear, currency symbol included.
 *
 * HOW TO HIDE A PRICE
 *   Set `price` to null. The card renders `priceNote` ("Contact us") instead.
 *   Then DELETE the real number from this file rather than commenting it out
 *   next to a flag — this site is statically exported, so anything left in
 *   this file ships inside the HTML payload and is readable in page source
 *   whether or not it is rendered. Keep unpublished numbers out of the repo.
 * ---------------------------------------------------------------------------
 */

export type PricingPlan = {
  id: string;
  name: string;
  /** Short qualifier beside the plan name, e.g. "One-time". */
  badge?: string;
  /** Display price. `null` hides it and renders `priceNote` instead. */
  price: string | null;
  /** Billing cadence shown next to the price, e.g. "one-time", "/month". */
  cadence: string;
  /** Rendered in place of the number when `price` is null. */
  priceNote: string;
  /** One-line positioning under the plan name. */
  blurb: string;
  /** Bullet list. Keep these parallel in length across plans. */
  features: string[];
  /** Conditions attached to the plan, shown in smaller type. */
  conditions?: string;
  cta: { label: string; href: string };
  /** Exactly one plan should be featured — it gets the accent treatment. */
  featured: boolean;
};

export const pricing = {
  eyebrow: "Pricing",
  heading: "Two prices. Both of them on this page.",
  intro:
    "The website is a one-time fee and the site is yours at handover. The retainer covers the two ongoing services together, month to month. Nothing is quoted on application, and there is no fourth enterprise tier hiding behind a form.",

  plans: [
    {
      id: "website",
      name: "Website",
      badge: "One-time",
      price: "$300",
      cadence: "one-time",
      priceNote: "Contact us",
      blurb: "For businesses that don't have a website yet, or have one they don't send people to.",
      features: [
        "Up to five pages, written and built for you",
        "Mobile-first — verified on phone, tablet and desktop",
        "Contact form to your inbox, click-to-call on mobile",
        "On-page SEO and analytics installed",
        "Domain and hosting set up in your name",
        "One round of revisions included",
      ],
      conditions:
        "Flat fee, paid half up front and half at handover. Yours outright afterwards — no monthly fee to us, no licence, no lock-in. Domain registration and hosting are billed to you directly by the providers and typically run about $20–30 a year.",
      cta: { label: "Start a website", href: "/contact" },
      featured: false,
    },

    {
      id: "growth",
      name: "Growth retainer",
      badge: "Most clients",
      price: "$500",
      cadence: "/month",
      priceNote: "Contact us",
      blurb: "Ghostwriting and AI-assisted Meta ads, run together as one engagement.",
      features: [
        "Weekly founder content for LinkedIn, X or both",
        "Voice interview and a voice profile we write against",
        "20–40 Meta ad creative variants per month",
        "Structured creative testing and weekly budget reallocation",
        "Everything approved by you before it publishes",
        "Monthly report in plain language, not a dashboard link",
      ],
      conditions:
        "Month to month, cancel with 30 days' notice. Ad spend is paid directly to Meta on your own card and is not included in this fee — we never take a percentage of spend. The ads half requires an existing account with at least 60 days of spend history.",
      cta: { label: "Start a retainer", href: "/contact" },
      featured: true,
    },
  ] satisfies PricingPlan[],

  /** Shown directly beneath the pricing grid, in small muted type. */
  footnote:
    "Prices in USD. Taking the website and the retainer together is common — the site is where the content and the ads send people.",

  /* --------------------------------------------------------------- faq --- */
  faq: {
    heading: "Before you ask",
    items: [
      {
        q: "Can I take just the ghostwriting, or just the ads?",
        a: "The retainer is sold as one package at $500/month. Both halves are written against the same positioning, so running one without the other means doing the same groundwork twice for less than half the result. If only one is genuinely relevant to your business, say so on the call and we'll tell you honestly whether the retainer is worth it for you.",
      },
      {
        q: "Is the ad spend included in the $500?",
        a: "No. Your ad budget is paid straight to Meta on your own card, in your own account. Our fee covers the work — the creative, the testing, the weekly decisions and the reporting. We take no percentage of spend, so we have no reason to push your budget up.",
      },
      {
        q: "Why is the website only $300?",
        a: "Because it's a scoped build, not an open-ended design project. We're not designing a brand system, running a discovery phase or building a custom app — we're building a fast, clear, five-page site for a business that needs one to exist. The scope is what keeps the price honest.",
      },
      {
        q: "What does \"AI-assisted\" actually mean here?",
        a: "For ads, it means generative tooling produces creative variants at a volume a two-person team couldn't hand-make — different hooks, formats and cuts of angles that are already proven in your account. For content, it means drafting against a voice profile built from a recorded interview with you. In both cases a person reviews everything, and you approve everything, before it reaches an audience.",
      },
      {
        q: "Do I own the work?",
        a: "Yes. The site, the domain, the ad account and the content are all in your name on your accounts. If you stop working with us you keep all of it, and nothing needs to be migrated off our infrastructure, because it was never on it.",
      },
      {
        q: "How do I pay?",
        a: "Invoice on a 7-day term — card or bank transfer. The website is half up front and half at handover. The retainer bills monthly in advance and cancels with 30 days' notice.",
      },
    ],
  },
};
// Note: deliberately not `as const`. Deep-readonly plans would not satisfy the
// mutable `PricingPlan` shape the Pricing component takes as a prop.
