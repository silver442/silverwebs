const interaction =
  "inline-flex items-center justify-center gap-2 font-semibold transition duration-200 motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98] disabled:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue disabled:cursor-not-allowed disabled:opacity-50";
const base = `${interaction} rounded-xl px-5 py-3 text-sm`;

export const buttonStyles = {
  primary: `${base} bg-peach text-obsidian font-bold hover:bg-peach/90 shadow-lg shadow-peach/10`,
  outline: `${base} border border-neon-blue/80 bg-white/[0.03] text-slate-100 backdrop-blur hover:border-glow hover:bg-neon-blue/20`,
  /** Botón principal en píldora con degradado durazno → coral y halo (Hero y Navbar). */
  cta: `${interaction} rounded-full bg-gradient-to-r from-peach to-[#f7909c] font-bold text-obsidian shadow-[0_0_28px_-4px] shadow-peach/60 hover:brightness-105`,
  ghost: `${base} border border-slate-border/60 text-slate-300 hover:border-neon-blue`,
} as const;
