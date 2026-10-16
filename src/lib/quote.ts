import {
  frequencies,
  quoteModules,
  tiers,
  type Frequency,
  type ModuleId,
  type Tier,
} from "@/data/quoteOptions";

export interface QuoteInput {
  tier: Tier;
  needsDesign: boolean;
  modules: ModuleId[];
  months: number;
  frequency: Frequency;
}

export interface QuoteLine {
  label: string;
  amount: number;
  included: boolean;
}

export interface Payment {
  n: number;
  concept: string;
  amount: number;
}

export interface QuoteResult {
  lines: QuoteLine[];
  total: number;
  deposit: number;
  depositRate: number;
  /** Número de pagos después del anticipo. */
  installments: number;
  /** Monto típico por cuota (puede variar $1 por redondeo). */
  installmentAmount: number;
  installmentsExact: boolean;
  termLabel: string;
  planLabel: string;
  schedule: Payment[];
}

/** Módulos que el cliente puede marcar en este paquete (con precio). */
export function isSelectable(tier: Tier, id: ModuleId): boolean {
  const option = quoteModules.find((m) => m.id === id);
  return option?.prices[tier].kind === "price";
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const tier = tiers[input.tier];
  const lines: QuoteLine[] = [
    { label: `Paquete ${tier.label} (${tier.subtitle})`, amount: tier.base, included: false },
  ];

  if (input.needsDesign) {
    const design = tier.design;
    lines.push({
      label: "Propuesta de diseño UI/UX",
      amount: design.kind === "price" ? design.amount : 0,
      included: design.kind === "included",
    });
  }

  for (const option of quoteModules) {
    const p = option.prices[input.tier];
    if (p.kind === "included") {
      lines.push({ label: option.label, amount: 0, included: true });
    } else if (p.kind === "price" && input.modules.includes(option.id)) {
      const label = p.note ? `${option.label} (${p.note})` : option.label;
      lines.push({ label, amount: p.amount, included: false });
    }
  }

  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  const deposit = Math.round(total * tier.depositRate);
  const remaining = total - deposit;
  const depositPct = Math.round(tier.depositRate * 100);

  const schedule: Payment[] = [
    { n: 0, concept: `Anticipo (${depositPct}%) al iniciar el proyecto`, amount: deposit },
  ];

  // Básico: un solo pago final contra entrega.
  if (!tier.termMonths) {
    schedule.push({
      n: 1,
      concept: `Pago final (${100 - depositPct}%) contra entrega`,
      amount: remaining,
    });
    return {
      lines,
      total,
      deposit,
      depositRate: tier.depositRate,
      installments: 1,
      installmentAmount: remaining,
      installmentsExact: true,
      termLabel: tier.fixedTermLabel ?? "",
      planLabel: `Anticipo ${depositPct}% + pago final ${100 - depositPct}% contra entrega`,
      schedule,
    };
  }

  const freq = frequencies[input.frequency];
  const count = input.months * freq.perMonth;
  // Reparte el saldo en pesos enteros; las primeras cuotas absorben el residuo ($1 c/u).
  const baseAmount = Math.floor(remaining / count);
  const extra = remaining - baseAmount * count;
  for (let i = 1; i <= count; i++) {
    schedule.push({
      n: i,
      concept: `${freq.periodLabel} ${i}`,
      amount: baseAmount + (i <= extra ? 1 : 0),
    });
  }

  const monthsLabel = `${input.months} ${input.months === 1 ? "mes" : "meses"}`;
  return {
    lines,
    total,
    deposit,
    depositRate: tier.depositRate,
    installments: count,
    installmentAmount: Math.round(remaining / count),
    installmentsExact: extra === 0,
    termLabel: monthsLabel,
    planLabel: `Anticipo ${depositPct}% + ${count} pagos ${freq.label.toLowerCase()}es en ${monthsLabel}`,
    schedule,
  };
}
