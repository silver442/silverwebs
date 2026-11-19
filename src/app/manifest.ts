import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { defaultTitle } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: defaultTitle,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    lang: "es-MX",
    background_color: "#050b24",
    theme_color: "#050b24",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
