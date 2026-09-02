/**
 * ---------------------------------------------------------------------------
 * ARAZ Scales — site copy
 * ---------------------------------------------------------------------------
 * Every word rendered on the site lives in this file. Components read from it
 * and never hard-code strings, so the whole site can be rewritten without
 * opening a .tsx file.
 *
 * Pricing is the one exception — it lives in ./pricing.ts so the numbers are
 * findable without scrolling past 400 lines of prose.
 *
 * Things to verify before launch are marked [VERIFY].
 * ---------------------------------------------------------------------------
 */

export const site = {
  /* ---------------------------------------------------------------- meta -- */
  meta: {
    company: "ARAZ Scales",
    tagline: "Growth operations for small business",
    domain: "arazscales.com",
    url: "https://arazscales.com",
    title: "ARAZ Scales — Growth operations for small business",
    /* Keep under ~160 characters so search engines don't truncate it. */
    description:
      "We build the website, write the content and run the Meta ads for businesses that don't have the time or the team to do it in-house. Sites from $300 flat. Retainers from $500/mo.",
    /* Shown on social cards. Regenerate with `npm run og` after copy changes. */
    ogImage: "/og.png",
    locale: "en_US",
    twitterHandle: "", // [VERIFY] set to "@handle" once the account exists
  },

  /* ----------------------------------------------------------------- nav -- */
  nav: {
    links: [
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    cta: { label: "Start a project", href: "/contact" },
  },

  /* ---------------------------------------------------------------- home -- */
  home: {
    hero: {
      /* Small pill above the headline. Keep it factual, not a countdown timer. */
      badge: "Taking on new clients for Q4",
      /* Split so the second clause can carry the accent colour. */
      headline: "Most small businesses don't need a marketing department.",
      headlineAccent: "They need an operator.",
      subhead:
        "ARAZ Scales builds the website, writes the content and runs the paid social for businesses that don't have the time or the team to do it in-house. One point of contact. Work you approve before it ships.",
      ctaPrimary: { label: "Start a project", href: "/contact" },
      ctaSecondary: { label: "See what we do", href: "/services" },
      /* Three factual commitments under the fold — not performance claims. */
      commitments: [
        { value: "$300", label: "Flat fee for a full website. One time, not monthly." },
        { value: "10 days", label: "From scope call to a live site, typical turnaround." },
        { value: "0", label: "Posts or ads that go live without your sign-off." },
      ],
    },

    /* Short overview of the three pillars. Full detail lives on /services. */
    pillars: {
      eyebrow: "What we do",
      heading: "Three services. Each one owned end to end.",
      intro:
        "We don't sell strategy decks. Each engagement produces something that exists on the internet with your name on it — a site, a body of content, a set of ads that are actually running.",
      cta: { label: "Full service detail", href: "/services" },
    },

    /* How an engagement actually runs. Deliberately four steps, not seven. */
    method: {
      eyebrow: "How it works",
      heading: "Four steps. One of them is yours.",
      intro:
        "The reason businesses stall on this work isn't that it's hard. It's that it needs someone to own it every week. That's the part we take.",
      steps: [
        {
          id: "scope",
          title: "Scope call",
          body: "Twenty minutes. What the business does, who buys from it, what's already working. We come back with a written scope and a fixed price — no proposal theatre.",
          detail: "20 minutes",
        },
        {
          id: "build",
          title: "Build",
          body: "We write the copy, design the pages, set up the tracking, or draft the first month of content — depending on what you signed for. You get a preview link, not a status update.",
          detail: "Week one",
        },
        {
          id: "approve",
          title: "You approve",
          body: "Every page, every post, every ad creative comes to you before it goes anywhere. Approve it, edit it, or kill it. Nothing publishes on its own.",
          detail: "Your call",
        },
        {
          id: "operate",
          title: "We operate",
          body: "On retainer, this is the whole job: content goes out on schedule, creative gets refreshed, spend gets reallocated toward what's converting. You get a monthly read on what moved.",
          detail: "Ongoing",
        },
      ],
    },

    /* Honest qualification. Filters bad-fit leads before they book a call. */
    fit: {
      eyebrow: "Fit",
      heading: "We're a good fit for some businesses and a bad fit for others.",
      good: {
        title: "Work with us if",
        items: [
          "You have a real business with real customers and no website, or one you're embarrassed to send people to.",
          "You know your personal brand should be driving leads and it currently isn't, because you never post.",
          "You already spend on Meta ads, you know your cost per lead, and the bottleneck is creative volume.",
          "You'd rather approve finished work once a week than manage a freelancer every day.",
        ],
      },
      bad: {
        title: "Don't work with us if",
        items: [
          "You want us to run ads with no prior spend history to learn from. We scale what works; we don't guess for you.",
          "You want a logo, a brand book and a six-month brand strategy. That's a different kind of agency.",
          "You want content published under your name that you haven't read.",
          "You're looking for the cheapest possible option rather than the one that gets handled.",
        ],
      },
    },

    /* Closing band above the footer, used on several pages. */
    cta: {
      heading: "Tell us what the business does.",
      body: "Send a short description and we'll come back with a scope, a fixed price and a start date. If we're not the right fit, we'll say so on the first call rather than the third.",
      button: { label: "Start a project", href: "/contact" },
    },
  },

  /* ------------------------------------------------------------ services -- */
  services: {
    eyebrow: "Services",
    heading: "Websites, content and paid social.",
    intro:
      "Three services, each scoped so you know exactly what arrives and when. Take one or take all three — the retainer bundles the two ongoing ones because they compound when they run together.",

    pillars: [
      {
        id: "websites",
        icon: "site" as const,
        name: "Websites",
        /* One line, shown on the home overview card. */
        summary: "For businesses that don't have one yet.",
        price: "$300 one-time",
        /* Two or three paragraphs, shown on /services. */
        body: [
          "A large share of small businesses still run on a Facebook page and word of mouth. That works until someone searches for you at 9pm, finds nothing that looks legitimate, and calls the competitor with a website.",
          "We build a fast, mobile-first site that says what you do, who you do it for and how to hire you — then hand over the keys. One flat fee, no monthly hosting bill from us, no page-builder subscription you're locked into.",
        ],
        /* Concrete deliverables. Keep these specific and countable. */
        deliverables: [
          "Up to five pages — home, services, about, contact, plus one of your choosing",
          "Copywriting from a single scoping call, not a questionnaire you have to fill out",
          "Mobile-first build; verified on phone, tablet and desktop before handover",
          "Contact form wired to your inbox, plus click-to-call and directions on mobile",
          "Basic on-page SEO: titles, descriptions, headings, sitemap, Google Business Profile link",
          "Analytics installed so you can see traffic from day one",
          "Domain and hosting set up in your name, on your accounts",
        ],
        /* What we need from the client. Sets expectations early. */
        requirements: [
          "A 30-minute call to scope the site",
          "Your logo and any photos you already have",
          "Access to your domain registrar, or we'll register one for you",
        ],
        timeline: "Typically 10 days from scope call to live.",
        note: "One round of revisions is included. After handover the site is yours outright — no lock-in, no monthly fee, no licence to keep paying.",
      },

      {
        id: "ghostwriting",
        icon: "pen" as const,
        name: "Ghostwriting",
        summary: "Content built for founders to grow a personal brand and a following.",
        price: "Included in the $500/mo retainer",
        body: [
          "For most small businesses the founder is the brand. The trust that closes a deal is trust in a person, not in a company page — and the cheapest distribution channel any founder has is their own feed.",
          "We interview you once, build a voice profile from how you actually talk, and then write to it every week. You read every post before it goes out. If it doesn't sound like you, it doesn't ship — and the voice profile gets corrected so the next one is closer.",
        ],
        deliverables: [
          "A recorded voice-and-positioning interview at the start of the engagement",
          "Weekly written content for LinkedIn, X or both — scheduled to a calendar you can see",
          "Drafts delivered ahead of the publish date, so you're approving, not scrambling",
          "Ideas sourced from your actual work: jobs finished, questions customers ask, decisions you made",
          "Rewrites when a draft misses your voice, folded back into the voice profile",
          "A monthly note on what got engagement and what fell flat",
        ],
        requirements: [
          "One 45-minute interview to start",
          "A few minutes a week to approve or redline drafts",
          "Occasional photos or details from jobs you're proud of",
        ],
        timeline: "First drafts within a week of the voice interview.",
        note: "We ghostwrite. Your name is on the work, ours isn't — and we'll never publish anything you haven't read.",
      },

      {
        id: "meta-ads",
        icon: "chart" as const,
        name: "AI-assisted Meta ads",
        summary: "Scaling ad volume and exposure for businesses with proven spend.",
        price: "Included in the $500/mo retainer",
        body: [
          "Meta's delivery system is good at finding buyers when you give it enough distinct creative to test. The constraint for most small advertisers isn't targeting or budget — it's that they're running the same four ads they made in the spring.",
          "We use generative tooling to turn your proven angles into a high volume of creative variants — different hooks, formats, cuts and framings of the same offer — then run them as structured tests and put spend behind what wins. The AI writes and assembles variants; the decisions about what runs, what scales and what gets cut stay with us and with you.",
          "This is a scaling service, not a from-zero service. We need a spend history to learn from — if you've never run ads, start with the website and the content, then come back once there's something to scale.",
        ],
        deliverables: [
          "Account and pixel audit before anything changes, with findings written down",
          "20–40 creative variants a month generated from your proven angles",
          "Structured creative testing, so results are readable rather than a single blended number",
          "Weekly budget reallocation toward the ad sets actually returning",
          "Audience and exclusion hygiene — no paying twice for people who already converted",
          "A monthly report in plain language: spend, results, cost per result, what changes next month",
        ],
        requirements: [
          "An existing Meta Ads account with at least 60 days of spend",
          "Admin access via Business Manager — your account stays yours",
          "Ad spend paid directly to Meta on your own card, separate from our fee",
        ],
        timeline: "Audit in week one; new creative live in week two.",
        note: "Our fee covers the work. Your ad budget goes straight to Meta on your card — we never take a cut of spend, so we have no incentive to tell you to spend more.",
      },
    ],

    /* Rendered under the three pillars on /services. */
    footnote:
      "Ghostwriting and Meta ads are sold together as one retainer because they pull on the same asset — your positioning. Splitting them means writing the same brief twice.",
  },

  /* --------------------------------------------------------------- about -- */
  about: {
    eyebrow: "About",
    heading: "A small agency that does the work itself.",
    intro:
      "ARAZ Scales is a founder-led growth agency. We took the name from our initials, and we kept the team small on purpose: every client is worked by the people who sold the engagement.",

    /* Positioning narrative. Three short paragraphs, no origin-story padding. */
    story: [
      "Most small businesses are in the same position. The owner knows the website is thin, knows they should be posting, knows the ads could be doing more — and knows that none of it will get done this month either, because there's a business to run.",
      "The usual options are both bad. Hiring in-house means a salary and a manager for a job that isn't full-time. Hiring an agency usually means a retainer, a strategy deck and a quarterly review, with the actual work handed to whoever is cheapest.",
      "We built ARAZ Scales as the third option: an operator. Fixed scope, fixed price, and the work delivered by the people you talk to. We take on a limited number of clients at a time because that's the only way this model holds.",
    ],

    /* How we work. Four principles, each with a real consequence attached. */
    principles: {
      heading: "How we operate",
      items: [
        {
          title: "Fixed price, written scope",
          body: "You get the price and the deliverables in writing before anything starts. If the scope changes we re-quote in writing. There is no hourly meter running in the background.",
        },
        {
          title: "You own everything",
          body: "The domain, the site, the ad account, the content — all in your name, on your accounts. If you leave, you leave with the assets. Nothing is held hostage on our infrastructure.",
        },
        {
          title: "Nothing publishes unapproved",
          body: "Every post and every ad goes to you first. We use AI where it produces better work faster, and a person reviews all of it before it reaches your audience.",
        },
        {
          title: "We say no",
          body: "If a service won't work for your business — ads without spend history, content for someone who won't be in it — we'll tell you before you pay, not after.",
        },
      ],
    },

    /* Founders. Roles reflect who owns which pillar day to day.
       [VERIFY] confirm the ownership split below matches how you actually
       divide the work before this goes live. */
    team: {
      eyebrow: "Founders",
      heading: "Three co-founders. No account managers in between.",
      intro:
        "The person who scopes your engagement is the person who does the work. There is no layer between you and the people building the thing.",
      members: [
        {
          name: "Zain Bahalim",
          role: "Co-Founder",
          focus: "Web & build",
          bio: "Owns the website practice end to end — scoping, copy, build and handover. Sets the technical standard the sites are held to: fast on a phone, indexable, and fully in the client's name at handover.",
          initials: "ZB",
          links: { linkedin: "", x: "" },
        },
        {
          name: "Roshan Mohammad",
          role: "Co-Founder",
          focus: "Paid media",
          bio: "Owns paid social. Runs the account audits, the creative testing structure and the weekly spend decisions, and writes the monthly report in language a business owner can act on.",
          initials: "RM",
          links: { linkedin: "", x: "" },
        },
        {
          name: "Abayjit Singh",
          role: "Co-Founder",
          focus: "Content & editorial",
          bio: "Owns ghostwriting. Runs the voice interviews, builds the voice profile each client's content is written against, and is the last human read on anything published under a client's name.",
          initials: "AS",
          links: { linkedin: "", x: "" },
        },
      ],
    },
  },

  /* -------------------------------------------------------------- contact -- */
  contact: {
    eyebrow: "Contact",
    heading: "Tell us what the business does.",
    body: "Fill this in and we'll come back within two business days with a scope, a fixed price and a start date. If we're not the right fit for what you need, we'll say so — that's a faster answer than three calls and a proposal.",

    /* What happens after they hit submit. Removes the "then what?" hesitation. */
    expectations: [
      { title: "We reply within two business days", body: "A real reply from one of the three of us, not an autoresponder sequence." },
      { title: "A 20-minute call", body: "What the business does, who buys, what's already running. No deck." },
      { title: "A written scope and a fixed price", body: "Deliverables and cost in writing before you commit to anything." },
    ],

    /* Field config. `name` must match the field name Formspree receives. */
    fields: {
      name: { name: "name", label: "Your name", placeholder: "Jordan Ellis", required: true },
      email: { name: "email", label: "Email", placeholder: "jordan@yourbusiness.com", required: true },
      business: { name: "business", label: "Business name", placeholder: "Ellis Plumbing & Heating", required: true },
      website: {
        name: "website",
        label: "Current website",
        placeholder: "yourbusiness.com — or leave blank if you don't have one",
        required: false,
      },
      service: {
        name: "service",
        label: "What are you after",
        placeholder: "",
        required: true,
        options: [
          "Website — $300 one-time",
          "Growth retainer — $500/mo",
          "Website + retainer",
          "Not sure yet",
        ],
      },
      message: {
        name: "message",
        label: "What does the business do",
        placeholder:
          "A couple of sentences on what you sell, who buys it, and what's not working right now.",
        required: true,
      },
    },

    submit: "Send it over",
    submitting: "Sending…",
    successHeading: "Got it.",
    successBody:
      "We'll come back within two business days with a scope and a price. If it's urgent, reply to the confirmation email and it reaches all three of us directly.",
    errorBody:
      "Something went wrong sending that. Email us at hello@arazscales.com and we'll pick it up from there.",
    privacyNote:
      "We use your details to reply to you and scope the work. No newsletter, no list, no third-party sharing.",
    unconfiguredNote:
      "Form not yet configured — set NEXT_PUBLIC_FORMSPREE_ID in .env.local. See the README.",
    email: "hello@arazscales.com",
  },

  /* --------------------------------------------------------------- footer -- */
  footer: {
    blurb:
      "Growth operations for small businesses — websites, founder content and paid social, run end to end.",
    columns: [
      {
        title: "Services",
        links: [
          { label: "Websites", href: "/services#websites" },
          { label: "Ghostwriting", href: "/services#ghostwriting" },
          { label: "AI-assisted Meta ads", href: "/services#meta-ads" },
          { label: "Pricing", href: "/pricing" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} ARAZ Scales. All rights reserved.`,
  },

  /* ------------------------------------------------------------ not found -- */
  notFound: {
    heading: "That page doesn't exist.",
    body: "The link may be out of date, or the page may have moved. Everything the site has is one click away.",
    cta: { label: "Back to home", href: "/" },
  },
} as const;

export type Site = typeof site;
