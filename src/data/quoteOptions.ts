export type Tier = "basico" | "medio" | "avanzado";
export type Frequency = "semanal" | "quincenal" | "mensual";

export type OptionPrice =
  | { kind: "price"; amount: number; note?: string }
  | { kind: "included" }
  /** Disponible solo subiendo de paquete (se muestra botón para cambiar a Medio). */
  | { kind: "locked" }
  | { kind: "unavailable" };

export interface TierConfig {
  id: Tier;
  label: string;
  subtitle: string;
  base: number;
  depositRate: number;
  /** Plazos en meses disponibles; null = plazo fijo corto (Básico). */
  termMonths: number[] | null;
  fixedTermLabel?: string;
  design: OptionPrice;
}

export const tiers: Record<Tier, TierConfig> = {
  basico: {
    id: "basico",
    label: "Básico",
    subtitle: "Landing Page / Presencia Web",
    base: 500,
    depositRate: 0.4,
    termMonths: null,
    fixedTermLabel: "2 a 7 días",
    design: { kind: "price", amount: 400 },
  },
  medio: {
    id: "medio",
    label: "Medio",
    subtitle: "Web Interactiva con BBDD",
    base: 10000,
    depositRate: 0.2,
    termMonths: [2, 3, 4, 5, 6],
    design: { kind: "price", amount: 1500 },
  },
  avanzado: {
    id: "avanzado",
    label: "Avanzado",
    subtitle: "Plataforma Web a la Medida",
    base: 48000,
    depositRate: 0.25,
    termMonths: [3, 4, 6, 9, 12],
    design: { kind: "included" },
  },
};

export const tierOrder: Tier[] = ["basico", "medio", "avanzado"];

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
  | "animaciones"
  | "login"
  | "admin"
  | "pagos"
  | "reservas"
  | "seo"
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
const locked = { kind: "locked" } as const;
const unavailable = { kind: "unavailable" } as const;
const price = (amount: number, note?: string) =>
  ({ kind: "price", amount, note }) as const;

export const quoteModules: QuoteModule[] = [
  {
    id: "dominio",
    label: "Dominio personalizado por 1 año",
    prices: { basico: price(350), medio: included, avanzado: included },
  },
  {
    id: "animaciones",
    label: "Animaciones e interactividad avanzada",
    prices: { basico: price(300), medio: price(800), avanzado: included },
  },
  {
    id: "login",
    label: "Login de Usuarios + Base de Datos",
    prices: { basico: locked, medio: included, avanzado: included },
  },
  {
    id: "admin",
    label: "Panel de Administración",
    prices: { basico: locked, medio: included, avanzado: included },
  },
  {
    id: "pagos",
    label: "Pasarela de Pagos en Línea",
    prices: {
      basico: price(600, "Link externo"),
      medio: price(2000, "Checkout integrado"),
      avanzado: included,
    },
  },
  {
    id: "reservas",
    label: "Módulo de Reservas / Calendario",
    prices: {
      basico: price(400, "Calendly externo"),
      medio: price(2000, "Sistema propio con cupos"),
      avanzado: included,
    },
  },
  {
    id: "seo",
    label: "SEO Avanzado",
    prices: { basico: price(500), medio: price(1500), avanzado: included },
  },
  {
    id: "multilenguaje",
    label: "Multilenguaje (ES/EN)",
    prices: { basico: price(400), medio: price(1500), avanzado: price(2500) },
  },
  {
    id: "chat",
    label: "Chat en vivo / Chatbot IA",
    prices: { basico: price(600), medio: price(2500), avanzado: price(3500) },
  },
  {
    id: "api",
    label: "Integración con API Externa (CRM, ERP, TotalPass, etc.)",
    prices: { basico: unavailable, medio: price(2500), avanzado: price(3500) },
  },
  {
    id: "cfdi",
    label: "Facturación Automática (SAT CFDI 4.0)",
    prices: { basico: unavailable, medio: price(4500), avanzado: price(5500) },
  },
  {
    id: "pwa",
    label: "App Web Instalable (PWA)",
    prices: { basico: unavailable, medio: price(3000), avanzado: price(4000) },
  },
];
