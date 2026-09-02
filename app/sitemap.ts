import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Emits /sitemap.xml at build time.
 *
 * Routes are listed explicitly rather than crawled off the filesystem — a
 * static export has no runtime to enumerate them, and an explicit list makes
 * it obvious when a new page has been added without one.
 */
export const dynamic = "force-static";

const routes = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/services/", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/pricing/", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/about/", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/contact/", priority: 0.8, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${site.meta.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
