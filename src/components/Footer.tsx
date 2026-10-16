import Link from "next/link";
import { ContactChannels } from "@/components/ContactChannels";
import { CurrentYear } from "@/components/CurrentYear";

const columns = [
  {
    title: "Explorar",
    links: [
      { label: "Servicios", href: "/#servicios" },
      { label: "Portafolio", href: "/#portafolio" },
      { label: "Cotizador", href: "/cotizador" },
      { label: "Preguntas Frecuentes", href: "/#faq" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    showChannels: true,
    links: [
      { label: "Política de Privacidad", href: "/privacidad" },
      { label: "Términos y Condiciones", href: "/terminos" },
    ],
  },
];

function FooterBrand() {
  return (
    <div className="max-w-xs">
      <Link href="/" className="inline-flex items-center gap-3">
        <span className="font-mono text-xl font-bold text-peach">&lt;/&gt;</span>
        <span className="font-bold leading-tight text-white">
          SilverWebs
          <span className="block text-sm font-normal text-slate-400">Desarrollo de Software</span>
        </span>
      </Link>
      <p className="mt-4 text-sm text-slate-400">
        Sitios y plataformas web a la medida, con código 100% tuyo y precios claros.
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-obsidian">
      <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-12 px-4 py-14 sm:px-6 md:flex-row">
        <FooterBrand />
        {columns.map((column) => (
          <div key={column.title} className="w-auto">
            <nav aria-label={column.title}>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-mauve">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-300 transition hover:text-peach">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {column.showChannels && (
              <div className="mt-6">
                <ContactChannels variant="footer" />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="px-4 pb-8 text-center text-xs text-slate-500 sm:px-6">
        © <CurrentYear /> SilverWebs. Todos los derechos reservados.
      </p>
    </footer>
  );
}
