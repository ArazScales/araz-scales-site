# ARAZ Scales, marketing site

One page plus four policy pages, for a three person studio in Houston selling
websites, ghostwritten content and Meta ad creative to local businesses.

Astro 7, TypeScript, hand written CSS, static output, no runtime backend and no
client framework. The only JavaScript shipped is about 2 KB that makes the
contact form submit without leaving the page.

The brief this was built to is `CLAUDE.md` at the repo root. It applies to every
session in this repo, and its hard rules win over anything in this file.

---

## Contents

1. [Run it locally](#run-it-locally)
2. [Change the copy](#change-the-copy)
3. [Change a price](#change-a-price)
4. [Fill in the business details](#fill-in-the-business-details)
5. [Wire up the contact form](#wire-up-the-contact-form)
6. [Add the founder photos](#add-the-founder-photos)
7. [Deploy to Vercel](#deploy-to-vercel)
8. [Point arazscales.com at it](#point-arazscalescom-at-it)
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
| `npm run build` | Static build into `./dist` |
| `npm run preview` | Serves the built `./dist` exactly as production will |
| `npm run check` | Type checks the `.astro` and `.ts` files |
| `npm run icons` | Regenerates the favicon set from the mark |

---

## Change the copy

**Every word on the site lives in two files. You never need to open a `.astro`
file to change wording.**

| File | What is in it |
| --- | --- |
| `src/content/site.ts` | Everything except prices: meta title, nav, hero, section headings, the process steps, the founders' blurbs, the FAQ, the contact form labels, the footer links |
| `src/content/pricing.ts` | The two prices and what each one buys |

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
- There are three services but only two prices, because written content and ad
  creative are sold together. The retainer therefore carries a `parts` array:
  one figure, two named services under it, each with its own deliverables and
  timeline. This is so the page never prints `$500` twice and invites somebody
  to read it as $1,000.

If you change a price, the FAQ answers in `src/content/site.ts` and the
`/refunds` page both quote figures in prose. Search for the old number.

---

## Fill in the business details

`src/config/business.ts` is the single source for every real world fact: entity
name, state, city, email, phone, mailing address, and the two companies that
handle contact form data. The footer and all four policy pages read from it.

Anything not yet finalised is the literal string `TODO_NEEDS_REAL_VALUE`, which
is there so it fails an obvious grep before launch:

```bash
grep -rn "TODO_NEEDS_REAL_VALUE" src/
```

**These placeholders never render on the page.** Read them through the `real()`
helper in that file, which returns `null` for a placeholder, and let the
component omit the row. The footer already does this with the phone number: no
phone is set, so no phone line appears, rather than the words
`TODO_NEEDS_REAL_VALUE` appearing in the footer of a live site.

See the handoff notes at the bottom for what is currently outstanding.

---

## Wire up the contact form

The form posts to [Formspree](https://formspree.io). No backend, and no
Formspree script on the page: the form is a plain `POST` that works with
JavaScript switched off, and our own 2 KB of JavaScript upgrades it to a
`fetch` so the visitor stays on the page.

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

## Add the founder photos

The layout is finished without photographs and does not need them. Three
headshots are expected, one per founder. When they arrive:

1. Put the files in `src/assets/`.
2. Import them through Astro's `<Image />` so they are sized and lazy loaded.
   This matters: an unsized image is the easiest way to break the layout shift
   score.
3. Add one to each row in the founders list in `src/pages/index.astro`. The
   placeholder comment marking the exact spot is already there.
4. Record each file in `credits.md` with who took it.

No stock photography and no AI generated images, per `CLAUDE.md` section 2.
Real photographs we own, or nothing.

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

- `script-src` is `'self'` with no `'unsafe-inline'`. Astro inlines small
  script bundles by default, which the policy would block, so
  `astro.config.mjs` sets `vite.build.assetsInlineLimit: 0` to force the form
  script out to its own file. Do not remove that without also relaxing the CSP.
- `style-src` does allow `'unsafe-inline'`, because the markup uses a handful of
  `style="--flow: 1rem"` attributes for vertical rhythm.

---

## Point arazscales.com at it

1. In Vercel: **Project, Settings, Domains, Add** `arazscales.com`. Add
   `www.arazscales.com` as well and let Vercel redirect one to the other.
2. In Namecheap: **Domain List, Manage, Advanced DNS**. Delete the default
   parking records, then add exactly what Vercel shows you. Normally that is:

   | Type | Host | Value | TTL |
   | --- | --- | --- | --- |
   | `A` | `@` | `76.76.21.21` | Automatic |
   | `CNAME` | `www` | `cname.vercel-dns.com` | Automatic |

   Use the values in Vercel's own UI if they differ from these. Vercel changes
   them from time to time and their UI is the authority.
3. Wait for propagation, usually minutes but up to 48 hours, and confirm Vercel
   shows the domain as **Valid**. TLS is issued automatically.

If the domain ever changes, update `url` and `domain` in
`src/config/business.ts` and the `site` value in `astro.config.mjs`. Between
them they drive the canonical tags, the sitemap and the Open Graph URLs.

---

## How the design works

The whole page is one continuous document rather than a stack of cards.
Sections are separated by hairlines that run the full width of the viewport,
the way rules separate lines on a printed work order.

**Palette.** Five named values in `src/styles/global.css`, with the verified
contrast ratio recorded next to each one. Two further colours exist on the dark
footer band, both derived with `color-mix` from those five rather than being
new values, because `muted` only reaches 2.09:1 against `ink` and had to be
lightened for that context.

| Token | Hex | Role |
| --- | --- | --- |
| `--ink` | `#132A21` | 13.04:1 on stock. Text, buttons, footer band |
| `--stock` | `#EDEEE9` | Page ground. Cool paper, deliberately not white |
| `--field` | `#FFFFFF` | Inputs and price rows only |
| `--muted` | `#4E5954` | 6.25:1 on stock. Secondary text, input borders |
| `--rule` | `#959C90` | 2.42:1 on stock. Hairlines |

There is **no accent hue**, and that is the design decision rather than an
omission. Removing it means the loudest thing on the page has to be real
content, which is the price.

**Type.** One family, Archivo Variable, self hosted as a single 88 KB latin
subset. Its width axis does the work a second typeface normally would:
headings run expanded at `wdth 108`, body sits at `100`, the price at `112`.
Do not add a second typeface without a reason that survives being said out
loud.

**Layout.** Every section is a `Record`: the visitor's question in the left
column, the answer in the right, collapsing to one left aligned column below
60rem. Nothing on the site is centred.

**The one bold thing** is the price, set larger than the `h1`. Everything else
stays quiet. If you add another loud element, this stops working.

**Motion.** Hover and focus transitions only. There is no scroll triggered
animation anywhere and there must not be, per `CLAUDE.md` section 2. The two
`position: sticky` elements are positioning, not animation.

### Things the brief forbids, so that a future session does not add them

No gradients as decoration. No pill shaped buttons, the radius is 2px
everywhere. No emoji. No em dashes. No fake testimonials, logo walls, case
studies or metrics, not even commented out for later. No analytics, pixels or
session recording. No third party embeds, and self host any font.

---

## Project structure

```
src/
  config/business.ts        Every real world fact. Read placeholders via real()
  content/site.ts           All copy except prices
  content/pricing.ts        The two prices and what they buy
  components/
    Record.astro            One question and answer row, plus its hairline
    ContactForm.astro       The form, its validation and its bundled script
    Wordmark.astro          Inline mark plus name
  layouts/
    Base.astro              Head, skip link, header, footer
    Legal.astro             Shell for the four policy pages
  pages/
    index.astro             The homepage, every section
    privacy.astro           Draft, needs legal review
    terms.astro             Draft, needs legal review
    refunds.astro           Draft, needs legal review
    cookies.astro           Draft, needs legal review
    sitemap.xml.ts          Five URLs, listed explicitly
  styles/global.css         Tokens, base styles, the record grid, form styles
public/
  fonts/                    Archivo woff2 plus its OFL licence text
  icon.svg                  Hand authored mark
  favicon.ico               Generated by npm run icons
  apple-touch-icon.png      Generated
  icon-192.png icon-512.png Generated
  site.webmanifest
  robots.txt
scripts/generate-icons.mjs  Rasterises the favicon set
credits.md                  Font and icon licensing
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

The `/terms` page currently says you are contracting as a partnership of three
individuals, because no entity is filed. **That paragraph must match whatever
gets filed with the state.** Filling in `legalName` in
`src/config/business.ts` switches the page to the registered company wording
automatically.

### Values that must be filled in

Both of these are `TODO_NEEDS_REAL_VALUE` in `src/config/business.ts` and
neither renders on the page today:

| Value | Why it is needed | What happens now |
| --- | --- | --- |
| `phone` | `CLAUDE.md` section 3 requires a real phone number on the site. A missing phone number reads as a scam signal to this audience | No phone line in the footer, no phone on the policy pages |
| `address` | Texas privacy law expects a physical contact point, not only an email | The policy pages fall back to email only |
| `legalName` | Names the contracting party in `/terms` and `/refunds` | `/terms` says you are contracting with the three founders personally |

`state`, `city` and `email` are real and in use.

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

- **Outbound requests on page load: none to any third party.** The browser asks
  this origin for the HTML, one stylesheet, one font file and the icons.
  Nothing else. No font CDN, no analytics, no pixel, no embed.
- **Cookies set: none.** No local storage, no session storage, no indexed
  database. There is therefore no consent banner, because a banner on a site
  that stores nothing would be theatre. `/cookies` says exactly this, so
  **adding anything that sets a cookie means rewriting that page in the same
  commit.**
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
| `$300` | Hero, price section, FAQ, `/terms` | Our price |
| `$150` and `$150` | FAQ, `/refunds`, `/terms` | Our payment split |
| `$500` | Price section, `/refunds`, `/terms` | Our price |
| Five pages | Price section, `/terms` | What the website deliverable is |
| Two weeks | Hero, price section, FAQ, `/terms` | Our delivery commitment |
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
| 2026 | Footer, policy dates | Computed from the build date, and `policiesUpdated` |

**One number to look at again.** The FAQ says "We would rather charge $300 and
build a lot of them than charge $3,000 and build three." That is phrased as our
own preference rather than a claim about what anybody else charges, which is why
it survived the no-unsupported-claims rule. It is still the only figure on the
site that points at someone other than us. If it makes you uneasy, cut the
second half of the sentence. It is in `src/content/site.ts` under `faq`.

### Not built, and worth a decision

- **No 404 page.** `CLAUDE.md` section 7 says to ask before adding any page not
  on its list, so this was left alone rather than assumed. Without one, a bad
  URL gets Vercel's default error page. A one screen 404 pointing back at the
  homepage would take ten minutes.

### Still to verify by hand

- **The contact form has not been tested end to end.** The Formspree ID is set
  in `.env.local`, but confirming a real email arrives means submitting the live
  form, which posts a real message to your inbox. Do that once after the first
  deploy.
- **The site is not yet serving from arazscales.com over HTTPS.** That needs
  the deploy and the DNS records above.
