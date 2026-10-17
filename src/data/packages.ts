export interface ServicePackage {
  id: "basico" | "medio" | "avanzado";
  name: string;
  subtitle: string;
  price: number;
  term: string;
  payment: string;
  featured?: boolean;
  termNote?: boolean;
  features: string[];
}

export const TERM_NOTE =
  "El plazo elegido adapta tanto tus cuotas de pago como el ritmo de dedicación semanal al desarrollo del proyecto.";

export const packages: ServicePackage[] = [
  {
    id: "basico",
    name: "Básico",
    subtitle: "Landing Page / Presencia Web",
    price: 500,
    term: "2 a 7 días",
    payment: "2 pagos: 40% anticipo / 60% al finalizar",
    features: [
      "Alojado en Vercel/Netlify (hosting gratuito)",
      "Entrega de código en GitHub",
      "Subdominio por defecto",
      "Diseño 100% responsivo",
      "Hasta 2 rondas de revisión",
    ],
  },
  {
    id: "medio",
    name: "Medio",
    subtitle: "Web Interactiva con BBDD: E-commerce o Reservas",
    price: 20000,
    term: "2 a 6 meses",
    payment: "20% anticipo ($4,000) y el resto en pagos semanales, quincenales o mensuales",
    featured: true,
    termNote: true,
    features: [
      "Revisiones periódicas",
      "Hosting en Vercel/Netlify + código en GitHub",
      "Dominio .com incluido por 1 año",
      "Base de Datos",
      "Login de usuarios",
      "Panel de Administración básico",
      "SEO estándar",
    ],
  },
  {
    id: "avanzado",
    name: "Avanzado",
    subtitle: "Plataforma Web a la Medida",
    price: 48000,
    term: "3 a 12 meses",
    payment: "25% anticipo ($12,000) y los $36,000 restantes divididos en el plazo elegido",
    termNote: true,
    features: [
      "Revisiones periódicas",
      "Dominio .com incluido por 1 año",
      "Base de Datos avanzada",
      "Panel de Administración personalizado (Dashboard)",
      "SEO avanzado",
      "Login multi-rol",
      "Carrito de compras o Sistema de Reservas complejo",
      "Pasarela de pagos",
      "Integraciones a medida",
    ],
  },
];

export const maintenancePlans = [
  {
    name: "Soporte por Hora",
    price: 200,
    unit: "hora",
    description:
      "Para modificaciones puntuales, nuevas secciones o actualizaciones bajo demanda.",
  },
  {
    name: "Póliza Mensual",
    price: 899,
    unit: "mes",
    description:
      "Suscripción mensual. Incluye hasta 4 horas de ajustes o mejoras al mes, monitoreo continuo, respaldos de base de datos y soporte prioritario.",
  },
];
