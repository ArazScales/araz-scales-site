import { pricing, type PricingPlan } from "@/content/pricing";
import { Section, ButtonLink } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/icons";

/**
 * Pricing grid.
 *
 * Two plans, both with published numbers. A plan whose `price` is null renders
 * `priceNote` instead — see the header comment in content/pricing.ts for why an
 * unpublished number must be deleted from that file rather than hidden here.
 *
 * `heading`/`intro` are omitted when this renders under a PageHeader that has
 * already made the same statement.
 */
export function Pricing({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <Section
      id="pricing"
      eyebrow={withHeader ? pricing.eyebrow : undefined}
      heading={withHeader ? pricing.heading : undefined}
      intro={withHeader ? pricing.intro : undefined}
      tight={!withHeader}
    >
      <div className={`grid gap-5 lg:grid-cols-2 ${withHeader ? "mt-16" : ""}`}>
        {pricing.plans.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 90}>
            <PlanCard plan={plan} />
          </Reveal>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm text-faint">{pricing.footnote}</p>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function PlanCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-xl border p-8 transition-colors duration-300 sm:p-9 ${
        plan.featured
          ? "border-accent/45 bg-surface"
          : "border-line bg-surface/40 hover:border-line-strong"
      }`}
    >
      {/* A single hairline of accent along the top edge marks the featured
          plan. Enough to direct the eye; not a coloured card. */}
      {plan.featured && (
        <span
          aria-hidden
          className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        />
      )}

      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl">{plan.name}</h3>
        {plan.badge && (
          <span
            className={`shrink-0 rounded-full px-3 py-1 label ${
              plan.featured
                ? "bg-accent/15 text-accent"
                : "border border-line-strong text-faint"
            }`}
          >
            {plan.badge}
          </span>
        )}
      </div>

      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{plan.blurb}</p>

      {/* Price ------------------------------------------------------------- */}
      <p className="mt-8 flex items-baseline gap-2">
        {plan.price ? (
          <>
            <span className="tabular font-display text-5xl font-extrabold tracking-[-0.04em] text-ink">
              {plan.price}
            </span>
            <span className="text-sm text-faint">{plan.cadence}</span>
          </>
        ) : (
          <span className="font-display text-3xl font-extrabold tracking-[-0.03em] text-ink">
            {plan.priceNote}
          </span>
        )}
      </p>

      {/* Features ---------------------------------------------------------- */}
      <ul className="mt-9 flex-1 space-y-4 border-t border-line pt-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3.5">
            <CheckIcon
              className={`mt-1 h-4 w-4 shrink-0 ${plan.featured ? "text-accent" : "text-faint"}`}
            />
            <span className="text-[0.95rem] leading-relaxed text-muted">{feature}</span>
          </li>
        ))}
      </ul>

      {plan.conditions && (
        <p className="mt-9 text-xs leading-relaxed text-faint">{plan.conditions}</p>
      )}

      <div className="mt-8">
        <ButtonLink
          href={plan.cta.href}
          variant={plan.featured ? "primary" : "secondary"}
          className="w-full"
        >
          {plan.cta.label}
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </ButtonLink>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Pricing FAQ.
 *
 * Native <details>, not a JavaScript accordion: it is keyboard accessible and
 * findable by in-page search for free, and it renders the same before hydration
 * as after. The marker is replaced with our own so it can animate.
 */
export function PricingFaq() {
  return (
    <Section id="faq" heading={pricing.faq.heading} bordered>
      <div className="mt-12 max-w-3xl divide-y divide-line border-y border-line">
        {pricing.faq.items.map((item, index) => (
          <Reveal key={item.q} delay={index * 50}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                <span className="text-[1.05rem] font-semibold tracking-[-0.01em]">{item.q}</span>
                <span
                  aria-hidden
                  className="relative h-4 w-4 shrink-0 text-faint transition-colors group-open:text-accent"
                >
                  <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
                  <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 rotate-90 bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed text-muted">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
