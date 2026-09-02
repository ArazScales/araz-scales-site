import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHeader } from "@/components/ui/Section";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what the business does and we'll come back within two business days with a scope, a fixed price and a start date.",
  alternates: { canonical: "/contact/" },
};

/**
 * Contact is the one page without a closing CTA band — the call to action is
 * the form, and a second "start a project" button under it would just compete
 * with the submit button.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow={site.contact.eyebrow} heading={site.contact.heading} />
      <Contact />
    </>
  );
}
