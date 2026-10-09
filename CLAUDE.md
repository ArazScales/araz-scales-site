# ARAZ Scales: Company Site Build Prompt

Paste this whole file into Claude Code as the opening message, or save it as `CLAUDE.md` at the repo root so it applies to every session.

---

**Website domain is arazscale.com (singular). Email domain is arazscales.com (plural). Do not change either to match the other.**

**The October 2026 redesign overrides earlier rules.** The homepage was rebuilt
to follow the layout of texasroadside.org (owner's permission, layout only),
with a navy and bright blue palette, slide-in animations and image slots. Where
this file describes that design it is current. Do not revert it to the older
dark slate, amber, mono-label design, and do not remove the animations, the
palette, the layout or the placeholder images on the grounds of an older rule.

---

## 1. What you are building

A marketing site for **ARAZ Scales**, a three-person growth studio (Zain, Roshan, Abayjit). Static, fast, no CMS, no login, no dashboard. Its only job is to make a small business owner understand what we do in about eight seconds and then contact us.

**Services (three prongs):**
1. Websites for businesses that don't have one. $300 one-time flat fee.
2. Ghostwritten content for founders building a personal brand.
3. AI-assisted Meta ad creative for businesses already spending on ads.

Ghostwriting + Meta ads together are a $500/month retainer. No bundle discount.

**Audience:** owners of local service businesses. Contractors, dentists, gyms, salons, restaurants, real estate agents. They are not technical. They do not know or care what a framework is. They are skeptical of agencies and of anything that looks like a scam. Write and design for them, not for other developers.

**Primary action:** one contact form or booking link. Every page routes to it.

---

## 2. Hard rules

These are non-negotiable. If a rule conflicts with something you'd normally do, the rule wins.

**Never put these on the site:**

- Gradients. There are none in the stylesheet and none may be added. The hero
  overlay is a flat `rgba` navy fill over the photo, not a gradient. Anything
  that blends two colours across a shape is banned.
- Vague hero text. No "Elevate your digital presence" or "We help brands grow." The hero must say literally what we do and who for.
- Fake counters or animated number tickers.
- Fake reviews or testimonials. Not as placeholders, not as "example" content, not commented out for later.
- Fake metrics. No "500+ clients," no "3x average ROI," no invented percentages.
- Unsupported claims of any kind. Every factual statement on the site has to be something we could defend if a client asked us to prove it. No "guaranteed results," no "#1 in Texas," no "industry leading," no implied certifications or partnerships we don't have.
- Parallax. Still banned outright.
- Scroll entrances are permitted, as built in the redesign and no further.
  Elements carry `data-animate="slide-left" | "slide-right" | "slide-up" |
  "fade"` and an optional `data-delay` in ms. One IntersectionObserver in
  `src/scripts/site.js` (threshold 0.15) adds `.is-visible` once and then
  unobserves the element, so nothing replays. Images start 120px to the side
  on desktop and 40px on mobile and scale from 0.96 (images only, never text).
  Slide-up starts 40px low. Easing is `cubic-bezier(0.22, 1.2, 0.36, 1)` over
  about 900ms, so images land and settle. Text beside an image starts 150ms
  after it, and card rows stagger by 150ms. Only transform and opacity
  animate. Hidden start states are keyed off a `js` class set by a hashed
  inline script in the head, so the page renders complete with JavaScript off,
  and all of it sits inside `prefers-reduced-motion: no-preference`, so it is
  skipped entirely under reduced motion. Animated sections use
  `overflow-x: clip`. Do not animate anything on a scroll position rather than
  on a one-time entry.
- Three radii and no more. Buttons are pills, `border-radius: 999px`, with a
  blue glow on the primary. Panels, cards, images, inputs and badges use
  `--radius`. Founder headshots are circles. A control you press is round, a
  surface you read is not.
- Emoji icons. No emoji anywhere in the UI or copy. If you need icons, use a real icon set with a permissive license and record the license in the README.
- Cursor animations. No custom cursor, no cursor-following blobs, no magnetic buttons.
- AI-generated images. Use real photos, or the generated neutral placeholders
  in `public/assets/img/` until real photos exist.
- Em dashes. Not in headings, not in body copy, not in alt text. Use a period, a comma, or a colon.
- Any "made with AI" or "built with" badge.
- AI-sounding copy. See section 8.

**Image sourcing:** every image on the site must be one we have the right to use. Real photos we took, or images from a source with a clear license (public domain, CC0, or a stock license we hold). No pulling images from Google, and nothing from texasroadside.org. For each image, record the source and license in a `credits.md` file in the repo. Until real photos exist, each slot in `src/content/images.ts` holds a flat neutral placeholder made by `npm run placeholders`, marked with a `PHOTO SLOT` comment in the markup, with empty alt text while it is a placeholder. These placeholders are intended and stay until real photos replace them.

**Important honesty constraint:** ARAZ has no completed client work yet. That means no testimonials, no logo wall, no case studies, no "trusted by" strip, and no numbers we cannot prove. Build credibility a different way: be specific about process, pricing, and timeline. Design the layout so it looks finished and intentional without social proof, and so a testimonial section can be added later without a redesign.

---

## 3. Legal, policies and business info

Every page below gets real content written for our actual situation, not lorem ipsum and not a generic template with `[COMPANY NAME]` left in it. All four are linked in the footer of every page.

- **`/privacy`**. Privacy Policy. What the contact form collects, why, where it goes, how long we keep it, who we share it with (the form provider and our email host, named explicitly), and how someone requests deletion.
- **`/terms`**. Terms and Conditions. Scope of each service, payment terms, revision policy, what the client is responsible for supplying, who owns the finished work, and limitation of liability.
- **`/refunds`**. Refund Policy. Covers both the $300 one-time website fee and the $500/month retainer, including deposit handling, what happens if a client cancels mid-build, and the notice period for cancelling the monthly retainer. Flag this one for me before you write it: I need to make the actual business decision, don't invent terms.
- **`/cookies`**. Cookie Policy. Only meaningful if we actually set cookies. See section 4.

**Domains.** Website domain is arazscale.com (singular). Email domain is arazscales.com (plural). Do not change either to match the other.

**Real business details.** The site must show, at minimum: the full legal entity name, the state of registration, a real contact email on our own domain, and a real phone number. Do not invent any of these, and do not use a placeholder that could ship by accident. Put them in one config file (`src/config/business.ts` or equivalent) and pull them into the footer and legal pages from there. Where a value isn't finalized yet, leave it as the literal string `TODO_NEEDS_REAL_VALUE` so it fails an obvious grep before launch, and list every one of them in your handoff notes. Where we have decided to ship without a value, set it to `null` instead, which says "there is none" rather than "we forgot" and does not block a launch. Either way it is read through `real()` and the row is omitted, so nothing blank reaches a page. A postal address is deliberately not in the minimum list above: `address` is `null` and the site ships without one.

**Local laws.** We are a Texas entity selling to Texas small businesses. Relevant considerations: Texas Deceptive Trade Practices Act (this is the real reason the "no unsupported claims" rule above matters), CAN-SPAM if we ever email marketing content from the site, and the Texas Data Privacy and Security Act. If the site is reachable from outside the US, note in your handoff whether anything we're doing would trigger GDPR or CCPA obligations, and if the answer is "only if we add analytics," say so plainly.

**These are drafts.** State clearly at the top of your handoff notes that all four policy pages need a human read before launch, and that the entity name has to match whatever gets filed with the state. You are not a lawyer and neither am I.

---

## 4. Data, privacy and tracking

Default position: collect as little as possible, track nothing, embed nothing.

- **Only collect what we need.** The contact form asks for name, email, business name, and what they're after. Phone is optional. Do not add fields we don't act on. No hidden fields capturing IP, referrer, or user agent unless spam protection genuinely requires it, and if it does, say so in the privacy policy.
- **Form consent.** A short, plain line next to the submit button explaining what happens to their details, with a link to `/privacy`. If any checkbox is used, it starts unchecked and the form works without dark patterns. No pre-ticked marketing opt-in.
- **Tracking.** Ship with zero analytics, zero pixels, zero session recording. If we later decide we want numbers, use a cookieless analytics tool and tell me before adding it. Do not add a Meta pixel to our own site just because we run ads for clients.
- **Cookie consent.** If the site sets no cookies and loads no third-party scripts, we do not need a banner, and adding one anyway is theatre. Audit what actually gets set and tell me the result. If something does set a cookie, then we need a real consent mechanism that blocks the script until consent is given, not a banner that does nothing.
- **Third-party embeds.** Every external script, font, iframe, or widget is a data leak and a performance cost. Self-host fonts. No Google Fonts CDN, no YouTube embed, no Google Maps iframe (link out to a map instead), no chat widget. If the contact form provider requires a script, name it, explain what it sends, and cover it in the privacy policy.

Before you call the site done, list every outbound network request the site makes on load. The list should be short and I should recognize everything on it.

---

## 5. Accessibility

Build this in from the start, not as a cleanup pass. Applied without commentary in the copy.

- **Colour contrast:** WCAG AA minimum for all text, 4.5:1 for body and 3:1 for large text. Check the states too, not just the resting one: hover, focus, disabled, placeholder text, and text over any image. Do not rely on colour alone to convey meaning.
- **Alt text:** every image gets it. Describe what the image shows and why it's there. Decorative images get `alt=""`, not a filename and not a keyword stuffed sentence.
- **Clear button labels:** buttons say what happens. "Send message," not "Submit." "See pricing," not "Learn more." No icon-only buttons without an accessible label.
- **Keyboard friendly forms:** the whole form is completable with a keyboard alone. Logical tab order, visible focus ring on every interactive element, labels properly associated with inputs (not placeholder-as-label), errors announced and tied to the field they belong to, and error text that says how to fix the problem.
- **Structure:** semantic HTML, one `h1` per page, headings in order, landmark regions, skip-to-content link, `prefers-reduced-motion` respected, and it works at 200% browser zoom and down to 320px wide.

Run an automated check (axe or Lighthouse) and fix everything it finds, then tab through the whole site yourself and report what that turned up, since the automated tools miss most of it.

---

## 6. Design direction

Before you write any code, produce a short design plan and show it to me. Do not start building until I approve it.

The plan should cover:

- **Palette:** decided and built in the redesign. Navy `#0A0E1A` for the hero,
  dark sections and footer, bright blue `#3B9EFF` for buttons, label badges
  and the full-width services band, off-white `#F5F7FA` and white between
  them. Text on the blue is always navy (white on it is 2.79:1 and fails).
  Blue text on a light ground uses `#1A66C2` (5.26:1), never `#3B9EFF`.
  Amber `#FFB020` is kept for form errors only. Every value and every
  verified ratio is recorded in `src/styles/global.css`, and every colour is a
  custom property. Do not repaint the site. If a colour is added, compute its
  contrast against every ground it can sit on first and write the number next
  to the token.
- **Type:** one self-hosted variable family, Archivo. Headings at width 125,
  weight 800 (the wide display cut), body at width 100, weight 400. No Google
  Fonts CDN.
- **Layout:** a one-paragraph concept plus a rough ASCII wireframe of the homepage. State the alignment strategy.
- **The one bold thing:** name the single element that carries the design. Everything else stays quiet.

Then review your own plan: if any part of it is what you would produce for any generic agency site, change it and tell me what you changed and why.

Additional guardrails:

- Cards are used where the redesign uses them (services band, process steps,
  founders, FAQ). Do not spread them to sections built as rows or splits.
- The small blue label badge above a section heading is part of the design, in
  sentence case. The only uppercase headings are "What you get" and "Get a
  quote", uppercased in CSS only.
- Do not accent one word in a headline with a different color or italics.
- Do not use numbered markers (01 / 02 / 03) unless the content is genuinely a sequence. Our process section is a sequence, so numbering is fine there and nowhere else.
- Do not append arrows to link and button text.
- Motion, in full, and this is the whole budget:
  1. Hover and focus states.
  2. One page-load moment: the hero headline, lines and buttons fade up in
     sequence, once, in CSS.
  3. The scroll entrances described in section 2.
  Nothing else moves. There is no typewriter, bar chart or growth line any
  more. All of it is off under `prefers-reduced-motion`, and the page must be
  readable with JavaScript disabled, which the `js` class in
  `src/layouts/Base.astro` guarantees. Do not add a fourth kind.

Performance floor: Lighthouse 95+ on performance and accessibility, no layout shift, images sized and lazy-loaded below the fold.

---

## 7. Pages and structure

**`/` (home)**
- Hero: what we do, who for, and the action. Plain sentence, no metaphor.
- The three services, each with what you get, what it costs, and how long it takes.
- How it works: our actual process, numbered, honest about what we need from the client.
- Who we are: three college founders in Texas. Say it plainly. It is a differentiator against faceless agencies, not something to hide.
- FAQ: cover price, timeline, who owns the site, what happens if they want changes, refunds, and what we do not do.
- Contact.

**`/privacy`, `/terms`, `/refunds`, `/cookies`** as described in section 3.

Do not build a blog, a pricing calculator, a client portal, or a newsletter signup. Ask me before adding any page not listed above.

---

## 8. Copy rules

You are writing the copy. Treat it as part of the design.

- Short declarative sentences. Sentence case for headings.
- Say the concrete thing. "A five-page website for your business, live in two weeks, $300" beats "Bespoke web solutions tailored to your vision."
- Name real objects and outcomes: a website, a Google listing, a post on Facebook, a phone that rings.
- No em dashes. No semicolons in body copy.
- Banned words and phrases: elevate, empower, unlock, seamless, leverage, robust, cutting-edge, transform, journey, solutions, in today's fast-paced world, we're passionate about, let's build something amazing, take your business to the next level.
- No rhetorical questions as headings.
- No "not just X, but Y" constructions.
- No triads for rhythm ("faster, cleaner, smarter").
- Buttons say what happens: "Send message" not "Get started," "See pricing" not "Learn more."
- Read every sentence aloud in your head. If a 55-year-old plumber would not say it, rewrite it.

---

## 9. Stack

- Static site. Astro as a build step only: visitors get plain HTML, one stylesheet (`src/styles/global.css`, no component `<style>` blocks) and one vanilla JS file (`src/scripts/site.js`, no dependencies). No React, no Next.js, no Tailwind, no jQuery.
- The Content Security Policy in `vercel.json` allows one inline script by its sha256 hash. `npm run build` fails if the hash is stale.
- No third-party UI kit. No shadcn. No component library defaults.
- Self-host fonts. No Google Fonts CDN call.
- Contact form: a service that emails us without a backend (Formspree, Web3Forms, or Netlify Forms). Include honeypot spam protection. Do not build a custom API for this. Whichever you pick, read what it stores and reflect that accurately in the privacy policy.
- Favicon: full set (`favicon.ico`, `apple-touch-icon.png`, `icon.svg`, `site.webmanifest`), correctly linked in `<head>`.
- Deploy target: Vercel or Cloudflare Pages, on our custom domain, not a `.vercel.app` or `.pages.dev` subdomain. Put the exact DNS records in the README.
- Repo: clean commits, a README covering local setup, how to change copy and prices without touching layout, and the DNS records. Plus `credits.md` for image and icon licensing.

---

## 10. How to work

1. Read this whole file, then ask me any questions that would change your design plan or the policy pages. Ask them all at once.
2. Show me the design plan from section 6. Wait for approval.
3. Build the homepage first, all sections, real copy, no placeholders except where a real photo is needed.
4. Show me a screenshot at desktop and mobile widths before you build the legal pages.
5. Then the four policy pages, favicon set, form wiring, deploy config.
6. Before you call it done, run the checklist below yourself and paste the results.

---

## 11. Definition of done

**Content and design**
- [ ] Grep the whole repo for `—` and confirm zero results.
- [ ] Grep for emoji and confirm zero results.
- [ ] Every banned word from section 8 grepped and confirmed absent.
- [ ] Grep `src/` for `gradient` and confirm zero hits in CSS.
- [ ] Buttons are pills, panels, cards, images, inputs and badges are
      `--radius`, headshots are circles. No fourth radius.
- [ ] Scroll entrances are the one-time `data-animate` system, nothing else,
      and are skipped under `prefers-reduced-motion`.
- [ ] Load the homepage with JavaScript disabled and confirm every section is
      visible and readable.
- [ ] No testimonial, logo wall, review, or case study anywhere, including commented-out code.
- [ ] Every number on the site is one we can prove. List them and their basis.
- [ ] Every image and icon accounted for in `credits.md` with its source and license.

**Legal and business**
- [ ] `/privacy`, `/terms`, `/refunds`, `/cookies` all written, reachable from the footer of every page.
- [ ] Run `grep -rnE "^[[:space:]]*[a-zA-Z_]+:[[:space:]]*TODO,?[[:space:]]*$" src/`
      and list every hit so I can fill them in. An empty result means nothing
      is blocking. Match field assignments rather than the bare string: the
      fields are written `address: TODO,`, so searching for the literal value
      finds only the constant's definition and reports clean while a field is
      genuinely empty, and searching `:\s*TODO,` matches that definition too
      and so never returns empty.
- [ ] A field set to `null` is a decision to ship without it and does not
      block. Only `TODO` blocks. `address` and `social.facebook` are `null`.
      `social.linkedin` and `social.instagram` are `TODO` until their URLs are
      supplied. `address` is `null`: we are launching with no
      postal address. That is fine for the site and not fine for outreach
      email, which needs one under CAN-SPAM.
- [ ] Legal entity name, state, email, and phone all pulled from one config file.
- [ ] Handoff note stating the policy pages are drafts needing legal review.

**Data and privacy**
- [ ] Full list of outbound network requests on page load, pasted into the chat.
- [ ] Cookie audit result stated plainly: what is set, by what, and whether a consent mechanism is therefore needed.
- [ ] Form collects only the fields listed in section 4, with a consent line linking to `/privacy`.
- [ ] Zero analytics, pixels, or session recording confirmed.
- [ ] Every third-party embed named and justified, or removed.

**Accessibility**
- [ ] axe or Lighthouse accessibility run pasted into the chat, zero violations.
- [ ] Contrast checked on resting, hover, focus, disabled, and placeholder states.
- [ ] Every image has alt text, decorative ones have `alt=""`.
- [ ] Full keyboard pass through the site and the form, findings reported.
- [ ] Works at 320px wide and at 200% zoom.

**Working**
- [ ] Contact form tested end to end, real email received.
- [ ] Lighthouse performance run pasted into the chat.
- [ ] Site serving from the custom domain over HTTPS.

If you are unsure whether something violates a rule in section 2, stop and ask instead of guessing.
