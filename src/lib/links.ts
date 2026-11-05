import { siteConfig } from "@/config/site";

export function whatsappUrl(text: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
