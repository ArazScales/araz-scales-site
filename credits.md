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
  `menu`, `x`, `mail`, `map-pin`, `phone`. The `image` and `user` glyphs are
  also drawn into the placeholder images by
  `scripts/generate-placeholders.mjs`.
- The three brand glyphs (LinkedIn, Instagram, Facebook) are Lucide's own
  simplified outline drawings, not the companies' official logo files. They
  are used only to link to the matching profile, which is the use those
  companies' brand guidelines allow.

Everything else that looks like an icon is CSS we wrote: the plus and minus on
the FAQ rows and the dots beside list items on the policy pages.

## Photographs

**None yet.** Every image slot on the site holds a generated placeholder: a
flat neutral fill with a Lucide outline glyph in the middle, made by
`npm run placeholders` (`scripts/generate-placeholders.mjs`). They are our own
generated artwork, not photographs, not stock and not AI generated. While a
slot is a placeholder its alt text is empty, because describing a photo that
is not there would mislead a screen reader user.

The slots, their files and their sizes are listed in `src/content/images.ts`
and in the README under "Swap in real photos". When a real photo goes in:

1. Overwrite the file in `public/assets/img/` with the same name.
2. Set `placeholder: false` on its entry in `src/content/images.ts`.
3. Add an entry below naming the photographer and confirming we have the
   right to publish it.

CLAUDE.md section 2 forbids AI generated images and images pulled from a search
engine. Real photographs we own, or a placeholder. No image from
texasroadside.org may be used.

### Photo credits

None yet.

## Generated assets

`public/favicon.ico`, `public/apple-touch-icon.png`, `public/icon-192.png`,
`public/icon-512.png`, `public/icon.svg` and `public/logo-mark.png` are all
produced from `src/logo-mark-master.png` by
`npm run icons`. The placeholders in `public/assets/img/` are produced by
`npm run placeholders`, which never overwrites an existing file. They are committed so a deploy does not depend on `sharp`
being installable. Regenerate them rather than editing them by hand.
