interface LegalDocumentProps {
  eyebrow: string;
  title: string;
  /** Fecha legible de la última actualización, p. ej. "15 de octubre de 2026". */
  updated: string;
  children: React.ReactNode;
}

/** Plantilla de lectura para páginas legales: estiliza los h2, párrafos y listas del contenido. */
export function LegalDocument({ eyebrow, title, updated, children }: LegalDocumentProps) {
  return (
    <main className="flex-1 bg-obsidian pb-24 pt-28 sm:pt-32">
      <article className="mx-auto max-w-3xl px-4 sm:px-6">
        <header className="border-b border-slate-border/60 pb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-mauve">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
          <p className="mt-4 text-sm text-slate-500">Última actualización: {updated}</p>
        </header>
        <div className="text-slate-300 [&_a]:text-peach [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_li]:mt-2 [&_p]:mt-4 [&_p]:leading-relaxed [&_strong]:text-white [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 [&_ul]:marker:text-neon-blue">
          {children}
        </div>
      </article>
    </main>
  );
}
