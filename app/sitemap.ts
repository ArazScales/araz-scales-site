import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Emits /sitemap.xml at build time.
 *
 * The site is a single page, so there is one entry. If you split a section out
 * into its own route later, add it here — nothing generates this automatically.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.meta.url}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
