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

import { business, founders, real } from "../config/business";
import { site } from "./site";
import { planById } from "./pricing";

const abs = (path: string) => new URL(path, business.url).href;

/** Strips the display formatting off a price so schema.org gets a number. */
const amount = (display: string) => display.replace(/[^0-9.]/g, "");

export function professionalService() {
  const landing = planById("landing");
  const website = planById("website");
  const retainer = planById("retainer");
  const companyProfiles = Object.values(business.social)
    .map(real)
    .filter((url): url is string => url !== null);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": abs("/#business"),
    /* `name` is the brand, which is what a search result should show.
       `legalName` is the registered entity and is a separate schema.org
       property precisely so the two do not have to be the same string. Both
       are omitted rather than faked while a value is still a placeholder. */
    name: business.name,
    ...(real(business.legalName) ? { legalName: business.legalName } : {}),
    url: business.url,
    logo: abs("/icon-512.png"),
    image: abs("/og.png"),
    description: site.meta.description,
    email: business.email,
    /* Punctuated E.164, which is the form schema.org documents. This is the
       one consumer that wants the stored value rather than either of the
       human formats in src/config/business.ts. */
    ...(real(business.phone) ? { telephone: business.phone } : {}),
    /* The PostalAddress stays even though business.address is null, and the
       two are not the same thing. This block is built from city, region and
       country, which are true and are what tells a search engine this is a
       Houston business. It has never contained a street address and it is
       never empty.

       `streetAddress` is the part that depends on business.address, and it is
       spread in only when there is one, so the emitted object either carries
       a real street or omits the key. It is never an empty string, which is
       worse than absent: a search engine reads "" as an address it failed to
       parse rather than as an address we do not have. */
    address: {
      "@type": "PostalAddress",
      ...(real(business.address) ? { streetAddress: business.address } : {}),
      addressLocality: business.city,
      addressRegion: "TX",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: business.city,
      containedInPlace: { "@type": "State", name: business.state },
    },
    /* Company profiles. Only the ones with a real URL in business.social,
       so an unset profile is absent rather than an empty string. Omitted
       entirely while none is set. */
    ...(companyProfiles.length ? { sameAs: companyProfiles } : {}),
    founder: founders.map((person) => ({
      "@type": "Person",
      name: person.name,
      jobTitle: person.owns,
      sameAs: [person.linkedin],
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
