import type { QuoteInput } from "@/lib/quote";

export type SendStatus = "idle" | "sending" | "success" | "error";

export type ContactPayload =
  | { type: "contact"; nombre: string; email: string; mensaje: string; website?: string }
  | {
      type: "quote";
      nombre: string;
      negocio: string;
      email: string;
      input: QuoteInput;
      website?: string;
    };

export const SUCCESS_MESSAGE = "¡Enviado con éxito! Te responderé en menos de 24 horas.";

/** Envía el formulario a `/api/contact`; devuelve `true` si el correo salió. */
export async function postContact(payload: ContactPayload): Promise<boolean> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
