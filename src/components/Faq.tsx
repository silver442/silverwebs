"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, PackageCheck, UsersRound, type LucideIcon } from "lucide-react";
import { faqs, scope } from "@/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";

function ScopeCard({
  title,
  items,
  Icon,
  tone,
}: {
  title: string;
  items: readonly string[];
  Icon: LucideIcon;
  tone: "blue" | "peach";
}) {
  const color = tone === "blue" ? "text-glow" : "text-peach";
  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 lg:p-8">
      <h3 className="flex items-center gap-3 text-base font-bold text-white sm:text-lg">
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${
            tone === "blue" ? "border-glow/30 bg-glow/10" : "border-peach/30 bg-peach/10"
          }`}
        >
          <Icon className={`size-5 ${color}`} />
        </span>
        {title}
      </h3>
      <ul className="mt-5 space-y-2.5 text-xs text-slate-300 sm:mt-6 sm:space-y-3 sm:text-sm">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Check className={`mt-0.5 size-4 shrink-0 ${color}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid sm:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="Preguntas frecuentes"
              title="Plazos, pagos y alcances"
              description="Todo lo que necesitas saber antes de iniciar tu proyecto."
            />
            <div className="relative mx-auto -mt-4 hidden aspect-[47/32] max-w-md sm:block lg:mx-0">
              <div className="absolute inset-x-10 bottom-4 h-16 rounded-full bg-glow/20 blur-3xl" />
              <Image
                src="/images/ilustraciones/laptop-codigo.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="fade-edges object-contain"
              />
            </div>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              const panelId = `faq-panel-${i}`;
              return (
                <div
                  key={faq.question}
                  className={`glass-card rounded-xl ${isOpen ? "border-glow/60" : ""}`}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold text-white sm:gap-4 sm:px-6 sm:py-4 sm:text-base"
                    >
                      {faq.question}
                      <ChevronDown
                        className={`size-4 shrink-0 text-glow transition sm:size-5 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </h3>
                  <div id={panelId} hidden={!isOpen} className="px-4 pb-4 text-xs leading-relaxed text-slate-400 sm:px-6 sm:pb-5 sm:text-sm">
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-24 lg:gap-8">
          <ScopeCard title="Qué incluye mi desarrollo" items={scope.included} Icon={PackageCheck} tone="blue" />
          <ScopeCard
            title="Lo entrega el cliente o se cotiza aparte"
            items={scope.client}
            Icon={UsersRound}
            tone="peach"
          />
        </div>
      </div>
    </section>
  );
}
