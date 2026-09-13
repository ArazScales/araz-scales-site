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

**The ARAZ Scales mark** (the "A" with the ascending bars and node line)

- Original work. Commissioned and owned by ARAZ Scales. No external source, no
  licence needed, nothing to attribute.
- Supplied as a single raster PNG, 1024x802, with the mark on a slate ground
  and "arazscale.com" set beneath it. What ships here is that file with the
  domain text cropped away and the background removed, giving a 574x435
  transparent master at `src/logo-mark-master.png`. The mark itself was not
  recoloured, stretched or filtered. Only the canvas around it changed.
- **The supplied file prints the wrong domain.** The wordmark beneath the mark
  reads `arazscale.com`, singular. The company is `arazscales.com`, plural,
  which is the domain the site serves from and the domain the mailbox is on.
  Nothing on the site shows that text today, because the master is cropped
  above it, so this is not a live defect. It does matter the moment the full
  logo is used anywhere the crop does not apply: a business card, an invoice,
  a van, an ad. The designer needs to reissue it with the plural spelling.
- The mark's blue is **#039CD8**, and it is the source of truth for the brand.
  The site's `--accent` token was moved to match the mark rather than the mark
  being repainted to match an earlier `#3B9EFF`.
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

`public/favicon.ico`, `public/apple-touch-icon.png`, `public/icon-192.png`,
`public/icon-512.png`, `public/icon.svg` and `public/logo-mark.png` are all
produced from `src/logo-mark-master.png` by
`npm run icons`. They are committed so a deploy does not depend on `sharp`
being installable. Regenerate them rather than editing them by hand.
