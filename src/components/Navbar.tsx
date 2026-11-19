"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Send, UserRound, X } from "lucide-react";
import { navLinks } from "@/config/site";
import { Logo } from "@/components/Logo";
import { buttonStyles } from "@/components/ui/styles";

function ClientAccessButton() {
  return (
    <button
      type="button"
      disabled
      title="Próximamente"
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300"
    >
      <UserRound className="size-4" />
      Acceso Clientes
      <span className="rounded-full border border-glow/50 bg-glow/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#8fb8ff]">
        Pronto
      </span>
    </button>
  );
}

const sectionIds = ["inicio", ...navLinks.flatMap((link) => (link.href.startsWith("/#") ? [link.href.slice(2)] : []))];

/** Enlace del menú que corresponde a la página actual o, en el inicio, a la sección visible. */
function useActiveHref(): string | null {
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSection(entry.target.id);
        }
      },
      // Cuenta como visible la sección que cruza la mitad de la pantalla.
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname !== "/") return pathname;
  return section && section !== "inicio" ? `/#${section}` : null;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const activeHref = useActiveHref();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-glow/15 bg-abyss/75 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = link.href === activeHref;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-2 text-[0.95rem] transition after:absolute after:inset-x-1 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-glow after:shadow-[0_0_8px] after:shadow-glow after:transition-opacity ${
                    active ? "text-white after:opacity-100" : "text-slate-300 after:opacity-0 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <ClientAccessButton />
          <Link href="/cotizador" className={`${buttonStyles.cta} px-6 py-3 text-sm`}>
            <Send className="size-4" />
            Cotizar Proyecto
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-200 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-glow/15 bg-abyss/95 px-4 pb-6 lg:hidden">
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-slate-200 hover:text-peach"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2">
            <Link href="/cotizador" onClick={() => setOpen(false)} className={`${buttonStyles.cta} px-6 py-3 text-sm`}>
              <Send className="size-4" />
              Cotizar Proyecto
            </Link>
            <ClientAccessButton />
          </div>
        </div>
      )}
    </header>
  );
}
