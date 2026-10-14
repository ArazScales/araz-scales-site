# Credits and licences

Everything shipped in this repo that we did not write ourselves, with where it
came from and what licence it carries. CLAUDE.md section 2 requires that every
image and icon on the site is accounted for here.

## Typefaces

**Archivo** (variable, weight 100 to 900, width 62% to 125%)

- Source: <https://github.com/Omnibus-Type/Archivo>, obtained through the
  `@fontsource-variable/archivo` npm package, which repackages the Google Fonts
  release.
- Licence: SIL Open Font License 1.1. Full text is shipped at
  `public/fonts/archivo-OFL.txt` and also sits in
  `node_modules/@fontsource-variable/archivo/LICENSE`.
- Copyright: 2020 The Archivo Project Authors.
- What we ship: the latin subset only, as
  `public/fonts/archivo-latin-variable.woff2` (88 KB). Self hosted. No request
  is made to Google Fonts or any other CDN.
- Used for everything: headings at width 125 and weight 800 (the wide display
  cut), body copy at width 100 and weight 400. One file covers both.
- The OFL permits this use, including on a commercial site, with no attribution
  required in the page footer. Keeping the licence file next to the font is what
  the licence does ask for.

## Colour

**The palette is ours.** Navy `#0A0E1A` and the bright blue `#3B9EFF` were
specified by ARAZ for the 2026 redesign, and the off-white, white and the text
tones around them were chosen to clear WCAG AA against them. The exact values
and the contrast ratio of every pair that carries text are recorded in
`src/styles/global.css` beside the tokens. Nothing is taken from a third party
theme, UI kit or template.

The layout follows <https://texasroadside.org/>, used as a reference with the
owner's permission. Layout only: no text, image, icon, colour or code from
that site is used here.

## Icons and marks

**The ARAZ Scales mark** (the "A" with the ascending bars and node line)

- Original work. Commissioned and owned by ARAZ Scales. No external source, no
  licence needed, nothing to attribute.
- Supplied as a single raster PNG, 1024x802, with the mark on a slate ground
  and "arazscale.com" set beneath it. What ships here is that file with the
  domain text cropped away and the background removed, giving a 574x435
  transparent master at `src/logo-mark-master.png`. The mark itself was not
  recoloured, stretched or filtered. Only the canvas around it changed.
- **The supplied file prints `arazscale.com`, singular, which is correct.**
  The website domain is `arazscale.com`. Email is on `arazscales.com`, plural.
  Both are right and neither should be changed to match the other. An earlier
  version of this file called the singular spelling a mistake. It is not.
- The mark's own blue is **#039CD8** and the mark is never recoloured. The
  site's UI blue is `#3B9EFF`, which sits beside it in the header.
- **There is no vector source.** Everything is generated from the raster
  master, including `public/icon.svg`, which wraps a base64 PNG rather than
  describing paths. If a real vector arrives, replace that `<image>` with paths
  and regenerate.
- Lives in three places that must stay in step: `src/logo-mark-master.png` (the
  master), `public/logo-mark.png` (96px wide, used by
  `src/components/Wordmark.astro` in the header and footer), and
  `scripts/generate-icons.mjs`, which rasterises the favicon set from the
  master.

**The previous mark** (three ascending bars) was also original ARAZ work. It
was replaced by the logo above and no longer appears anywhere on the site.

