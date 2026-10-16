import { tiers } from "@/data/quoteOptions";
import { formatMXN } from "@/lib/format";
import type { QuoteInput, QuoteResult } from "@/lib/quote";

interface QuoteContact {
  clientName: string;
  projectName: string;
}

export function quoteSubject({ projectName }: QuoteContact): string {
  return `Cotización SilverWebs – ${projectName}`;
}

/** Resumen en texto plano para WhatsApp y correo. */
export function buildQuoteMessage(
  input: QuoteInput,
  result: QuoteResult,
  contact: QuoteContact,
): string {
  const tier = tiers[input.tier];
  const extras = result.lines.slice(1);

  const lines = [
    "¡Hola Silvestre! Me interesa cotizar un proyecto con SilverWebs.",
    "",
    `Cliente: ${contact.clientName}`,
    `Proyecto / Negocio: ${contact.projectName}`,
    "",
    `Paquete: ${tier.label} – ${tier.subtitle} (${formatMXN(tier.base)})`,
    `Diseño visual: ${input.needsDesign ? "Necesito propuesta UI/UX" : "Ya tengo diseño/boceto"}`,
    "",
    "Módulos y extras:",
    ...(extras.length
      ? extras.map(
          (l) => `• ${l.label}: ${l.included ? "Incluido" : `+${formatMXN(l.amount)}`}`,
        )
      : ["• Sin módulos adicionales"]),
    "",
    `TOTAL ESTIMADO: ${formatMXN(result.total)} MXN`,
    `Anticipo: ${formatMXN(result.deposit)} (${Math.round(result.depositRate * 100)}%)`,
    `Plazo: ${result.termLabel}`,
    `Plan de pagos: ${result.planLabel}`,
    "",
    "Desglose de pagos:",
    ...result.schedule.map(
      (p) => `${p.n === 0 ? "" : `Pago ${p.n} – `}${p.concept}: ${formatMXN(p.amount)}`,
    ),
  ];

  return lines.join("\n");
}
