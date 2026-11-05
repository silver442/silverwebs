"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/links";
import { FacebookIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";

const WHATSAPP_GREETING = "¡Hola Silvestre! Vengo de tu sitio web.";

const glow = {
  peach: "hover:border-peach hover:text-peach hover:shadow-[0_0_18px] hover:shadow-peach/40",
  blue: "hover:border-neon-blue hover:text-white hover:shadow-[0_0_18px] hover:shadow-neon-blue/60",
} as const;

type Channel = {
  label: string;
  Icon: (props: { className?: string }) => React.ReactNode;
  tone: keyof typeof glow;
} & ({ href: string } | { onOpen: () => void });

// WhatsApp se construye al hacer clic para que el número no aparezca en el HTML
// (los bots de spam lo rastrean). Correo lleva al formulario de contacto.
const channels: Channel[] = [
  {
    label: "Correo",
    Icon: Mail,
    tone: "peach",
    href: "/#contacto",
  },
  {
    label: "WhatsApp",
    Icon: WhatsappIcon,
    tone: "peach",
    onOpen: () => {
      window.open(whatsappUrl(WHATSAPP_GREETING), "_blank", "noopener,noreferrer");
    },
  },
  { label: "Facebook", Icon: FacebookIcon, tone: "blue", href: siteConfig.social.facebook },
  { label: "LinkedIn", Icon: LinkedinIcon, tone: "blue", href: siteConfig.social.linkedin },
];

const variants = {
  /** Columna junto al formulario de contacto (fila centrada en móvil). */
  sidebar: {
    list: "flex justify-center gap-3 lg:flex-col",
    button: "size-12 rounded-xl",
    icon: "size-5",
    tooltip: "bottom-full left-1/2 mb-2 -translate-x-1/2 lg:bottom-auto lg:left-auto lg:right-full lg:mb-0 lg:mr-3 lg:translate-x-0",
  },
  /** Fila de botones circulares del footer. */
  footer: {
    list: "flex gap-2.5",
    button: "size-10 rounded-full",
    icon: "size-4",
    tooltip: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  },
} as const;

type Variant = keyof typeof variants;

function ChannelButton({ channel, variant }: { channel: Channel; variant: Variant }) {
  const { label, Icon, tone } = channel;
  const styles = variants[variant];
  const className = `group relative flex items-center justify-center border border-slate-border bg-surface text-slate-300 transition ${styles.button} ${glow[tone]}`;
  const content = (
    <>
      <Icon className={styles.icon} />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute whitespace-nowrap rounded-md border border-slate-border bg-obsidian px-2 py-1 text-xs text-slate-200 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100 ${styles.tooltip}`}
      >
        {label}
      </span>
    </>
  );

  if ("href" in channel && channel.href.startsWith("/")) {
    return (
      <Link href={channel.href} aria-label={label} title={label} className={className}>
        {content}
      </Link>
    );
  }
  if ("href" in channel) {
    return (
      <a
        href={channel.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className={className}
      >
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={channel.onOpen} aria-label={label} title={label} className={className}>
      {content}
    </button>
  );
}

export function ContactChannels({ variant }: { variant: Variant }) {
  return (
    <ul className={variants[variant].list}>
      {channels.map((channel) => (
        <li key={channel.label}>
          <ChannelButton channel={channel} variant={variant} />
        </li>
      ))}
    </ul>
  );
}
