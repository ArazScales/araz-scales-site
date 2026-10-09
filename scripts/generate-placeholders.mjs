/**
 * Writes the neutral placeholder for every image slot that does not have a
 * file yet.
 *
 *   npm run placeholders
 *
 * Each placeholder is a flat neutral fill with a small outline glyph in the
 * middle: the Lucide "image" icon, or "user" for a headshot (ISC licence,
 * recorded in credits.md). Flat fills only, no gradient, no text, no AI.
 *
 * It never overwrites. A slot that already has a file is skipped, so running
 * this after a real photo has been dropped in cannot destroy the photo. To
 * regenerate a placeholder, delete its file first.
 */

import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";

const OUT = "public/assets/img";

const IMAGE_GLYPH =
  '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>';
const USER_GLYPH =
  '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>';

/* Light tile for everything that sits on its own, a dark one for the hero,
   which is seen only through the navy overlay. */
const LIGHT = { ground: "#DCE2EA", ink: "#AEB9C7" };
const DARK = { ground: "#1E2638", ink: null };

const slots = [
  ["hero", 1920, 1080, DARK, null],
  ["who-we-are", 1200, 900, LIGHT, IMAGE_GLYPH],
  ["service-landing", 800, 500, LIGHT, IMAGE_GLYPH],
  ["service-website", 800, 500, LIGHT, IMAGE_GLYPH],
  ["service-content-ads", 800, 500, LIGHT, IMAGE_GLYPH],
  ["why-us", 1200, 900, LIGHT, IMAGE_GLYPH],
  ["quote", 1000, 1200, LIGHT, IMAGE_GLYPH],
  ["founder-zain", 400, 400, LIGHT, USER_GLYPH],
  ["founder-roshan", 400, 400, LIGHT, USER_GLYPH],
  ["founder-abayjit", 400, 400, LIGHT, USER_GLYPH],
];

mkdirSync(OUT, { recursive: true });

for (const [name, width, height, tone, glyph] of slots) {
  const file = `${OUT}/${name}.webp`;
  if (existsSync(file)) {
    console.log(`skip   ${file} (already exists)`);
    continue;
  }

  /* The glyph is drawn on Lucide's 24 unit grid and scaled to a fifth of the
     short side, centred. */
  const size = Math.round(Math.min(width, height) * 0.2);
  const icon = glyph
    ? `<svg x="${(width - size) / 2}" y="${(height - size) / 2}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${tone.ink}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${glyph}</svg>`
    : "";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="${tone.ground}"/>${icon}</svg>`;

  await sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile(file);
  console.log(`wrote  ${file} (${width}x${height})`);
}
