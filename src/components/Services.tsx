import Link from "next/link";
import {
  Clock,
  CreditCard,
  Info,
  Layers,
  MinusCircle,
  Monitor,
  Settings,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { maintenanceFee, packages, TERM_NOTE, type ServicePackage } from "@/data/packages";
import { formatMXN } from "@/lib/format";
import { PackageFeatures } from "@/components/PackageFeatures";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonStyles } from "@/components/ui/styles";

const packageIcons: Record<ServicePackage["id"], LucideIcon> = {
  basico: Monitor,
  profesional: Settings,
  negocio: ShoppingCart,
  avanzado: Layers,
};

function PackageCard({ pkg }: { pkg: ServicePackage }) {
  const Icon = packageIcons[pkg.id];
  return (
    <article
      className={`glass-card relative flex h-full flex-col justify-between rounded-2xl p-6 lg:p-7 ${
        pkg.featured ? "glow-ring" : ""
      }`}
    >
      {pkg.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-peach px-3 py-1 text-xs font-bold text-obsidian shadow-lg shadow-peach/30">
          Más popular
        </span>
      )}
      <div>
        <div className="flex gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-glow/30 bg-glow/10">
            <Icon className="size-5 text-glow" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-peach/80">{pkg.name}</p>
            <h3 className="mt-1.5 text-lg font-bold leading-snug text-white xl:min-h-14">{pkg.subtitle}</h3>
          </div>
        </div>
        <p className="mt-6">
          <span className="text-xs text-slate-400">Desde </span>
          <span className="text-4xl font-extrabold text-peach">{formatMXN(pkg.price)}</span>
          <span className="text-sm text-slate-400"> MXN</span>
        </p>

        <dl className="mt-6 space-y-3 border-y border-slate-border/50 py-5 text-sm">
          <div className="flex gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-glow" />
            <div>
              <dt className="sr-only">Entrega</dt>
              {pkg.delivery.launch ? (
                <>
                  <dd className="text-slate-300">Versión funcional: {pkg.delivery.launch}</dd>
                  <dd className="text-slate-400">Desarrollo completo: {pkg.delivery.full}</dd>
                </>
              ) : (
                <dd className="text-slate-300">Entrega: {pkg.delivery.full}</dd>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <CreditCard className="mt-0.5 size-4 shrink-0 text-glow" />
            <div>
              <dt className="sr-only">Pagos</dt>
              <dd className="text-slate-300">{pkg.payment}</dd>
            </div>
          </div>
        </dl>

        <PackageFeatures features={pkg.features} />
        {pkg.limit && (
          <p className="mt-4 flex gap-2 text-xs text-slate-500">
            <MinusCircle className="mt-px size-3.5 shrink-0" />
            {pkg.limit}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        {pkg.termNote && (
          <p className="mt-6 flex gap-2 rounded-lg bg-abyss/60 p-3 text-xs text-slate-400">
            <Info className="size-4 shrink-0 text-mauve" />
            {TERM_NOTE}
          </p>
        )}

        <Link
          href={`/cotizador?plan=${pkg.id}`}
          className={`mt-7 ${pkg.featured ? buttonStyles.primary : buttonStyles.outline}`}
        >
          Cotizar paquete {pkg.name}
        </Link>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="servicios" className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Servicios"
          title="Paquetes claros, sin sorpresas"
          description="Elige el punto de partida ideal para tu proyecto. Todos incluyen código en GitHub de tu propiedad y despliegue profesional."
        />

        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="glass-card mx-auto mt-14 max-w-5xl rounded-2xl border-glow/50 p-5 sm:p-6 lg:mt-16 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="flex gap-4">
              <span className="flex size-10 shrink-0 sm:size-11 items-center justify-center rounded-xl border border-glow/30 bg-glow/10">
                <Wrench className="size-5 text-glow" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white sm:text-lg">{maintenanceFee.name}</h3>
                <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm">{maintenanceFee.description}</p>
              </div>
            </div>
            <p className="flex shrink-0 items-baseline gap-2 border-t border-slate-border/50 pt-4 md:block md:border-l md:border-t-0 md:pl-8 md:pt-0 md:text-right">
              <span className="text-xs uppercase tracking-[0.2em] text-peach/80 md:block">Cuota fija</span>
              <span className="ml-auto text-2xl font-extrabold text-peach sm:text-3xl md:ml-0">{formatMXN(maintenanceFee.price)}</span>
              <span className="text-sm text-slate-400"> MXN / {maintenanceFee.unit}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
