import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Artifacts } from "@/components/Artifacts";
import { Approval } from "@/components/Approval";
import { Pricing } from "@/components/Pricing";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";

/**
 * Single-page marketing site.
 *
 * Section order is the argument the page makes: name the problem, show the
 * mechanism, show the output, defuse the objection (approval), then price,
 * then who we are, then ask. Reordering these changes the pitch — do it
 * deliberately, and update site.nav.links to match.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Artifacts />
        <Approval />
        <Pricing />
        <Team />
        <Contact />
      </main>
      <Footer />
      <StructuredData />
    </>
  );
}

/**
 * JSON-LD for search engines. Static export can't run a server, so this is
 * inlined at build time. Kept minimal and truthful — no fake review or rating
 * markup, which search engines penalise and which we haven't earned yet.
 */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.meta.company,
    url: site.meta.url,
    description: site.meta.description,
    slogan: site.meta.tagline,
    email: site.contact.email,
    logo: `${site.meta.url}/logo.svg`,
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "SoftwareApplication",
        name: "Ship Log",
        applicationCategory: "BusinessApplication",
        description:
          "Turns merged pull requests into approved marketing content: changelog entries, LinkedIn posts, X threads and newsletter blurbs.",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      // Content is a build-time constant from our own content file, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
