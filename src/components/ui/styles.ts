const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue disabled:cursor-not-allowed disabled:opacity-50";

export const buttonStyles = {
  primary: `${base} bg-peach text-obsidian font-bold hover:bg-peach/90 shadow-lg shadow-peach/10`,
  outline: `${base} border border-neon-blue text-slate-100 hover:bg-neon-blue/20`,
  ghost: `${base} border border-slate-border/60 text-slate-300 hover:border-neon-blue`,
} as const;
