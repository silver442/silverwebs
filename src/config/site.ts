/**
 * URL pública del sitio. Acepta el valor con o sin protocolo y, si falta,
 * usa el dominio oficial (o localhost en desarrollo).
 */
function resolveSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (!raw) {
    return process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://silverwebs.dev";
  }
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "SilverWebs",
  owner: "Silvestre",
  description:
    "Desarrollo web full-stack a la medida: landing pages, e-commerce, sistemas de reservas y plataformas web sin plantillas ni comisiones ocultas.",
  url: resolveSiteUrl(),
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  logo: "/images/bannerSilverWebs.png",
  profilePhoto: "/images/foto_perfil_silverWebs.webp",
  social: {
    facebook: "https://www.facebook.com/silverweboficial",
    linkedin: "https://www.linkedin.com/in/silvestre-hernandez-822240244/",
  },
} as const;

export const navLinks = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Portafolio", href: "/#portafolio" },
  { label: "Cotizador", href: "/cotizador" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contacto", href: "/#contacto" },
] as const;
