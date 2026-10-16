export const siteConfig = {
  name: "SilverWebs",
  owner: "Silvestre",
  description:
    "Desarrollo web full-stack a la medida: landing pages, e-commerce, sistemas de reservas y plataformas web sin plantillas ni comisiones ocultas.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "528142977687",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "silvestrehdz422@gmail.com",
  logo: "/images/bannerSilverWebs.png",
  profilePhoto: "/images/foto_perfil_silverWebs.png",
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
