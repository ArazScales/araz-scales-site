/**
 * Generates the link preview card from src/og-card.svg.
 *
 *   npm run og
 *
 * Writes public/og.png at 1200x630, the size Facebook, LinkedIn, Slack,
 * iMessage and X all crop from. Committed rather than built on deploy, for the
 * same reason the favicons are: a deploy should not depend on sharp being
 * installable.
 *
 * The card is two pieces. src/og-card.svg carries the ground, the type and the
 * hairline, with every line already converted to outlines so no font has to be
 * installed for this to run. The mark is composited on afterwards rather than
 * being embedded in the SVG as base64, which keeps the SVG readable and means
 * the mark is never re-encoded.
 *
 * The mark is drawn at 58x44, which is the 574x435 master at its own 1.32
 * ratio, and sits on the wordmark's cap line. It is not recoloured, stretched
 * or filtered, per credits.md.
 */

import sharp from "sharp";
import { writeFileSync, readFileSync } from "node:fs";

const CARD = "src/og-card.svg";
const MASTER = "src/logo-mark-master.png";
const OUT = "public/og.png";

const MARK = { width: 58, height: 44, left: 80, top: 72 };

const card = await sharp(readFileSync(CARD)).png().toBuffer();

const mark = await sharp(MASTER)
  .resize(MARK.width, MARK.height, { fit: "contain", kernel: "lanczos3" })
  .png()
  .toBuffer();

const out = await sharp(card)
  .composite([{ input: mark, left: MARK.left, top: MARK.top }])
  .png({ compressionLevel: 9 })
  .toBuffer();

writeFileSync(OUT, out);

const { width, height } = await sharp(OUT).metadata();
console.log(`wrote ${OUT} at ${width}x${height}, ${Math.round(out.length / 1024)} KB`);
