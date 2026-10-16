import { Suspense } from "react";
import type { Metadata } from "next";
import { QuoteCalculator } from "@/components/quote/QuoteCalculator";
import { QuoteCalculatorFromParams } from "@/components/quote/QuoteCalculatorFromParams";

export const metadata: Metadata = {
  title: "Cotizador",
  description:
    "Simula la cotización de tu sitio o plataforma web: elige paquete, módulos extra y plan de pagos, y obtén al instante el total estimado.",
  alternates: { canonical: "/cotizador" },
};

export default function CotizadorPage() {
  return (
    <main className="flex-1">
      {/* El fallback es el cotizador con valores por defecto: el HTML prerenderizado ya es usable. */}
      <Suspense fallback={<QuoteCalculator />}>
        <QuoteCalculatorFromParams />
      </Suspense>
    </main>
  );
}
