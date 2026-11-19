import Link from "next/link";
import { Clock, CreditCard, Info, MinusCircle, Wrench } from "lucide-react";
import { maintenanceFee, packages, TERM_NOTE, type ServicePackage } from "@/data/packages";
import { formatMXN } from "@/lib/format";
import { PackageFeatures } from "@/components/PackageFeatures";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonStyles } from "@/components/ui/styles";

function PackageCard({ pkg }: { pkg: ServicePackage }) {
  return (
    <article
      className={`relative flex h-full flex-col justify-between rounded-2xl border bg-surface p-6 ${
        pkg.featured ? "border-peach shadow-xl shadow-peach/10" : "border-slate-border"
      }`}
    >
      {pkg.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-peach px-3 py-1 text-xs font-bold text-obsidian">
          Más popular
        </span>
      )}
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-mauve">{pkg.name}</p>
        <h3 className="mt-2 text-xl font-bold text-white xl:min-h-21">{pkg.subtitle}</h3>
        <p className="mt-4">
          <span className="text-xs text-slate-400">Desde </span>
          <span className="text-4xl font-extrabold text-peach">{formatMXN(pkg.price)}</span>
          <span className="text-sm text-slate-400"> MXN</span>
        </p>

        <dl className="mt-6 space-y-3 border-y border-slate-border/60 py-5 text-sm">
          <div className="flex gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-neon-blue" />
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
            <CreditCard className="mt-0.5 size-4 shrink-0 text-neon-blue" />
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
          <p className="mt-6 flex gap-2 rounded-lg bg-midnight/70 p-3 text-xs text-slate-400">
            <Info className="size-4 shrink-0 text-mauve" />
            {TERM_NOTE}
          </p>
        )}

        <Link
          href={`/cotizador?plan=${pkg.id}`}
          className={`mt-6 ${pkg.featured ? buttonStyles.primary : buttonStyles.outline}`}
        >
          Cotizar paquete {pkg.name}
        </Link>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="servicios" className="bg-obsidian py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Servicios"
          title="Paquetes claros, sin sorpresas"
          description="Elige el punto de partida ideal para tu proyecto. Todos incluyen código en GitHub de tu propiedad y despliegue profesional."
        />

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-neon-blue bg-midnight p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <span className="h-fit rounded-xl bg-royal p-2.5">
                <Wrench className="size-5 text-peach" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">{maintenanceFee.name}</h3>
                <p className="mt-2 max-w-2xl text-sm text-slate-400">{maintenanceFee.description}</p>
              </div>
            </div>
            <p className="shrink-0 md:text-right">
              <span className="block text-xs uppercase tracking-widest text-mauve">Cuota fija</span>
              <span className="text-3xl font-extrabold text-peach">{formatMXN(maintenanceFee.price)}</span>
              <span className="text-sm text-slate-400"> MXN / {maintenanceFee.unit}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
