/**
 * Every image slot on the site, in one place.
 *
 * Each slot below points at a file in public/assets/img/. Six hold real
 * photos. The hero and the three founder headshots still hold the flat
 * neutral placeholder made by scripts/generate-placeholders.mjs. To put a
 * real photo in a slot:
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

  /* The six below are real photos, swapped in October 2026. Their alt text
     describes what is actually in each photo. None of them shows us, so none
     of them may be described as the founders or as our work. Source and
     licence for each are in credits.md. */
  whoWeAre: slot(
    "who-we-are",
    1200,
    900,
    "Three people at a wooden table taking notes, with notebooks, a red folder, a closed laptop and a glass of iced coffee.",
    false
  ),

  /* 682x426, not 800x500: the source photo is only 682px wide, and it is not
     upscaled. Same 16:10 ratio as the other two cards, so the layout is
     identical. Replace it with a source at least 800px wide when there is
     one. */
  serviceLanding: slot(
    "service-landing",
    682,
    426,
    "A hand holding a phone over a table, with a one page website on the screen.",
    false
  ),
  serviceWebsite: slot(
    "service-website",
    800,
    500,
    "A laptop on a wooden desk showing a website homepage, next to a black mug and a phone.",
    false
  ),
  serviceContentAds: slot(
    "service-content-ads",
    800,
    500,
    "A person holding a phone up to the camera, its screen filled with a grid of social media posts.",
    false
  ),

  whyUs: slot(
    "why-us",
    1200,
    900,
    "Two people in dark blue suits shaking hands.",
    false
  ),

  quote: slot(
    "quote",
    1000,
    1200,
    "An OPEN sign hanging in the glass door of a shop, beside a PULL sign on the door handle.",
    false
  ),

  "founder-zain": slot("founder-zain", 400, 400, "Headshot of Zain Bahalim."),
  "founder-roshan": slot("founder-roshan", 400, 400, "Headshot of Roshan Mohammad."),
  "founder-abayjit": slot("founder-abayjit", 400, 400, "Headshot of Abayjit Singh."),
} as const;

export type ImageKey = keyof typeof images;

/** The alt attribute to render: empty while the slot is a placeholder. */
export const altFor = (image: ImageSlot) => (image.placeholder ? "" : image.alt);
