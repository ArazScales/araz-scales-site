import type { Metadata } from "next";
import { pricing } from "@/content/pricing";
import { PageHeader } from "@/components/ui/Section";
import { Pricing, PricingFaq } from "@/components/Pricing";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "$300 one-time for a full website. $500/month for the growth retainer — founder ghostwriting and AI-assisted Meta ads together. Both numbers published, nothing quoted on application.",
  alternates: { canonical: "/pricing/" },
};

export default function PricingPage() {
  return (
    <>
      <PageHeader eyebrow={pricing.eyebrow} heading={pricing.heading} intro={pricing.intro} />

      {/* The PageHeader has already carried the eyebrow/heading/intro, so the
          grid renders without repeating them. */}
      <Pricing withHeader={false} />
      <PricingFaq />
      <CtaBand />
    </>
  );
}
