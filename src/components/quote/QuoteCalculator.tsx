"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, Info, Palette, Package, Puzzle, Wallet } from "lucide-react";
import {
  frequencies,
  hasPhasedDelivery,
  PHASED_DELIVERY_NOTE,
  quoteModules,
  tierOrder,
  tiers,
  type Frequency,
  type ModuleId,
  type Tier,
} from "@/data/quoteOptions";
import { formatMXN } from "@/lib/format";
import { calculateQuote, isSelectable } from "@/lib/quote";
import { Collapse } from "@/components/ui/Collapse";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DeliveryTimeline } from "./DeliveryTimeline";
import { ModuleList } from "./ModuleList";
import { QuoteSummary, SUMMARY_ID } from "./QuoteSummary";

const DEFAULT_MONTHS = 4;
const LAST_STEP = 4;

function stepId(n: number) {
  return `paso-${n}`;
}

/** Desplaza la vista al elemento cuando termina la transición de los acordeones. */
function scrollToId(id: string) {
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 320);
}

function AccordionStep({
  n,
  icon: Icon,
  title,
  summary,
  open,
  onToggle,
  actionLabel,
  onAction,
  children,
}: {
  n: number;
  icon: typeof Package;
  title: string;
  summary: string;
  open: boolean;
  onToggle: () => void;
  actionLabel: string;
  onAction: () => void;
  children: React.ReactNode;
}) {
  const panelId = `${stepId(n)}-panel`;
  return (
    <div
      id={stepId(n)}
      className={`scroll-mt-24 rounded-2xl border bg-surface transition ${
        open ? "border-neon-blue" : "border-slate-border"
      }`}
    >
      <h2>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full flex-wrap items-center gap-3 p-5 text-left sm:p-6"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-royal text-sm font-bold text-peach">
            {n}
          </span>
          <Icon className="size-4 shrink-0 text-neon-blue" />
          <span className="font-semibold text-white">{title}</span>
          <span className="ml-auto flex items-center gap-3">
            {!open && (
              <span className="rounded-full bg-midnight px-3 py-1 text-xs font-medium text-peach">
                Paso {n}: {summary}
              </span>
            )}
            <ChevronDown
              className={`size-5 shrink-0 text-neon-blue transition ${open ? "rotate-180" : ""}`}
            />
          </span>
        </button>
      </h2>
      <Collapse open={open} id={panelId}>
        <fieldset className="px-5 pb-5 sm:px-6 sm:pb-6">
          <legend className="sr-only">{title}</legend>
          {children}
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center gap-2 rounded-lg border border-peach/60 px-4 py-2 text-sm font-semibold text-peach transition hover:bg-peach/10"
            >
              {actionLabel}
              <ArrowRight className="size-4" />
            </button>
          </div>
        </fieldset>
      </Collapse>
    </div>
  );
}

function ChoiceCard({
  selected,
  onClick,
  title,
  detail,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  detail: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`relative flex flex-1 flex-col items-start rounded-xl border p-4 text-left transition ${
        selected
          ? "border-neon-blue bg-royal/40 shadow-[0_0_20px] shadow-neon-blue/30"
          : "border-slate-border hover:border-neon-blue/60"
      }`}
    >
      {selected && <Check className="absolute right-3 top-3 size-4 text-peach" />}
      <span className="pr-6 font-semibold text-white">{title}</span>
      <span className="mt-1 text-sm text-peach">{detail}</span>
    </button>
  );
}

const selectClass =
  "w-full rounded-lg border border-slate-border bg-obsidian px-3 py-2.5 text-sm text-slate-100 focus:border-neon-blue focus:outline-none";

function monthsFor(tier: Tier, current: number): number {
  const terms = tiers[tier].termMonths;
  return terms && !terms.includes(current) ? terms[0] : current;
}

