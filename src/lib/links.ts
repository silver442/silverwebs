import { siteConfig } from "@/config/site";

export function whatsappUrl(text: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(subject: string, body: string): string {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
