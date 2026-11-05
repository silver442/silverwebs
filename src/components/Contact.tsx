"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { postContact, SUCCESS_MESSAGE, type SendStatus } from "@/lib/sendForm";
import { ContactChannels } from "@/components/ContactChannels";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonStyles } from "@/components/ui/styles";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-border bg-obsidian px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-neon-blue focus:outline-none";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<SendStatus>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const ok = await postContact({ type: "contact", nombre: name, email, mensaje: message, website });
    if (!ok) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");
  };

  const sending = status === "sending";

  return (
    <section id="contacto" className="bg-gradient-to-b from-obsidian via-midnight/70 to-obsidian py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contacto"
          title="Hablemos de tu proyecto"
          description="Cuéntame tu idea y te respondo en menos de 24 horas."
        />

        <div className="mx-auto grid max-w-3xl gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-slate-border bg-surface p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-slate-300">
                Nombre
                <input
                  required
                  maxLength={100}
                  className={inputClass}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </label>
              <label className="block text-sm text-slate-300">
                Correo electrónico
                <input
                  required
                  type="email"
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </label>
            </div>
            <label className="block text-sm text-slate-300">
              Mensaje
              <textarea
                required
                rows={6}
                maxLength={5000}
                className={inputClass}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Cuéntame qué necesitas…"
              />
            </label>
            {/* Campo trampa para bots: invisible para personas. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <button
              type="submit"
              disabled={sending}
              className={`${buttonStyles.primary} w-full sm:w-auto`}
            >
              {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              {sending ? "Enviando..." : "Enviar mensaje"}
            </button>

            <div aria-live="polite">
              {status === "success" && (
                <p className="flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-3 py-2.5 text-sm text-emerald-300">
                  <CheckCircle2 className="size-4 shrink-0" />
                  {SUCCESS_MESSAGE}
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2.5 text-sm text-red-400">
                  No se pudo enviar tu mensaje. Inténtalo de nuevo o escríbeme por WhatsApp.
                </p>
              )}
            </div>
          </form>

          <nav aria-label="Otros canales de contacto">
            <ContactChannels variant="sidebar" />
          </nav>
        </div>
      </div>
    </section>
  );
}
