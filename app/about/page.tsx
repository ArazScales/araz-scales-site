import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHeader } from "@/components/ui/Section";
import { Story, Principles, Founders } from "@/components/About";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "ARAZ Scales is a founder-led growth agency. Fixed scope, fixed price, and the work delivered by the people you talk to.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  const { about } = site;

  return (
    <>
      <PageHeader eyebrow={about.eyebrow} heading={about.heading} intro={about.intro} />
      <Story />
      <Principles />
      <Founders />
      <CtaBand />
    </>
  );
}
