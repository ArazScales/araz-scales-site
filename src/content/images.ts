/**
 * Every image slot on the site, in one place.
 *
 * Each slot below points at a file in public/assets/img/, and all seven now
 * hold a photo. Four are stock photos (licences TO CONFIRM in credits.md),
 * three are AI-generated with Gemini. The founder cards have no photos by
 * decision. If a new slot is added, `npm run placeholders` writes a flat
 * neutral placeholder for it until a photo exists. To put a photo in a
 * slot:
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
  /**
   * A smaller copy on disk as `<name>-<width>.webp`, served to narrow
   * screens. Only the hero has one: it is the one image loaded up front, and
   * at 2400px and 225 KB it dropped Lighthouse mobile performance to 91.
   */
  readonly small?: number;
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
  /* AI-generated with Gemini: a small town main street at dusk, lit
     storefronts on the right, dark sky and road on the left where the
     headline sits. Decorative: it sits under a dark overlay and the headline
     says everything the section needs to, so its alt stays empty. */
  hero: { ...slot("hero", 2400, 1350, "", false), small: 1200 },

  /* Alt text on every slot below describes only what is visible. None of
     these shows us or work we did, so none may be described as the founders
     or as our work. Source and licence for each are in credits.md. */
  whoWeAre: slot(
    "who-we-are",
    1200,
    900,
    "Three people at a wooden table taking notes, with notebooks, a red folder, a closed laptop and a glass of iced coffee.",
    false
  ),

  /* AI-generated with Gemini. Screen deliberately off: the image rule in
     CLAUDE.md bans AI-generated example websites. */
  serviceLanding: slot(
    "service-landing",
    800,
    500,
    "An open laptop with a dark, switched-off screen on a wooden desk, beside a spiral notepad with a pen, a potted plant and a navy mug.",
    false
  ),
  serviceWebsite: slot(
    "service-website",
    800,
    500,
    "A laptop on a wooden desk showing a website homepage, next to a black mug and a phone.",
    false
  ),
  /* AI-generated with Gemini. */
  serviceContentAds: slot(
    "service-content-ads",
    800,
    500,
    "A phone resting on an open notebook of hand drawn sketches, beside a compact camera and a dark mug on a wooden desk.",
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
} as const;

export type ImageKey = keyof typeof images;

/** Path of a slot's smaller copy, or null if it has none. */
export const smallSrc = (image: ImageSlot) =>
  image.small ? image.src.replace(/\.webp$/, `-${image.small}.webp`) : null;

/** The alt attribute to render: empty while the slot is a placeholder. */
export const altFor = (image: ImageSlot) => (image.placeholder ? "" : image.alt);
