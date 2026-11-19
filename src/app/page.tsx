import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { faqs } from "@/data/faq";
import { packages } from "@/data/packages";
import { absoluteUrl } from "@/lib/seo";

// Refleja el contenido visible de las secciones FAQ y Servicios (Google exige que coincidan).
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "OfferCatalog",
      name: "Paquetes de desarrollo web",
      itemListElement: packages.map((pkg) => ({
        "@type": "Offer",
        price: pkg.price,
        priceCurrency: "MXN",
        url: absoluteUrl(`/cotizador?plan=${pkg.id}`),
        itemOffered: {
          "@type": "Service",
          name: `${pkg.name}: ${pkg.subtitle}`,
          description: pkg.features.join(". "),
          provider: { "@id": absoluteUrl("/#organization") },
        },
      })),
    },
  ],
};

function SectionDivider() {
  return <div aria-hidden="true" className="section-divider mx-auto max-w-5xl" />;
}

export default function Home() {
  return (
    <main className="flex-1 bg-abyss">
      <JsonLd data={homeJsonLd} />
      <Hero />
      <Services />
      <SectionDivider />
      <Portfolio />
      <SectionDivider />
      <Faq />
      <SectionDivider />
      <Contact />
    </main>
  );
}
