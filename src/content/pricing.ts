/**
 * Prices and what each one buys.
 *
 * To change a price, edit `amount` and `unit`. Nothing in the layout measures
 * itself against the text, so a longer or shorter figure will not break the
 * grid. `amount` is a display string, not a number: it is set at display size
 * and is deliberately the largest element on the page.
 *
 * Shape note. Written content and Meta ad creative are one service at one
 * price. They are not two services that happen to be billed together, and they
 * are never sold separately. The retainer still carries a `parts` array,
 * because the two kinds of work have different deliverables and different
 * timelines and a buyer needs to see both, but the array describes one
 * purchase rather than two.
 *
 * Order. The list runs cheapest first and renders in that order, so a buyer
 * meets the $100 page before the $300 site. Nothing may depend on the
 * position of an entry: use `planById` below.
 */

export type ServicePart = {
  name: string;
  summary: string;
  includes: string[];
  timeline: string;
};

export type Plan = {
  id: string;
  /** Plain name for the thing being bought. */
  name: string;
  amount: string;
  /** Sits under the figure. Three words or fewer. */
  unit: string;
  /** One sentence on what the money buys. */
  summary: string;
  /**
   * How the money is actually paid. Required, not optional: the website is
   * split across two dates and the landing page is not, and a buyer must never
   * have to work out which schedule applies to the tier they are reading.
   */
  payment: string;
  /** For single service plans. Mutually exclusive with `parts`. */
  includes?: string[];
  /** For single service plans. Mutually exclusive with `parts`. */
  timeline?: string;
  /**
   * For a plan whose single price covers more than one kind of work. Each part
   * is a strand of the same purchase, not a separately buyable service.
   */
  parts?: ServicePart[];
  /** Said plainly so nobody buys the wrong thing. */
  excludes: string;
};

export const plans: Plan[] = [
  {
    id: "landing",
    name: "Landing page",
    amount: "$100",
    unit: "one time",
    summary:
      "One page, for a business that needs somewhere to send people rather than a whole site.",
    /* Deliberately the same list as the website below, minus the page count.
       The only difference between the two tiers is how many pages you get, and
       repeating the list in full is what makes that visible. Trimming it to
       "everything in the website tier" would make the cheaper option look like
       the lesser one on every count. */
    includes: [
      "One page: what you do, the area you cover, and how to reach you",
      "Written for you. You do not have to write any of it",
      "A contact form that emails you when somebody fills it in",
      "Built for a phone first, which is where most of your customers will see it",
      "Set up so Google can read it, and pointed at your Google Business listing",
      "Your domain, your hosting account, your logins, all handed over at the end",
    ],
    payment: "$100 in full before we start. There is no second payment.",
    timeline:
      "One week, counted from the day you send us your photos and details.",
    excludes:
      "Online payments, booking systems and customer logins are not part of this. If you need more than one page, the $300 website is the one to buy.",
  },
  {
    id: "website",
    name: "Website",
    amount: "$300",
    unit: "one time",
    summary: "A five page website for a business that does not have one yet.",
    includes: [
      "Five pages: home, services, about, contact, and one more if you need it",
      "Written for you. You do not have to write any of it",
      "A contact form that emails you when somebody fills it in",
      "Built for a phone first, which is where most of your customers will see it",
      "Set up so Google can read it, and pointed at your Google Business listing",
      "Your domain, your hosting account, your logins, all handed over at the end",
    ],
    payment:
      "$150 before we start and $150 on the day it goes live. Two payments, not one.",
    timeline:
      "Two weeks, counted from the day you send us your photos and details.",
    excludes:
      "Online payments, booking systems and customer logins are not part of this. If you need one, tell us and we will point you at someone who does them.",
  },
  {
    id: "retainer",
    name: "Content and ads",
    amount: "$500",
    unit: "a month",
    summary:
      "One monthly service covering the writing and the ad creative, for owners who already have a site.",
    payment:
      "$500 charged in advance on the same date each month. Stop it with fourteen days notice.",
    parts: [
      {
        name: "Written content",
        summary:
          "Posts published under your name, written so they sound like you.",
        includes: [
          "Eight posts a month for LinkedIn or Facebook",
          "One recorded interview at the start, so the writing has your words in it and not a company voice",
          "Everything sent to you before it goes out. Nothing is published without your say so",
        ],
        timeline: "First drafts in your inbox within a week of starting.",
      },
      {
        name: "Meta ad creative",
        summary:
          "The images, video cuts and text that run in your Facebook and Instagram ads.",
        includes: [
          "New ad creative every month, images and short video cuts",
          "The ad copy that runs with each one",
          "A short note each month saying which ones got the most clicks",
        ],
        timeline: "First creative ready inside two weeks.",
      },
    ],
    excludes:
      "We do not manage your ad account and we do not spend your budget. You keep the account and the card. We build what runs in it.",
  },
];

/**
 * Look a plan up by id.
 *
 * /terms, /refunds and the structured data all used to read `plans` by
 * position, with `const [website, retainer] = plans`. Adding the landing page
 * at the front of the list silently turned every "website" reference on those
 * pages into the $100 tier, including the payment terms. Position is not a
 * stable handle for something a price list will keep growing, so it is not
 * used as one any more. Throws rather than returning undefined, which turns a
 * bad id into a build failure instead of a blank space on a policy page.
 */
export function planById(id: string): Plan {
  const plan = plans.find((candidate) => candidate.id === id);
  if (!plan) throw new Error(`No plan with id "${id}"`);
  return plan;
}

/**
 * Sits under the figures. The retainer covers two kinds of work, which invites
 * the question of what each costs on its own. Neither has a price, because
 * neither is sold on its own. The previous wording here said that taking both
 * did not change the price of either, which implied two separate figures a
 * buyer could compare. There are none.
 */
export const pricingNote =
  "Content and ads are one service at $500 a month. We do not sell them separately. There is no setup fee.";
