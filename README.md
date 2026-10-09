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

**It currently returns nothing, and nothing is blocking.** `address` is `null`
by decision, not `TODO` by omission, which is why the two states are spelled
differently.

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

Until they arrive, each card shows that person's initials in a blue ring, built
to the same size and shape as the photo that will replace it. That is a
finished state, not a gap. When the photos arrive:

1. Put the files in `public/team/`.
2. Add `photo: "zain.jpg"` to that person's entry in `src/config/business.ts`.
   That is the only change. The card swaps the ring for the image, the element
   already carries `width`, `height` and `loading="lazy"` so nothing shifts,
   and the alt text is built from the person's name and role.
3. Record each file in `credits.md` with who took it.

Crop them square. They are drawn in a 4.5rem circle with `object-fit: cover`.

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

The site is dark. A deep slate navy ground carries a faint blue grid, the brand
blue from the logo mark is the lead colour, and one warm accent is rationed to
the two things a buyer has to find: the price and the button.

The logo is an "A" built from rising bars with a line and ring nodes through
it. That shape drives the page and is used in exactly three places, which is
the whole budget: the hero bars rise once on load, the process timeline is that
growth line drawing itself, and the ring node marks every section heading.

**Palette.** Nine named values in `src/styles/global.css`, with the verified
contrast ratio recorded next to each one.

| Token | Hex | Role |
| --- | --- | --- |
| `--deep` | `#141E29` | Hero band, footer, inputs. Text on it 15.50:1 |
| `--bg` | `#1B2734` | Page ground. Text on it 13.95:1 |
| `--surface` | `#223142` | Cards and panels. Text on it 12.19:1 |
| `--text` | `#F2F6FA` | Headings and body |
| `--muted` | `#A9B8C8` | Secondary text. 7.49:1 on bg, 6.54:1 on surface |
| `--line` | `#33465B` | Hairlines and card edges. Non-text, see below |
| `--blue` | `#29A8E9` | Lead accent. 5.68:1 on bg, 4.96:1 on surface |
| `--blue-bright` | `#4FBCF5` | Small mono labels, the growth line. 7.10:1 on bg |
| `--amber` | `#FFB020` | Prices, primary action, focus ring. 8.28:1 on bg |
| `--on-fill` | `#0E1720` | The only text colour allowed on a blue or amber fill |

**The blue is not the mark's blue, and that is deliberate.** The mark is a flat
`#039CD8` and must not be repainted, but that value only reaches 4.87:1 on the
page ground and 4.20:1 on a card, so it would have failed as text on a pricing
card. `--blue` is the same hue opened up to `#29A8E9`, which clears 4.5:1 on
all three grounds. The two sit close enough that the header logo and the link
beside it read as one colour.

**Never put white on a fill.** `#FFFFFF` on the blue is 2.24:1 and on the amber
1.63:1. Both fail badly. `--on-fill` exists so there is one right answer, and
it clears AA on both at 6.77:1 and 9.88:1.

**`--line` is 1.56:1 against the page and that is not a failure.** WCAG 1.4.11
covers boundaries needed to identify a control or its state. Nothing here is
either: every card is already told apart from the page by its own ground, and
no state anywhere is signalled by a border colour alone. Raising it to 3:1
would put a hard cage around every panel.

**The focus ring is amber with a 2px offset, and the offset is not cosmetic.**
Amber is the one colour clearing AA against all three grounds at once (8.28,
7.24 and 9.21:1). Drawn flush it would sit on a button fill instead, where
amber on amber is 1.00:1 and amber on blue 1.46:1. The offset puts the ring on
the page ground every time. Do not remove it.

**Type.** Two families, both self hosted, no CDN call.

- **Archivo Variable**, 88 KB latin subset, for everything you read. Its width
  axis does the work a second display face normally would: headings at
  `wdth 108`, body at `100`, prices at `112`.
- **JetBrains Mono**, weight 500 only, 21 KB, for section labels, price card
  labels, step numbers, the nav and the hero's rotating word. Never body copy.
  One weight covers every appearance, so do not add a second.

**Layout.** Each section is a `Record`: a small mono label with a ring node
across the top, the content full width beneath it. Pricing, founders and the
contact form are panels on `--surface`. The pricing cards deliberately do *not*
stretch to equal height, because matching them to the tallest left a 315px void
between the last line of the $100 card and its button.

