import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { LegalDocument } from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Aviso de privacidad de SilverWebs: qué datos personales recabamos, para qué los usamos y cómo ejercer tus derechos ARCO.",
  alternates: { canonical: "/privacidad" },
};

// Plantilla genérica: conviene revisarla con asesoría legal antes de publicarla como definitiva.
export default function PrivacidadPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Política de Privacidad"
      updated="15 de octubre de 2026"
    >
      <p>
        En <strong>{siteConfig.name}</strong>, servicio de desarrollo de software operado por{" "}
        {siteConfig.owner} (en adelante, “el Responsable”), con domicilio en Monterrey, Nuevo
        León, México, valoramos tu privacidad. Este aviso explica cómo tratamos tus datos
        personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los
        Particulares y demás normativa aplicable en México.
      </p>

      <h2>1. Datos personales que recabamos</h2>
      <p>Únicamente solicitamos los datos necesarios para atender tu solicitud:</p>
      <ul>
        <li>Datos de identificación: nombre.</li>
        <li>Datos de contacto: correo electrónico y, si nos escribes por WhatsApp, tu número telefónico.</li>
        <li>
          Información del proyecto: nombre de tu negocio o proyecto, requerimientos y las opciones
          que elijas en el cotizador.
        </li>
        <li>Datos de facturación, solo si contratas un servicio y solicitas factura.</li>
      </ul>
      <p>No recabamos datos personales sensibles.</p>

      <h2>2. Finalidades del tratamiento</h2>
      <p>Tus datos se utilizan para las siguientes finalidades primarias:</p>
      <ul>
        <li>Responder tus mensajes y solicitudes de información.</li>
        <li>Elaborar y enviarte cotizaciones de servicios de desarrollo web.</li>
        <li>Celebrar, ejecutar y dar seguimiento a los proyectos contratados.</li>
        <li>Emitir comprobantes fiscales y gestionar pagos.</li>
        <li>Brindar soporte técnico y mantenimiento.</li>
      </ul>
      <p>
        De forma secundaria, y solo si no te opones, podremos enviarte información sobre nuevos
        servicios o contenidos del blog. Puedes negarte en cualquier momento escribiéndonos por los
        medios indicados en este aviso.
      </p>

      <h2>3. Transferencias y encargados</h2>
      <p>
        No vendemos ni compartimos tus datos con terceros para fines comerciales. Para operar el
        servicio nos apoyamos en proveedores tecnológicos que actúan como encargados (por ejemplo,
        servicios de correo electrónico, mensajería como WhatsApp, alojamiento web y repositorios
        de código), los cuales tratan la información conforme a sus propias políticas de
        privacidad. Solo transferiremos datos cuando lo exija una autoridad competente o la ley.
      </p>

      <h2>4. Derechos ARCO y revocación del consentimiento</h2>
      <p>
        Tienes derecho a <strong>Acceder</strong> a tus datos, <strong>Rectificarlos</strong> si
        son inexactos, <strong>Cancelarlos</strong> cuando consideres que no se requieren para las
        finalidades señaladas, y <strong>Oponerte</strong> a su tratamiento para fines
        específicos. También puedes revocar el consentimiento otorgado o limitar el uso de tu
        información.
      </p>
      <p>
        Para ejercer estos derechos, envía tu solicitud a través del{" "}
        <Link href="/#contacto">formulario de contacto</Link> indicando tu nombre, el derecho que
        deseas ejercer y una descripción clara de los datos involucrados. Responderemos en un plazo
        máximo de 20 días hábiles.
      </p>

      <h2>5. Cookies y tecnologías similares</h2>
      <p>
        Este sitio no utiliza cookies de publicidad. Podemos emplear cookies técnicas o
        herramientas de analítica agregada para conocer el uso del sitio y mejorarlo, sin
        identificarte personalmente. Puedes deshabilitarlas desde la configuración de tu
        navegador.
      </p>

      <h2>6. Seguridad de la información</h2>
      <p>
        Aplicamos medidas de seguridad administrativas, técnicas y físicas razonables para proteger
        tus datos contra daño, pérdida, alteración o acceso no autorizado.
      </p>

      <h2>7. Cambios a este aviso</h2>
      <p>
        Este aviso puede actualizarse por cambios legales o en nuestros servicios. La versión
        vigente estará siempre disponible en esta página, con su fecha de última actualización.
      </p>
    </LegalDocument>
  );
}
