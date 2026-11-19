import { Rocket } from "lucide-react";
import { tiers, type Tier } from "@/data/quoteOptions";

/** Tiempo de lanzamiento vs. desarrollo completo del paquete elegido. */
export function DeliveryTimeline({ tier, className = "" }: { tier: Tier; className?: string }) {
  const { launch, full } = tiers[tier].delivery;
  return (
    <div
      className={`flex gap-3 rounded-xl border border-neon-blue bg-royal/30 p-4 text-sm text-slate-200 ${className}`}
    >
      <Rocket className="mt-0.5 size-4 shrink-0 text-peach" />
      {launch ? (
        <p>
          <span className="font-semibold text-peach">Versión funcional en línea:</span> {launch}
          <span className="text-slate-500"> · </span>
          <span className="font-semibold text-peach">Desarrollo completo:</span> {full}
        </p>
      ) : (
        <p>
          <span className="font-semibold text-peach">Entrega completa:</span> {full}
        </p>
      )}
    </div>
  );
}
