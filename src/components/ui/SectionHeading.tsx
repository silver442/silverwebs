interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Usa "h1" cuando el encabezado es el título principal de la página. */
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, description, as: Heading = "h2" }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-mauve">{eyebrow}</p>
      <Heading className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</Heading>
      {description && <p className="mt-4 text-slate-400">{description}</p>}
    </div>
  );
}
