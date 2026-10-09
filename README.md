# ARAZ Scales, marketing site

One page plus four policy pages, for a three person studio in Houston selling
websites, ghostwritten content and Meta ad creative to local businesses.

Astro 7 as a build step only. What a visitor receives is plain HTML, one hand
written stylesheet and one small vanilla JavaScript file (about 2 KB gzipped)
that runs the mobile menu, the scroll-in animations and the contact form. No
client framework, no Tailwind, no jQuery, no dependencies in the browser.

**Two domains, both correct.** The website is `arazscale.com`, singular. Email
is `support@arazscales.com`, plural. Do not change either to match the other.

The brief this was built to is `CLAUDE.md` at the repo root. It applies to every
session in this repo, and its hard rules win over anything in this file.

---

## Contents

1. [Run it locally](#run-it-locally)
2. [Change the copy](#change-the-copy)
3. [Change a price](#change-a-price)
4. [Fill in the business details](#fill-in-the-business-details)
5. [Wire up the contact form](#wire-up-the-contact-form)
6. [Swap in real photos](#swap-in-real-photos)
7. [Deploy to Vercel](#deploy-to-vercel)
8. [Point arazscale.com at it](#point-arazscalecom-at-it)
9. [How the design works](#how-the-design-works)
10. [Project structure](#project-structure)
11. [Handoff notes, read before launch](#handoff-notes-read-before-launch)

---

## Run it locally

Needs Node 20.9 or newer. Built and tested on Node 24.

```bash
npm install
cp .env.local.example .env.local   # then add the Formspree ID, see below
npm run dev                        # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `./dist`, then the CSP hash check (see "Headers") |
| `npm run preview` | Serves the built `./dist` exactly as production will |
| `npm run check` | Type checks the `.astro` and `.ts` files |
| `npm run icons` | Regenerates the favicon set from the mark |
| `npm run placeholders` | Writes a neutral placeholder for any image slot that has no file. Never overwrites |
| `npm run csp-hash` | Checks the inline head script's hash against `vercel.json` |

---

## Change the copy

**Every word on the site lives in two files. You never need to open a `.astro`
file to change wording.**

| File | What is in it |
| --- | --- |
| `src/content/site.ts` | Everything except prices: meta title, nav, hero, the who-we-are split, the services band, the why-us checklist, section headings and labels, the process steps, the FAQ, the contact form labels, the footer line and links |
| `src/content/pricing.ts` | The three prices and what each one buys |
| `src/config/business.ts` | Real world facts, plus the founders' names, roles, majors and LinkedIn links |
| `src/content/images.ts` | Every image slot, its size and the alt text for its real photo |

The policy pages are the exception. Their text is prose inside
`src/pages/privacy.astro`, `terms.astro`, `refunds.astro` and `cookies.astro`,
because legal copy is structure as much as it is words and splitting it out
would make it harder to read, not easier. They pull every fact from
`src/config/business.ts`, so a name or an address is still a one line change.

House rules for anything you add, from `CLAUDE.md` section 8:

- Short declarative sentences. Sentence case headings.
- **No em dashes.** Use a period, a comma or a colon.
- No semicolons in body copy.
- Banned words: elevate, empower, unlock, seamless, leverage, robust,
  cutting-edge, transform, journey, solutions, and the stock phrases listed in
  the brief.
- If a 55 year old plumber would not say it out loud, rewrite it.

---

## Change a price

Open `src/content/pricing.ts` and edit `amount` and `unit`. That is the whole
job. Nothing in the layout measures itself against the text, so a longer or
shorter figure will not break the grid.

Two things to know about that file:

- `amount` is a display string, not a number, because it is rendered at display
  size and is deliberately the largest element on the page.
- Written content and ad creative are one service at one price. The retainer
  therefore carries a `parts` array: one figure, two strands of work under it,
  each with its own deliverables and timeline. This is so the page never
  prints `$500` twice and invites somebody to read it as $1,000.

If you change a price, the FAQ answers in `src/content/site.ts` and the
`/refunds` page both quote figures in prose. Search for the old number.

---

## Fill in the business details

`src/config/business.ts` is the single source for every real world fact: entity
name, state, city, email, phone, mailing address, and the two companies that
handle contact form data. The footer and all four policy pages read from it.

A field has three possible states, and only one of them blocks a launch:

| State | Means | Blocks launch |
| --- | --- | --- |
| A real value | Finalised and rendering | No |
| `null` | We have decided to ship without it | No |
| `TODO` | We intend to have it and do not yet | **Yes** |

The launch blocker check greps for the third:

```bash
grep -rnE "^[[:space:]]*[a-zA-Z_]+:[[:space:]]*TODO,?[[:space:]]*$" src/
```

**It currently returns nothing, and nothing is blocking.** `address` and
`social.facebook` are `null` by decision, not `TODO` by omission, which is why
the two states are spelled differently.

**Match field assignments, not the bare string.** Two earlier versions of this
check were wrong in opposite directions. Grepping `TODO_NEEDS_REAL_VALUE`
found only the line defining the constant, so it reported clean while fields
were genuinely empty. Grepping `:\s*TODO,` fixed that but also matched the
constant's own definition and the prose above it, so it reported two hits
forever and the check became noise you learn to ignore. The pattern above
matches `  address: TODO,` and nothing else, so an empty result is meaningful.

**None of these ever render.** Read every one through the `real()` helper in
that file, which returns `null` for a placeholder *and* for a null, and let
the component omit the row. The policy pages do this with the mailing address:
none is set, so no postal line appears at all, rather than a blank line or the
word `null` on a live page.

See the handoff notes at the bottom for what is currently outstanding.

---

## Wire up the contact form

The form posts to [Formspree](https://formspree.io). No backend, and no
Formspree script on the page: the form is a plain `POST` that works with
JavaScript switched off, and the form section of `src/scripts/site.js`
upgrades it to a `fetch` so the visitor stays on the page.

1. Create a form at formspree.io and copy the ID out of its endpoint. The
   endpoint reads `https://formspree.io/f/xxxxxxxx` and you want the `xxxxxxxx`.
2. Put it in `.env.local` as `PUBLIC_FORMSPREE_ID`.
3. Put the same value on the Vercel project, under Settings, Environment
   Variables. **Vercel builds remotely and never reads `.env.local`.**
4. Rebuild. The value is inlined at build time, so restarting the dev server is
   not enough.

Without the variable the form renders visibly disabled with a setup notice, so
it fails loudly rather than looking fine and dropping every lead.

Spam protection is a honeypot field named `_gotcha`, which Formspree discards
server side when it is filled. It is positioned off screen rather than
`display: none`, is not tabbable, and is hidden from assistive technology.

The form collects name, email, business name and what they need. Phone is
optional. **Do not add a field you do not act on**, and if you add one, update
`/privacy` in the same commit.

---

## Swap in real photos

There are no real photos yet. Every image slot holds a flat neutral
placeholder generated by `npm run placeholders`. The layout is sized from the
`width` and `height` on each `<img>`, so a real photo drops in without
anything shifting.

| Slot file in `public/assets/img/` | Where it shows | Placeholder size | Ideal real photo |
| --- | --- | --- | --- |
| `hero.webp` | Behind the hero headline, under a navy overlay | 1920x1080 | 2400x1350 landscape, under 250 KB. Decorative, alt stays empty |
| `who-we-are.webp` | Who we are split, right side | 1200x900 | 1200x900 (4:3) |
| `service-landing.webp` | $100 landing page card in the blue band | 800x500 | 800x500 (16:10) |
| `service-website.webp` | $300 website card in the blue band | 800x500 | 800x500 (16:10) |
| `service-content-ads.webp` | $500 content and ads card in the blue band | 800x500 | 800x500 (16:10) |
| `why-us.webp` | Why us, left side, on navy | 1200x900 | 1200x900 (4:3) |
| `quote.webp` | Get a quote, left of the form | 1000x1200 | 1000x1200 (5:6). Cropped to 16:9 on phones, keep the subject centred |
| `founder-zain.webp` | Zain's founder card | 400x400 | 400x400 square headshot, face centred |
| `founder-roshan.webp` | Roshan's founder card | 400x400 | 400x400 square headshot |
| `founder-abayjit.webp` | Abayjit's founder card | 400x400 | 400x400 square headshot |

`service-landing.webp` is a tenth slot beyond the nine in the original brief,
because the blue band has a card for each of the three prices.

To swap one in:

1. Export the photo as `.webp` at the ideal size, or at least the same ratio,
   and overwrite the file of the same name.
2. In `src/content/images.ts`, set `placeholder: false` on that slot. That
   switches its alt text on. Every slot already has alt text written for the
   photo it is meant to hold; check it still describes what your photo shows.
3. Record it in `credits.md` with who took it.

No stock photography we do not hold a licence for, no AI generated images, and
nothing from texasroadside.org, per `CLAUDE.md` section 2.

---

## Deploy to Vercel

`vercel.json` sets the framework, the build command, the output directory and
the security headers, so a fresh import needs no clicking about.

**The one thing to check on the existing project.** This repo used to be a
Next.js app. If the Vercel project still has the Next.js framework preset
selected, change it to Astro under Settings, Build and Deployment, or the build
will look for the wrong output directory.

```bash
npm run build     # produces ./dist
npm run preview   # check it locally first
```

`dist/` is a plain static directory. It will serve from any static host, not
just Vercel.

### Headers set by `vercel.json`

A Content Security Policy locks the page to its own origin, with one exception
for the Formspree endpoint the form posts to. This is what will block a third
party script if one is ever added, which is deliberate.

Two consequences worth knowing before you change anything:

- `script-src` is `'self'` plus one `sha256` hash, with no `'unsafe-inline'`.
  The hash allows exactly one inline script: the one line in the `<head>` of
  `src/layouts/Base.astro` that adds the `js` class before first paint, so the
  animation start states apply without a flash. **Change one character of it
  and the hash changes.** `npm run build` runs `scripts/csp-hash.mjs` at the
  end and fails with the correct value printed if `vercel.json` does not match,
  so a stale hash cannot reach a deploy unnoticed.
- Astro inlines small script bundles by default, which the policy would block,
  so `astro.config.mjs` sets `vite.build.assetsInlineLimit: 0` to force
  `site.js` out to its own file. Do not remove that.
- `style-src` does allow `'unsafe-inline'`, because the markup uses a handful of
  `style="--rise-delay: 120ms"` attributes for the hero stagger.

---

## Point arazscale.com at it

The website domain is **`arazscale.com`, singular**. The email domain,
`arazscales.com`, plural, is separate and must keep its own Google Workspace
MX, SPF, DKIM and DMARC records. Do not point the plural at Vercel in a way
that disturbs those.

1. In Vercel: **Project, Settings, Domains, Add** `arazscale.com`. Add
   `www.arazscale.com` as well and let Vercel redirect it to the bare domain.
2. At the registrar's DNS settings for `arazscale.com`, delete any default
   parking records, then add exactly what Vercel shows you. Normally that is:

   | Type | Host | Value | TTL |
   | --- | --- | --- | --- |
   | `A` | `@` | `76.76.21.21` | Automatic |
   | `CNAME` | `www` | `cname.vercel-dns.com` | Automatic |

   Use the values in Vercel's own UI if they differ from these. Vercel changes
   them from time to time and their UI is the authority.
3. Wait for propagation, usually minutes but up to 48 hours, and confirm Vercel
   shows the domain as **Valid**. TLS is issued automatically.

As of October 2026 `arazscale.com` already serves an older build of this site
from Vercel, so step 1 is done. The next deploy replaces that build.

If the website domain ever changes, update `url` and `domain` in
`src/config/business.ts`, the `site` value in `astro.config.mjs` and the
sitemap line in `public/robots.txt`. Between them they drive the canonical
tags, the sitemap and the Open Graph URLs.

---

## How the design works

The layout follows <https://texasroadside.org/> (used as a reference with the
owner's permission, layout only, none of their assets): a thin info bar, a
sticky navy header, a dark image hero, then light, blue and navy sections in
turn, ending on a navy "Get a quote" section and a four column footer.

**Sections, top to bottom.** Info bar, header, hero, who we are (split), the
blue "What you get" band with one card per price, detailed pricing (one two
column row per plan), why us (image plus checklist), how it works (five
numbered cards), founders (three profile cards plus the honesty block), FAQ
(native `<details>`), get a quote (image plus form), footer.

**Palette.** All values are custom properties in `src/styles/global.css`, with
the measured contrast ratio beside each one.

| Token | Hex | Role |
| --- | --- | --- |
| `--navy` | `#0A0E1A` | Hero, dark sections, footer, and the ink on light |
| `--navy-raised` | `#131B2C` | Panels on navy |
| `--navy-deep` | `#05070D` | The info bar |
| `--paper` | `#F5F7FA` | Off-white sections |
| `--white` | `#FFFFFF` | White sections and cards |
| `--blue` | `#3B9EFF` | Buttons, badges, the services band. **Fill only** |
| `--blue-hover` | `#6BB5FF` | Button hover fill |
| `--blue-ink` | `#1A66C2` | Blue text and links on light. 5.26:1 on paper |
| `--text` / `--text-muted` | `#F2F6FA` / `#A9B8C8` | Text on navy. 17.73:1 / 9.51:1 |
| `--ink-muted` | `#4A5568` | Secondary text on light. 7.01:1 on paper |
| `--link-on-dark` | `#7AB8FF` | Links on navy. 9.29:1 |
| `--amber` | `#FFB020` | Form errors only |

**Two rules the numbers force.** White text on `#3B9EFF` is 2.79:1 and fails,
so every blue fill carries navy text (6.90:1). And `#3B9EFF` as text on a
light ground is 2.60:1 and fails, so blue text on light uses `--blue-ink`.

**Section themes.** Each section has one class, `theme-dark`, `theme-paper`,
`theme-white` or `theme-blue`, which sets its ground, text, link and focus
ring colours. Components read those variables and never need to know what
they sit on. The focus ring is 3px with a 3px offset: blue on navy (6.90:1),
`--blue-ink` on light (5.26:1), navy on the blue band (6.90:1).

**Type.** One self hosted variable file, Archivo, 88 KB latin subset.
Headings run the width axis to 125 at weight 800, which is the wide display
cut. Body copy is width 100, weight 400. No CDN call.

**Radii.** Three: buttons are pills (`999px`), panels, cards, images, inputs
and badges are `--radius` (10px), and headshots are circles.

**Motion.** Two systems, both at the bottom of `global.css`:

1. *Hero on load.* The headline, the two lines under it and the buttons fade
   up 32px in sequence, once. Pure CSS.
2. *Scroll entrances.* Any element with `data-animate="slide-left"`,
   `"slide-right"`, `"slide-up"` or `"fade"`, plus an optional `data-delay` in
   milliseconds. `src/scripts/site.js` watches them with one
   IntersectionObserver at a 0.15 threshold, adds `.is-visible` the first time
   each one enters, then stops watching it. Nothing replays on the way back
   up. Images (`.media`) start 120px to the side on a desktop and 40px on a
   phone, and scale from 0.96. Text never scales. Slide-up starts 40px low.
   The easing, `cubic-bezier(0.22, 1.2, 0.36, 1)` over 900ms, overshoots very
   slightly so an image lands and settles rather than stopping dead. In a
   split section the text starts 150ms after its image, and card rows stagger
   by 150ms. Only `transform` and `opacity` animate.

**Progressive enhancement.** A one line script in the `<head>` adds `js` to
`<html>`, and every hidden starting state is keyed off `.js`. With JavaScript
off the class is never set and everything renders in place. If `site.js`
fails to load, the same snippet removes the class again after four seconds,
so a blocked script cannot leave sections invisible. Under
`prefers-reduced-motion` none of the starting states apply at all: the motion
CSS sits inside `@media (prefers-reduced-motion: no-preference)`. A tab opened
in the background shows everything up front, because it receives no
IntersectionObserver callbacks until it is looked at. Every animated section
has `overflow-x: clip`, so a sliding image can never cause a horizontal
scrollbar.

**Mobile menu.** Below 64rem the links fold behind a button with
`aria-expanded` and `aria-controls`. Enter or Space opens it, Tab goes
straight into the links, Escape closes it and returns focus to the button,
and picking a link closes it. Without JavaScript the button is hidden and the
links sit in a row under the logo.

### Things the brief forbids, so that a future session does not add them

No gradients of any kind. The hero overlay is a flat `rgba` fill. No parallax
and no scroll-position animation, only the one-time entrances above. No emoji.
No em dashes. No fake testimonials, reviews, ratings, logo walls, case studies,
client names or metrics, not even commented out for later. No invented bio
details for the founders. No analytics, pixels or session recording. No third
party embeds, and self host any font.

---

## Project structure

```
src/
  config/business.ts        Every real world fact, the founders, social links
  content/site.ts           All copy except prices
  content/pricing.ts        The three prices and what they buy
  content/images.ts         Every image slot, its size and its alt text
  content/structured-data.ts JSON-LD, built from the files above
  components/
    ContactForm.astro       The form markup. Its logic is in site.js
    Icon.astro              Lucide icons as inline SVG
    Wordmark.astro          The mark plus the name
  layouts/
    Base.astro              Head, info bar, header, footer
    Legal.astro             Shell for the four policy pages
  pages/
    index.astro             The homepage, every section
    privacy.astro           Draft, needs legal review
    terms.astro             Draft, needs legal review
    refunds.astro           Draft, needs legal review
    cookies.astro           Draft, needs legal review
    404.astro               Not found
    sitemap.xml.ts          Five URLs, listed explicitly
  scripts/site.js           The one script: menu, scroll entrances, form
  styles/global.css         The one stylesheet: tokens, themes, every section, motion
public/
  assets/img/               The ten image slots (placeholders for now)
  fonts/                    Archivo woff2 plus its OFL licence text
  icon.svg favicon.ico apple-touch-icon.png icon-192.png icon-512.png
  logo-mark.png og.png site.webmanifest robots.txt
scripts/
  generate-icons.mjs        Rasterises the favicon set
  generate-og.mjs           Builds og.png
  generate-placeholders.mjs Writes missing image slot placeholders
  csp-hash.mjs              Fails the build if the CSP hash is stale
credits.md                  Font, icon and image licensing
vercel.json                 Framework, output dir, security headers
CLAUDE.md                   The brief. Its rules win over this file
```

---

## Handoff notes, read before launch

### The policy pages are drafts

`/privacy`, `/terms`, `/refunds` and `/cookies` were written for this specific
business rather than pasted from a template, and every fact in them is real.
They still need a human read, and preferably a lawyer's, before launch. Nobody
who wrote them is a lawyer.

`/terms` now names the registered company: it says `ARAZ Scales` is a trade
name of `ARAZ SCALES LLC`, registered in Texas, and that the LLC is the party
you contract with. That paragraph switched over on its own when `legalName`
was filled in, and it reads from the field rather than from a hardcoded
string. **It must keep matching the Certificate of Formation**, so if the
filed name is ever amended, change `legalName` and nothing else.

The four policy pages also carry an "Issued by ARAZ SCALES LLC, registered in
Texas" line under the heading. That line was added when the entity was filed,
so the policies say who is bound by them rather than only saying "we". It is
in `src/layouts/Legal.astro` and is omitted entirely if `legalName` ever goes
back to a placeholder.

### Values that must be filled in

**None. Nothing in `src/config/business.ts` blocks a launch.** The company
LinkedIn and Instagram URLs are set, so their icons show in the top bar and
both are in `sameAs` in the schema.org block. Facebook is `null`, so it ships
without an icon until the page exists.

`legalName` is `ARAZ SCALES LLC`, matching the Texas Certificate of Formation.
`phone` is the Google Voice line `+1-346-645-0919`. `state`, `city` and
`email` were already real. `address` is `null` by decision, covered in the
next section, and the launch blocker grep returns nothing.

Two things about the entity and the phone worth keeping straight:

- **`legalName` is not the brand.** `ARAZ Scales` stays in the header, the
  headings and all marketing copy. `ARAZ SCALES LLC` appears only where the
  legal entity is meant: the footer copyright line, the "Issued by" line on the
  four policy pages, the contracting party paragraph in `/terms`, and the
  `legalName` property in the schema.org block. The all-caps spelling and the
  absent comma are how the entity is filed, so do not tidy them.
- **The phone number is a temporary Google Voice line** and is meant to be
  replaced with a dedicated business line. It is stored once, in punctuated
  E.164, and the two human forms are derived: `phoneDisplay()` gives
  `(346) 645-0919` and `phoneHref()` gives `tel:+13466450919`. Change the
  stored value and all three follow.

### Before any outreach email

**We are launching with no postal address, and that is fine for the website.**
`address` is `null` in `src/config/business.ts`, every consumer omits its row,
and no blank line or literal `null` reaches a page. `CLAUDE.md` section 3
requires the entity name, the state, an email on our own domain and a phone
number on the site, and all four are set. A postal address is not on that
list.

**It is not fine for cold email, and this is the one to get right.** CAN-SPAM
requires every commercial email to carry the sender's valid physical postal
address. That applies to the first outreach email, not to the website, so the
two deadlines are genuinely different and only one of them is now.

A virtual mailbox is the plan. When it exists:

1. Put the full address string in `address` in `src/config/business.ts`,
   replacing the `null`.
2. Nothing else. The postal line appears on all four policy pages, and
   `streetAddress` appears inside the schema.org `PostalAddress`, both on
   their own. Neither is written out anywhere else.
3. Check it against the Google Business Profile if that is set up by then.
   `TODO-zain.md` item 6 needs the name, address and phone to match the site
   character for character.

Do not send a commercial email before step 1. Replies to inbound contact form
submissions are not commercial email and are not affected.

### Business decisions baked into the copy

These are commitments the site makes on your behalf. They came from the build
decisions, not from a template, but check you are happy to keep them:

- **Eight posts a month** and **one round of new ad creative a month** on the
  retainer. This is the deliverable volume quoted on the homepage, in `/terms`
  and in `/refunds`. It is the one number in the copy that was not specified in
  the brief, so confirm it.
- **Two rounds of revisions** on a website, with a round defined as one
  consolidated list of changes.
- **Thirty day fix it free** window after a site goes live.
- **Sixty days** before an unresponsive client's job is closed and invoiced.
- **Harris County, Texas** named as the venue for disputes in `/terms`.

### Data and privacy audit

- **Outbound requests on page load: none to any third party.** Measured on the
  production build with `npm run preview` and Lighthouse. The homepage makes
  these requests, all to this origin:

  1. the HTML document
  2. `/_astro/Base.*.css` (the one stylesheet)
  3. `/fonts/archivo-latin-variable.woff2`
  4. `/_astro/Base.astro_astro_type_script_*.js` (the one script)
  5. `/logo-mark.png`, `/icon.svg`, `/site.webmanifest`
  6. `/assets/img/hero.webp`, then each other slot as it nears the viewport
     (they are `loading="lazy"`)

  No font CDN, no analytics, no pixel, no embed. Re-run the measurement if you
  add anything to `<head>`.
- **Cookies set: none.** Verified on the production build: `document.cookie` is
  empty, and local storage, session storage and indexed databases are all
  empty too. Neither script writes anything to the device. There is therefore
  no consent banner, because a banner on a site that stores nothing would be
  theatre. `/cookies` says exactly this, so **adding anything that sets a
  cookie means rewriting that page in the same commit.**
- **The one third party call** is the form submission to Formspree, which
  happens because the visitor pressed a button. It is named in `/privacy` and
  in `/cookies`.
- **GDPR and CCPA.** Nothing the site currently does triggers either. There is
  no tracking, no profiling and no automated collection, and the only personal
  data is what somebody deliberately types into a form in order to be contacted.
  If analytics are ever added, that changes, and it would be worth a second
  look at both. To be plain about it: this is only a question if we add
  analytics.
- **CAN-SPAM** does not apply today because the site sends no marketing email.
  It would the moment a mailing list is added, which the brief rules out.

### Every number on the site, and its basis

`CLAUDE.md` section 11 asks for this list. Nothing here is an invented metric
and nothing is a claim about results.

| Number | Where | Basis |
| --- | --- | --- |
| `$100` | Services band, price section, FAQ, `/refunds`, `/terms` | Our price for a landing page |
| `$300` | Hero, who we are, services band, price section, FAQ, `/terms` | Our price |
| `$150` and `$150` | FAQ, `/refunds`, `/terms` | Our payment split |
| `$500` | Price section, `/refunds`, `/terms` | Our price |
| Five pages | Price section, `/terms` | What the website deliverable is |
| Two weeks | Hero, who we are, why us, price section, FAQ, `/terms` | Our delivery commitment for a website |
| One week | Hero, why us, price section, FAQ | Our delivery commitment for a landing page |
| Eight posts a month | Price section, `/refunds`, `/terms` | Our deliverable volume. **Confirm this one**, see above |
| Two rounds of changes | FAQ, `/terms` | Our revision policy |
| Two business days | FAQ, contact, `/privacy`, `/refunds` | Our reply commitment |
| Fourteen days notice | FAQ, `/refunds`, `/terms` | Our cancellation policy |
| Thirty days | `/refunds`, `/terms` | Our free fix window after launch |
| Sixty days | `/refunds`, `/terms` | When an unresponsive job is closed |
| Ten business days | `/refunds` | How fast we return money |
| Twelve months, two years | `/privacy` | Our data retention periods |
| Forty five days | `/privacy` | The statutory TDPSA response window |
| Thirteen | `/privacy` | Standard children's privacy age |
| Thirty minutes | Process step 1 | Length of the first call |
| 1 to 5 | Process steps | Sequence markers, the only place numbering is used |
| Three founders | Who we are, founders | There are three of us |
| 2026 | Footer, policy dates | Computed from the build date, and `policiesUpdated` |

**One number to look at again.** The FAQ says "We would rather charge $300 and
build a lot of them than charge $3,000 and build three." That is phrased as our
own preference rather than a claim about what anybody else charges, which is why
it survived the no-unsupported-claims rule. It is still the only figure on the
site that points at someone other than us. If it makes you uneasy, cut the
second half of the sentence. It is in `src/content/site.ts` under `faq`.

### Not built, and worth a decision

- **Founder bios.** Each founder card has a `<!-- BIO: fill in -->` slot that
  renders nothing. Add a real bio there once each person has written or
  approved one. Do not invent one.

### Still to verify by hand

- **The contact form has not been tested end to end.** The Formspree ID is set
  in `.env.local`, but confirming a real email arrives means submitting the live
  form, which posts a real message to your inbox. Do that once after the first
  deploy.
- **The live site is an older build.** `arazscale.com` serves from Vercel
  over HTTPS today, but the build on it predates the LLC name, the phone
  number, the $100 tier, the JSON-LD and the `support@` address (it still
  shows the old contact address). The next deploy of this branch replaces it.
- **The domain question is settled.** The website is `arazscale.com`,
  singular, and email is `arazscales.com`, plural. Both are correct.
- **The mailing address is not a launch item any more.** It is `null` by
  decision and the site ships without it. It does gate the first outreach
  email. See "Before any outreach email" above.
- **The phone number is a temporary Google Voice line.** `+1-346-645-0919`
  rings all three of you. Replace it with a dedicated business line when there
  is one. It is a one-line change in `src/config/business.ts`.
- **Lighthouse was run against `npm run preview` on localhost, October 2026.**
  Homepage mobile: performance 98, accessibility 100, best practices 100, SEO
  100. Homepage desktop and `/privacy` on both: 100 across the board. CLS 0 and
  TBT 0 ms everywhere. Re-run against the live domain after deploy, where
  compression and the CDN will differ.
- **axe-core 4.14** on all six pages at 1440px and 375px, every FAQ open and
  every animated element revealed: zero violations. The six "incomplete"
  colour contrast items are the hero text over the image overlay, which axe
  cannot measure through a pseudo element. They were computed by hand against
  the worst case photo pixel, pure white: 9.10:1 for the headline and 4.88:1
  for the muted price line.
- **Reduced motion was verified in headless Chrome with
  `--force-prefers-reduced-motion`,** not on a device. Worth five minutes in
  macOS System Settings, Accessibility, Display, Reduce motion.
