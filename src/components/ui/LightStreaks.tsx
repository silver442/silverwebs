import { useId } from "react";

const positions = {
  "top-left": "left-0 top-0",
  "bottom-left": "bottom-0 left-0 -scale-y-100",
  "bottom-right": "bottom-0 right-0 rotate-180",
} as const;

/** Curvas de luz azules decorativas para las esquinas de una sección (solo SVG, sin imágenes). */
export function LightStreaks({ position }: { position: keyof typeof positions }) {
  const id = useId();
  const gradient = `${id}-gradient`;
  const blur = `${id}-blur`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 300"
      fill="none"
      className={`pointer-events-none absolute w-[28rem] sm:w-[38rem] ${positions[position]}`}
    >
      <defs>
        <linearGradient id={gradient} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#3b82f6" stopOpacity="0.9" />
          <stop offset="0.6" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
        <filter id={blur} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <path
        d="M0 250 C 120 200, 220 80, 420 20"
        stroke={`url(#${gradient})`}
        strokeWidth="26"
        filter={`url(#${blur})`}
        opacity="0.45"
      />
      <path d="M0 250 C 120 200, 220 80, 420 20" stroke={`url(#${gradient})`} strokeWidth="2" />
      <path
        d="M0 290 C 160 250, 300 140, 560 70"
        stroke={`url(#${gradient})`}
        strokeWidth="1.25"
        opacity="0.6"
      />
    </svg>
  );
}