export function QuoteCalculator({ initialTier }: { initialTier?: Tier }) {
  const [tier, setTier] = useState<Tier>(initialTier ?? "negocio");
  const [needsDesign, setNeedsDesign] = useState(false);
  const [modules, setModules] = useState<ModuleId[]>([]);
  const [months, setMonths] = useState(() => monthsFor(initialTier ?? "negocio", DEFAULT_MONTHS));
  const [frequency, setFrequency] = useState<Frequency>("quincenal");
  // Si el paquete llega preseleccionado por URL, se empieza en el paso 2.
  const [openStep, setOpenStep] = useState<number | null>(initialTier ? 2 : 1);

  const tierConfig = tiers[tier];

  const changeTier = (next: Tier) => {
    setTier(next);
    // Conserva solo los módulos que siguen teniendo precio en el nuevo paquete.
    setModules((current) => current.filter((id) => isSelectable(next, id)));
    setMonths((current) => monthsFor(next, current));
  };

  const toggleModule = (id: ModuleId) =>
    setModules((current) =>
      current.includes(id) ? current.filter((m) => m !== id) : [...current, id],
    );

  const toggleStep = (n: number) => setOpenStep((current) => (current === n ? null : n));

  const continueFrom = (n: number) => {
    if (n < LAST_STEP) {
      setOpenStep(n + 1);
      scrollToId(stepId(n + 1));
    } else {
      setOpenStep(null);
      scrollToId(SUMMARY_ID);
    }
  };

  const input = useMemo(
    () => ({ tier, needsDesign, modules, months, frequency }),
    [tier, needsDesign, modules, months, frequency],
  );
  const result = useMemo(() => calculateQuote(input), [input]);

  const design = tierConfig.design;
  const designDetail =
    design.kind === "price" ? `+${formatMXN(design.amount)}` : "Incluido ($0)";

  const modulesTotal = quoteModules.reduce((sum, m) => {
    const p = m.prices[tier];
    return p.kind === "price" && modules.includes(m.id) ? sum + p.amount : sum;
  }, 0);

  const summaries = {
    tier: `Paquete ${tierConfig.label} (${formatMXN(tierConfig.base)})`,
    design: needsDesign ? `Propuesta UI/UX (${designDetail})` : "Ya tengo diseño (+$0)",
    modules:
      modules.length === 0
        ? "Sin módulos extra"
        : `${modules.length} ${modules.length === 1 ? "módulo" : "módulos"} (+${formatMXN(modulesTotal)})`,
    payment: tierConfig.termMonths
      ? `${months} ${months === 1 ? "mes" : "meses"} · ${frequencies[frequency].label}`
      : `${tierConfig.fixedTermLabel} · 40% / 60%`,
  };

  const stepProps = (n: number) => ({
    n,
    open: openStep === n,
    onToggle: () => toggleStep(n),
    onAction: () => continueFrom(n),
    actionLabel: n < LAST_STEP ? "Continuar al siguiente paso" : "Ver resumen",
  });

  return (
    <section id="cotizador" className="bg-midnight/40 pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          as="h1"
          eyebrow="Cotizador"
          title="Simula tu cotización en minutos"
          description="Configura tu proyecto paso a paso y obtén al instante el total estimado y tu plan de pagos."
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 space-y-4 lg:col-span-7">
            <AccordionStep
              {...stepProps(1)}
              icon={Package}
              title="Nivel de paquete base"
              summary={summaries.tier}
            >
              <div role="radiogroup" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {tierOrder.map((id) => (
                  <ChoiceCard
                    key={id}
                    selected={tier === id}
                    onClick={() => changeTier(id)}
                    title={tiers[id].label}
                    detail={formatMXN(tiers[id].base)}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-mauve">{tierConfig.subtitle}</p>
            </AccordionStep>

            <AccordionStep
              {...stepProps(2)}
              icon={Palette}
              title="¿Cuentas con diseño visual listo?"
              summary={summaries.design}
            >
              <div role="radiogroup" className="flex flex-col gap-3 sm:flex-row">
                <ChoiceCard
                  selected={!needsDesign}
                  onClick={() => setNeedsDesign(false)}
                  title="Sí, ya tengo diseño/boceto"
                  detail="+$0"
                />
                <ChoiceCard
                  selected={needsDesign}
                  onClick={() => setNeedsDesign(true)}
                  title="No, necesito propuesta de diseño UI/UX"
                  detail={designDetail}
                />
              </div>
            </AccordionStep>

            <AccordionStep
              {...stepProps(3)}
              icon={Puzzle}
              title="Módulos extra"
              summary={summaries.modules}
            >
              <ModuleList
                tier={tier}
                selected={modules}
                onToggle={toggleModule}
                onUpgrade={changeTier}
              />
            </AccordionStep>

            <AccordionStep
              {...stepProps(4)}
              icon={Wallet}
              title="Plan de financiamiento / Plazo de pago"
              summary={summaries.payment}
            >
              <DeliveryTimeline tier={tier} className="mb-4" />
              {tierConfig.termMonths ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm text-slate-300">
                    Plazo de financiamiento
                    <select
                      className={`${selectClass} mt-1.5`}
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                    >
                      {tierConfig.termMonths.map((m) => (
                        <option key={m} value={m}>
                          {m} {m === 1 ? "mes" : "meses"}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm text-slate-300">
                    Frecuencia de pago
                    <select
                      className={`${selectClass} mt-1.5`}
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value as Frequency)}
                    >
                      {(Object.keys(frequencies) as Frequency[]).map((f) => (
                        <option key={f} value={f}>
                          {frequencies[f].label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <p className="text-sm text-slate-400 sm:col-span-2">
                    Anticipo del {Math.round(tierConfig.depositRate * 100)}% y el saldo en cuotas{" "}
                    {frequencies[frequency].label.toLowerCase()}es. El plazo de financiamiento
                    define el monto de cada cuota.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-300">
                  Plazo fijo de <strong className="text-white">{tierConfig.fixedTermLabel}</strong>.
                  Anticipo del 40% y un pago final del 60% contra entrega.
                </p>
              )}
              {hasPhasedDelivery(tier) && (
                <p className="mt-4 flex gap-2 rounded-lg bg-midnight/70 p-3 text-xs leading-relaxed text-slate-400">
                  <Info className="size-4 shrink-0 text-mauve" />
                  {PHASED_DELIVERY_NOTE}
                </p>
              )}
            </AccordionStep>
          </div>

          <QuoteSummary input={input} result={result} className="lg:col-span-5" />
        </div>
      </div>
    </section>
  );
}
