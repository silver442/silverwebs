import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/config/site";
import { absoluteUrl, defaultTitle } from "@/lib/seo";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.owner, url: siteConfig.social.linkedin }],
  creator: siteConfig.owner,
  keywords: [
    "desarrollo web",
    "páginas web a la medida",
    "diseño web Monterrey",
    "tienda en línea",
    "e-commerce",
    "sistema de reservas",
    "desarrollador full-stack México",
  ],
  alternates: { canonical: "/" },
  // La imagen la generan app/opengraph-image.tsx (og:image) y twitter:image la hereda de ahí.
  openGraph: {
    title: defaultTitle,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
  }),
};

export const viewport: Viewport = {
  themeColor: "#050b24",
};

/** Datos estructurados de la marca, comunes a todo el sitio. */
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": absoluteUrl("/#organization"),
      name: siteConfig.name,
      url: absoluteUrl("/"),
      logo: absoluteUrl(siteConfig.logo),
      image: absoluteUrl(siteConfig.logo),
      description: siteConfig.description,
      ...(siteConfig.whatsappNumber && { telephone: `+${siteConfig.whatsappNumber}` }),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Monterrey",
        addressRegion: "Nuevo León",
        addressCountry: "MX",
      },
      areaServed: { "@type": "Country", name: "México" },
      priceRange: "$$",
      founder: { "@id": absoluteUrl("/#founder") },
      sameAs: Object.values(siteConfig.social),
    },
    {
      "@type": "Person",
      "@id": absoluteUrl("/#founder"),
      name: siteConfig.owner,
      jobTitle: "Desarrollador web full-stack",
      image: absoluteUrl(siteConfig.profilePhoto),
      worksFor: { "@id": absoluteUrl("/#organization") },
      sameAs: [siteConfig.social.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: siteConfig.name,
      url: absoluteUrl("/"),
      inLanguage: "es-MX",
      publisher: { "@id": absoluteUrl("/#organization") },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-MX"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={siteJsonLd} />
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
