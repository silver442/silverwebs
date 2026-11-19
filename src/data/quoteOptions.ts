export type Tier = "basico" | "profesional" | "negocio" | "avanzado";
export type Frequency = "semanal" | "quincenal" | "mensual";

export type OptionPrice =
  | { kind: "price"; amount: number; note?: string }
  | { kind: "included" }
  /** Disponible solo subiendo de paquete (se muestra botón para cambiar a `upgradeTo`). */
  | { kind: "locked"; upgradeTo: Tier }
  | { kind: "unavailable" };

export interface Delivery {
  /** Versión funcional en línea (solo paquetes con entrega por fases). */
  launch?: string;
  /** Entrega completa / desarrollo completo. */
  full: string;
}

export interface TierConfig {
  id: Tier;
  label: string;
  subtitle: string;
  base: number;
  depositRate: number;
  /** Plazos de financiamiento en meses; null = plazo fijo corto (Básico). */
  termMonths: number[] | null;
  fixedTermLabel?: string;
  delivery: Delivery;
  design: OptionPrice;
}

export const tiers: Record<Tier, TierConfig> = {
  basico: {
    id: "basico",
    label: "Básico",
    subtitle: "Presencia Web",
    base: 500,
    depositRate: 0.4,
    termMonths: null,
    fixedTermLabel: "2 a 7 días",
    delivery: { full: "2 a 7 días" },
    design: { kind: "price", amount: 400 },
  },
  profesional: {
    id: "profesional",
    label: "Profesional",
    subtitle: "Web Autoadministrable",
    base: 7500,
    depositRate: 0.2,
    termMonths: [1, 2, 3],
    delivery: { full: "3 semanas" },
    design: { kind: "price", amount: 800 },
  },
  negocio: {
    id: "negocio",
    label: "Negocio",
    subtitle: "Web Interactiva con BBDD: E-commerce o Reservas",
    base: 20000,
    depositRate: 0.2,
    termMonths: [2, 3, 4, 5, 6],
    delivery: { launch: "~4 semanas", full: "mín. 2 meses (panel admin y módulos internos)" },
    design: { kind: "price", amount: 1500 },
  },
  avanzado: {
    id: "avanzado",
    label: "Avanzado",
    subtitle: "Plataforma Web a la Medida",
    base: 48000,
    depositRate: 0.25,
    termMonths: [3, 4, 6, 9, 12],
    delivery: {
      launch: "4 a 6 semanas",
      full: "mín. 3 meses (dashboard, integraciones y pulido)",
    },
    design: { kind: "included" },
  },
};

export const tierOrder: Tier[] = ["basico", "profesional", "negocio", "avanzado"];

/** Valores antiguos de `?plan=` que siguen funcionando. */
export const legacyTiers: Record<string, Tier> = { medio: "negocio" };

export function parseTier(value: unknown): Tier | undefined {
  if (typeof value !== "string") return undefined;
  return tierOrder.find((id) => id === value) ?? legacyTiers[value];
}

export function hasPhasedDelivery(tier: Tier): boolean {
  return Boolean(tiers[tier].delivery.launch);
}

/** Líneas "etiqueta: valor" de los tiempos de entrega, para correo y WhatsApp. */
export function deliveryLines(tier: Tier): [string, string][] {
  const { launch, full } = tiers[tier].delivery;
  return launch
    ? [
        ["Entrega funcional", launch],
        ["Desarrollo completo", full],
      ]
    : [["Entrega completa", full]];
}

export const PHASED_DELIVERY_NOTE =
  "En proyectos Negocio y Avanzado trabajamos por fases: en las primeras semanas verás tu plataforma operando en línea mientras continuamos construyendo y puliendo el panel de administración, pasarela de pagos y módulos internos hasta completar el proyecto. La transferencia total del repositorio en GitHub y control del dominio se entrega al liquidar el 100% del plan de financiamiento.";

export const frequencies: Record<
  Frequency,
  { label: string; periodLabel: string; perMonth: number }
> = {
  semanal: { label: "Semanal", periodLabel: "Semana", perMonth: 4 },
  quincenal: { label: "Quincenal", periodLabel: "Quincena", perMonth: 2 },
  mensual: { label: "Mensual", periodLabel: "Mes", perMonth: 1 },
};

