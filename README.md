# ARAZ Scales — marketing site

Single-page marketing site for ARAZ Scales, leading with **Ship Log**.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · static export · no runtime backend.

---

## Table of contents

1. [Run it locally](#run-it-locally)
2. [Edit the copy](#edit-the-copy)
3. [Change or hide pricing](#change-or-hide-pricing)
4. [Configure the contact form](#configure-the-contact-form)
5. [Replace the brand assets](#replace-the-brand-assets)
6. [Deploy to Vercel](#deploy-to-vercel)
7. [Point arazscales.io at it (Namecheap)](#point-arazscalesio-at-it-namecheap)
8. [Project structure](#project-structure)
9. [Design system](#design-system)
10. [What was verified](#what-was-verified)

---

## Run it locally

Requires Node 18.18+ (built and tested on Node 24).

```bash
npm install
cp .env.local.example .env.local   # then fill in the values — see below
npm run dev                        # http://localhost:3000
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static export to `./out` |
| `npm start` | Serves the built `./out` locally, exactly as production will |
| `npm run typecheck` | TypeScript, no emit |
| `npm run og` | Regenerates `public/og.png` (the social card) |

> **Note:** `npm start` serves the static build — it is not `next start`. Because
> `output: "export"` produces flat files, there is no Node server in production.

---

## Edit the copy

**Every word on the site lives in [`content/site.ts`](content/site.ts).** You never
need to open a `.tsx` file to change text.

The file is organised in the same order as the page: `meta` → `nav` → `hero` →
`problem` → `howItWorks` → `artifacts` → `approval` → `team` → `contact` →
`footer`. Each section is commented.

### Placeholders you must replace before launch

Search the project for `[REPLACE]`:

```bash
grep -rn "\[REPLACE\]" content/
```

Currently that covers:

- **Three founder entries** in `site.team.members` — name, role, bio, and the
  two-letter `initials` shown in the avatar tile. Social links are optional: leave
  a URL as `""` and that icon is omitted rather than rendering dead.
- **`site.meta.twitterHandle`** — set to `""` to drop the tag entirely.

### Things worth knowing

- **Adding a nav link** requires two edits: add the entry to `site.nav.links`, and
  make sure the `id` you point at matches a `<Section id="...">` in the component.
- **Section order** is set in [`app/page.tsx`](app/page.tsx), not in the content
  file. That order is the argument the page makes — problem, mechanism, output,
  objection, price, who, ask. Reorder deliberately.
- **The hero headline is split into three fields** (`headline`,
  `headlineAccent`, `headlineTail`) so the middle clause can be blue. Keep all
  three filled, or edit `components/Hero.tsx`.

---

## Change or hide pricing

All pricing lives in [`content/pricing.ts`](content/pricing.ts), separate from the
rest of the copy so you can change numbers without scrolling past prose.

**Current state:** Pilot shows real numbers ($1,000 setup / $900 per month).
Standard and Scale show "Contact us", with their real numbers commented out.

### To publish a hidden tier

Find the tier and swap the two `null` lines for the two commented lines:

```ts
// before
setup: null,
monthly: null,
// setup: "$2,500",
// monthly: "$2,000",

// after
setup: "$2,500",
monthly: "$2,000",
```

### To hide a tier that is currently visible

Reverse it: set both to `null` and comment the real values out.

> ### Why commented out, and not a `visible: false` flag
>
> This site is **statically exported**. Anything present in `pricing.ts` ends up in
> the shipped JavaScript payload whether or not it renders — so a boolean flag
> would leave your real Standard and Scale numbers sitting in page source for
> anyone who opens devtools.
>
> Commenting them out is the only way to keep an unpublished price genuinely
> unpublished. If you later decide all prices are public, feel free to simplify to
> a flag; until then, keep them commented.

Anything else about a tier — name, badge, blurb, features, conditions, CTA label —
is a plain field on the same object. Exactly one tier should have
`featured: true`; that's the one that gets the accent border and the solid button.

The code-ownership fine print ("ARAZ Scales owns the code; clients license it while
under retainer") is in `site.footer.fineprint` and renders in the footer.

---

## Configure the contact form

The form posts directly to **Formspree** from the browser.

### Why Formspree and not Resend

Resend needs a server-side API route to keep the API key secret, and an API route
forces a Node runtime — which breaks `output: "export"` and the cheap static
hosting that comes with it. Formspree accepts a browser `fetch`, so the whole site
stays as flat files. If you later want Resend, you'll need to drop static export
and deploy as a Node app.

### Setup (about two minutes)

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form. Point its notification email wherever you want leads to land.
3. Copy the form ID — your endpoint looks like
   `https://formspree.io/f/xxxxxxxx`, and the ID is the `xxxxxxxx` part.
4. Put it in `.env.local`:

   ```bash
   NEXT_PUBLIC_FORMSPREE_ID=xxxxxxxx
   ```

5. Restart the dev server.
6. Submit the form once. Formspree emails you to confirm the address the first
   time — **until you click that link, submissions are held and you will not get
   notified.** This trips people up.

Also add the same variable in your Vercel project settings (Settings →
Environment Variables) and redeploy — see below.

### What happens if you skip this

The form renders **disabled**, with a visible amber notice telling you the
variable is missing. It deliberately does not render a working-looking form that
silently drops leads.

### Fields sent to Formspree

`name`, `email`, `company`, `repo`, `notes` (optional), plus `_gotcha` — a hidden
honeypot Formspree uses to drop bot submissions. If you rename a field in
`site.contact.fields`, change the `name` property, not the `label`; the `name` is
what Formspree records.

The free tier allows 50 submissions per month. Above that, Formspree's paid plan
or a different provider is needed.

### The booking link

`NEXT_PUBLIC_CAL_URL` is optional. Set it to your Cal.com or Calendly URL and a
secondary "Book a 20-minute call" button appears in the hero. Leave it empty and
the button is omitted entirely rather than rendering a dead link.

> **Both variables are `NEXT_PUBLIC_` and are baked into the build.** They are
> visible in page source, which is correct for a form endpoint and a booking URL.
> Never give a real secret a `NEXT_PUBLIC_` prefix. Changing either one requires a
> rebuild and redeploy — restarting dev is not enough on a deployed site.

---

## Replace the brand assets

All three shipped assets are placeholders.

| File | What it is | How to replace |
| --- | --- | --- |
| `public/logo.svg` | Standalone logo file | Overwrite with the real mark. Keep the `24x24` viewBox. |
| `app/icon.svg` | Favicon | Overwrite. Next wires the `<link rel="icon">` automatically from the filename. |
| `public/og.png` | 1200×630 social card | Either overwrite directly, or edit `scripts/generate-og.mjs` and run `npm run og`. |

The inline mark used in the nav and footer is a React component in
[`components/ui/icons.tsx`](components/ui/icons.tsx) (`<Logo />`) — it's inline SVG
so it can inherit the accent colour and needs no network request. Replace its paths
with your real mark's paths when you have them.

> **On the OG image:** it renders with Open Sans Extrabold, a system font, because
> the SVG rasterizer resolves fonts through fontconfig and can't use the webfont
> that `next/font` downloads at build time. It's close to Inter Black but not
> identical. Fine as a placeholder; replace it with a properly set card from your
> design tool before any real campaign.

---

## Deploy to Vercel

The build is a static export, so Netlify, Cloudflare Pages or any static host works
identically. Vercel steps:

### First deploy

```bash
git remote add origin git@github.com:<you>/arazscales-site.git
git push -u origin main
```

Then at [vercel.com/new](https://vercel.com/new): import the repo. Vercel detects
Next.js and needs no build configuration.

**Before the first deploy finishes**, add your environment variables under
Settings → Environment Variables:

- `NEXT_PUBLIC_FORMSPREE_ID` — required, or the form ships disabled
- `NEXT_PUBLIC_CAL_URL` — optional

Apply them to Production, Preview and Development, then **redeploy**. Environment
variables are read at build time, so a deploy that ran before you added them will
still have the form disabled.

### Subsequent deploys

Push to `main`. Vercel builds and deploys automatically. Pull requests get preview
URLs.

### Deploying without Git

```bash
npm i -g vercel
vercel --prod
```

---

## Point arazscales.io at it (Namecheap)

### 1. Add the domain in Vercel

Project → Settings → Domains → add `arazscales.io`. Add `www.arazscales.io` too;
Vercel will offer to redirect one to the other. Redirecting `www` → apex is the
usual choice.

Vercel then shows you the exact DNS records to create. **Use the values Vercel
shows you** — they change from time to time, and a stale value copied from a blog
post is the most common reason this step fails.

### 2. Create the records at Namecheap

1. Log in → **Domain List** → **Manage** next to `arazscales.io`.
2. Confirm **Nameservers** is set to **Namecheap BasicDNS**. (If you'd rather hand
   the whole domain to Vercel, choose Custom DNS and enter Vercel's nameservers
   instead — then skip step 3 entirely.)
3. Open the **Advanced DNS** tab.
4. **Delete Namecheap's defaults first.** A new domain ships with a
   `CNAME` record for `www` pointing at `parkingpage.namecheap.com` and often a
   `URL Redirect` record on `@`. Both will silently override your new records if
   left in place. This is the single most common cause of "I set it up and it
   still shows a parking page."
5. Add the records Vercel gave you. They are typically:

   | Type | Host | Value | TTL |
   | --- | --- | --- | --- |
   | A Record | `@` | *(the IP Vercel shows)* | Automatic |
   | CNAME Record | `www` | `cname.vercel-dns.com.` | Automatic |

6. Save.

### 3. Wait, then verify

Namecheap usually propagates in 5–30 minutes, occasionally longer. Vercel's Domains
page shows a green check when it sees the records, and issues the TLS certificate
automatically — no certificate configuration needed.

Check from the terminal:

```bash
dig arazscales.io +short
dig www.arazscales.io +short
```

### 4. Update the canonical URL

`site.meta.url` in `content/site.ts` is already `https://arazscales.io`. If you
deploy anywhere else, change it — it feeds the canonical tag, the Open Graph URL,
the sitemap and the JSON-LD.

---

## Project structure

```
app/
  layout.tsx        Fonts, metadata, OG/Twitter tags, skip link
  page.tsx          Composes the sections — this file sets section order
  globals.css       Brand tokens (@theme), base styles, focus rings
  icon.svg          Favicon
  sitemap.ts        Emits /sitemap.xml at build
  robots.ts         Emits /robots.txt at build
components/
  Nav.tsx           Sticky anchor nav + mobile panel (client component)
  Hero.tsx          Pitch line, CTAs
  Problem.tsx       Three problem cards
  HowItWorks.tsx    Five-step pipeline
  Artifacts.tsx     The four outputs
  Approval.tsx      Human-in-the-loop + mock review queue
  Pricing.tsx       Reads content/pricing.ts
  Team.tsx          Three founders
  Contact.tsx       Formspree form (client component)
  Footer.tsx        Links, fine print
  ui/
    Section.tsx     Shared section shell + ButtonLink
    icons.tsx       Inline SVGs — no icon library
content/
  site.ts           ALL copy
  pricing.ts        Tiers and numbers
scripts/
  generate-og.mjs   Builds public/og.png
```

Only two components ship JavaScript to the browser: `Nav` (mobile menu) and
`Contact` (form). Everything else is server-rendered to static HTML.

---

## Design system

Tokens are defined once in the `@theme` block of
[`app/globals.css`](app/globals.css) and consumed as normal Tailwind classes
(`bg-base`, `text-muted`, `border-line`, `text-accent`).

| Token | Value | Use |
| --- | --- | --- |
| `base` | `#1C2128` | Page background |
| `surface` | `#232A32` | Cards, panels |
| `line` / `line-strong` | `#2E3742` / `#3A4552` | Hairlines |
| `accent` | `#1B9CE3` | Logo, icons, CTAs |
| `accent-deep` | `#0E9AE0` | Hover |
| `accent-ink` | `#08131B` | Text on accent |
| `ink` | `#F5F7FA` | Primary text |
| `muted` | `#94A1B2` | Secondary copy |
| `faint` | `#838F9F` | Fine print |
| `pending` / `approved` | `#E0A30E` / `#3FBF7F` | Queue status |

**Don't lighten `base` or darken the greys without re-checking contrast** —
`faint` sits at 4.9:1, close to the 4.5:1 AA floor.

**Type:** Inter, self-hosted via `next/font` (no runtime request to Google, no
layout shift). Headings are weight 900, uppercase, with positive letter-spacing,
set globally in `globals.css` — individual components don't restate it.

To switch headings to Montserrat: import it in `app/layout.tsx` with its own
`variable`, add that variable to the `<html>` className, and point `--font-display`
at it in `globals.css`. Body type stays on Inter. That's the whole change.

**Vertical rhythm:** every section's padding comes from `--spacing-section`
(`7rem`). Change it once to loosen or tighten the whole page.

**Dependencies:** `next`, `react`, `react-dom`. That's it at runtime — no animation
library, no icon package, no UI kit. `sharp` is a devDependency used only by the OG
script and never reaches the browser.

---

## What was verified

Checked in a real browser against the production build, not assumed:

- **Build** — clean static export; all 6 routes prerendered
- **Contact form, success path** — posts `POST https://formspree.io/f/<id>` with
  `Accept: application/json` and all five fields plus the honeypot; success panel
  renders
- **Contact form, failure path** — on a 500, shows the error alert, keeps the
  user's typed input, and re-enables the button for retry
- **Contact form, unconfigured** — renders disabled with a visible setup notice
- **Contrast** — every text/background pair measured from computed styles; all
  pass WCAG AA. Placeholder text was found at 3.0:1 and fixed to 4.6:1
- **Heading hierarchy** — exactly one `<h1>`; no skipped levels
- **Responsive** — no horizontal overflow at 375px, 785px or 1280px; the wide
  queue table scrolls inside its own container rather than breaking the page
- **Layout** — pipeline renders 5-across at desktop and stacks on mobile; grids
  form the intended column counts
- **Mobile menu** — `aria-expanded` tracks state, label changes, body scroll
  locks, Escape closes
- **Tap targets** — nav and footer links padded to ≥24px (WCAG 2.5.8)

Not verified: **visual appearance**. Screenshots were unavailable in the build
environment, so the design was confirmed structurally and geometrically but never
looked at. Run `npm run dev` and review it yourself before shipping.

Also worth running once deployed: Lighthouse, and a real submission through
Formspree end to end.
