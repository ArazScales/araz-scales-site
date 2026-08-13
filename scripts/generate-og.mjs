/**
 * Generates public/og.png — the 1200x630 social sharing card.
 *
 * Run with:  npm run og
 *
 * Why a script rather than a committed binary: the card carries the pitch line
 * and the domain, both of which live in content/site.ts. When that copy
 * changes, regenerate rather than hand-editing an image in a design tool.
 *
 * NOTE ON FONTS: this renders with Open Sans Extrabold, a system font, because
 * librsvg resolves families through fontconfig and cannot use the webfont that
 * next/font downloads at build time. The result is close to Inter Black but not
 * identical. It is a placeholder — replace public/og.png with a properly set
 * card from your design tool before any real campaign.
 *
 * `sharp` is a devDependency. It is never shipped to the browser.
 */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/* Brand tokens — keep in sync with app/globals.css */
const BASE = "#1C2128";
const SURFACE = "#232A32";
const LINE = "#2E3742";
const ACCENT = "#1B9CE3";
const INK = "#F5F7FA";
const FAINT = "#838F9F";

const FONT = "Open Sans, DejaVu Sans, sans-serif";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
      <path d="M72 0H0V72" fill="none" stroke="${LINE}" stroke-width="1"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="white" stop-opacity="0.5"/>
      <stop offset="70%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    <mask id="gridMask">
      <rect width="1200" height="630" fill="url(#fade)"/>
    </mask>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="${BASE}"/>
  <rect width="1200" height="630" fill="url(#grid)" mask="url(#gridMask)"/>

  <!-- Accent rule along the top edge -->
  <rect width="1200" height="6" fill="${ACCENT}"/>

  <!-- Logo mark -->
  <g transform="translate(72, 74) scale(1.9)">
    <rect x="2" y="14" width="5" height="8" rx="1.5" fill="${ACCENT}" opacity="0.5"/>
    <rect x="9.5" y="9" width="5" height="13" rx="1.5" fill="${ACCENT}" opacity="0.75"/>
    <rect x="17" y="2" width="5" height="20" rx="1.5" fill="${ACCENT}"/>
  </g>

  <!-- Wordmark -->
  <text x="140" y="105" font-family="${FONT}" font-size="32" font-weight="800"
        letter-spacing="3.5" fill="${INK}">ARAZ SCALES</text>

  <!-- Tagline -->
  <text x="72" y="152" font-family="${FONT}" font-size="15" font-weight="700"
        letter-spacing="4.2" fill="${FAINT}">TECH AUTOMATION  |  AI SOLUTIONS</text>

  <!-- Pitch line -->
  <text x="72" y="300" font-family="${FONT}" font-size="52" font-weight="800"
        letter-spacing="0.5" fill="${INK}">YOU SHIP ON TUESDAY.</text>
  <text x="72" y="372" font-family="${FONT}" font-size="52" font-weight="800"
        letter-spacing="0.5" fill="${ACCENT}">THE CONTENT GOES OUT TUESDAY.</text>
  <text x="72" y="444" font-family="${FONT}" font-size="52" font-weight="800"
        letter-spacing="0.5" fill="${INK}">YOU NEVER WRITE IT.</text>

  <!-- Footer row -->
  <rect x="72" y="524" width="132" height="38" rx="19" fill="${ACCENT}"/>
  <text x="138" y="549" font-family="${FONT}" font-size="15" font-weight="800"
        letter-spacing="2.5" fill="#08131B" text-anchor="middle">SHIP LOG</text>

  <rect x="222" y="524" width="1" height="38" fill="${LINE}"/>

  <text x="248" y="549" font-family="${FONT}" font-size="17" font-weight="600"
        letter-spacing="0.3" fill="${FAINT}">Nothing publishes without your approval.</text>

  <text x="1128" y="549" font-family="${FONT}" font-size="17" font-weight="700"
        letter-spacing="0.5" fill="${INK}" text-anchor="end">arazscales.io</text>

  <!-- Bottom edge detail -->
  <rect y="624" width="1200" height="6" fill="${SURFACE}"/>
</svg>
`;

const outDir = join(root, "public");
await mkdir(outDir, { recursive: true });

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(join(outDir, "og.png"));

console.log("✓ Wrote public/og.png (1200x630)");
