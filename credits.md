# Credits and licences

Everything shipped in this repo that we did not write ourselves, with where it
came from and what licence it carries. CLAUDE.md section 2 requires that every
image and icon on the site is accounted for here.

## Typeface

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
- The OFL permits this use, including on a commercial site, with no attribution
  required in the page footer. Keeping the licence file next to the font is what
  the licence does ask for.

## Icons and marks

**The ARAZ Scales mark** (three ascending bars)

- Original work. Drawn for ARAZ Scales, first for the previous version of this
  site and recoloured for this one. No external source, no licence needed.
- Lives in three places that must stay in step: `public/icon.svg`,
  `src/components/Wordmark.astro` (inline, so the header costs no extra
  request), and `scripts/generate-icons.mjs` (which rasterises the favicon set).

**No icon set is used.** There is no Feather, Lucide, Heroicons or Font Awesome
in this project. The small rules beside list items and the step numbers are CSS
and text, not glyphs. If an icon set is ever added, record it here with its
licence before shipping it.

## Photographs

**None on the site.** The layout is built so it does not need any.

Three founder headshots are expected, one per person. When they arrive:

1. Put the files in `src/assets/`.
2. Import them through Astro's `<Image />` so they are sized and lazy loaded.
3. Add one to each row in the founders list in `src/pages/index.astro`. The
   placeholder comment marking the spot is already there.
4. Add an entry to this file naming the photographer and confirming we have the
   right to publish it.

CLAUDE.md section 2 forbids AI generated images and images pulled from a search
engine. Real photographs we own, or nothing.

## Generated assets

`public/favicon.ico`, `public/apple-touch-icon.png`, `public/icon-192.png` and
`public/icon-512.png` are all produced from the mark above by
`npm run icons`. They are committed so a deploy does not depend on `sharp`
being installable. Regenerate them rather than editing them by hand.
