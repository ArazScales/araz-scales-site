/**
 * Checks that every inline <script> in the built site is allowed by its hash
 * in the Content Security Policy in vercel.json.
 *
 *   npm run csp-hash     prints the hashes the built pages need
 *   (runs automatically at the end of `npm run build`)
 *
 * The policy is script-src 'self' plus one sha256 hash, for the one line
 * snippet in the <head> of src/layouts/Base.astro that sets the .js class.
 * If that snippet changes by a single character its hash changes, and the
 * browser silently refuses to run it. This turns that into a failed build
 * instead, with the hash to paste printed underneath.
 *
 * JSON-LD blocks are skipped: they are data, not script, and CSP does not
 * apply to them.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const DIST = "dist";

const htmlFiles = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith(".html") ? [path] : [];
  });

const needed = new Set();
for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, "utf8");
  for (const [, attrs, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc=/.test(attrs) || /application\/ld\+json/.test(attrs)) continue;
    const hash = createHash("sha256").update(body, "utf8").digest("base64");
    needed.add(`'sha256-${hash}'`);
  }
}

const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));
const csp = vercel.headers
  .flatMap((rule) => rule.headers)
  .find((header) => header.key === "Content-Security-Policy")?.value ?? "";
const scriptSrc = csp.split(";").map((part) => part.trim()).find((part) => part.startsWith("script-src")) ?? "";

const missing = [...needed].filter((hash) => !scriptSrc.includes(hash));

if (missing.length) {
  console.error("\nCSP check failed. vercel.json script-src is missing:\n");
  for (const hash of missing) console.error(`  ${hash}`);
  console.error(`\nIt should read:\n\n  script-src 'self' ${[...needed].join(" ")}\n`);
  process.exit(1);
}

console.log(`CSP check passed: ${needed.size} inline script hash(es) allowed in vercel.json.`);
