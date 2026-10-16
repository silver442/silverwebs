"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, UserRound } from "lucide-react";
import { faqs, scope } from "@/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";

function ScopeTable() {
  return (
    <div className="mt-16 overflow-hidden rounded-2xl border border-slate-border">
      <div className="grid md:grid-cols-2">
        <div className="bg-surface p-6">
          <h3 className="flex items-center gap-2 font-bold text-white">
            <CheckCircle2 className="size-5 text-neon-blue" />
            Qué incluye mi desarrollo
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
            {scope.included.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-neon-blue" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-slate-border bg-midnight/60 p-6 md:border-l md:border-t-0">
          <h3 className="flex items-center gap-2 font-bold text-white">
            <UserRound className="size-5 text-peach" />
            Lo entrega el cliente o se cotiza aparte
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
            {scope.client.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-peach" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-obsidian py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Plazos, pagos y alcances"
          description="Todo lo que necesitas saber antes de iniciar tu proyecto."
        />

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            return (
              <div
                key={faq.question}
                className={`rounded-xl border bg-surface transition ${isOpen ? "border-neon-blue" : "border-slate-border"}`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-white"
                  >
                    {faq.question}
                    <ChevronDown
                      className={`size-5 shrink-0 text-neon-blue transition ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <div id={panelId} hidden={!isOpen} className="px-5 pb-5 text-sm text-slate-400">
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>

        <ScopeTable />
      </div>
    </section>
  );
}
