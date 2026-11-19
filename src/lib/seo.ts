import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const defaultTitle = `${siteConfig.name} | Desarrollo Web a la Medida`;

/** Imagen social generada por app/opengraph-image.tsx. */
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}: desarrollo web a la medida`,
};

/** Convierte una ruta relativa ("/blog") en URL absoluta del sitio. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

interface PageMetadataOptions {
  /** Título corto; el layout le añade "| SilverWebs". */
  title: string;
  description: string;
  path: string;
  /** Título para redes sociales, si debe ser distinto al de la pestaña. */
  socialTitle?: string;
}

/**
 * Metadatos de una página interna: canonical, Open Graph y Twitter coherentes.
 * Definir `openGraph`/`twitter` reemplaza por completo los del layout (incluida la imagen
 * de app/opengraph-image), por eso se repiten aquí título e imagen.
 */
export function pageMetadata({ title, description, path, socialTitle }: PageMetadataOptions): Metadata {
  const fullTitle = `${socialTitle ?? title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "es_MX",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

/** JSON-LD BreadcrumbList "Inicio → Página". */
export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name, item: absoluteUrl(path) },
    ],
  };
}
