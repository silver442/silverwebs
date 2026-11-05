"use client";

import { whatsappUrl } from "@/lib/links";
import { WhatsappIcon } from "@/components/ui/BrandIcons";

const GREETING = "Hola Silvestre, vi tu sitio silverwebs.dev y me gustaría cotizar un proyecto...";
const LABEL = "¿Hablamos por WhatsApp?";

/** El enlace se arma al hacer clic para que el número no aparezca en el HTML. */
export function FloatingWhatsApp() {
  return (
    <button
      type="button"
      onClick={() => window.open(whatsappUrl(GREETING), "_blank", "noopener,noreferrer")}
      aria-label={LABEL}
      className="group fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#25D366]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach"
    >
      <WhatsappIcon className="size-7" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md border border-slate-border bg-obsidian px-2.5 py-1.5 text-xs text-slate-200 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {LABEL}
      </span>
    </button>
  );
}
