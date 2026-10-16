"use client";

import { useState } from "react";
import { Check, ChevronDown, Mail } from "lucide-react";
import { formatMXN } from "@/lib/format";
import { mailtoUrl, whatsappUrl } from "@/lib/links";
import { buildQuoteMessage, quoteSubject } from "@/lib/messages";
import type { QuoteInput, QuoteResult } from "@/lib/quote";
import { Collapse } from "@/components/ui/Collapse";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { buttonStyles } from "@/components/ui/styles";

export const SUMMARY_ID = "resumen-cotizacion";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-border bg-obsidian px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-neon-blue focus:outline-none";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-1 text-center">
      <dt className="text-xs text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm font-bold text-white">{value}</dd>
    </div>
  );
}

export function QuoteSummary({
  input,
  result,
  className = "",
}: {
  input: QuoteInput;
  result: QuoteResult;
  className?: string;
}) {
  const [showTable, setShowTable] = useState(false);
  const [showIncluded, setShowIncluded] = useState(false);
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectName] = useState("");

  const contact = { clientName: clientName.trim(), projectName: projectName.trim() };
  const canSend = contact.clientName.length > 0 && contact.projectName.length > 0;
  const message = buildQuoteMessage(input, result, contact);

  const [baseLine, ...otherLines] = result.lines;
  const includedLines = otherLines.filter((line) => line.included);
  const paidLines = otherLines.filter((line) => !line.included);

  return (
    <aside
      id={SUMMARY_ID}
      className={`min-w-0 scroll-mt-24 rounded-2xl border border-neon-blue bg-surface p-5 shadow-2xl shadow-neon-blue/10 sm:p-6 lg:sticky lg:top-24 ${className}`}
    >
      <h3 className="text-sm font-semibold uppercase tracking-widest text-mauve">
        Resumen de tu cotización
      </h3>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3">
        <p className="text-sm text-slate-400">Total estimado</p>
        <p className="text-3xl font-extrabold text-peach sm:text-4xl">
          {formatMXN(result.total)}{" "}
          <span className="text-base font-medium text-slate-400">MXN</span>
        </p>
      </div>

      <dl className="mt-5 grid grid-cols-2 divide-x divide-slate-border/40 border-y border-slate-border/40 py-3 sm:grid-cols-4">
        <Stat
          label={`Anticipo (${Math.round(result.depositRate * 100)}%)`}
          value={formatMXN(result.deposit)}
        />
        <Stat label="Plazo" value={result.termLabel} />
        <Stat label="Número de cuotas" value={String(result.installments)} />
        <Stat
          label="Monto por cuota"
          value={`${result.installmentsExact ? "" : "≈ "}${formatMXN(result.installmentAmount)}`}
        />
      </dl>
      <p className="mt-3 text-xs text-slate-400">{result.planLabel}</p>

      <div className="mt-5 space-y-1.5 border-t border-slate-border/60 pt-4 text-sm">
        {baseLine && (
          <div className="flex justify-between gap-3">
            <span className="text-slate-300">{baseLine.label}</span>
            <span className="shrink-0 text-slate-200">{formatMXN(baseLine.amount)}</span>
          </div>
        )}

        {includedLines.length > 0 && (
          <div>
            <button
              type="button"
              onClick={() => setShowIncluded((v) => !v)}
              aria-expanded={showIncluded}
              aria-controls="resumen-incluidos"
              className="flex w-full items-center justify-between gap-3 text-left text-emerald-400 transition hover:text-emerald-300"
            >
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5 shrink-0" />
                {includedLines.length}{" "}
                {includedLines.length === 1 ? "módulo incluido" : "módulos incluidos"} en el paquete
                ($0)
              </span>
              <ChevronDown
                className={`size-4 shrink-0 transition ${showIncluded ? "rotate-180" : ""}`}
              />
            </button>
            <Collapse open={showIncluded} id="resumen-incluidos">
              <ul className="mt-1.5 space-y-1 pl-5 text-xs text-slate-400">
                {includedLines.map((line) => (
                  <li key={line.label}>{line.label}</li>
                ))}
              </ul>
            </Collapse>
          </div>
        )}

        {paidLines.length > 0 && (
          <ul className="space-y-1.5">
            {paidLines.map((line) => (
              <li key={line.label} className="flex justify-between gap-3">
                <span className="text-slate-300">{line.label}</span>
                <span className="shrink-0 text-slate-200">{formatMXN(line.amount)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={() => setShowTable((v) => !v)}
        aria-expanded={showTable}
        className="mt-5 flex w-full items-center justify-between rounded-lg border border-slate-border px-3 py-2 text-sm text-slate-200 transition hover:border-neon-blue"
      >
        {showTable ? "Ocultar" : "Ver"} tabla de pagos
        <ChevronDown className={`size-4 transition ${showTable ? "rotate-180" : ""}`} />
      </button>

      {showTable && (
        <div className="mt-3 max-h-80 overflow-auto rounded-lg border border-slate-border">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-royal text-xs uppercase text-slate-200">
              <tr>
                <th className="px-3 py-2">N.º de Pago</th>
                <th className="px-3 py-2">Concepto / Periodo</th>
                <th className="px-3 py-2 text-right">Monto en MXN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-border/50 bg-surface">
              {result.schedule.map((p) => (
                <tr key={p.n}>
                  <td className="px-3 py-2 text-slate-400">{p.n === 0 ? "—" : p.n}</td>
                  <td className="px-3 py-2 text-slate-200">{p.concept}</td>
                  <td className="px-3 py-2 text-right font-medium text-white">
                    {formatMXN(p.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 space-y-3 border-t border-slate-border/60 pt-5">
        <label className="block text-sm text-slate-300">
          Tu nombre
          <input
            className={inputClass}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Ej. Ana López"
            autoComplete="name"
          />
        </label>
        <label className="block text-sm text-slate-300">
          Nombre de tu proyecto o negocio
          <input
            className={inputClass}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Ej. Café La Esquina"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <a
          href={canSend ? whatsappUrl(message) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!canSend}
          className={`${buttonStyles.primary} ${canSend ? "" : "pointer-events-none opacity-50"}`}
        >
          <WhatsappIcon className="size-4" />
          Enviar por WhatsApp
        </a>
        <a
          href={canSend ? mailtoUrl(quoteSubject(contact), message) : undefined}
          aria-disabled={!canSend}
          className={`${buttonStyles.outline} ${canSend ? "" : "pointer-events-none opacity-50"}`}
        >
          <Mail className="size-4" />
          Enviar por Correo
        </a>
        {!canSend && (
          <p className="text-center text-xs text-slate-500">
            Escribe tu nombre y el de tu proyecto para enviar la cotización.
          </p>
        )}
      </div>

      <p className="mt-5 text-xs text-slate-500">
        Cotización estimada. El precio final se confirma tras una breve llamada de levantamiento de
        requerimientos.
      </p>
    </aside>
  );
}
