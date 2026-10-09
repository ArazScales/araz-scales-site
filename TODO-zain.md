# TODO: Zain

Everything on this list is outside the codebase. None of it can be fixed by
editing a file in this repo, which is why it is here rather than in the README
handoff notes. The README covers what is unfinished *in* the site. This covers
what is unfinished *around* it.

Ordered by what breaks if it is skipped.

---

## 0. The live domain is not serving the new build

Checked October 9, 2026. GitHub shows the production deployments for
`c856e70` and `fb39881` as successful, built under the Vercel scope
`roshanmohammad-4175s-projects`. But `https://arazscale.com` and
`https://araz-scales-site.vercel.app` still serve the old September build: it
shows the old `hello@` address, has no JSON-LD, and sends the old Content
Security Policy without the script hash. The most likely cause is two Vercel
projects named `araz-scales-site`. The one connected to GitHub gets the new
deploys, and a different one holds the domain.

In the Vercel dashboard:

1. Open each team or scope you have access to and look for a project called
   `araz-scales-site`. Note which one lists `arazscale.com` under
   **Settings, Domains**, and which one shows `fb39881` under **Deployments**.
2. If they are different projects, remove `arazscale.com` and
   `www.arazscale.com` from the old one and add them to the GitHub-connected
   one. DNS does not change: both point at Vercel's `76.76.21.21`.
3. On the GitHub-connected project, set `PUBLIC_FORMSPREE_ID` under
   **Settings, Environment Variables** if it is not already set, then redeploy.
   Without it the contact form renders disabled.
4. Check: `curl -sI https://arazscale.com | grep -i content-security` should
   show `script-src 'self' 'sha256-...'`, and the page should show
   `support@arazscales.com`.

## Content still needed

Hand these to whoever has them. Each one drops into a single place in the code
and nothing else needs to change.

| What | Who | Where it goes |
| --- | --- | --- |
| Founder bios, a few sentences each, written or approved by the person | Zain, Roshan, Abayjit | `src/pages/index.astro`, at the `<!-- BIO: fill in -->` slot in the founder card. Add `<p class="founder-detail">...</p>` there. Nothing renders until then |
| Founder headshots, square, 400x400, face centred, `.webp` | Zain, Roshan, Abayjit | Overwrite `public/assets/img/founder-zain.webp`, `founder-roshan.webp`, `founder-abayjit.webp`, then set `placeholder: false` on that slot in `src/content/images.ts` |
| Hero photo, 2400x1350 landscape, under 250 KB | Anyone | `public/assets/img/hero.webp`. Sits under a dark overlay, so a busy photo is fine |
| Who we are photo, 1200x900 | Anyone | `public/assets/img/who-we-are.webp` |
| Service card photos, 800x500 each | Anyone | `service-landing.webp`, `service-website.webp`, `service-content-ads.webp` in `public/assets/img/` |
| Why us photo, 1200x900 | Anyone | `public/assets/img/why-us.webp` |
| Get a quote photo, 1000x1200 portrait, subject centred (cropped to 16:9 on phones) | Anyone | `public/assets/img/quote.webp` |
| Mailing address (a virtual mailbox is fine) | Zain | `address` in `src/config/business.ts`, replacing `null`. It then appears on all four policy pages and in the schema.org block. It does **not** appear in the footer yet: that needs a one line addition to the footer contact list in `src/layouts/Base.astro`. Required before any outreach email, see 7b |

For every photo: real photos only, no AI images, no stock we do not hold a
licence for. After swapping a file, set `placeholder: false` on its entry in
`src/content/images.ts` so its alt text switches on, and add a line to
`credits.md` naming who took it.

## 1. Email authentication on arazscales.com

**Without this, form notifications land in spam and you will never know.**

Add SPF, DKIM and DMARC records for `arazscales.com` at the DNS host:

- **SPF.** One TXT record at the root. Google Workspace needs
  `v=spf1 include:_spf.google.com ~all`. If Formspree ever sends as you rather
  than forwarding to you, it has to be in this record too. Only one SPF record
  per domain is allowed, so merge rather than adding a second.
- **DKIM.** Generate the key in the Google Workspace admin console under Apps,
  Google Workspace, Gmail, Authenticate email, then publish the TXT record it
  gives you. It is not on by default.
- **DMARC.** A TXT record at `_dmarc.arazscales.com`. Start at
  `v=DMARC1; p=none; rua=mailto:support@arazscales.com` so you get reports
  without bouncing anything, then tighten to `p=quarantine` once the reports
  come back clean.

Check the result at any DMARC checker before you rely on it.

## 2. Confirm where the contact form actually delivers

The form posts to Formspree form `xrpzlgjl`. The destination address lives in
the Formspree dashboard and is not visible from this repo, so nobody working
in the code can verify it.

