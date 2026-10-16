import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { blogCategories, posts } from "@/data/blog";
import { buttonStyles } from "@/components/ui/styles";

const title = "Blog & Recursos sobre Desarrollo Web y Negocios Digitales";
const description =
  "Guías prácticas, consejos y recursos sobre desarrollo web, tiendas en línea, SEO y transformación digital para emprendedores y negocios en México.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `${title} | SilverWebs`,
    description,
    url: "/blog",
    type: "website",
    locale: "es_MX",
  },
};

const dateFormat = new Intl.DateTimeFormat("es-MX", { dateStyle: "long", timeZone: "UTC" });

export default function BlogPage() {
  return (
    <main className="flex-1 bg-gradient-to-b from-obsidian to-midnight/50 pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-mauve">Blog</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
          <p className="mt-4 text-slate-400">{description}</p>
        </header>

        <ul className="mt-10 flex flex-wrap justify-center gap-2" aria-label="Categorías">
          {blogCategories.map((category) => (
            <li
              key={category}
              className="rounded-full border border-slate-border bg-surface px-3 py-1 text-xs text-slate-300"
            >
              {category}
            </li>
          ))}
        </ul>

        {posts.length === 0 ? (
          <section className="mx-auto mt-12 max-w-xl rounded-2xl border border-slate-border bg-surface p-8 text-center">
            <BookOpen className="mx-auto size-10 text-neon-blue" />
            <h2 className="mt-4 text-xl font-bold text-white">Próximamente</h2>
            <p className="mt-2 text-sm text-slate-400">
              Estamos preparando los primeros artículos. Mientras tanto, puedes simular el costo
              de tu proyecto o escribirnos con tus dudas.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/cotizador" className={buttonStyles.primary}>
                Ir al cotizador
              </Link>
              <Link href="/#contacto" className={buttonStyles.outline}>
                Contáctanos
              </Link>
            </div>
          </section>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-slate-border bg-surface p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-mauve">
                  {post.category}
                </p>
                <h2 className="mt-2 text-lg font-bold text-white">{post.title}</h2>
                <p className="mt-2 text-sm text-slate-400">{post.excerpt}</p>
                <time dateTime={post.publishedAt} className="mt-4 block text-xs text-slate-500">
                  {dateFormat.format(new Date(post.publishedAt))}
                </time>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
