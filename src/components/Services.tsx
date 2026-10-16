import Link from "next/link";
import { CalendarClock, Clock, CreditCard, Info, Wrench } from "lucide-react";
import { maintenancePlans, packages, TERM_NOTE, type ServicePackage } from "@/data/packages";
import { formatMXN } from "@/lib/format";
import { PackageFeatures } from "@/components/PackageFeatures";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonStyles } from "@/components/ui/styles";

function PackageCard({ pkg }: { pkg: ServicePackage }) {
  return (
    <article
      className={`relative flex h-full flex-col justify-between rounded-2xl border bg-surface p-6 sm:p-8 ${
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
        <h3 className="mt-2 text-xl font-bold text-white">{pkg.subtitle}</h3>
        <p className="mt-4">
          <span className="text-xs text-slate-400">Desde </span>
          <span className="text-4xl font-extrabold text-peach">{formatMXN(pkg.price)}</span>
          <span className="text-sm text-slate-400"> MXN</span>
        </p>

        <dl className="mt-6 space-y-3 border-y border-slate-border/60 py-5 text-sm">
          <div className="flex gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-neon-blue" />
            <div>
              <dt className="sr-only">Plazo</dt>
              <dd className="text-slate-300">Plazo: {pkg.term}</dd>
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

        <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-neon-blue bg-midnight p-6 sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="lg:w-1/3">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-royal p-2.5">
                  <Wrench className="size-5 text-peach" />
                </span>
                <h3 className="text-xl font-bold text-white">Mantenimiento Web</h3>
              </div>
              <p className="mt-3 text-sm text-slate-400">
                Tu proyecto no se queda solo después de la entrega. Elige la modalidad que mejor
                se adapte a ti.
              </p>
            </div>
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              {maintenancePlans.map((plan) => (
                <div key={plan.name} className="rounded-xl border border-slate-border bg-surface/60 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <CalendarClock className="size-4 text-neon-blue" />
                    {plan.name}
                  </div>
                  <p className="mt-2">
                    <span className="text-2xl font-extrabold text-peach">{formatMXN(plan.price)}</span>
                    <span className="text-sm text-slate-400"> MXN / {plan.unit}</span>
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
