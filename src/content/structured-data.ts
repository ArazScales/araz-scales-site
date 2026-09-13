/**
 * JSON-LD for the homepage, built from the same modules the page renders from.
 *
 * The point of deriving it rather than hand writing it: structured data that
 * disagrees with the visible page is a Google penalty rather than a
 * decoration, and the FAQ in particular has to match the text a visitor sees
 * word for word. Reading site.faq.items here means the two cannot drift, and
 * editing a question in src/content/site.ts updates both at once.
 *
 * These blocks render inside <script type="application/ld+json">, which is a
 * data block and not executable script, so the script-src 'self' policy in
 * vercel.json does not need loosening to allow it.
 */

import { business, founders } from "../config/business";
import { site } from "./site";
import { planById } from "./pricing";

const abs = (path: string) => new URL(path, business.url).href;

/** Strips the display formatting off a price so schema.org gets a number. */
const amount = (display: string) => display.replace(/[^0-9.]/g, "");

export function professionalService() {
  const landing = planById("landing");
  const website = planById("website");
  const retainer = planById("retainer");

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": abs("/#business"),
    name: business.name,
    url: business.url,
    logo: abs("/icon-512.png"),
    image: abs("/og.png"),
    description: site.meta.description,
    email: business.email,
    /* No streetAddress: we do not have premises and inventing one would be a
       claim we cannot support. Locality and region are both true. */
    address: {
      "@type": "PostalAddress",
      addressLocality: business.city,
      addressRegion: "TX",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: business.city,
      containedInPlace: { "@type": "State", name: business.state },
    },
    founder: founders.map((person) => ({
      "@type": "Person",
      name: person.name,
      jobTitle: person.owns,
    })),
    makesOffer: [
      {
        "@type": "Offer",
        name: landing.name,
        description: landing.summary,
        price: amount(landing.amount),
        priceCurrency: "USD",
        itemOffered: {
          "@type": "Service",
          name: landing.name,
          serviceType: "Landing page design and build",
        },
      },
      {
        "@type": "Offer",
        name: website.name,
        description: website.summary,
        price: amount(website.amount),
        priceCurrency: "USD",
        itemOffered: {
          "@type": "Service",
          name: website.name,
          serviceType: "Website design and build",
        },
      },
      {
        "@type": "Offer",
        name: retainer.name,
        description: retainer.summary,
        priceCurrency: "USD",
        /* A recurring fee, so the figure carries its billing period rather
           than sitting bare as if it were a one off like the website. */
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: amount(retainer.amount),
          priceCurrency: "USD",
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: "MON",
        },
        itemOffered: {
          "@type": "Service",
          name: retainer.name,
          serviceType: "Social media content and advertising creative",
        },
      },
    ],
  };
}

export function faqPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
