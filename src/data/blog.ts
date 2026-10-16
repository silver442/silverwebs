export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** Fecha ISO de publicación, p. ej. "2026-10-15". */
  publishedAt: string;
}

export const blogCategories = [
  "Desarrollo Web",
  "Negocios Digitales",
  "E-commerce",
  "SEO y Marketing",
  "Guías y Tutoriales",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

// Aún no hay artículos publicados; la página muestra un estado "Próximamente".
export const posts: BlogPost[] = [];
