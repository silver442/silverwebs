export interface Project {
  name: string;
  description: string;
  tags: string[];
  image?: string;
  url?: string;
}

export const projects: Project[] = [
  {
    name: "Altralum",
    description: "E-commerce de iluminación y lámparas industriales.",
    tags: ["Next.js", "Supabase", "Vercel"],
    image: "/images/portafolio/altralum.png",
    url: "https://altralum.com/",
  },
  {
    name: "KingQuinelas",
    description:
      "Plataforma interactiva de quinielas deportivas de la Liga MX en tiempo real.",
    tags: ["Next.js", "Supabase", "WebSockets"],
    image: "/images/portafolio/kingquinelas.png",
    url: "https://www.kingquinelas.online/",
  },
  {
    name: "FinanzasDMS",
    description: "Plataforma Fintech para gestión de finanzas e inversiones.",
    tags: ["React", "NestJS"],
    image: "/images/portafolio/finanzasdms.png",
    url: "https://finanzasdms.com/",
  },
  {
    name: "Gabrielle Camera",
    description: "Portafolio visual e interactivo de fotografía profesional.",
    tags: ["Portafolio", "Fotografía"],
    image: "/images/portafolio/portafoliofotografico.png",
    url: "https://gabriellecamera.netlify.app/",
  },
];

export const upcomingProjects: Project[] = [
  {
    name: "Silgames",
    description: "Plataforma de juegos de estrategia en línea.",
    tags: ["Go", "PostgreSQL", "Next.js"],
  },
  {
    name: "DigiTutos",
    description:
      "Plataforma web educativa para el canal de tutoriales de tecnología en YouTube.",
    tags: ["Educación", "YouTube"],
  },
];
