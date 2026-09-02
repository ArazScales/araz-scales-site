# ARAZ Scales — marketing site

Five-page marketing site for ARAZ Scales, positioned as a growth operator for
small businesses: websites, founder ghostwriting and AI-assisted Meta ads.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · static export · no
runtime backend.

---

## Table of contents

1. [Run it locally](#run-it-locally)
2. [Edit the copy](#edit-the-copy)
3. [Change or hide pricing](#change-or-hide-pricing)
4. [Configure the contact form](#configure-the-contact-form)
5. [Replace the brand assets](#replace-the-brand-assets)
6. [Deploy to Vercel](#deploy-to-vercel)
7. [Point arazscales.com at it (Namecheap)](#point-arazscalescom-at-it-namecheap)
8. [Project structure](#project-structure)
9. [Design system](#design-system)
10. [Before launch](#before-launch)

---

## Run it locally

Requires Node 20.9+ (built and tested on Node 24).

```bash
npm install
cp .env.local.example .env.local   # then fill in the Formspree ID — see below
npm run dev                        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static export to `./out` |
| `npm start` | Serves the built `./out` locally, exactly as production will |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run og` | Regenerates `public/og.png`, the social sharing card |

---

## Edit the copy

**Every word on the site lives in two files.** You should never need to open a
`.tsx` file to change wording.

| File | What's in it |
| --- | --- |
| `content/site.ts` | Everything except prices — nav, hero, services, about, contact, footer |
| `content/pricing.ts` | The two prices, plan features, and the pricing FAQ |

The structure of `site.ts` mirrors the site: a `home` key for the home page,
`services` for `/services`, `about` for `/about`, and so on. Change a string,
save, and the dev server reloads.

Two things to know:

- **`services.pillars` feeds three places at once** — the three cards on the
  home page, the full detail blocks on `/services`, and the JSON-LD service
  list in the page `<head>`. Editing a pillar updates all three.
- **Anything marked `[VERIFY]`** is a placeholder decision rather than a
  typo — search the project for that token before launch. Right now that is
  the Twitter handle and the founders' ownership split.

---

## Change or hide pricing

Open `content/pricing.ts`. Each plan has a `price` (a display string, written
exactly as it should appear) and a `cadence`:

```ts
price: "$300",
cadence: "one-time",
```

To hide a price, set `price: null`. The card then renders `priceNote`
("Contact us") and the CTA still points at the contact form.

> **Delete a number you don't want published — don't just hide it.**
> This site is statically exported, so everything in `pricing.ts` ends up in
> the shipped JavaScript payload whether or not it renders. A number left in
> the file behind a `null` is readable by anyone who opens devtools.

Exactly one plan should have `featured: true`. That plan gets the accent
hairline, the accent tick marks and the filled CTA button.

---

## Configure the contact form

The form posts straight to [Formspree](https://formspree.io) from the browser.
There is no API route, because an API route needs a Node runtime and would
break `output: "export"`.

1. Create a form at formspree.io and copy the ID out of its endpoint —
   `https://formspree.io/f/**xxxxxxxx**`.
2. Put it in `.env.local` as `NEXT_PUBLIC_FORMSPREE_ID`.
3. Set the same variable on the Vercel project. Vercel builds remotely and
   never reads your local file.

Without it the form renders disabled with a visible setup notice, so a
misconfiguration is loud rather than silent.

**To change the fields**, edit `contact.fields` in `content/site.ts`. Each
entry's `name` is what Formspree receives and labels in the notification email,
so keep those stable once real submissions are arriving. The `service` field is
a `<select>`; edit its `options` array to change the choices.

The form includes Formspree's `_gotcha` honeypot. Leave it in.

---

## Replace the brand assets

| File | Used for | Notes |
| --- | --- | --- |
| `public/logo.svg` | Standalone mark, referenced by the JSON-LD | 24×24 viewBox |
| `app/icon.svg` | Browser tab favicon | 32×32, has its own background |
| `components/ui/icons.tsx` → `Logo` | The inline nav and footer lockups | Same geometry as `logo.svg` — **update both together** |
| `components/ui/icons.tsx` → `BarMotif` | The oversized ascending-bar background element | See the design notes below |
| `public/og.png` | Social sharing card | Generated — edit `scripts/generate-og.mjs`, then `npm run og` |

The OG script renders through `sharp`, which resolves fonts via fontconfig and
cannot use the webfont `next/font` downloads at build time. It falls back to
Open Sans, so the card is close to the site's Inter but not identical. Replace
`public/og.png` with a properly set card before any real campaign.

---

## Deploy to Vercel

`next.config.ts` sets `output: "export"`, so `npm run build` writes a plain
static site to `./out` — no Node server at runtime. Vercel detects this
automatically.

```bash
npx vercel        # preview deploy
npx vercel --prod # production
```

Set `NEXT_PUBLIC_FORMSPREE_ID` under **Settings → Environment Variables** for
both Production and Preview, then redeploy. Because it is inlined at build
time, adding it without rebuilding changes nothing.

The `out/` directory works on any static host — Netlify, Cloudflare Pages, S3
and so on. `trailingSlash: true` emits `/about/index.html` rather than
`/about.html`, which every static host resolves without custom rewrite rules.

---

## Point arazscales.com at it (Namecheap)

1. In Vercel: **Project → Settings → Domains → Add** `arazscales.com`. Add
   `www.arazscales.com` too and let Vercel redirect one to the other.
2. In Namecheap: **Domain List → Manage → Advanced DNS**. Delete the default
   parking records, then add exactly what Vercel shows you — normally:

   | Type | Host | Value |
   | --- | --- | --- |
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

   Use the values in Vercel's UI rather than these if they differ; they change.
3. Wait for propagation (usually minutes, up to 48 hours) and confirm Vercel
   shows the domain as **Valid**. TLS is issued automatically.

If you change the domain, update `meta.domain` and `meta.url` in
`content/site.ts` — they drive canonical URLs, the sitemap, the JSON-LD and the
OG image URL.

---

## Project structure

```
app/
  layout.tsx         Root layout: metadata, fonts, nav, footer, JSON-LD
  page.tsx           Home
  services/page.tsx  Services
  pricing/page.tsx   Pricing
  about/page.tsx     About
  contact/page.tsx   Contact
  not-found.tsx      404
  globals.css        Brand tokens, base type, motion, utilities
  sitemap.ts         /sitemap.xml — routes are listed explicitly
  robots.ts          /robots.txt
  icon.svg           Favicon

components/
  Nav, Footer, CtaBand           Shared chrome
  Hero, Pillars, Method, Fit     Home sections
  ServiceDetail                  One service block on /services
  Pricing                        Pricing grid + FAQ
  About                          Story, Principles, Founders
  Contact                        Formspree form
  ui/Section.tsx                 Container, Section, PageHeader, ButtonLink
  ui/Reveal.tsx                  Scroll-triggered fade-and-rise
  ui/icons.tsx                   Hand-rolled SVG icons and the bar motif

content/
  site.ts            All copy
  pricing.ts         Prices, plan features, FAQ
```

Only three components are client components — `Nav` (mobile panel, scroll
state), `Contact` (form state) and `Reveal` (IntersectionObserver). Everything
else renders on the server and ships no JavaScript of its own.

---

## Design system

### Colour

All tokens are defined in the `@theme` block at the top of `app/globals.css`
and every one was contrast-checked against the page background. Ratios are
noted inline in that file. Don't lighten the background or darken the text
tokens without re-checking — `faint` on `surface-2` is the tightest pairing at
4.89:1, just above the WCAG AA floor of 4.5:1.

> **Naming constraint.** Tailwind v4 generates a colour utility for every token
> in `@theme`. A token named `base` would produce a `text-base` that overrides
> Tailwind's built-in `text-base` font size — text written as `text-base` then
> renders in the background colour and vanishes. That is why the page
> background token is `canvas`, not `base`. Avoid token names that collide with
> a built-in utility: `base`, `sm`, `lg`, `xl` and friends.

### Type

Inter throughout, self-hosted via `next/font`. Hierarchy comes from weight,
size and tracking rather than a second typeface — headings are sentence case
with negative tracking; uppercase is reserved for eyebrows, buttons and field
labels via the `.label` utility, where it reads as a label rather than a voice.

To swap the display face: register it in `app/layout.tsx` alongside Inter with
its own `variable`, add that variable to the `<html>` className, and point
`--font-display` at it in `globals.css`. Body type stays on Inter.

### Motion

Three mechanisms, all cheap:

- **`Reveal`** wraps an element in `data-reveal`; `globals.css` hides it and
  transitions it back once `data-visible="true"` appears. Each
  IntersectionObserver disconnects after its first hit, so nothing animates out
  on scroll-up and no observer stays live for the session. `delay` staggers
  siblings — keep a group under ~200ms total.
- **Hover states** are `transform` and `color` only, on one shared easing curve
  (`--ease-out-soft`).
- **`prefers-reduced-motion: reduce`** is honoured entirely in CSS: reveal
  targets render outright and every transition collapses to ~0ms.

The hidden start state is scoped to `[data-js]`, stamped on `<html>` by an
inline script before the body paints. With scripting off the selector never
matches and the page renders fully visible — the animation is an enhancement,
never a prerequisite for reading the page. `<html>` carries
`suppressHydrationWarning` for exactly that one attribute.

### The bar motif

The ascending three-bar mark from the logo recurs as an oversized, very
low-opacity background element (`BarMotif`) in exactly two places: behind the
hero, and above the footer in the closing CTA band. It opens the site and
closes it. **If you add a third, delete one of the other two first** — repeated
often enough it stops reading as a signature and starts reading as wallpaper.

Both call sites apply a `linear-gradient` mask. Without one the bars end on a
hard horizontal edge where the section crops them, which reads as a rendering
glitch rather than a deliberate element.

### Spacing

`--spacing-section` in `globals.css` is the single knob for vertical rhythm.
`Container` owns the horizontal measure. Change those rather than adjusting
sections one at a time.

---

## Before launch

- [ ] Search the project for `[VERIFY]` — currently the Twitter handle and the
      founders' ownership split in `about.team`.
- [ ] Confirm the founder bios describe how you actually divide the work.
- [ ] Add LinkedIn / X URLs to `about.team.members[].links`, or leave them
      empty — an empty string hides the icon rather than rendering a dead link.
- [ ] Set `NEXT_PUBLIC_FORMSPREE_ID` on Vercel and send a real test submission.
- [ ] Confirm `hello@arazscales.com` exists and is monitored by all three of
      you.
- [ ] Regenerate the OG card (`npm run og`) if you changed the hero copy or
      the prices, and check it with a social preview tool.
- [ ] Decide whether `home.hero.badge` ("Taking on new clients for Q4") should
      be updated or removed — it dates the page.
