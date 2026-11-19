import "server-only";
import {
  deliveryLines,
  hasPhasedDelivery,
  PHASED_DELIVERY_NOTE,
  tiers,
} from "@/data/quoteOptions";
import { formatMXN } from "@/lib/format";
import type { QuoteInput, QuoteResult } from "@/lib/quote";

// Los clientes de correo ignoran las hojas de estilo: todo va en atributos `style`.
const colors = {
  obsidian: "#100E12",
  surface: "#1C1D29",
  border: "#313D6C",
  blue: "#2E4C9D",
  peach: "#F9B996",
  mauve: "#856474",
  text: "#E2E8F0",
  muted: "#94A3B8",
  green: "#34D399",
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function layout(title: string, body: string): string {
  return `<!doctype html>
<html lang="es">
<body style="margin:0;padding:24px 12px;background:${colors.obsidian};font-family:Arial,Helvetica,sans-serif;color:${colors.text};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    <tr><td style="padding:0 0 16px;font-size:20px;font-weight:bold;">
      <span style="font-family:monospace;color:${colors.blue};">&lt;</span><span style="font-family:monospace;color:${colors.peach};">/</span><span style="font-family:monospace;color:${colors.blue};">&gt;</span>
      <span style="color:#FFFFFF;">&nbsp;SilverWebs</span>
    </td></tr>
    <tr><td style="background:${colors.surface};border:1px solid ${colors.blue};border-radius:16px;padding:24px;">
      <h1 style="margin:0 0 16px;font-size:18px;color:#FFFFFF;">${title}</h1>
      ${body}
    </td></tr>
    <tr><td style="padding:16px 0 0;text-align:center;font-size:12px;color:${colors.muted};">
      SilverWebs · Desarrollo de Software · <a href="https://silverwebs.dev" style="color:${colors.peach};">silverwebs.dev</a>
    </td></tr>
  </table>
</body>
</html>`;
}

function field(label: string, value: string): string {
  return `<p style="margin:0 0 12px;"><span style="display:block;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:${colors.mauve};">${label}</span>${value}</p>`;
}

function row(label: string, value: string, color = colors.text): string {
  return `<tr>
    <td style="padding:6px 0;border-bottom:1px solid ${colors.border};color:${colors.text};">${label}</td>
    <td style="padding:6px 0;border-bottom:1px solid ${colors.border};text-align:right;white-space:nowrap;color:${color};">${value}</td>
  </tr>`;
}

export function contactEmailHtml({
  nombre,
  email,
  mensaje,
}: {
  nombre: string;
  email: string;
  mensaje: string;
}): string {
  return layout(
    "Nuevo mensaje de contacto",
    [
      field("Nombre", escapeHtml(nombre)),
      field(
        "Correo",
        `<a href="mailto:${escapeHtml(email)}" style="color:${colors.peach};">${escapeHtml(email)}</a>`,
      ),
      field(
        "Mensaje",
        `<span style="white-space:pre-line;">${escapeHtml(mensaje)}</span>`,
      ),
    ].join(""),
  );
}

interface QuoteContact {
  nombre: string;
  negocio: string;
  email: string;
}

export function quoteEmailHtml(
  input: QuoteInput,
  result: QuoteResult,
  contact: QuoteContact,
  { forClient }: { forClient: boolean },
): string {
  const tier = tiers[input.tier];
  const [base, ...others] = result.lines;
  const included = others.filter((l) => l.included);
  const paid = others.filter((l) => !l.included);
  const depositPct = Math.round(result.depositRate * 100);

  const intro = forClient
    ? `<p style="margin:0 0 16px;line-height:1.5;">¡Hola ${escapeHtml(contact.nombre)}! Recibí tu cotización para <strong>${escapeHtml(contact.negocio)}</strong>. Te responderé en menos de 24 horas para afinar los detalles. Este es el resumen que enviaste:</p>`
    : [
        field("Cliente", escapeHtml(contact.nombre)),
        field("Proyecto / Negocio", escapeHtml(contact.negocio)),
        field(
          "Correo",
          `<a href="mailto:${escapeHtml(contact.email)}" style="color:${colors.peach};">${escapeHtml(contact.email)}</a>`,
        ),
      ].join("");

  const lines = [
    base ? row(escapeHtml(base.label), formatMXN(base.amount)) : "",
    `<tr><td colspan="2" style="padding:6px 0;border-bottom:1px solid ${colors.border};color:${colors.muted};">Diseño visual: ${
      input.needsDesign ? "Necesita propuesta UI/UX" : "Ya cuenta con diseño/boceto"
    }</td></tr>`,
    ...paid.map((l) => row(escapeHtml(l.label), `+${formatMXN(l.amount)}`, colors.peach)),
    included.length
      ? `<tr><td colspan="2" style="padding:6px 0;border-bottom:1px solid ${colors.border};color:${colors.green};">✓ Incluidos en el paquete ($0): <span style="color:${colors.muted};">${included
          .map((l) => escapeHtml(l.label))
          .join(", ")}</span></td></tr>`
      : "",
  ].join("");

  const schedule = result.schedule
    .map(
      (p) => `<tr>
        <td style="padding:5px 8px;border-bottom:1px solid ${colors.border};color:${colors.muted};">${p.n === 0 ? "—" : p.n}</td>
        <td style="padding:5px 8px;border-bottom:1px solid ${colors.border};">${escapeHtml(p.concept)}</td>
        <td style="padding:5px 8px;border-bottom:1px solid ${colors.border};text-align:right;white-space:nowrap;">${formatMXN(p.amount)}</td>
      </tr>`,
    )
    .join("");

  const body = `
    ${intro}
    <h2 style="margin:20px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:${colors.mauve};">Paquete ${escapeHtml(tier.label)} – ${escapeHtml(tier.subtitle)}</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">${lines}</table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
      <tr>
        <td style="font-size:14px;color:${colors.muted};">Total estimado</td>
        <td style="text-align:right;font-size:26px;font-weight:bold;color:${colors.peach};">${formatMXN(result.total)} <span style="font-size:14px;color:${colors.muted};">MXN</span></td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;font-size:14px;">
      ${row(`Anticipo (${depositPct}%)`, formatMXN(result.deposit))}
      ${row("Plazo", escapeHtml(result.termLabel))}
      ${row("Número de cuotas", String(result.installments))}
      ${row("Monto por cuota", `${result.installmentsExact ? "" : "≈ "}${formatMXN(result.installmentAmount)}`)}
      ${deliveryLines(input.tier)
        .map(([label, value]) => row(label, escapeHtml(value)))
        .join("")}
      ${row("Plan de financiamiento", escapeHtml(result.planLabel))}
    </table>

    <h2 style="margin:20px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:${colors.mauve};">Tabla de pagos</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;border:1px solid ${colors.border};">
      <tr style="background:#1D2D73;color:#FFFFFF;">
        <th align="left" style="padding:6px 8px;">N.º</th>
        <th align="left" style="padding:6px 8px;">Concepto / Periodo</th>
        <th align="right" style="padding:6px 8px;">Monto MXN</th>
      </tr>
      ${schedule}
    </table>

    ${
      hasPhasedDelivery(input.tier)
        ? `<p style="margin:20px 0 0;padding:12px;border:1px solid ${colors.blue};border-radius:8px;font-size:12px;line-height:1.5;color:${colors.text};"><strong style="color:${colors.peach};">Entrega por fases:</strong> ${escapeHtml(PHASED_DELIVERY_NOTE)}</p>`
        : ""
    }
    <p style="margin:20px 0 0;font-size:12px;color:${colors.muted};">Cotización estimada. El precio final se confirma tras una breve llamada de levantamiento de requerimientos.</p>`;

  return layout(
    forClient ? "Tu cotización con SilverWebs" : "Nueva cotización desde el sitio",
    body,
  );
}
