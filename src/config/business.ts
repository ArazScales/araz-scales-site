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

export const founders = [
  {
    name: "Zain Bahalim",
    owns: "Websites",
    detail:
      "Scopes the job, builds the site, hands it over in your name.",
  },
  {
    name: "Roshan Mohammad",
    owns: "Meta ads",
    detail:
      "Builds the ad creative, tests it, tells you which cuts did better.",
  },
  {
    name: "Abayjit Singh",
    owns: "Written content",
    detail:
      "Interviews you once, then writes the posts that go out under your name.",
  },
] as const;
