import { Suspense } from "react";
import type { Metadata } from "next";
import { QuoteCalculator } from "@/components/quote/QuoteCalculator";
import { QuoteCalculatorFromParams } from "@/components/quote/QuoteCalculatorFromParams";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cotizador",
  socialTitle: "Cotizador de páginas web en línea",
  description:
    "Simula la cotización de tu sitio o plataforma web: elige paquete, módulos extra y plan de pagos, y obtén al instante el total estimado.",
  path: "/cotizador",
});

export default function CotizadorPage() {
  return (
    <main className="flex-1">
      <JsonLd data={breadcrumbJsonLd("Cotizador", "/cotizador")} />
      {/* El fallback es el cotizador con valores por defecto: el HTML prerenderizado ya es usable. */}
      <Suspense fallback={<QuoteCalculator />}>
        <QuoteCalculatorFromParams />
      </Suspense>
    </main>
  );
}
