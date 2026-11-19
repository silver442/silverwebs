"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { parseTier } from "@/data/quoteOptions";
import { QuoteCalculator } from "./QuoteCalculator";

/** Preselecciona el paquete a partir de `?plan=basico|profesional|negocio|avanzado` (acepta `medio`). */
export function QuoteCalculatorFromParams() {
  const plan = useSearchParams().get("plan");
  const tier = parseTier(plan);

  // Normaliza los valores antiguos (p. ej. `?plan=medio`) en la barra de direcciones.
  useEffect(() => {
    if (tier && plan !== tier) {
      const url = new URL(window.location.href);
      url.searchParams.set("plan", tier);
      window.history.replaceState(null, "", url);
    }
  }, [plan, tier]);

  return <QuoteCalculator key={tier ?? "default"} initialTier={tier} />;
}
