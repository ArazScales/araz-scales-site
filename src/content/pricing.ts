/**
 * Prices and what each one buys.
 *
 * To change a price, edit `amount` and `unit`. Nothing in the layout measures
 * itself against the text, so a longer or shorter figure will not break the
 * grid. `amount` is a display string, not a number: it is set at display size
 * and is deliberately the largest element on the page.
 *
 * Shape note. There are three services but only two prices, because written
 * content and ad creative are sold together for one monthly fee. Rather than
 * print "$500" twice and invite somebody to read it as $1,000, the retainer
 * carries a `parts` array: one figure, two named services underneath it, each
 * with its own deliverables and its own timeline.
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
  /** For single service plans. Mutually exclusive with `parts`. */
  includes?: string[];
  /** For single service plans. Mutually exclusive with `parts`. */
  timeline?: string;
  /** For a plan covering more than one named service under one price. */
  parts?: ServicePart[];
  /** Said plainly so nobody buys the wrong thing. */
  excludes: string;
};

export const plans: Plan[] = [
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
      "Two services under one monthly fee, for owners who already have a site.",
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
 * Sits under the two figures. The brief is explicit that taking both services
 * earns no discount, and saying so up front is cheaper than answering it on
 * every call.
 */
export const pricingNote =
  "Taking both does not change the price of either. There is no bundle rate and no setup fee.";
