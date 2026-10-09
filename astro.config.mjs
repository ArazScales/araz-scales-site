import { defineConfig } from "astro/config";

export default defineConfig({
  /* The website domain is arazscale.com, singular. Email is on
     arazscales.com, plural. Both are right. Do not change either to match
     the other. Must agree with business.url in src/config/business.ts. */
  site: "https://arazscale.com",

  /* One stylesheet, always as a file. Astro would otherwise inline small
     CSS into a <style> tag on each page. */
  build: {
    inlineStylesheets: "never",
  },

  /* The dev toolbar draws a floating pill over the bottom of every page, which
     lands in every screenshot taken of the dev server. Nothing on this site
     needs it. */
  devToolbar: { enabled: false },

  /* Astro inlines small script bundles into the HTML by default. The Content
     Security Policy in vercel.json sets script-src 'self' with no
     'unsafe-inline', which would block an inlined module, so force the
     contact form's behaviour out to its own file on this origin. */
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
