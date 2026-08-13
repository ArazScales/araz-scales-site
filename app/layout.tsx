import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

/**
 * Inter, self-hosted.
 *
 * next/font downloads the font at build time and serves it from our own origin,
 * so there is no request to Google at runtime, no third-party cookie surface,
 * and `display: swap` plus the preloaded subset means no layout shift.
 *
 * To move headings to Montserrat: import it here alongside Inter with its own
 * `variable`, add that variable to <html className>, and point --font-display
 * at it in app/globals.css. Body type stays on Inter.
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
    "developer marketing automation",
    "changelog automation",
    "AI content for startups",
    "GitHub to LinkedIn",
    "devtool marketing",
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
  themeColor: "#1C2128",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* First tab stop on the page — lets keyboard users skip the nav. */}
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-bold focus:text-accent-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
