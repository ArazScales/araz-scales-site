import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHeader, Container } from "@/components/ui/Section";
import { ServiceDetail } from "@/components/ServiceDetail";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites from $300 flat, founder ghostwriting, and AI-assisted Meta ad scaling. Fixed scope and a written deliverables list for each.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  const { services } = site;

  return (
    <>
      <PageHeader eyebrow={services.eyebrow} heading={services.heading} intro={services.intro} />

      {services.pillars.map((pillar, index) => (
        <ServiceDetail key={pillar.id} pillar={pillar} index={index} />
      ))}

      <Container className="pb-20">
        <p className="max-w-2xl border-l-2 border-line-strong pl-5 text-sm leading-relaxed text-faint">
          {services.footnote}
        </p>
      </Container>

      <CtaBand />
    </>
  );
}
