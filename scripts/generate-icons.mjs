/**
 * Generates the raster favicon set from one inline SVG source.
 *
 *   npm run icons
 *
 * Writes public/favicon.ico, public/apple-touch-icon.png and the two PWA
 * icons named by site.webmanifest. public/icon.svg is authored by hand and is
 * not touched here, though the geometry below must match it.
 *
 * The mark is dark ink, so every raster gets a solid `stock` background. A
 * transparent favicon would vanish against a dark browser tab strip, and a
 * transparent apple-touch-icon is composited on black by iOS.
 */

import sharp from "sharp";
import { writeFileSync } from "node:fs";

const INK = "#132A21";
const STOCK = "#EDEEE9";

/** The mark on a padded square. `pad` is a fraction of the full width. */
function source({ background, pad = 0.17 }) {
  const inner = 1 - pad * 2;
  const scale = inner / 24;
  const t = `translate(${pad * 100} ${pad * 100}) scale(${scale * 100})`;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
       <rect width="100" height="100" fill="${background}"/>
       <g transform="${t}">
         <rect x="2" y="14" width="5" height="8" rx="1" fill="${INK}" opacity="0.45"/>
         <rect x="9.5" y="9" width="5" height="13" rx="1" fill="${INK}" opacity="0.72"/>
         <rect x="17" y="2" width="5" height="20" rx="1" fill="${INK}"/>
       </g>
     </svg>`.replace(/\s+/g, " ")
  );
}

const png = (size, opts) =>
  sharp(source(opts), { density: 384 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

/**
 * Minimal ICO writer. sharp cannot emit .ico, and the format is simple enough
 * that pulling in a dependency for it is not worth the supply chain. Every
 * browser we care about reads PNG-in-ICO.
 */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width, 0 means 256
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette count
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(
  icoSizes.map(async (size) => ({
    size,
    data: await png(size, { background: STOCK, pad: 0.12 }),
  }))
);
writeFileSync("public/favicon.ico", ico(icoImages));

/* iOS applies its own rounded mask, so this one carries more padding. */
writeFileSync(
  "public/apple-touch-icon.png",
  await png(180, { background: STOCK, pad: 0.2 })
);

for (const size of [192, 512]) {
  writeFileSync(
    `public/icon-${size}.png`,
    await png(size, { background: STOCK, pad: 0.17 })
  );
}

console.log("wrote favicon.ico (16/32/48), apple-touch-icon.png, icon-192.png, icon-512.png");
