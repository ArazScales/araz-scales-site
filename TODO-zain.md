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

## 4. Register the other spelling and redirect it

The company is **arazscales.com**, plural. The site, the mailbox and the
canonical URL all agree on that now.

- Register `arazscale.com`, singular, before somebody else does. It is one
  keystroke from your real domain and it is what your own logo currently
  prints.
- 301 it to `https://arazscales.com`, at the registrar or as a Vercel domain
  redirect. A 301 rather than a frame or a 302.
- Do the same for `www.arazscales.com`.

## 5. Get the logo reissued

The logo file you were supplied has **arazscale.com**, singular, set beneath
the mark. It is wrong.

Nothing on the site shows it, because the master in this repo is cropped above
that text, so this is not a live defect. It becomes one the moment the full
logo is used where the crop does not apply: business cards, invoices, a van,
an ad, a letterhead. Ask the designer for a corrected file, and a vector while
you are asking, since there is no vector source and every icon on the site is
currently rasterised from a PNG.

## 6. Google Business Profile

Create one for ARAZ Scales. It is free and it is the single biggest local
search lever you have while the site has no backlinks.

The name, address and phone must be **character for character identical** to
what the site says, or the two records compete instead of reinforcing each
other. Which means the next item blocks this one.

## 7. Values the site still does not have

These are literal `TODO_NEEDS_REAL_VALUE` placeholders in
`src/config/business.ts`. The site omits each row rather than printing the
marker, so nothing leaks, but each absence costs something:

- **`legalName`.** No entity is filed, so `/terms` currently tells clients they
  are contracting with the three of you personally. That is honest and it is
  also unlimited personal liability. Filing an LLC with the Texas Secretary of
  State and putting the name here switches the page to corporate wording.
- **`phone`.** The process copy says "thirty minutes on the phone" and the form
  asks the prospect for their number, but the site gives them no number to
  call. A Google Voice line that rings all three of you closes that gap, and
  the Business Profile above needs it.
- **`address`.** Texas privacy law expects a physical contact point rather than
  just an email. A mailbox service address is fine.

## 8. After the first deploy

- **Run Google's Rich Results Test** against the live URL. It could not be run
  from here: its code-snippet mode now requires a signed-in Google account. The
  schema.org validator passed with 0 errors and 0 warnings on both
  `ProfessionalService` and `FAQPage`, but Google's own tool is the one that
  tells you what will actually show in search.
- **Check the link preview** by pasting the URL into iMessage and into Slack.
  Both cache aggressively, so get it right before you share it widely. X and
  LinkedIn both have their own cache-busting inspectors.
- **Submit the sitemap** at `https://arazscales.com/sitemap.xml` in Google
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