- Log in and confirm notifications go to **support@arazscales.com**.
- The success message on the site tells the visitor that replying to the
  confirmation "lands with all three of us". Either make that true, by pointing
  the mailbox at all three, or the copy is a promise the site cannot keep.
- Formspree's free tier caps submissions per month. Know the number before a
  campaign sends traffic at it.

## 3. Test the contact form end to end, from a device that is not yours

After the first deploy. From a phone on mobile data, not the office network,
and ideally from an address that is not an arazscales.com one.

- Submit the form. Confirm the email arrives, and confirm it is not in spam.
- Submit it again with JavaScript disabled, which is a plain POST down a
  different path through the code.
- Break it on purpose once. Put the site into airplane mode mid submit and
  confirm the error state appears and shows the support address as a fallback.

## 4. Two domains, and both are right

**The website is `arazscale.com`, singular. Email is `arazscales.com`,
plural.** Do not change either to match the other. The canonical URL, the
sitemap, `robots.txt`, `astro.config.mjs` and the schema.org block all use the
singular. The mailbox, `support@arazscales.com`, and the SPF, DKIM and DMARC
records in item 1 are on the plural. An earlier version of this file said the
opposite and told you to redirect the singular to the plural. That was wrong
and has been withdrawn.

- Add `www.arazscale.com` in Vercel and let it redirect to the bare domain.
- `arazscales.com` currently serves a Squarespace "Coming Soon" page and
  should redirect to `https://arazscale.com`. Steps below.

### Redirect arazscales.com to arazscale.com

DNS for `arazscales.com` is hosted by Squarespace (nameservers
`nsb1` to `nsb4.squarespacedns.com`). As of October 9, 2026 it holds:

| Type | Host | Value | Purpose |
| --- | --- | --- | --- |
| A | `@` | `198.185.159.144`, `.145`, `198.49.23.144`, `.145` | Squarespace website. **Changes** |
| CNAME | `www` | `ext-sq.squarespace.com` | Squarespace website. **Changes** |
| MX | `@` | `1 smtp.google.com` | Email. **Do not touch** |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | SPF. **Do not touch** |
| TXT | `google._domainkey` | `v=DKIM1; k=rsa; p=MIIB...` | DKIM. **Do not touch** |
| TXT | `_dmarc` | missing | DMARC, still to add per item 1 |

**Recommended: Squarespace domain forwarding.** Everything stays in one
dashboard and email records are not part of it.

1. In Squarespace, open the "Coming Soon" site, go to **Settings, Domains**,
   and disconnect `arazscales.com` from the site. Do not delete the domain.
2. Go to **Domains** (account dashboard, not the site), choose
   `arazscales.com`, and open **Domain forwarding** (sometimes under
   **Website** or **DNS**).
3. Add a forward from `arazscales.com` to `https://arazscale.com`, type
   **Permanent (301)**, with path forwarding on if offered. Add a second one
   for the `www` subdomain to the same target.
4. Squarespace replaces the website `A` and `www` records with its forwarding
   records itself. If it asks to remove the "Squarespace Defaults" record
   group, allow it. That group holds only the website records above.
5. Wait an hour, then check:
   `curl -sI http://arazscales.com`, `curl -sI https://arazscales.com` and
   `curl -sI https://www.arazscales.com` should each return 301 or 308 with
   `location: https://arazscale.com/`. Send yourself an email at
   `support@arazscales.com` to confirm mail still arrives.

If the `https://` version shows a certificate error (Squarespace's forwarding
has not always served HTTPS for every domain), use the Vercel route instead:

**Alternative: Vercel redirect domain.**

1. In the Vercel project that serves `arazscale.com`, **Settings, Domains,
   Add** `arazscales.com`, and choose **Redirect to** `arazscale.com`
   (308, permanent). Do the same for `www.arazscales.com`.
2. In Squarespace DNS for `arazscales.com`: delete the four Squarespace `A`
   records and the `www` CNAME (or remove the "Squarespace Defaults" group),
   then add `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`. Use the
   values Vercel's dashboard shows if they differ.
3. Vercel issues the certificate. Check with the same curl commands.

**Never change, whichever route you choose:** the `MX` record, the SPF `TXT`
on `@`, the `google._domainkey` DKIM `TXT`, any `google-site-verification`
`TXT`, the nameservers, and DNSSEC. Adding the `_dmarc` record from item 1 is
safe and still needed.

## 5. Ask the designer for a vector logo

The logo file you were supplied has **arazscale.com**, singular, set beneath
the mark. That is the correct website domain, so the file does not need
reissuing for the text. It does need a vector: there is no vector source and
every icon on the site is currently rasterised from a PNG.

## 6. Google Business Profile

