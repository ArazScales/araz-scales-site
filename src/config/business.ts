/**
 * Every real-world fact about the business lives here and nowhere else.
 *
 * The footer and all four policy pages read from this file, so correcting a
 * phone number or an entity name is a one-line change that propagates
 * everywhere it appears.
 *
 * UNFINALISED VALUES
 * ------------------
 * A value we intend to have but do not have yet is the literal string
 * TODO_NEEDS_REAL_VALUE. That is deliberate: it fails a grep before launch
 * (see README, "Before launch"). No field is in that state today, and the
 * constant is kept for the next one that is.
 *
 * A value we have decided to ship without is `null`, which is a different
 * statement: not "missing", but "there is none". `address` is the only one.
 *
 * Read both through `real()` rather than interpolating them directly. It
 * returns null for either case, and every component omits the row rather
 * than printing a placeholder, an empty string or the word "null".
 */

export const TODO = "TODO_NEEDS_REAL_VALUE";

/**
 * null for anything a caller must not print: an unfinalised placeholder, or a
 * field we have deliberately set to null because there is no such value.
 * Callers omit the row entirely rather than rendering an empty one.
 */
export function real(value: string | null): string | null {
  if (value === null) return null;
  return value === TODO ? null : value;
}

export const business = {
  /** Trading name. Safe to show anywhere. */
  name: "ARAZ Scales",

  /**
   * Registered entity name, verbatim from the Texas Certificate of Formation.
   *
   * The all-caps spelling and the missing comma before LLC are not a typo and
   * must not be "tidied". This has to match the filing character for character,
   * because it is the name of the party a client contracts with.
   *
   * This is not the brand. `name` above is what appears in the header, the
   * headings and the marketing copy. `legalName` appears only where the legal
   * entity is actually meant: the footer copyright line, the policy pages and
   * the schema.org block. Do not swap one for the other.
   */
  legalName: "ARAZ SCALES LLC",

  /** State of registration. Named in the policy pages as the governing law. */
  state: "Texas",

  /** Where the three of us actually are. Shown in the hero and the about row. */
  city: "Houston",

  email: "support@arazscales.com",

  /**
   * TEMPORARY. This is a Google Voice line that rings all three of us. It is a
   * stopgap until we pay for a dedicated business line, and it should be
   * replaced then. Changing it here changes it everywhere it is shown.
   *
   * Stored in the punctuated E.164 form that schema.org wants, because that is
   * the one format that has to be exact for a machine rather than for a
   * person. The two human-facing forms are derived from it by `phoneDisplay`
   * and `phoneHref` below, so the digits are written down once.
   */
  phone: "+1-346-645-0919",

  /**
   * Mailing address. Deliberately null, not a placeholder: we are launching
   * without one and nothing on the site is waiting for it. Every consumer
   * omits its row, so no blank line and no literal "null" reaches a page.
   *
   * This does not block launch. CLAUDE.md section 3 requires the entity name,
   * the state, an email on our own domain and a phone number, and all four
   * are set. A postal address is not on that list.
   *
   * It does block outreach email. CAN-SPAM requires a valid physical postal
   * address in any commercial email, so the first cold email cannot go out
   * until a virtual mailbox is set up. See TODO-zain.md, "Before any outreach
   * email". Set a string here when the mailbox exists and the postal line
   * appears on the policy pages and in the schema.org block on its own.
   */
  address: null as string | null,

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
  policiesUpdated: "September 28, 2026",
} as const;

/**
 * The phone number in the two shapes a page actually needs.
 *
 * `business.phone` is the stored form, punctuated E.164, which is what
 * schema.org consumes and is the wrong thing to print at a visitor. These two
 * derive the human forms from it, so the digits are written down once and a
 * new number cannot end up correct in the link and stale in the text.
 *
 * Both return null while the number is still a placeholder, matching `real()`,
 * so a caller omits the row rather than printing the marker.
 */

/** "+1-346-645-0919" to "(346) 645-0919". */
export function phoneDisplay(): string | null {
  const value = real(business.phone);
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  /* North American numbers only, with or without the leading country code.
     Anything else is returned as stored rather than mangled into a shape it
     does not have. */
  const local = digits.length === 11 && digits.startsWith("1")
    ? digits.slice(1)
    : digits;
  if (local.length !== 10) return value;
  return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
}

/** "+1-346-645-0919" to "tel:+13466450919". */
export function phoneHref(): string | null {
  const value = real(business.phone);
  if (!value) return null;
  return `tel:${value.replace(/[^+\d]/g, "")}`;
}

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
 *
 * `site` is optional and only Zain has one. It renders as a second button on
 * that card and the other two cards simply do not get one, rather than the
 * layout reserving an empty slot for a link that does not exist.
 *
 * PHOTO. `photo` is the filename of a headshot in public/team/. None of us
 * has supplied one yet, so the field is absent on all three and every card
 * falls back to the person's initials, which is a finished state and not a
 * placeholder. To add one: drop the file in public/team/, add
 * `photo: "zain.jpg"` here, and record the source in credits.md. Nothing in
 * the layout changes. Do not substitute a stock photo or an AI image.
 */
export type Founder = {
  readonly name: string;
  /** The service this person is responsible for. Shown under the name. */
  readonly owns: string;
  readonly detail: string;
  readonly linkedin: string;
  /** A personal site, if the person has one. Only Zain does. */
  readonly site?: string;
  /** Filename of a headshot in public/team/. None supplied yet. */
  readonly photo?: string;
};

export const founders: readonly Founder[] = [
  {
    name: "Zain Bahalim",
    owns: "Websites",
    detail:
      "Scopes the job, builds the site, hands it over in your name.",
    linkedin: "https://www.linkedin.com/in/zainbah/",
    site: "https://zainbahalim.dev/",
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
];

/**
 * "Zain Bahalim" to "ZB". Drives the initials shown on a founder card until a
 * real headshot lands in public/team/. Derived rather than stored, so adding a
 * fourth person cannot produce a card with somebody else's initials on it.
 */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join("");
}
