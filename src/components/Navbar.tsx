"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Menu, X } from "lucide-react";
import { navLinks } from "@/config/site";
import { Logo } from "@/components/Logo";
import { buttonStyles } from "@/components/ui/styles";

function ClientAccessButton() {
  return (
    <button
      type="button"
      disabled
      title="Próximamente"
      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-slate-500"
    >
      <Lock className="size-3.5" />
      Acceso Clientes
      <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-mauve">
        Pronto
      </span>
    </button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-border/40 bg-obsidian/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm text-slate-300 transition hover:text-peach">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <ClientAccessButton />
          <Link href="/cotizador" className={`${buttonStyles.primary} px-4 py-2`}>
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
        <div className="border-t border-slate-border/40 bg-obsidian/95 px-4 pb-6 lg:hidden">
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
            <Link href="/cotizador" onClick={() => setOpen(false)} className={buttonStyles.primary}>
              Cotizar Proyecto
            </Link>
            <ClientAccessButton />
          </div>
        </div>
      )}
    </header>
  );
}
