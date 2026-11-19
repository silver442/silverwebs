import { maintenanceFee } from "@/data/packages";
import { PHASED_DELIVERY_NOTE } from "@/data/quoteOptions";
import { formatMXN } from "@/lib/format";

export const faqs = [
  {
    question: "¿Cómo funcionan los plazos de entrega?",
    answer:
      "El paquete Básico se entrega en 2 a 7 días y el Profesional en 3 semanas. En Negocio la versión funcional queda en línea en ~4 semanas y el desarrollo completo toma mínimo 2 meses; en Avanzado, la primera versión opera en 4 a 6 semanas y el desarrollo integral toma mínimo 3 meses.",
  },
  {
    question: "¿Cómo funciona la entrega por fases?",
    answer: PHASED_DELIVERY_NOTE,
  },
  {
    question: "¿De quién es el código fuente?",
    answer:
      "Tuyo, al 100%. Desde el primer día el proyecto vive en un repositorio de GitHub y, al liquidar el 100% del plan de financiamiento, se transfiere a tu cuenta junto con el control del dominio y los accesos de hosting. Sin licencias, sin dependencia y sin comisiones ocultas.",
  },
  {
    question: "¿Cómo se realizan los pagos?",
    answer:
      "En Básico son 2 pagos: 40% de anticipo y 60% al finalizar. En Profesional y Negocio el anticipo es del 20% y en Avanzado del 25%; el saldo se divide en cuotas semanales, quincenales o mensuales según el plazo de financiamiento que elijas en el cotizador (1 a 3 meses en Profesional, 2 a 6 en Negocio y 3 a 12 en Avanzado).",
  },
  {
    question: "¿Cuántas revisiones incluye?",
    answer:
      "El paquete Básico incluye hasta 2 rondas de revisión. En Profesional hay revisiones semanales, y en Negocio y Avanzado revisiones periódicas durante todo el desarrollo para validar avances contigo.",
  },
  {
    question: "¿Qué pasa después de la entrega?",
    answer: `Para cambios de contenido, ajustes puntuales o actualizaciones posteriores a la entrega aplica una cuota fija de mantenimiento de ${formatMXN(maintenanceFee.price)} MXN por ${maintenanceFee.unit}, bajo demanda: sin contratos ni mensualidades obligatorias.`,
  },
  {
    question: "¿El precio del cotizador es definitivo?",
    answer:
      "Es una estimación muy cercana. El precio final se confirma tras una llamada breve para revisar el alcance exacto de tu proyecto.",
  },
];

export const scope = {
  included: [
    "Diseño y desarrollo del sitio o plataforma",
    "Configuración de hosting (Vercel/Netlify) y despliegue",
    "Código fuente en GitHub, 100% de tu propiedad",
    "Dominio .com el primer año (Profesional, Negocio y Avanzado)",
    "Integración técnica de pasarela de pagos y servicios",
    "Captura inicial de contenido de muestra",
  ],
  client: [
    "Fotografía profesional y material gráfico",
    "Textos legales (aviso de privacidad, términos y condiciones)",
    "Captura masiva de cientos de productos (se cotiza aparte)",
    "Comisiones de la pasarela de pagos (Stripe, Mercado Pago, etc.)",
    "Renovación del dominio después del primer año",
  ],
};
