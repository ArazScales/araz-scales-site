import { pricing } from "@/content/pricing";
import type { PricingTier } from "@/content/pricing";
import { Section, ButtonLink } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";

/**
 * Pricing grid.
 *
 * A tier shows real numbers when both `setup` and `monthly` are non-null, and
 * falls back to `priceNote` ("Contact us") otherwise. See content/pricing.ts for
 * how to publish a hidden tier — and for why hidden numbers are commented out
 * rather than flagged off.
 */
export function Pricing() {
  return (
    <Section
      id="pricing"
      eyebrow={pricing.eyebrow}
      heading={pricing.heading}
      intro={pricing.intro}
      bordered
    >
      <div className="mt-16 grid items-start gap-6 lg:grid-cols-3">
        {pricing.tiers.map((tier) => (
          <TierCard key={tier.id} tier={tier} />
        ))}
      </div>

      <p className="mt-10 text-sm text-faint">{pricing.footnote}</p>
    </Section>
  );
}

function TierCard({ tier }: { tier: PricingTier }) {
  const hasPrice = tier.setup !== null && tier.monthly !== null;

  return (
    <div
      className={`flex h-full flex-col rounded-lg border p-8 ${
        tier.featured
          ? "border-accent bg-surface"
          : "border-line bg-surface/40"
      }`}
    >
      {/* Name + badge ----------------------------------------------------- */}
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl tracking-[0.06em] text-ink">{tier.name}</h3>
        {tier.badge && (
          <span
            className={`rounded-full px-2.5 py-1 font-display text-[0.6rem] font-extrabold tracking-[0.12em] uppercase ${
              tier.featured
                ? "bg-accent text-accent-ink"
                : "border border-line-strong text-faint"
            }`}
          >
            {tier.badge}
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-muted">{tier.blurb}</p>

      {/* Price ------------------------------------------------------------ */}
      <div className="mt-8 border-y border-line py-6">
        {hasPrice ? (
          <>
            <p className="tabular font-display text-4xl font-black text-ink">
              {tier.monthly}
              <span className="ml-1 font-sans text-base font-normal text-faint">/mo</span>
            </p>
            <p className="tabular mt-2 text-sm text-muted">
              plus {tier.setup} one-time setup
            </p>
          </>
        ) : (
          <>
            <p className="font-display text-3xl font-black text-ink">{tier.priceNote}</p>
            <p className="mt-2 text-sm text-muted">Setup and retainer scoped to your team.</p>
          </>
        )}
      </div>

      {/* Features --------------------------------------------------------- */}
      <ul className="mt-7 flex-1 space-y-3.5">
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm text-muted">
            <CheckIcon
              className={`mt-0.5 h-4 w-4 shrink-0 ${tier.featured ? "text-accent" : "text-faint"}`}
            />
            {feature}
          </li>
        ))}
      </ul>

      {tier.conditions && (
        <p className="mt-7 border-t border-line pt-5 text-xs leading-relaxed text-faint">
          {tier.conditions}
        </p>
      )}

      <ButtonLink
        href={tier.cta.href}
        variant={tier.featured ? "primary" : "secondary"}
        className="mt-7 w-full"
      >
        {tier.cta.label}
      </ButtonLink>
    </div>
  );
}
