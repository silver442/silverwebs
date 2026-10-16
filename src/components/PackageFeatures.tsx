"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";
import { Collapse } from "@/components/ui/Collapse";

const VISIBLE_FEATURES = 5;

function FeatureItem({ feature }: { feature: string }) {
  return (
    <li className="flex gap-2.5 text-slate-300">
      <Check className="mt-0.5 size-4 shrink-0 text-peach" />
      {feature}
    </li>
  );
}

export function PackageFeatures({ features }: { features: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const visible = features.slice(0, VISIBLE_FEATURES);
  const extra = features.slice(VISIBLE_FEATURES);

  return (
    <div className="mt-5 text-sm">
      <ul className="space-y-2.5">
        {visible.map((feature) => (
          <FeatureItem key={feature} feature={feature} />
        ))}
      </ul>

      {extra.length > 0 && (
        <>
          <Collapse open={expanded} id={panelId}>
            <ul className="space-y-2.5 pt-2.5">
              {extra.map((feature) => (
                <FeatureItem key={feature} feature={feature} />
              ))}
            </ul>
          </Collapse>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 text-xs font-semibold text-peach transition hover:text-peach/75"
          >
            {expanded ? "− Ver menos" : `+ Ver todos los beneficios (${extra.length} más)`}
          </button>
        </>
      )}
    </div>
  );
}
