interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Usa "h1" cuando el encabezado es el título principal de la página. */
  as?: "h1" | "h2";
  align?: "center" | "left";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 max-w-2xl sm:mb-14 lg:mb-16 ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-peach sm:text-sm lg:text-base">{eyebrow}</p>
      <Heading className="mt-3 text-[1.75rem] font-bold leading-tight sm:mt-4 tracking-tight text-white sm:text-4xl sm:leading-tight lg:text-5xl">
        {title}
      </Heading>
      {description && <p className="mt-4 text-base leading-relaxed text-slate-400 sm:mt-5 sm:text-lg lg:text-xl">{description}</p>}
    </div>
  );
}