**Lucide icons**, v0.460.0, from the `lucide-static` package
(<https://lucide.dev>).

- Licence: ISC. Copyright (c) for portions of Lucide are held by Cole Bemis
  2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are
  held by Lucide Contributors 2022. The ISC licence permits use, copying and
  modification for any purpose, provided the copyright and permission notice
  are kept, which this entry and the comment in `src/components/Icon.astro`
  do. Full text: <https://github.com/lucide-icons/lucide/blob/main/LICENSE>.
- Glyphs used, copied in as inline SVG path data in
  `src/components/Icon.astro`: `linkedin`, `instagram`, `facebook`, `check`,
  `menu`, `x`, `mail`, `map-pin`, `phone`. The `image` glyph is
  also drawn into the placeholder images by
  `scripts/generate-placeholders.mjs`.
- The three brand glyphs (LinkedIn, Instagram, Facebook) are Lucide's own
  simplified outline drawings, not the companies' official logo files. They
  are used only to link to the matching profile, which is the use those
  companies' brand guidelines allow.

Everything else that looks like an icon is CSS we wrote: the plus and minus on
the FAQ rows and the dots beside list items on the policy pages.

## Photographs

**Seven images, no placeholders.** Four are stock photos and three are
AI-generated with Gemini, all listed under "Photo credits" below. The founder
cards have no photos by decision. If a new image slot is ever added,
`npm run placeholders` (`scripts/generate-placeholders.mjs`) writes a flat
neutral placeholder for it, which is our own generated artwork, with empty alt
text until a real image replaces it.

The slots, their files and their sizes are listed in `src/content/images.ts`
and in the README under "Swap in real photos". When an image is replaced:

1. Overwrite the file in `public/assets/img/` with the same name.
2. Rewrite its alt text in `src/content/images.ts` to match the new image.
3. Update its entry below with the source and licence.

No image from texasroadside.org may be used, and nothing pulled from a search
engine. CLAUDE.md section 2 allows AI-generated images for scenery and objects
only, never people, client work, example websites or ads, or results. Each
one is labeled below with the tool and date, and must carry no readable text,
logos or license plates.

### Photo credits

Added October 13, 2026. Each was cropped to its slot, resized down (never up)
and converted to WebP with sharp, with all EXIF, XMP and ICC metadata
stripped. None of them shows the founders or work we did. For the four stock
photos, fill in each **Source and licence** line before launch: where the
file came from (site and photographer, or "taken by" and who), and the
licence (for example the Unsplash or Pexels licence, or our own photo).

**`hero.webp`**, from `Gemini_Generated_Image_bp84r1bp84r1bp84.jpeg`

- Shows: a small town main street at dusk, lit storefronts with blank
  hanging signs on the right, dark sky and empty road on the left, two cars
  parked at the kerb.
- Source and licence: **AI-generated with Gemini, October 13, 2026. No
  third-party content.**
- Edits: the licence plate on the dark sedan carried plate-like characters
  and was blurred before cropping. No visible Gemini watermark in any corner.
  Gemini's invisible SynthID watermark is embedded in the pixels and
  survives cropping.

**`who-we-are.webp`**, from `Three people in college, no office, no sales team..jpg`

- Shows: three people at a wooden table taking notes, notebooks, a red
  folder, a closed laptop, a glass of iced coffee.
- Source and licence: **TO CONFIRM**
- Note: the Apple logo on the laptop lid is clearly visible.

**`why-us.webp`**, from `What you can hold us to.jpg`

- Shows: two people in dark blue suits shaking hands.
- Source and licence: **TO CONFIRM**

**`service-website.webp`**, from `Website.jpg`

- Shows: a laptop on a wooden desk with a website on screen, a black mug, a
  phone.
- Source and licence: **TO CONFIRM**
- Note: the screen reads "Build your dream website." and "Portfolio | Resume
  | Business", which is a third party website template, not ours. "MacBook
  Pro" is printed under the screen, small.

**`service-content-ads.webp`**, from `Gemini_Generated_Image_z8wzqmz8wzqmz8wz.jpeg`

- Shows: a phone on an open notebook of hand drawn sketches, a compact
  camera and a dark mug on a wooden desk, a monitor behind.
- Source and licence: **AI-generated with Gemini, October 13, 2026. No
  third-party content.**
- Checked: no readable text, no brand on the camera, phone icons blurred.
  No visible Gemini watermark.

**`service-landing.webp`**, from `Gemini_Generated_Image_krak3wkrak3wkrak.jpeg`

- Shows: an open laptop with a dark, switched-off screen on a wooden desk,
  beside a spiral notepad with a pen, a potted plant and a navy mug.
- Source and licence: **AI-generated with Gemini, October 13, 2026. No
  third-party content, no readable text, screen off.**
- Checked: no visible Gemini watermark in any corner. No logo on the laptop,
  mug, notepad or pen. The key legends are single generic characters,
  faintly visible only at full source resolution and unreadable at the
  shipped 800x500. The notepad pages are blank.
- Replaces an earlier Gemini image that showed a mock website on the screen,
  which the image rule in CLAUDE.md section 2 bans.

**`quote.webp`**, from `Get a quote.jpg`

- Shows: an OPEN sign hanging in a glass shop door, a PULL sign on the
  handle.
- Source and licence: **TO CONFIRM**

## Generated assets

`public/favicon.ico`, `public/apple-touch-icon.png`, `public/icon-192.png`,
`public/icon-512.png`, `public/icon.svg` and `public/logo-mark.png` are all
produced from `src/logo-mark-master.png` by
`npm run icons`. The placeholders in `public/assets/img/` are produced by
`npm run placeholders`, which never overwrites an existing file. They are committed so a deploy does not depend on `sharp`
being installable. Regenerate them rather than editing them by hand.
