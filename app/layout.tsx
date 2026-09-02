import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site } from "@/content/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

/**
 * Inter, self-hosted.
 *
 * next/font downloads the font at build time and serves it from our own origin,
 * so there is no request to Google at runtime, no third-party cookie surface,
 * and `display: swap` plus the preloaded subset means no layout shift.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  /* Makes the relative ogImage path below resolve to an absolute URL. */
  metadataBase: new URL(site.meta.url),
  title: {
    default: site.meta.title,
    template: `%s — ${site.meta.company}`,
  },
  description: site.meta.description,
  applicationName: site.meta.company,
  keywords: [
    "small business marketing agency",
    "small business website design",
    "founder ghostwriting",
    "Meta ads management",
    "growth operator",
  ],
  authors: [{ name: site.meta.company, url: site.meta.url }],
  creator: site.meta.company,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.meta.company,
    title: site.meta.title,
    description: site.meta.description,
    url: site.meta.url,
    locale: site.meta.locale,
    images: [
      {
        url: site.meta.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.meta.company} — ${site.meta.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
    images: [site.meta.ogImage],
    ...(site.meta.twitterHandle ? { creator: site.meta.twitterHandle } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0E1A",
  colorScheme: "dark",
};

/**
 * Marks the document as scripted before the body paints.
 *
 * app/globals.css scopes the hidden start state of every scroll-reveal to
 * `[data-js]`, so with scripting disabled — or if the bundle fails to load —
 * the page renders fully visible instead of blank. Running it here rather than
 * in an effect is what keeps the reveal from flashing in and back out on load.
 *
 * It sets a data attribute rather than mutating the font className so the two
 * concerns stay separate; <html> carries suppressHydrationWarning to keep React
 * from reporting the attribute as a mismatch.
 */
const MARK_SCRIPTED = "document.documentElement.setAttribute('data-js','')";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* suppressHydrationWarning covers exactly one thing: the data-js attribute
       the inline script below stamps on this element before React hydrates.
       React 19 diffs every attribute on a hydrated element, including ones it
       never rendered, so without this it logs a mismatch on every page load.
       The suppression applies to this element's own attributes only — it does
       not extend to the tree beneath it. */
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Content is a build-time constant, not user input. */}
        <script dangerouslySetInnerHTML={{ __html: MARK_SCRIPTED }} />
      </head>
      <body>
        {/* First tab stop on the page — lets keyboard users skip the nav. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:label focus:text-accent-ink"
        >
          Skip to content
        </a>

        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <StructuredData />
      </body>
    </html>
  );
}

/**
 * JSON-LD for search engines. The site is statically exported, so this is
 * inlined at build time. Kept minimal and truthful — no review or aggregate
 * rating markup, which search engines penalise and which we haven't earned.
 */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.meta.company,
    url: site.meta.url,
    description: site.meta.description,
    slogan: site.meta.tagline,
    email: site.contact.email,
    logo: `${site.meta.url}/logo.svg`,
    founder: site.about.team.members.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: site.services.pillars.map((pillar) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: pillar.name,
          description: pillar.summary,
        },
      })),
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
