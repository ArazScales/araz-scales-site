import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits a fully static site to ./out — no Node server needed at runtime.
  // This is what keeps hosting cheap (or free) on Vercel/Netlify/Cloudflare Pages.
  output: "export",

  // The static export has no image optimization server, so images are served as-is.
  // Keep source images appropriately sized before committing them.
  images: { unoptimized: true },

  // Emits /about/index.html rather than /about.html, which every static host
  // resolves correctly without custom rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
