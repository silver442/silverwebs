import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { siteConfig } from "@/config/site";
import { siteTypes } from "@/data/siteTypes";
import { buttonStyles } from "@/components/ui/styles";

function SiteTypeList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {siteTypes.map((type) => (
        <li
          key={type}
          className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <span className="size-1.5 rounded-full bg-neon-blue" />
          {type}
        </li>
      ))}
    </ul>
  );
}

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-obsidian via-obsidian to-midnight/60 pt-28 sm:pt-32"
    >
      {/* Luces de fondo */}
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-neon-blue/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tu plataforma web, construida desde cero.{" "}
            <span className="text-peach">Sin plantillas ni comisiones ocultas.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-400">
            Diseño y desarrollo sitios, tiendas en línea, sistemas de reservas y plataformas
            completas con tecnología moderna. Código 100% tuyo, precios claros desde el primer
            día y planes de pago que se adaptan a tu negocio.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/cotizador" className={buttonStyles.primary}>
              <Calculator className="size-4" />
              Simular mi Cotización
            </Link>
            <Link href="/#portafolio" className={buttonStyles.outline}>
              Ver Portafolio
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-0 scale-110 rounded-full bg-peach/20 blur-3xl" />
            <div className="relative size-64 overflow-hidden rounded-full ring-4 ring-neon-blue shadow-[0_0_60px_10px] shadow-neon-blue/40 sm:size-80 lg:size-96">
              <Image
                src={siteConfig.profilePhoto}
                alt={`${siteConfig.owner}, desarrollador web de ${siteConfig.name}`}
                fill
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 16rem"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="group relative overflow-hidden border-y border-slate-border/40 bg-surface/40 py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        aria-label="Tipos de sitios web que desarrollo"
      >
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          <SiteTypeList />
          <SiteTypeList hidden />
        </div>
      </div>
    </section>
  );
}
