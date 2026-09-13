import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://arazscales.com",

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
