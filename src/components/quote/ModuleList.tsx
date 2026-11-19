"use client";

import { useState } from "react";
import { ArrowUpCircle, Check, ChevronDown, Lock } from "lucide-react";
import { quoteModules, tiers, type ModuleId, type OptionPrice, type Tier } from "@/data/quoteOptions";
import { formatMXN } from "@/lib/format";
import { Collapse } from "@/components/ui/Collapse";

interface ModuleListProps {
  tier: Tier;
  selected: ModuleId[];
  onToggle: (id: ModuleId) => void;
  onUpgrade: (tier: Tier) => void;
}

function PriceTag({ price }: { price: OptionPrice }) {
  switch (price.kind) {
    case "price":
      return (
        <span className="text-right">
          <span className="block text-sm font-semibold text-peach">+{formatMXN(price.amount)}</span>
          {price.note && <span className="block text-xs text-mauve">{price.note}</span>}
        </span>
      );
    case "included":
      return <span className="text-sm font-semibold text-emerald-400">Incluido ($0)</span>;
    case "unavailable":
      return <span className="text-xs text-slate-500">No disponible</span>;
    case "locked":
      return null;
  }
}

function IncludedModules({ labels }: { labels: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-2 rounded-lg border border-emerald-400/30 bg-emerald-400/5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="modulos-incluidos"
        className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
      >
        <span className="flex items-center gap-2">
          <Check className="size-4 shrink-0" />
          {labels.length} {labels.length === 1 ? "módulo ya incluido" : "módulos ya incluidos"} en
          tu paquete ({open ? "Ocultar lista" : "Ver lista"})
        </span>
        <ChevronDown className={`size-4 shrink-0 transition ${open ? "rotate-180" : ""}`} />
      </button>
      <Collapse open={open} id="modulos-incluidos">
        <ul className="grid gap-x-4 gap-y-1 px-3 pb-3 pl-9 text-xs text-slate-300 sm:grid-cols-2">
          {labels.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </Collapse>
    </div>
  );
}

export function ModuleList({ tier, selected, onToggle, onUpgrade }: ModuleListProps) {
  const included = quoteModules.filter((m) => m.prices[tier].kind === "included");
  const extras = quoteModules.filter((m) => m.prices[tier].kind !== "included");

  return (
    <>
      {included.length > 0 && <IncludedModules labels={included.map((m) => m.label)} />}
      <ul className="divide-y divide-slate-border/50">
        {extras.map((module) => {
          const price = module.prices[tier];
          const isChecked = selected.includes(module.id);
          const isDisabled = price.kind !== "price";

          if (price.kind === "locked") {
            return (
              <li
                key={module.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                <span className="flex items-center gap-3 text-sm text-slate-500">
                  <Lock className="size-4" />
                  {module.label}
                </span>
                <button
                  type="button"
                  onClick={() => onUpgrade(price.upgradeTo)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-peach/60 px-3 py-1.5 text-xs font-semibold text-peach transition hover:bg-peach/10"
                >
                  <ArrowUpCircle className="size-3.5" />
                  Requiere Paquete {tiers[price.upgradeTo].label} – Subir
                </button>
              </li>
            );
          }

          return (
            <li key={module.id}>
              <label
                className={`flex items-center justify-between gap-3 py-3 ${
                  isDisabled ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => onToggle(module.id)}
                  />
                  <span
                    aria-hidden="true"
                    className={`flex size-5 shrink-0 items-center justify-center rounded-md border transition peer-focus-visible:ring-2 peer-focus-visible:ring-neon-blue ${
                      isChecked
                        ? "border-neon-blue bg-neon-blue"
                        : price.kind === "unavailable"
                          ? "border-slate-border/40"
                          : "border-slate-border"
                    }`}
                  >
                    {isChecked && <Check className="size-3.5 text-white" />}
                  </span>
                  <span
                    className={`text-sm ${price.kind === "unavailable" ? "text-slate-500" : "text-slate-200"}`}
                  >
                    {module.label}
                  </span>
                </span>
                <PriceTag price={price} />
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
}
