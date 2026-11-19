import { Resend } from "resend";
import { frequencies, parseTier, tiers, type Frequency, type ModuleId } from "@/data/quoteOptions";
import { contactEmailHtml, quoteEmailHtml } from "@/lib/email";
import { calculateQuote, isSelectable, type QuoteInput } from "@/lib/quote";
import { EMAIL_PATTERN } from "@/lib/sendForm";

type Body = Record<string, unknown>;

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= max ? trimmed : null;
}

function email(value: unknown): string | null {
  const v = text(value, 254);
  return v && EMAIL_PATTERN.test(v) ? v : null;
}

/** Reconstruye la cotización a partir de las opciones elegidas; los montos se recalculan aquí. */
function parseQuoteInput(value: unknown): QuoteInput | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Body;
  const tier = parseTier(raw.tier);
  const frequency = Object.keys(frequencies).find((f) => f === raw.frequency) as
    | Frequency
    | undefined;
  if (!tier || !frequency || typeof raw.needsDesign !== "boolean") return null;

  const terms = tiers[tier].termMonths;
  const months = typeof raw.months === "number" ? raw.months : NaN;
  if (terms && !terms.includes(months)) return null;

  const modules = Array.isArray(raw.modules)
    ? raw.modules.filter(
        (id): id is ModuleId => typeof id === "string" && isSelectable(tier, id as ModuleId),
      )
    : [];

  return { tier, needsDesign: raw.needsDesign, modules, months: terms ? months : 0, frequency };
}

function fail(status: number, error: string) {
  return Response.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("Faltan variables de entorno de Resend");
    return fail(500, "El envío de correos no está configurado.");
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return fail(400, "Solicitud inválida.");
  }

  // Honeypot: los bots llenan el campo oculto; se responde éxito sin enviar nada.
  if (typeof body.website === "string" && body.website.length > 0) {
    return Response.json({ ok: true });
  }

  const resend = new Resend(RESEND_API_KEY);
  const nombre = text(body.nombre, 100);
  const from = email(body.email);

  if (body.type === "contact") {
    const mensaje = text(body.mensaje, 5000);
    if (!nombre || !from || !mensaje) return fail(400, "Revisa los datos del formulario.");

    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: from,
      subject: `Contacto desde SilverWebs – ${nombre}`,
      html: contactEmailHtml({ nombre, email: from, mensaje }),
    });
    if (error) {
      console.error("Resend (contacto):", error);
      return fail(502, "No se pudo enviar el mensaje.");
    }
    return Response.json({ ok: true });
  }

  if (body.type === "quote") {
    const negocio = text(body.negocio, 120);
    const input = parseQuoteInput(body.input);
    if (!nombre || !negocio || !from || !input) {
      return fail(400, "Revisa los datos de la cotización.");
    }

    const result = calculateQuote(input);
    const contact = { nombre, negocio, email: from };

    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: from,
      subject: `Cotización SilverWebs – ${negocio}`,
      html: quoteEmailHtml(input, result, contact, { forClient: false }),
    });
    if (error) {
      console.error("Resend (cotización):", error);
      return fail(502, "No se pudo enviar la cotización.");
    }

    // La copia al cliente es secundaria: si falla, la cotización ya llegó.
    const copy = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: from,
      replyTo: CONTACT_TO_EMAIL,
      subject: `Tu cotización con SilverWebs – ${negocio}`,
      html: quoteEmailHtml(input, result, contact, { forClient: true }),
    });
    if (copy.error) console.error("Resend (copia al cliente):", copy.error);

    return Response.json({ ok: true });
  }

  return fail(400, "Tipo de envío no válido.");
}
