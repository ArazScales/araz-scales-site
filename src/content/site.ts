/**
 * Every word on the site that is not a price lives here.
 *
 * You should never need to open a `.astro` file to change wording. Prices are
 * next door in `pricing.ts`, and real world facts like the phone number are in
 * `src/config/business.ts`.
 *
 * House rules for anything added here, from CLAUDE.md section 8: short
 * declarative sentences, sentence case headings, no em dashes, no semicolons
 * in body copy, and nothing a 55 year old plumber would not say out loud.
 */

import { business } from "../config/business";

export const site = {
  meta: {
    title: `${business.name}: websites for local businesses, $300`,
    description:
      "We build a five page website for your business for $300, live in two weeks. We also write posts and build Facebook and Instagram ad creative. Three founders in Houston, Texas.",

    /* Read out when a link preview is announced rather than shown. Describes
       what the card says, because the card is words rather than a picture. */
    shareImageAlt:
      "The ARAZ Scales mark and name, above the words Websites for local businesses, the price $300, and the line Houston, Texas.",
  },

  /** Anchor links in the header. Keep this to three. */
  nav: [
    { label: "What you get", href: "#services" },
    { label: "How it works", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    /* Sits above the h1. The one eyebrow on the page: CLAUDE.md section 6
       bans an eyebrow above *every* heading, so this appears here and
       nowhere else, in sentence case, not tracked out. */
    eyebrow: "Websites, content, ads",

    /* The one h1 on the page. It has to say what we do and who for, in a
       sentence somebody can finish reading at a red light. */
    heading: "We build websites for local businesses.",

    /* Not a growth promise. The drafted tagline said the business would grow,
       which is the one thing /terms says plainly that we do not promise, and
       an unsupported claim under section 2. This says what we actually do and
       what the client ends up holding, both of which /terms commits to. */
    lede: "We write it, build it and hand it over in your name.",

    /* Reads under the oversized price in the band. */
    priceNote: "paid half up front. Live in two weeks.",
    action: "Send message",
  },

  services: {
    /* Left column of the record. A literal question the visitor is asking,
       answered by the column beside it. Not an eyebrow label. */
    question: "What does it cost?",
    heading: "Three things, three prices",
    intro: "Everything we charge for is on this page.",
  },

  process: {
    question: "How does it work?",
    heading: "Five steps, and the one that needs you",
    /* Not "two weeks or two months" any more. Two weeks is the website's
       timeline and the landing page ships in one, so naming a single figure
       here contradicted the price list below it. */
    intro:
      "The third step decides whether this takes the time we quoted or two months.",
    steps: [
      {
        title: "You tell us about the business",
        body: "Thirty minutes on the phone. We ask what you do and who calls you.",
      },
      {
        title: "We send you a price and a start date",
        body: "In writing, within two business days. If we are not the right fit, we say so.",
      },
      {
        title: "You send us your details and photos",
        body: "Hours, service area, and pictures of your own work. This step holds jobs up.",
      },
      {
        title: "We write it and build it",
        body: "You do not write a word. We send a link to the real site.",
      },
      {
        title: "You tell us what is wrong, then it goes live",
        body: "Two rounds of changes are included. Then it goes live, every login handed to you.",
      },
    ],
    /* Sits under the numbered list. The honest part. */
    note: "If your photos take three weeks, the job takes three weeks. We will chase you, politely.",
  },

  team: {
    /* Not "Who is this?", which reads as though the page is asking who the
       visitor is rather than introducing us. */
    question: "Who are we?",
    heading: `Three founders in ${business.city}`,
    intro:
      "We are in college and we run this together. There is no account manager and no ticket queue. When you email us, one of these three people answers you.",
    /* Named people are in src/config/business.ts, since the same names appear
       in the policy pages. */
    note: "We started in 2026 and we are open about that. We have no client logos to show you yet, so instead the price, the timeline and the process are all written down above, and you can hold us to them.",
  },

  faq: {
    question: "Fair questions",
    heading: "The things people ask before they call",
    items: [
      {
        q: "What does a website cost?",
        a: "A five page website is $300. You pay $150 to start and $150 the day it goes live. A single landing page is $100, paid in full before we start, with no second payment. No monthly fee and no setup charge on either.",
      },
      {
        q: "Why is that so much cheaper than everyone else?",
        a: "Three people in college, no office, no sales team. We would rather build a lot of sites at $300 than three at $3,000.",
      },
      {
        q: "How long does it take?",
        a: "A five page website is two weeks. A single landing page is one week. Both are counted from the day your photos and details reach us, not from the day you pay.",
      },
      {
        q: "Who owns the site when it is done?",
        a: "You do, once the balance is paid. The domain and the hosting are in your name, and we hand you every login on the day it goes live.",
      },
      {
        q: "What if I want changes later?",
        a: "Two rounds are included before it goes live. After that we quote it in writing first. Small text edits, we show you how to do yourself, free.",
      },
      {
        q: "Can I get my money back?",
        a: "Yes, within limits, and the limit depends on which one you bought. On either kind of website, cancel before we start writing and you get all of it back. We usually start the morning after you pay, so in practice that means telling us within two business days, and you can always ask us where we are. After that a landing page is not refundable. On a five page site the $150 deposit is not refundable, but the second $150 is only charged the day it goes live, so the most you can lose there is $150. If we cancel, or we cannot get it working, you get everything back. The retainer stops with fourteen days notice.",
        link: { href: "/refunds", label: "Read the full refund policy" },
      },
      {
        q: "What do you not do?",
        a: "We do not run your ad account or spend your budget. We do not build online stores, booking systems or customer logins.",
      },
    ],
  },

  contact: {
    question: "Talk to us",
    heading: "Tell us what the business does",
    intro:
      "Fill this in and one of us will email you back within two business days with a price and a start date.",
    fields: {
      name: { label: "Your name", autocomplete: "name" },
      email: { label: "Email", autocomplete: "email" },
      businessName: { label: "Business name", autocomplete: "organization" },
      phone: { label: "Phone", autocomplete: "tel", optional: "Optional" },
      message: {
        label: "What do you need?",
        hint: "A website, posts and ads, or you are not sure yet. Tell us what the business does and we will work it out.",
      },
    },
    submit: "Send message",
    /* Sits next to the submit button. Plain language, links to /privacy. */
    consent:
      "We use what you send here to reply to you and for nothing else. We do not add you to a mailing list.",
    consentLinkLabel: "How we handle your details",
    success: {
      heading: "That reached us",
      body: "One of us will email you back within two business days. If it is urgent, reply to the confirmation email and it lands with all three of us.",
    },
    error: {
      heading: "That did not send",
      body: `Something went wrong on the way. Email us at ${business.email} and we will pick it up from there.`,
    },
  },

  notFound: {
    title: "Page not found",
    description:
      "That page does not exist. Links back to the homepage and the contact form.",
    heading: "That page is not here",
    body: "The address might be mistyped, or the page might have moved. Nothing is broken at your end.",
    home: "Back to the homepage",
    contact: "Or tell us what the business does",
  },

  footer: {
    /* No tagline, no mission statement. Contact details and the legal pages. */
    legalLinks: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Refunds", href: "/refunds" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
} as const;
