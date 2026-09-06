/**
 * Sitemap, generated at build time from one list.
 *
 * Hand written rather than pulled in through @astrojs/sitemap, because five
 * static URLs do not justify a dependency. Add a page, add it here.
 */
import type { APIRoute } from "astro";
import { business } from "../config/business";

const paths = ["/", "/privacy", "/terms", "/refunds", "/cookies"];

export const GET: APIRoute = () => {
  const urls = paths
    .map(
      (path) =>
        `  <url>\n    <loc>${new URL(path, business.url).href}</loc>\n  </url>`
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } }
  );
};