Create one for ARAZ Scales. It is free and it is the single biggest local
search lever you have while the site has no backlinks.

The name, address and phone must be **character for character identical** to
what the site says, or the two records compete instead of reinforcing each
other. Which means the next item blocks this one.

## 7. Values the site still does not have

**None. Nothing in `src/config/business.ts` blocks the launch.**

The company LinkedIn and Instagram URLs are set, so both icons show in the top
bar and both are in `sameAs` in the schema.org block.

`social.facebook` is `null`: the page is still being set up and we are
shipping without it. Set it to the URL when it exists.

`address` moved out of this list: it is `null` by decision rather than
missing, the site ships without it, and it is now item 7b below because it
gates outreach email rather than the launch.

**Done, and no longer blocking:**

- **`legalName`** is `ARAZ SCALES LLC`, matching the Texas Certificate of
  Formation. `/terms` switched itself to the corporate wording: it now says
  ARAZ Scales is a trade name of ARAZ SCALES LLC, registered in Texas, and
  that the LLC is the contracting party. The four policy pages carry an
  "Issued by" line, the footer copyright names the LLC, and the schema.org
  block carries it as `legalName` alongside the brand as `name`. The all-caps
  spelling with no comma is the filed name, so leave it alone.
- **`phone`** is `+1-346-645-0919`, the Google Voice line that rings all three
  of you. It shows as `(346) 645-0919` in the footer and on the policy pages,
  and dials `+13466450919`. This is a stopgap: swap it for a dedicated
  business line when you have one, which is a one-line change.

Note for item 6 above: the Google Business Profile name, address and phone
must be character for character identical to the site. The site now says
`(346) 645-0919`, so use exactly that formatting in the Profile. The address
is still the one blocker on that item, and it is the same mailbox that item 7b
is waiting on.

## 7b. Before any outreach email

**This is the one that has a legal deadline attached, and it is not the
launch.**

CAN-SPAM requires every commercial email to carry the sender's valid physical
postal address. We do not have one. The website is fine without it, because
the address is not among the details `CLAUDE.md` section 3 requires on the
site and `address` is `null` rather than a placeholder. **A cold email is not
fine without it.**

So the ordering is: the site can go live now, and the first outreach email
cannot go out until there is a mailbox.

- **Get a virtual mailbox.** A mailbox service address is fine, a PO box is
  generally accepted, your home address is legal and a bad idea to publish.
  Houston has several providers and this is a cheap monthly cost.
- **Put it in `src/config/business.ts`** as a string in place of the `null`.
  That is the whole code change. The postal line then appears on all four
  policy pages and `streetAddress` appears in the schema.org block on its own.
- **Then** the Google Business Profile in item 6 is unblocked too, since that
  needs the same address and needs it to match the site exactly.

Replying to somebody who filled in the contact form is not commercial email
and is not affected. This is about cold outreach only.

## 8. After the first deploy

- **Run Google's Rich Results Test** against the live URL. It could not be run
  from here: its code-snippet mode now requires a signed-in Google account. The
  schema.org validator passed with 0 errors and 0 warnings on both
  `ProfessionalService` and `FAQPage`, but Google's own tool is the one that
  tells you what will actually show in search.
- **Check the link preview** by pasting the URL into iMessage and into Slack.
  Both cache aggressively, so get it right before you share it widely. X and
  LinkedIn both have their own cache-busting inspectors.
- **Submit the sitemap** at `https://arazscale.com/sitemap.xml` in Google
  Search Console.

## 9. Analytics: the decision, written down

**The site ships with zero analytics, zero pixels and zero session recording.**
That was decided deliberately, not overlooked, and `/privacy` and `/cookies`
both make the claim in writing to visitors.

The chosen approach is server side only: Vercel's own request logs plus
Formspree's submission count. Neither puts a script on the page, so both
claims stay true and no consent banner is needed.

**If that ever changes, it is not a one line edit.** Adding any client side
analytics means, in the same commit:

- Adding the vendor to the Content Security Policy in `vercel.json`, which
  currently allows scripts from `'self'` only.
- Naming the vendor as a processor in `/privacy`, which today says explicitly
  that there is no Google Analytics, no Plausible and no Meta pixel.
- Rewriting `/cookies`, whose entire premise is that no third party script
  loads and therefore no banner is honest.

One specific trap: **do not switch on Vercel Web Analytics in the dashboard.**
It injects a script without touching this repo, which would make both policy
pages false without a single commit to show for it.

## 10. Before you point the domain at it

The four policy pages are drafts written by people who are not lawyers. The
README section "The policy pages are drafts" explains what that means. They
make specific commitments about refunds, notice periods, ownership and
liability caps. Have someone qualified read them, or accept the risk knowingly.
