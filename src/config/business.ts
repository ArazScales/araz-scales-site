/**
 * Every real-world fact about the business lives here and nowhere else.
 *
 * The footer and all four policy pages read from this file, so correcting a
 * phone number or an entity name is a one-line change that propagates
 * everywhere it appears.
 *
 * UNFINALISED VALUES
 * ------------------
 * Anything we do not yet have is the literal string TODO_NEEDS_REAL_VALUE.
 * That is deliberate: it fails a grep before launch (see README, "Before
 * launch"). It must never reach a visitor, so read these through `real()`
 * below rather than interpolating them directly. `real()` returns null for a
 * placeholder and every component omits the row rather than printing the
 * marker on the page.
 */

export const TODO = "TODO_NEEDS_REAL_VALUE";

/** null for an unfinalised value, so callers can omit the field entirely. */
export function real(value: string): string | null {
  return value === TODO ? null : value;
}

export const business = {
  /** Trading name. Safe to show anywhere. */
  name: "ARAZ Scales",

  /**
   * Registered entity name. No entity is filed yet, so this is a placeholder.
   * Whatever gets filed with the Texas Secretary of State goes here verbatim,
   * and it becomes the contracting party named in /terms and /refunds.
   */
  legalName: TODO,

  /** State of registration. Named in the policy pages as the governing law. */
  state: "Texas",

  /** Where the three of us actually are. Shown in the hero and the about row. */
  city: "Houston",

  email: "support@arazscales.com",

  /** Google Voice line that rings all three of us. Not set up yet. */
  phone: TODO,

  /**
   * Mailing address for the privacy and terms contact block. Texas privacy
   * law expects a physical contact point, not just an email.
   */
  address: TODO,

  domain: "arazscales.com",
  url: "https://arazscales.com",

  /** Named explicitly in /privacy as a recipient of form data. */
  processors: {
    form: {
      name: "Formspree",
      role: "receives and forwards contact form submissions",
      privacyUrl: "https://formspree.io/legal/privacy-policy",
    },
    email: {
      name: "Google Workspace",
      role: "hosts the mailbox those forwarded messages land in",
      privacyUrl: "https://policies.google.com/privacy",
    },
  },

  /** Last substantive edit to the policy pages. Shown at the top of each. */
  policiesUpdated: "September 13, 2026",
} as const;

/**
 * The three of us. `linkedin` is the only outbound personal link on the site
 * and it is data rather than markup, so all three render identically and a
 * fourth person cannot be added without one.
 *
 * These open in a new tab. That is deliberate: the founders section sits above
 * the contact form, and a visitor who clicks a name should not lose the form
 * they were scrolling towards. The accessible name of each link says where it
 * goes and that it opens a tab, since neither is apparent from the visible
 * text, which is just the person's name.
 */
export const founders = [
  {
    name: "Zain Bahalim",
    owns: "Websites",
    detail:
      "Scopes the job, builds the site, hands it over in your name.",
    linkedin: "https://www.linkedin.com/in/zainbah/",
  },
  {
    name: "Roshan Mohammad",
    owns: "Meta ad creative",
    detail:
      "Builds the ad creative, tests it, tells you which cuts did better.",
    linkedin: "https://www.linkedin.com/in/roshan-mohammad24/",
  },
  {
    name: "Abayjit Singh",
    owns: "Written content",
    detail:
      "Interviews you once, then writes the posts that go out under your name.",
    linkedin: "https://www.linkedin.com/in/abayjit-singh-36251839a/",
  },
] as const;
