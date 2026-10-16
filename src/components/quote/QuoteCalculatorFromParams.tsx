"use client";

import { useSearchParams } from "next/navigation";
import { tierOrder, type Tier } from "@/data/quoteOptions";
import { QuoteCalculator } from "./QuoteCalculator";

function parseTier(value: string | null): Tier | undefined {
  return tierOrder.find((id) => id === value);
}

/** Preselecciona el paquete a partir de `?plan=basico|medio|avanzado`. */
export function QuoteCalculatorFromParams() {
  const tier = parseTier(useSearchParams().get("plan"));
  return <QuoteCalculator key={tier ?? "default"} initialTier={tier} />;
}