**The one bold thing** is the price, in amber, with the primary button in the
same colour a few inches away. Everything else is blue or quiet. If you make a
third thing loud, this stops working.

**Motion**, in full. Anything not on this list does not exist and should not be
added:

1. Hover and focus states.
2. One page-load moment: the hero bars rise, the growth line draws, the nodes
   appear.
3. The typewriter in the hero eyebrow, cycling the three things we sell.
4. Scroll reveals: a section fades up 12px once on entry, never replaying, and
   the process timeline draws its line once.

All four are **skipped, not hidden**, under `prefers-reduced-motion`: the
script checks the query and reveals everything immediately rather than running
an animation and covering it up. The reveals also need the page to work with
JavaScript off, which is what the `scripting: none` and `<noscript>` blocks in
`src/layouts/Base.astro` are for. Both put every element back to full opacity.
Delete either and a visitor without JavaScript gets a blank page.

**Two traps worth knowing before you touch the timeline.** Both cost real time
to find.

- An inline `<svg>` is a replaced element with an intrinsic aspect ratio from
  its viewBox. Given `left`, `right` and `height` with `width: auto`, it sizes
  itself off its own height instead of stretching between the insets. The
  desktop track therefore sets an explicit width, and the mobile vertical line
  is a pseudo element rather than an SVG.
- Chrome ignores `pathLength` on a stroke carrying
  `vector-effect="non-scaling-stroke"`. A dash-offset reveal on that line
  rendered as 141 tiny dashes. The reveal is a `clip-path` instead, which looks
  identical and depends on neither.

### Things the brief forbids, so that a future session does not add them

No gradient as a colour blend. The only gradients in the stylesheet are the two
that draw the grid hairlines and the one that fades them out, and that is a
texture rather than decoration. No parallax and no scroll-position animation,
only the one-time entry reveals listed above. No emoji. No em dashes. No fake
testimonials, logo walls, case studies or metrics, not even commented out for
later. No analytics, pixels or session recording. No third party embeds, and
self host any font.

Two radii only: `999px` on buttons, `--radius` on panels and inputs. A control
you press is round, a surface you read is not. Do not introduce a third.

---

## Project structure

```
src/
  config/business.ts        Every real world fact. Read placeholders via real()
  content/site.ts           All copy except prices
  content/pricing.ts        The three prices and what they buy
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

**None. Nothing in `src/config/business.ts` blocks a launch.**

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
  production build with `npm run preview`. The complete list is eight requests,
  all to this origin:

  1. the HTML document
  2. `/_astro/Base.*.css`
  3. `/_astro/index.*.css`
  4. `/fonts/archivo-latin-variable.woff2`
  5. `/fonts/jetbrains-mono-latin-500.woff2`
  6. `/logo-mark.png`
  7. `/_astro/Base.astro_astro_type_script_*.js` (reveals and the typewriter)
  8. `/_astro/ContactForm.astro_astro_type_script_*.js` (form validation)

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
- **The domain spelling is still unconfirmed.** Everything in the repo uses
  `arazscales.com`, plural: the canonical URLs, `robots.txt`, `astro.config.mjs`
  and the `support@` mailbox. The singular `arazscale.com` appears only in the
  supplied logo file's wordmark, which is cropped out and never shown. Confirm
  which spelling DNS actually points at before launch, and register the other
  one as a 301 either way. Nothing in the code should change until that is
  settled.
- **The mailing address is not a launch item any more.** It is `null` by
  decision and the site ships without it. It does gate the first outreach
  email. See "Before any outreach email" above.
- **The phone number is a temporary Google Voice line.** `+1-346-645-0919`
  rings all three of you. Replace it with a dedicated business line when there
  is one. It is a one-line change in `src/config/business.ts`.
- **Lighthouse has not been run on this build.** The accessibility side was
  checked with axe-core on all six pages, which came back with zero violations,
  but performance needs a Lighthouse run against the deployed site rather than
  against localhost, where the numbers are meaningless. Run it once the domain
  is live and paste the result here.
- **Reduced motion was verified in code, not on a device.** Every animation is
  behind a `prefers-reduced-motion` check in both the CSS and the script, and
  the script skips the work rather than hiding it, but nobody has yet loaded
  the site on a machine with the OS setting actually turned on. Worth five
  minutes in macOS System Settings, Accessibility, Display, Reduce motion.
