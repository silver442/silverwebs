import { tiers, type Delivery, type Tier } from "@/data/quoteOptions";

export interface ServicePackage {
  id: Tier;
  name: string;
  subtitle: string;
  price: number;
  delivery: Delivery;
  payment: string;
  featured?: boolean;
  termNote?: boolean;
  features: string[];
  /** Lo que el paquete no incluye, para dejar claro el límite. */
  limit?: string;
}

export const TERM_NOTE =
  "El plazo elegido define el monto de tus cuotas; los tiempos de entrega se indican en cada paquete.";

export const packages: ServicePackage[] = [
  {
    id: "basico",
    name: "Básico",
    subtitle: "Presencia Web",
    price: tiers.basico.base,
    delivery: tiers.basico.delivery,
    payment: "2 pagos: 40% anticipo / 60% al finalizar",
    features: [
      "Sitio multipágina o de 4 a 5 secciones estáticas (Inicio, Servicios, Galería, Acerca de, Contacto)",
      "Diseño 100% responsivo",
      "Alojado en Vercel/Netlify (hosting gratuito)",
      "Entrega de código en GitHub",
      "Subdominio por defecto",
      "Hasta 2 rondas de revisión",
    ],
    limit: "No incluye SEO, dominio personalizado ni panel autoadministrable.",
  },
  {
    id: "profesional",
    name: "Profesional",
    subtitle: "Web Autoadministrable",
    price: tiers.profesional.base,
    delivery: tiers.profesional.delivery,
    payment:
      "20% anticipo ($1,500) y $6,000 en cuotas semanales, quincenales o mensuales de 1 a 3 meses",
    termNote: true,
    features: [
      "Todo lo del Básico",
      "Panel ligero autoadministrable: edita precios, textos e imágenes sin depender de soporte técnico",
      "SEO incluido",
      "Botón de WhatsApp integrado",
      "Dominio .com incluido por 1 año",
      "Revisiones semanales",
    ],
    limit: "Sin captura ni login de usuarios/clientes finales (solo acceso del dueño para editar contenido).",
  },
  {
    id: "negocio",
    name: "Negocio",
    subtitle: "Web Interactiva con BBDD: E-commerce o Reservas",
    price: tiers.negocio.base,
    delivery: tiers.negocio.delivery,
    payment: "20% anticipo ($4,000) y el resto en cuotas de 2 a 6 meses",
    featured: true,
    termNote: true,
    features: [
      "Todo lo del Profesional",
      "Captura y login de usuarios/clientes",
      "Base de datos completa",
      "Panel de administración de pedidos o citas",
      "Catálogo interactivo / reservas",
      "SEO estándar",
    ],
  },
  {
    id: "avanzado",
    name: "Avanzado",
    subtitle: "Plataforma Web a la Medida",
    price: tiers.avanzado.base,
    delivery: tiers.avanzado.delivery,
    payment: "25% anticipo ($12,000) y el resto en cuotas de 3 a 12 meses",
    termNote: true,
    features: [
      "Todo lo del Negocio",
      "Login multi-rol",
      "Panel administrativo personalizado (Dashboard)",
      "Carrito de compras o reservas complejas",
      "Pasarela de pagos integrada",
      "SEO avanzado",
      "Integraciones a medida",
    ],
  },
];

export const maintenanceFee = {
  name: "Mantenimiento, Ajustes y Actualizaciones",
  price: 200,
  unit: "hora",
  description:
    "Cuota fija para cambios de contenido, ajustes puntuales o actualizaciones posteriores a la entrega. Sin contratos ni mensualidades obligatorias: pagas solo cuando lo necesitas.",
};
