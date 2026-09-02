/**
 * Generates public/og.png — the 1200x630 social sharing card.
 *
 * Run with:  npm run og
 *
 * Why a script rather than a committed binary: the card carries the pitch line,
 * the prices and the domain, all of which live in the content files. When that
 * copy changes, regenerate rather than hand-editing an image in a design tool.
 *
 * NOTE ON FONTS: this renders with Open Sans, a system font, because librsvg
 * resolves families through fontconfig and cannot use the webfont that
 * next/font downloads at build time. The result is close to Inter but not
 * identical — the tracking in particular is looser than the site's.
 *
 * `sharp` is a devDependency. It is never shipped to the browser.
 */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/* Brand tokens — keep in sync with the @theme block in app/globals.css. */
const BASE = "#0A0E1A";
const SURFACE = "#111726";
const LINE = "#1E2740";
const ACCENT = "#3B9EFF";
const INK = "#F2F5FA";
const MUTED = "#9AA7BE";
const FAINT = "#7E8CA5";

const FONT = "Open Sans, DejaVu Sans, sans-serif";

/* The ascending-bar motif, same curve as <BarMotif> in components/ui/icons. */
const motifBars = [
  [0, 22],
  [14, 34],
  [28, 43],
  [42, 58],
  [56, 69],
  [70, 88],
  [84, 100],
]
  .map(([x, h]) => {
    const scaleX = 5.4;
    const scaleY = 2.9;
    const width = 8 * scaleX;
    const height = h * scaleY;
    const opacity = (0.35 + (x / 84) * 0.65) * 0.11;
    return `<rect x="${640 + x * scaleX}" y="${630 - height}" width="${width}" height="${height}" rx="4" fill="${ACCENT}" opacity="${opacity.toFixed(3)}"/>`;
  })
  .join("\n    ");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="88" height="88" patternUnits="userSpaceOnUse">
      <path d="M88 0H0V88" fill="none" stroke="${LINE}" stroke-width="1"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="white" stop-opacity="0.55"/>
      <stop offset="72%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    <mask id="gridMask">
      <rect width="1200" height="630" fill="url(#fade)"/>
    </mask>
    <radialGradient id="bloom" cx="0.28" cy="0.42" r="0.55">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="${BASE}"/>
  <rect width="1200" height="630" fill="url(#grid)" mask="url(#gridMask)"/>
  ${motifBars}
  <rect width="1200" height="630" fill="url(#bloom)"/>

  <!-- Accent rule along the top edge -->
  <rect width="1200" height="5" fill="${ACCENT}"/>

  <!-- Logo mark -->
  <g transform="translate(72, 72) scale(1.85)">
    <rect x="2" y="14" width="5" height="8" rx="1.5" fill="${ACCENT}" opacity="0.45"/>
    <rect x="9.5" y="9" width="5" height="13" rx="1.5" fill="${ACCENT}" opacity="0.72"/>
    <rect x="17" y="2" width="5" height="20" rx="1.5" fill="${ACCENT}"/>
  </g>

  <!-- Wordmark -->
  <text x="140" y="102" font-family="${FONT}" font-size="30" font-weight="800"
        letter-spacing="4" fill="${INK}">ARAZ SCALES</text>

  <!-- Pitch line -->
  <text x="72" y="270" font-family="${FONT}" font-size="56" font-weight="800"
        letter-spacing="-1.4" fill="${INK}">Most small businesses don't need</text>
  <text x="72" y="336" font-family="${FONT}" font-size="56" font-weight="800"
        letter-spacing="-1.4" fill="${INK}">a marketing department.</text>
  <text x="72" y="402" font-family="${FONT}" font-size="56" font-weight="800"
        letter-spacing="-1.4" fill="${ACCENT}">They need an operator.</text>

  <!-- Supporting line -->
  <text x="72" y="462" font-family="${FONT}" font-size="21" font-weight="400"
        fill="${MUTED}">Websites · Founder ghostwriting · AI-assisted Meta ads</text>

  <!-- Footer row -->
  <rect x="72" y="530" width="1056" height="1" fill="${LINE}"/>

  <text x="72" y="580" font-family="${FONT}" font-size="18" font-weight="600"
        fill="${FAINT}">$300 website, one-time  ·  $500/mo growth retainer</text>

  <text x="1128" y="580" font-family="${FONT}" font-size="18" font-weight="700"
        letter-spacing="0.4" fill="${INK}" text-anchor="end">arazscales.com</text>

  <!-- Bottom edge detail -->
  <rect y="625" width="1200" height="5" fill="${SURFACE}"/>
</svg>
`;

const outDir = join(root, "public");
await mkdir(outDir, { recursive: true });

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(join(outDir, "og.png"));

console.log("✓ Wrote public/og.png (1200x630)");
