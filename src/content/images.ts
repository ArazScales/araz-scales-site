/**
 * Every image slot on the site, in one place.
 *
 * We have no real photos yet. Each slot below points at a file in
 * public/assets/img/ that currently holds a flat neutral placeholder made by
 * scripts/generate-placeholders.mjs. To put a real photo in a slot:
 *
 *   1. Export it as .webp at the size in `width` x `height` (same ratio at
 *      least, so nothing reflows) and overwrite the file of the same name.
 *   2. Set `placeholder: false` on its entry here. That switches its alt text
 *      on. While a slot is a placeholder its alt is empty, because describing
 *      a photo that is not there would tell a screen reader user something
 *      false.
 *   3. Record where the photo came from and its licence in credits.md.
 *
 * No AI-generated images and no stock photos we do not hold a licence for.
 * The README has the same table with the ideal dimensions for each slot.
 */

export type ImageSlot = {
  /** Path under public/, which is also the URL. */
  readonly src: string;
  readonly width: number;
  readonly height: number;
  /** Alt text for the real photo. Unused while `placeholder` is true. */
  readonly alt: string;
  /** True while the file is still the generated neutral tile. */
  readonly placeholder: boolean;
};

const slot = (
  name: string,
  width: number,
  height: number,
  alt: string,
  placeholder = true
): ImageSlot => ({
  src: `/assets/img/${name}.webp`,
  width,
  height,
  alt,
  placeholder,
});

export const images = {
  /* Decorative. It sits under a dark overlay behind the headline, and the
     headline says everything the section needs to, so its alt stays empty
     even once a real photo is in. */
  hero: slot("hero", 1920, 1080, ""),

  whoWeAre: slot(
    "who-we-are",
    1200,
    900,
    "The three founders of ARAZ Scales working together at a table."
  ),

  serviceLanding: slot(
    "service-landing",
    800,
    500,
    "A one page website for a local business shown on a phone."
  ),
  serviceWebsite: slot(
    "service-website",
    800,
    500,
    "A five page website for a local business shown on a laptop."
  ),
  serviceContentAds: slot(
    "service-content-ads",
    800,
    500,
    "A Facebook post and an Instagram ad for a local business shown on a phone."
  ),

  whyUs: slot(
    "why-us",
    1200,
    900,
    "One of the founders on a call with a business owner, going over a written price."
  ),

  quote: slot(
    "quote",
    1000,
    1200,
    "One of the founders replying to an email from a business owner."
  ),

  "founder-zain": slot("founder-zain", 400, 400, "Headshot of Zain Bahalim."),
  "founder-roshan": slot("founder-roshan", 400, 400, "Headshot of Roshan Mohammad."),
  "founder-abayjit": slot("founder-abayjit", 400, 400, "Headshot of Abayjit Singh."),
} as const;

export type ImageKey = keyof typeof images;

/** The alt attribute to render: empty while the slot is a placeholder. */
export const altFor = (image: ImageSlot) => (image.placeholder ? "" : image.alt);
