import Image from "next/image";
import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  CalendarDays,
  CodeXml,
  Send,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { LightStreaks } from "@/components/ui/LightStreaks";
import { buttonStyles } from "@/components/ui/styles";

const highlights: { title: string; detail: string; Icon: LucideIcon }[] = [
  { title: "Código 100% tuyo", detail: "Sin plantillas", Icon: CodeXml },
  { title: "Pagos en cuotas", detail: "Flexibles y a tu ritmo", Icon: CalendarDays },
  { title: "Precio claro", detail: "Desde el primer día", Icon: Zap },
  { title: "30 días de garantía", detail: "En cada entrega", Icon: ShieldCheck },
];

function HighlightList() {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-8 lg:grid-cols-4 lg:gap-0">
      {highlights.map(({ title, detail, Icon }, i) => (
        <li
          key={title}
          className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 xl:gap-5 ${
            i === 0 ? "lg:pr-6 xl:pr-8" : "lg:border-l lg:border-glow/25 lg:px-6 xl:px-8"
          }`}
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border-2 sm:size-14 sm:rounded-2xl border-glow/70 bg-glow/10 shadow-[0_0_24px_-4px] shadow-glow/60">
            <Icon className="size-5 text-[#5b9bff] sm:size-6" strokeWidth={2.25} />
          </span>
          <span>
            <span className="block text-sm font-bold text-white sm:whitespace-nowrap sm:text-lg">{title}</span>
            <span className="block text-xs text-slate-400 sm:text-base">{detail}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="bg-premium relative overflow-hidden pt-28 sm:pt-40">
      {/* Luces de fondo */}
      <LightStreaks position="top-left" />
      <LightStreaks position="bottom-left" />
      <LightStreaks position="bottom-right" />
      <div className="pointer-events-none absolute right-0 top-20 size-[40rem] translate-x-1/4 rounded-full bg-glow/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:pb-28">
        <div className="grid items-center gap-12 sm:gap-16 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
          <div>
            <h1 className="text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl xl:text-[4rem]">
              Convierte tu idea en <br className="hidden sm:block" />
              un{" "}
              <span className="bg-gradient-to-r from-[#3b9bff] via-[#5f7cf8] to-[#8b6cf6] bg-clip-text text-transparent">
                sitio web real.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#b8c4ea] sm:mt-7 sm:text-xl">
              Diseño y desarrollo de sitios, tiendas en línea y sistemas personalizados, sin
              plantillas y con código 100% tuyo.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-6">
              <Link href="/#contacto" className={`${buttonStyles.cta} px-6 py-3 text-sm sm:px-8 sm:py-4 sm:text-base`}>
                <Send className="size-4 sm:size-5" />
                Pide información por mensaje
                <ArrowRight className="size-4 sm:size-5" />
              </Link>
              <Link
                href="/#portafolio"
                className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-glow/80 bg-white/[0.02] px-6 py-3 text-sm font-semibold sm:px-8 sm:py-4 sm:text-base text-white shadow-[0_0_24px_-8px] shadow-glow transition duration-200 hover:bg-glow/15 motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue"
              >
                <AppWindow className="size-5 text-[#5b9bff] sm:size-6" />
                Ver portafolio
                <ArrowRight className="size-4 text-[#5b9bff] sm:size-5" />
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 scale-125 rounded-full bg-glow/25 blur-3xl" />
              <div className="relative size-60 overflow-hidden rounded-full border-[3px] border-[#4f8bff] shadow-[0_0_40px_4px_rgb(59_130_246/0.7),0_0_120px_20px_rgb(59_130_246/0.3)] sm:size-96 lg:size-[26rem]">
                <Image
                  src={siteConfig.profilePhoto}
                  alt={`${siteConfig.owner}, desarrollador web de ${siteConfig.name}`}
                  fill
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 24rem, 15rem"
                  priority
                  className="object-cover"
                />
              </div>
              {/* Insignia flotante de código */}
              <span
                aria-hidden="true"
                className="absolute -right-5 top-2 flex h-12 w-20 -rotate-6 items-center justify-center rounded-2xl border-2 border-glow bg-abyss/75 shadow-[0_0_32px_-2px] shadow-glow backdrop-blur motion-safe:animate-float sm:-right-10 sm:top-8 sm:h-20 sm:w-32 sm:rounded-[1.75rem]"
              >
                <CodeXml className="size-8 text-[#9cc2ff] sm:size-12" strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-20 lg:mt-28">
          <HighlightList />
        </div>
      </div>
    </section>
  );
}
