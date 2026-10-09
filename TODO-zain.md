# TODO: Zain

Everything on this list is outside the codebase. None of it can be fixed by
editing a file in this repo, which is why it is here rather than in the README
handoff notes. The README covers what is unfinished *in* the site. This covers
what is unfinished *around* it.

Ordered by what breaks if it is skipped.

---

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
- `arazscales.com` currently serves a Squarespace "Coming Soon" page. Decide
  what it should do for visitors: either leave it, or 301 it to
  `https://arazscale.com`. Either way its MX and email records must stay
  pointed at Google Workspace, because that is where the mailbox lives.

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

**Two, both social links:**

- **`social.linkedin`**: the company LinkedIn page URL.
- **`social.instagram`**: the company Instagram URL.

Both are `TODO` in `src/config/business.ts`. Paste the full `https://` URL
over each and its icon appears in the top bar, and it is added to `sameAs` in
the schema.org block. Until then the icon is simply not shown, so nothing on
the page is broken, but the pre-launch grep will list them.

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
