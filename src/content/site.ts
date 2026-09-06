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
  },

  /** Anchor links in the header. Keep this to three. */
  nav: [
    { label: "What you get", href: "#services" },
    { label: "How it works", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    /* The one h1 on the page. It has to say what we do and who for, in a
       sentence somebody can finish reading at a red light. */
    heading:
      "We build websites for local businesses that do not have one yet.",
    lede: `$300, paid half up front. Live in two weeks. We are three founders in ${business.city}, Texas.`,
    body: "If you already have a site, we also write the posts that go out under your name and build the ad creative that runs on Facebook and Instagram.",
    action: "Send message",
  },

  services: {
    /* Left column of the record. A literal question the visitor is asking,
       answered by the column beside it. Not an eyebrow label. */
    question: "What does it cost?",
    heading: "Three things, two prices",
    intro:
      "Everything we charge for is on this page. You will not get a different number on a call.",
  },

  process: {
    question: "How does it work?",
    heading: "Five steps, and the one that needs you",
    intro:
      "This is the actual order of a website job. The third step is the one that decides whether it takes two weeks or two months.",
    steps: [
      {
        title: "You tell us about the business",
        body: "Thirty minutes on the phone, or messages if you would rather. We ask what you do, who calls you, and what you want the site to make happen.",
      },
      {
        title: "We send you a price and a start date",
        body: "In writing, within two business days. If we are not the right fit for what you need, this is where we say so.",
      },
      {
        title: "You send us your details and photos",
        body: "Business hours, service area, what you charge if you list it, and pictures of your own work. This is the step that holds jobs up. Everything else is on us.",
      },
      {
        title: "We write it and build it",
        body: "You do not write a word. We send you a link to the real working site, not a picture of one, and you look at it on your own phone.",
      },
      {
        title: "You tell us what is wrong, then it goes live",
        body: "Two rounds of changes are included. Then it goes live on your domain, in your hosting account, with every login handed to you.",
      },
    ],
    /* Sits under the numbered list. The honest part. */
    note: "If your photos take three weeks to arrive, the site takes three weeks. We will chase you, politely, because a job sitting half finished helps nobody.",
  },

  team: {
    question: "Who is this?",
    heading: `Three founders in ${business.city}`,
    intro:
      "We are in college and we run this together. There is no account manager and no ticket queue. When you email us, one of these three people answers you.",
    /* Named people are in src/config/business.ts, since the same names appear
       in the policy pages. */
    note: "We started this year and we are open about that. We have no client logos to show you yet, so instead the price, the timeline and the process are all written down above, and you can hold us to them.",
  },

  faq: {
    question: "Fair questions",
    heading: "The things people ask before they call",
    items: [
      {
        q: "What does a website cost?",
        a: "$300. You pay $150 to start and $150 the day it goes live. That is the whole price. There is no monthly fee for the website and no setup charge.",
      },
      {
        q: "Why is that so much cheaper than everyone else?",
        a: "We are three people in college with no office and no sales team. A five page site is about a week of work for us. We would rather charge $300 and build a lot of them than charge $3,000 and build three.",
      },
      {
        q: "How long does it take?",
        a: "Two weeks from the day your photos and details reach us. The waiting is almost always on that, not on us.",
      },
      {
        q: "Who owns the site when it is done?",
        a: "You do. The domain is registered in your name, the hosting account is in your name, and we hand you every login at the end. You could take it to somebody else the next morning and we would not stand in the way.",
      },
      {
        q: "What if I want changes later?",
        a: "Two rounds of changes are included before it goes live. After that, tell us what you need and we will quote it in writing before we touch anything. If it is a small text edit, we will show you how to do it yourself on a call for free.",
      },
      {
        q: "Can I get my money back?",
        a: "The $150 deposit covers the work we start doing straight away, so it is not refundable once we begin. The second $150 is only charged when the site goes live, so if you walk away before then you are not billed for it. The monthly retainer runs month to month and you can stop it with fourteen days notice.",
        link: { href: "/refunds", label: "Read the full refund policy" },
      },
      {
        q: "What do you not do?",
        a: "We do not run your ad account or spend your budget. We do not build online stores, booking systems or customer logins. We do not write posts stuffed with keywords for Google. If you ask us for something we are not good at, we will tell you and point you at somebody who is.",
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
