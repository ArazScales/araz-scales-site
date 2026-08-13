/**
 * ---------------------------------------------------------------------------
 * ARAZ Scales — site copy
 * ---------------------------------------------------------------------------
 * Every word rendered on the marketing site lives in this file. Components read
 * from it and never hard-code strings, so you can rewrite the entire site
 * without opening a single .tsx file.
 *
 * Pricing is the one exception — it lives in ./pricing.ts so you can swap
 * numbers or hide them without scrolling past 300 lines of prose.
 *
 * Placeholders you must replace before launch are marked [REPLACE].
 * Search the project for that token to find them all.
 * ---------------------------------------------------------------------------
 */

export const site = {
  /* ---------------------------------------------------------------- meta -- */
  meta: {
    company: "ARAZ Scales",
    tagline: "Tech Automation | AI Solutions",
    domain: "arazscales.io",
    url: "https://arazscales.io",
    title: "ARAZ Scales — Ship Log: your engineering activity, as marketing content",
    /* Keep under ~160 characters so search engines don't truncate it. */
    description:
      "Ship Log turns merged pull requests into a changelog entry, a LinkedIn post, an X thread and a newsletter blurb — in your voice. Nothing publishes without your approval.",
    /* Shown on social cards. Replace /public/og.png with your own 1200x630. */
    ogImage: "/og.png",
    locale: "en_US",
    twitterHandle: "@arazscales", // [REPLACE] or set to "" to omit the tag
  },

  /* ----------------------------------------------------------------- nav -- */
  nav: {
    links: [
      { label: "Problem", href: "#problem" },
      { label: "How it works", href: "#how-it-works" },
      { label: "What you get", href: "#what-you-get" },
      { label: "Approval", href: "#approval" },
      { label: "Pricing", href: "#pricing" },
      { label: "Team", href: "#team" },
    ],
    cta: { label: "Get a demo", href: "#contact" },
  },

  /* ---------------------------------------------------------------- hero -- */
  hero: {
    product: "Ship Log",
    /* The core pitch line, split so the last clause can be visually emphasised. */
    headline: "You ship on Tuesday.",
    headlineAccent: "The content goes out Tuesday.",
    headlineTail: "You never write it.",
    subhead:
      "Ship Log turns your engineering activity into approved marketing content — automatically. It reads your merged pull requests, throws out the noise, and writes in your voice.",
    ctaPrimary: { label: "Get a free demo on your repo", href: "#contact" },
    ctaSecondary: { label: "Book a 20-minute call", href: "" }, // filled from NEXT_PUBLIC_CAL_URL
    /* Positioning line — we are neither pure SaaS nor an agency. */
    positioning:
      "Custom software, built and operated for you. Not a SaaS trial. Not an agency retainer.",
  },

  /* ------------------------------------------------------------- problem -- */
  problem: {
    eyebrow: "The problem",
    heading: "Engineering ships. Marketing lags.",
    intro:
      "You and your team merge code every week. Almost none of it reaches the people deciding whether to trust your product.",
    points: [
      {
        title: "Your changelog is stale",
        body: "The last entry is from a quarter ago. You've merged a few hundred pull requests since. Prospects reading that page conclude the project is dead.",
      },
      {
        title: "Your LinkedIn is dead",
        body: "The founder account that should be your cheapest distribution channel posts twice a quarter, usually a funding announcement or a job opening.",
      },
      {
        title: "Marketing trails engineering by weeks",
        body: "By the time a feature is written up, reviewed and scheduled, you've shipped three more. The story is always describing a version of the product that no longer exists.",
      },
    ],
    kicker: "The work is already done. It just never gets told.",
  },

  /* --------------------------------------------------------- how it works -- */
  howItWorks: {
    eyebrow: "How it works",
    heading: "Five steps. One of them is yours.",
    intro:
      "Ship Log runs continuously against your repository. You touch it once per feature, at the approval step.",
    steps: [
      {
        id: "connect",
        title: "Connect",
        body: "Point Ship Log at your GitHub repository. It polls for merged pull requests and closed issues on a schedule you set.",
        detail: "Read-only access",
      },
      {
        id: "filter",
        title: "Filter",
        body: "Dependency bumps, chores, CI-only changes, reverts, refactors, cleanup, typos and lint fixes are discarded. Only real shipped features survive.",
        detail: "Noise removed",
      },
      {
        id: "generate",
        title: "Generate",
        body: "Surviving diffs go to the Claude API with a system prompt carrying your voice, your ICP and your positioning — not a generic template.",
        detail: "Your voice, encoded",
      },
      {
        id: "review",
        title: "Review",
        body: "Four artifacts per shipped feature land in a review queue marked Pending. A human approves, edits or rejects each one.",
        detail: "You approve",
      },
      {
        id: "publish",
        title: "Publish",
        body: "Approved items move to your publishing queue or arrive as a Slack digest. Rejected items never leave the queue.",
        detail: "Queue or Slack",
      },
    ],
  },

  /* -------------------------------------------------------- what you get -- */
  artifacts: {
    eyebrow: "What you get",
    heading: "Four artifacts per shipped feature.",
    intro:
      "One merged pull request becomes four pieces of content, each written for where it will actually be read.",
    items: [
      {
        id: "changelog",
        icon: "changelog" as const,
        title: "Changelog entry",
        body: "A dated, plainly written entry describing what shipped and why it matters to a user. Ready to paste into your changelog, release notes or docs.",
      },
      {
        id: "linkedin",
        icon: "linkedin" as const,
        title: "LinkedIn post",
        body: "Written in the founder's voice rather than a marketing team's. The build-in-public post you keep meaning to write and never do.",
      },
      {
        id: "thread",
        icon: "thread" as const,
        title: "X thread",
        body: "The technical detail unpacked across a sequence of posts, sized and paced for the platform, with the hook doing real work.",
      },
      {
        id: "newsletter",
        icon: "newsletter" as const,
        title: "Newsletter blurb",
        body: "A short, self-contained section you drop straight into your next send. No blank page, no scrambling the morning it goes out.",
      },
    ],
    footnote:
      "Roughly 12 to 20 pieces a month on a typical Series A repository, depending on how much you ship.",
  },

  /* ------------------------------------------------------------- approval -- */
  approval: {
    eyebrow: "Human in the loop",
    heading: "Nothing publishes without your approval.",
    body: [
      "Founders are protective of their voice, and they should be. An AI posting unsupervised under your name is a liability, not a feature.",
      "So every generated artifact enters a review queue marked Pending. It stays there until a human approves it. There is no auto-publish switch to accidentally leave on, because we didn't build one.",
    ],
    points: [
      {
        title: "Two humans, not zero",
        body: "Our editor reviews every batch before it reaches your queue. You are approving work that has already been read by a person.",
      },
      {
        title: "Per-artifact control",
        body: "Approve the changelog entry, edit the LinkedIn post, reject the thread. Each of the four is handled on its own.",
      },
      {
        title: "Full history",
        body: "Every artifact keeps a record of what was generated, what you changed, and what went out. Nothing is silently rewritten.",
      },
    ],
    /* Sample rows rendered in the mock review queue. Illustrative only. */
    queueSample: {
      caption: "Review queue",
      rows: [
        { artifact: "Changelog entry", source: "#1482 Streaming diff viewer", status: "approved" as const },
        { artifact: "LinkedIn post", source: "#1482 Streaming diff viewer", status: "approved" as const },
        { artifact: "X thread", source: "#1482 Streaming diff viewer", status: "pending" as const },
        { artifact: "Newsletter blurb", source: "#1477 Webhook retries", status: "pending" as const },
      ],
    },
  },

  /* ----------------------------------------------------------------- team -- */
  team: {
    eyebrow: "Who we are",
    heading: "Three people. Named after our initials.",
    intro:
      "ARAZ Scales is a three-person venture. We build a small piece of custom software for each client, we operate it, and a human stands between the model and your audience. We take on a limited number of clients at a time because the model only works at that size.",
    members: [
      {
        name: "[REPLACE] Founder Name",
        role: "[REPLACE] Engineering & Automation",
        bio: "[REPLACE] Two or three sentences on background, what they build, and the credential that matters to a technical founder reading this page.",
        initials: "AR", // [REPLACE] — shown in the avatar tile
        links: { linkedin: "", github: "", x: "" }, // leave "" to hide the icon
      },
      {
        name: "[REPLACE] Founder Name",
        role: "[REPLACE] AI & Product",
        bio: "[REPLACE] Two or three sentences on background, what they build, and the credential that matters to a technical founder reading this page.",
        initials: "AZ",
        links: { linkedin: "", github: "", x: "" },
      },
      {
        name: "[REPLACE] Founder Name",
        role: "[REPLACE] Client & Editorial",
        bio: "[REPLACE] Two or three sentences on background, what they build, and the credential that matters to a technical founder reading this page.",
        initials: "ZS",
        links: { linkedin: "", github: "", x: "" },
      },
    ],
  },

  /* -------------------------------------------------------------- contact -- */
  contact: {
    eyebrow: "Get started",
    heading: "See it run on your own repo.",
    body: "Send us a repository and we'll run Ship Log against your last 30 days of merged pull requests, free. You'll get the actual changelog entries, posts and threads it would have produced — in your voice, not a generic sample. No commitment, no card.",
    /* Field labels and validation copy. `name` must match the Formspree field. */
    fields: {
      name: { name: "name", label: "Your name", placeholder: "Ada Lovelace", required: true },
      email: { name: "email", label: "Work email", placeholder: "ada@yourstartup.com", required: true },
      company: { name: "company", label: "Company", placeholder: "Your Startup, Inc.", required: true },
      repo: {
        name: "repo",
        label: "GitHub repo URL",
        placeholder: "https://github.com/yourstartup/core",
        required: true,
        help: "Public or private — we'll request read-only access separately if you move forward.",
      },
      notes: {
        name: "notes",
        label: "Anything else",
        placeholder: "Optional. What are you shipping right now?",
        required: false,
      },
    },
    submit: "Request my free demo",
    submitting: "Sending…",
    successHeading: "Request received.",
    successBody:
      "We'll come back to you within two business days with a demo built on your repository. If it's urgent, reply to the confirmation email and it'll reach us directly.",
    errorBody:
      "Something went wrong sending that. Email us directly at hello@arazscales.io and we'll pick it up from there.",
    privacyNote:
      "We use your details to prepare the demo and reply to you. No newsletter, no list, no third-party sharing.",
    /* Fallback shown when NEXT_PUBLIC_FORMSPREE_ID is not configured. */
    unconfiguredNote:
      "Form not yet configured — set NEXT_PUBLIC_FORMSPREE_ID in .env.local. See the README.",
    email: "hello@arazscales.io", // [REPLACE] if you use a different address
  },

  /* --------------------------------------------------------------- footer -- */
  footer: {
    blurb: "Automation-as-a-service for teams that ship faster than they can talk about it.",
    /* Required fine print — do not remove without talking to your co-founders. */
    fineprint:
      "ARAZ Scales owns the Ship Log codebase and all custom software developed under engagement. Clients receive a license to use it for the duration of their retainer.",
    copyright: `© ${new Date().getFullYear()} ARAZ Scales. All rights reserved.`,
  },
} as const;

export type Site = typeof site;
