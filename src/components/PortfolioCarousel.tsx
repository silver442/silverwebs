"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_MS = 4000;
const SLIDE_MS = 500;
const SWIPE_PX = 50;

const navButtonClass =
  "absolute top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-border bg-surface/90 text-slate-200 backdrop-blur transition hover:border-peach hover:text-peach";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/**
 * Carrusel cíclico: los slides se renderizan tres veces y, al salir de la copia
 * central, se salta sin animación a la posición equivalente dentro de ella.
 */
export function PortfolioCarousel({ children }: { children: React.ReactNode }) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const perView = isDesktop ? 3 : isTablet ? 2 : 1;

  // Índice (en la pista triplicada) de la tarjeta enfocada; arranca en la copia central.
  const [focus, setFocus] = useState(n);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const busy = useRef(false);
  const pointerX = useRef<number | null>(null);
  // Evita que el clic que sigue a un arrastre con mouse abra un enlace.
  const swiped = useRef(false);

  const normalize = useCallback((i: number) => (i < n ? i + n : i >= 2 * n ? i - n : i), [n]);

  const moveTo = useCallback(
    (target: number) => {
      if (busy.current || target === focus) return;
      if (reducedMotion) {
        setAnimate(false);
        setFocus(normalize(target));
        return;
      }
      busy.current = true;
      setAnimate(true);
      setFocus(target);
    },
    [focus, normalize, reducedMotion],
  );

  // Al terminar el deslizamiento, vuelve a la copia central sin animación.
  useEffect(() => {
    if (!busy.current) return;
    const id = window.setTimeout(() => {
      busy.current = false;
      const normalized = normalize(focus);
      if (normalized !== focus) {
        setAnimate(false);
        setFocus(normalized);
      }
    }, SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [focus, normalize]);

  // Reactiva las transiciones tras pintar el salto.
  useEffect(() => {
    if (animate || reducedMotion) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [animate, reducedMotion]);

  useEffect(() => {
    if (paused || n < 2 || reducedMotion) return;
    const id = window.setInterval(() => moveTo(focus + 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, n, reducedMotion, focus, moveTo]);

  if (n === 0) return null;

  // En escritorio la tarjeta enfocada va al centro; en móvil/tablet, a la izquierda.
  const offset = isDesktop ? 1 : 0;
  const start = focus - offset;
  const active = focus % n;
  const track = [...slides, ...slides, ...slides];

  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerX.current === null) return;
    const dx = e.clientX - pointerX.current;
    pointerX.current = null;
    swiped.current = Math.abs(dx) >= SWIPE_PX;
    if (swiped.current) moveTo(focus + (dx < 0 ? 1 : -1));
  };

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Casos de éxito"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative">
        <div className="overflow-hidden py-2">
          <ul
            className={`flex gap-6 [--per:1] [touch-action:pan-y] sm:[--per:2] lg:[--per:3] ${
              animate ? "transition-transform duration-500 ease-out" : ""
            }`}
            style={{
              transform: `translateX(calc(${-start} * (100% + 1.5rem) / var(--per)))`,
            }}
            onPointerDown={(e) => {
              pointerX.current = e.clientX;
              swiped.current = false;
            }}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              pointerX.current = null;
            }}
          >
            {track.map((slide, i) => {
              const visible = i >= start && i < start + perView;
              const isFocused = i === focus;
              const faded = isDesktop && !isFocused;
              return (
                <li
                  key={i}
                  aria-roledescription="diapositiva"
                  aria-label={`${(i % n) + 1} de ${n}`}
                  aria-hidden={!visible}
                  inert={!visible}
                  onClickCapture={(e) => {
                    if (!faded && !swiped.current) return;
                    e.preventDefault();
                    e.stopPropagation();
                    if (!swiped.current) moveTo(i);
                    swiped.current = false;
                  }}
                  className={`flex shrink-0 basis-full sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)] ${
                    animate ? "transition duration-500 ease-out" : ""
                  } ${
                    faded
                      ? "pointer-events-none scale-95 cursor-pointer opacity-40 blur-[0.5px] md:pointer-events-auto"
                      : "z-10 scale-100 opacity-100"
                  } ${isFocused && isDesktop ? "[&>article]:border-neon-blue" : ""}`}
                >
                  {slide}
                </li>
              );
            })}
          </ul>
        </div>

        {n > 1 && (
          <>
            <button
              type="button"
              onClick={() => moveTo(focus - 1)}
              aria-label="Proyecto anterior"
              className={`${navButtonClass} left-2 lg:-left-5`}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => moveTo(focus + 1)}
              aria-label="Proyecto siguiente"
              className={`${navButtonClass} right-2 lg:-right-5`}
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {n > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => moveTo(n + i)}
              aria-label={`Ir al proyecto ${i + 1}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-peach" : "w-2 bg-slate-border hover:bg-neon-blue"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
