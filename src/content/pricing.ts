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
      "One monthly service covering the writing and the ad creative, for owners who already have a site.",
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
 * Sits under the figures. The retainer covers two kinds of work, which invites
 * the question of what each costs on its own. Neither has a price, because
 * neither is sold on its own. The previous wording here said that taking both
 * did not change the price of either, which implied two separate figures a
 * buyer could compare. There are none.
 */
export const pricingNote =
  "Content and ads are one service at $500 a month. We do not sell them separately. There is no setup fee.";
