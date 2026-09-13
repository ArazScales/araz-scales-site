/**
 * Generates the favicon set from the ARAZ mark.
 *
 *   npm run icons
 *
 * Source is src/logo-mark-master.png, the 574x435 transparent extraction of
 * the supplied logo with the "arazscale.com" wordmark cropped away. Writes
 * public/favicon.ico, public/apple-touch-icon.png, the two PWA icons named by
 * site.webmanifest, and public/icon.svg.
 *
 * PADDING. Every raster is generated at 3% padding rather than the 12 to 20%
 * the old three-bar mark used. That is not a style preference: this mark has
 * thin diagonal strokes and three small circular nodes, and at 16px every
 * wasted pixel of margin costs legibility. A simplified crop was tried first,
 * taking the bars and node line without the A, and it rendered worse than the
 * whole mark, because the cropped A leg reads as noise rather than as a
 * letter. The full mark, drawn as large as the box allows, was the clearest
 * option at every size tested.
 *
 * BACKGROUND. Rasters get a solid `stock` ground. A transparent favicon
 * disappears against a dark browser tab strip, and iOS composites a
 * transparent apple-touch-icon onto black.
 *
 * The mark itself is never recoloured, stretched or filtered. Only the canvas
 * around it changes.
 */

import sharp from "sharp";
import { writeFileSync, readFileSync } from "node:fs";

const MASTER = "src/logo-mark-master.png";
const STOCK = "#F4F5F7";

/** The mark centred on a padded square of `background`. */
async function square(size, { background, pad = 0.03 }) {
  const meta = await sharp(MASTER).metadata();
  const side = Math.max(meta.width, meta.height);
  const box = Math.round(side * (1 + pad * 2));
  const canvas = {
    create: { width: box, height: box, channels: 4, background },
  };
  const composed = await sharp(canvas)
    .composite([{ input: await sharp(MASTER).toBuffer(), gravity: "center" }])
    .png()
    .toBuffer();
  return sharp(composed)
    .resize(size, size, { fit: "contain", kernel: "lanczos3", background })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/**
 * Minimal ICO writer. sharp cannot emit .ico, and the format is simple enough
 * that pulling in a dependency for it is not worth the supply chain. Every
 * browser we care about reads PNG-in-ICO.
 */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const icoImages = await Promise.all(
  [16, 32, 48].map(async (size) => ({
    size,
    data: await square(size, { background: STOCK }),
  }))
);
writeFileSync("public/favicon.ico", ico(icoImages));

/* iOS applies its own rounded mask and clips the corners, so this one alone
   carries real padding. */
writeFileSync(
  "public/apple-touch-icon.png",
  await square(180, { background: STOCK, pad: 0.14 })
);

for (const size of [192, 512]) {
  writeFileSync(
    `public/icon-${size}.png`,
    await square(size, { background: STOCK, pad: 0.06 })
  );
}

/* icon.svg wraps the raster rather than describing the mark as paths, because
   the logo we hold is a raster export with no vector source. If a real vector
   ever arrives, replace the <image> href with the paths and drop the base64. */
/* 256px, not 512: this file is only ever drawn at favicon sizes, and the
   larger embed pushed icon.svg past 47 KB for no visible gain. */
const embedded = (await square(256, { background: STOCK, pad: 0.06 })).toString("base64");
writeFileSync(
  "public/icon.svg",
  `<!-- ARAZ Scales mark. Raster embedded because no vector source exists yet.
     Regenerate with \`npm run icons\`, do not hand edit. -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-label="ARAZ Scales">
  <image href="data:image/png;base64,${embedded}" width="512" height="512"/>
</svg>
`
);

console.log(
  "wrote favicon.ico (16/32/48), apple-touch-icon.png, icon-192.png, icon-512.png, icon.svg"
);
