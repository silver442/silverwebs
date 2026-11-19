import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { maintenanceFee } from "@/data/packages";
import { PHASED_DELIVERY_NOTE } from "@/data/quoteOptions";
import { formatMXN } from "@/lib/format";
import { JsonLd } from "@/components/JsonLd";
import { LegalDocument } from "@/components/LegalDocument";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de los servicios de desarrollo web de SilverWebs: cotizaciones, pagos, plazos, propiedad del código y mantenimiento.",
  path: "/terminos",
});

// Plantilla genérica: conviene revisarla con asesoría legal antes de publicarla como definitiva.
export default function TerminosPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Términos y Condiciones", "/terminos")} />
      <LegalDocument
        eyebrow="Legal"
        title="Términos y Condiciones"
        updated="18 de noviembre de 2026"
      >
        <p>
          Estos términos regulan la contratación de los servicios de diseño y desarrollo de software
          que ofrece <strong>{siteConfig.name}</strong>, operado por {siteConfig.owner} (“el
          Prestador”), a cualquier persona física o moral (“el Cliente”). Al aceptar una cotización o
          realizar el pago del anticipo, el Cliente acepta estos términos.
        </p>

        <h2>1. Alcance de los servicios</h2>
        <p>
          El Prestador desarrolla sitios web, tiendas en línea, sistemas de reservas, paneles
          administrativos y plataformas web a la medida. El alcance de cada proyecto se define en la
          cotización aceptada; cualquier funcionalidad no incluida en ella se considera un cambio de
          alcance y se cotiza por separado.
        </p>

        <h2>2. Cotizaciones</h2>
        <p>
          Los montos que muestra el <Link href="/cotizador">cotizador</Link> son estimaciones. El
          precio final se confirma por escrito después de una llamada de levantamiento de
          requerimientos. Las cotizaciones tienen una vigencia de 30 días naturales y los precios se
          expresan en pesos mexicanos (MXN).
        </p>

        <h2>3. Anticipos y forma de pago</h2>
        <ul>
          <li>
            <strong>Paquete Básico:</strong> 40% de anticipo al iniciar y 60% contra entrega.
          </li>
          <li>
            <strong>Paquete Profesional:</strong> 20% de anticipo y el saldo en pagos semanales,
            quincenales o mensuales en un plazo de 1 a 3 meses.
          </li>
          <li>
            <strong>Paquete Negocio:</strong> 20% de anticipo y el saldo en pagos semanales,
            quincenales o mensuales en un plazo de 2 a 6 meses.
          </li>
          <li>
            <strong>Paquete Avanzado:</strong> 25% de anticipo y el saldo en pagos semanales,
            quincenales o mensuales en un plazo de 3 a 12 meses.
          </li>
        </ul>
        <p>
          El anticipo no es reembolsable una vez iniciado el trabajo. Un retraso mayor a 15 días en
          cualquier pago faculta al Prestador para pausar el desarrollo hasta su regularización.
        </p>

        <h2>4. Plazos y revisiones</h2>
        <p>
          Los plazos comienzan a contar a partir de la recepción del anticipo y de los materiales
          necesarios. Cada paquete incluye las rondas de revisión indicadas en su descripción; las
          revisiones adicionales o los retrasos en la entrega de información por parte del Cliente
          pueden modificar la fecha de entrega.
        </p>
        <p>
          El paquete Básico se entrega en 2 a 7 días y el Profesional en 3 semanas. En los paquetes
          Negocio y Avanzado la entrega es por fases: la versión funcional queda en línea en ~4
          semanas (Negocio) o en 4 a 6 semanas (Avanzado), y el desarrollo completo toma un mínimo
          de 2 y 3 meses, respectivamente. {PHASED_DELIVERY_NOTE}
        </p>

        <h2>5. Obligaciones del Cliente</h2>
        <ul>
          <li>Entregar a tiempo textos, imágenes, logotipos y accesos necesarios.</li>
          <li>Garantizar que cuenta con los derechos de uso de los contenidos que proporciona.</li>
          <li>Revisar y aprobar los avances en los tiempos acordados.</li>
        </ul>

        <h2>6. Propiedad intelectual</h2>
        <p>
          Una vez liquidado el 100% del plan de financiamiento, el código fuente desarrollado específicamente para
          el Cliente es de su propiedad y se transfiere en un repositorio de GitHub a su nombre, junto
          con el control del dominio. El
          Prestador puede reutilizar herramientas, bibliotecas y componentes genéricos de su autoría,
          y mostrar el proyecto en su portafolio salvo acuerdo de confidencialidad por escrito.
        </p>

        <h2>7. Servicios de terceros</h2>
        <p>
          Los proyectos pueden depender de servicios de terceros (alojamiento en Vercel o Netlify,
          registradores de dominio, pasarelas de pago, bases de datos en la nube, entre otros). Sus
          costos, disponibilidad y políticas son responsabilidad de cada proveedor; el Prestador no
          responde por interrupciones o cambios de precio ajenos a su control.
        </p>

        <h2>8. Garantía y mantenimiento</h2>
        <p>
          Cada entrega incluye 30 días naturales de garantía para corregir errores atribuibles al
          desarrollo, sin costo. Después de ese periodo, los cambios de contenido, ajustes y
          actualizaciones se cobran bajo demanda con una cuota fija de{" "}
          {formatMXN(maintenanceFee.price)} MXN por {maintenanceFee.unit}, sin contratos ni
          mensualidades obligatorias.
        </p>

        <h2>9. Cancelación</h2>
        <p>
          Cualquiera de las partes puede cancelar el proyecto mediante aviso por escrito. En ese
          caso, el Cliente pagará el trabajo realizado hasta la fecha de cancelación y recibirá los
          entregables correspondientes a lo pagado.
        </p>

        <h2>10. Limitación de responsabilidad</h2>
        <p>
          El Prestador no será responsable por pérdidas indirectas, lucro cesante o daños derivados
          del uso del software, de fallas de servicios de terceros o de modificaciones realizadas por
          personas ajenas. La responsabilidad total del Prestador se limita al monto efectivamente
          pagado por el Cliente por el proyecto en cuestión.
        </p>

        <h2>11. Legislación aplicable y jurisdicción</h2>
        <p>
          Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para su
          interpretación y cumplimiento, las partes se someten a los tribunales competentes de
          Monterrey, Nuevo León, renunciando a cualquier otro fuero que pudiera corresponderles.
        </p>

        <p>
          ¿Dudas sobre estos términos? Escríbenos desde el{" "}
          <Link href="/#contacto">formulario de contacto</Link>.
        </p>
      </LegalDocument>
    </>
  );
}
