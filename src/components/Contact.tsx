"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { mailtoUrl } from "@/lib/links";
import { ContactChannels } from "@/components/ContactChannels";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonStyles } from "@/components/ui/styles";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-border bg-obsidian px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-neon-blue focus:outline-none";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Sin backend por ahora: se abre el cliente de correo con el mensaje prellenado.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = `Nombre: ${name}\nCorreo: ${email}\n\n${message}`;
    window.location.href = mailtoUrl(`Contacto desde SilverWebs – ${name}`, body);
  };

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
                className={inputClass}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Cuéntame qué necesitas…"
              />
            </label>
            <button type="submit" className={`${buttonStyles.primary} w-full sm:w-auto`}>
              <Send className="size-4" />
              Enviar mensaje
            </button>
          </form>

          <nav aria-label="Otros canales de contacto">
            <ContactChannels variant="sidebar" />
          </nav>
        </div>
      </div>
    </section>
  );
}