export type ModuleId =
  | "dominio"
  | "seo"
  | "whatsapp"
  | "panel"
  | "animaciones"
  | "login"
  | "admin"
  | "pagos"
  | "reservas"
  | "seoAvanzado"
  | "multilenguaje"
  | "chat"
  | "api"
  | "cfdi"
  | "pwa";

export interface QuoteModule {
  id: ModuleId;
  label: string;
  prices: Record<Tier, OptionPrice>;
}

const included = { kind: "included" } as const;
const unavailable = { kind: "unavailable" } as const;
const locked = (upgradeTo: Tier) => ({ kind: "locked", upgradeTo }) as const;
const price = (amount: number, note?: string) =>
  ({ kind: "price", amount, note }) as const;

export const quoteModules: QuoteModule[] = [
  {
    id: "dominio",
    label: "Dominio .com por 1 año",
    prices: { basico: price(350), profesional: included, negocio: included, avanzado: included },
  },
  {
    id: "seo",
    label: "SEO (optimización para buscadores)",
    prices: { basico: price(500), profesional: included, negocio: included, avanzado: included },
  },
  {
    id: "whatsapp",
    label: "Botón de WhatsApp integrado",
    prices: { basico: price(200), profesional: included, negocio: included, avanzado: included },
  },
  {
    id: "panel",
    label: "Panel ligero autoadministrable",
    prices: {
      basico: locked("profesional"),
      profesional: included,
      negocio: included,
      avanzado: included,
    },
  },
  {
    id: "animaciones",
    label: "Animaciones e interactividad avanzada",
    prices: { basico: price(300), profesional: price(500), negocio: price(800), avanzado: included },
  },
  {
    id: "login",
    label: "Login de Usuarios / Clientes + Base de Datos",
    prices: {
      basico: locked("negocio"),
      profesional: locked("negocio"),
      negocio: included,
      avanzado: included,
    },
  },
  {
    id: "admin",
    label: "Panel de Administración (pedidos / citas)",
    prices: {
      basico: locked("negocio"),
      profesional: locked("negocio"),
      negocio: included,
      avanzado: included,
    },
  },
  {
    id: "pagos",
    label: "Pasarela de Pagos integrada",
    prices: {
      basico: price(600, "Link externo"),
      profesional: locked("negocio"),
      negocio: price(2000, "Checkout integrado"),
      avanzado: included,
    },
  },
  {
    id: "reservas",
    label: "Módulo de Reservas / Calendario",
    prices: {
      basico: price(400, "Calendly externo"),
      profesional: price(400, "Calendly externo"),
      negocio: price(2000, "Sistema propio con cupos"),
      avanzado: included,
    },
  },
  {
    id: "seoAvanzado",
    label: "SEO Avanzado",
    prices: {
      basico: unavailable,
      profesional: price(1500),
      negocio: price(1500),
      avanzado: included,
    },
  },
  {
    id: "multilenguaje",
    label: "Multilenguaje (ES/EN)",
    prices: {
      basico: price(400),
      profesional: price(800),
      negocio: price(1500),
      avanzado: price(2500),
    },
  },
  {
    id: "chat",
    label: "Chat en vivo / Chatbot IA",
    prices: {
      basico: price(600),
      profesional: price(1500),
      negocio: price(2500),
      avanzado: price(3500),
    },
  },
  {
    id: "api",
    label: "Integración con API Externa (CRM, ERP, TotalPass, etc.)",
    prices: {
      basico: unavailable,
      profesional: unavailable,
      negocio: price(2500),
      avanzado: price(3500),
    },
  },
  {
    id: "cfdi",
    label: "Facturación Automática (SAT CFDI 4.0)",
    prices: {
      basico: unavailable,
      profesional: unavailable,
      negocio: price(4500),
      avanzado: price(5500),
    },
  },
  {
    id: "pwa",
    label: "App Web Instalable (PWA)",
    prices: {
      basico: unavailable,
      profesional: unavailable,
      negocio: price(3000),
      avanzado: price(4000),
    },
  },
];
