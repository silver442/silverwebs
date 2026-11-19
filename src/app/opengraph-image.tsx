import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { ogImage } from "@/lib/seo";

export const alt = ogImage.alt;
export const size = { width: ogImage.width, height: ogImage.height };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #050b24 0%, #0c1739 55%, #1d2d73 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 8, color: "#f9b996", textTransform: "uppercase" }}>
          Desarrollo web full-stack
        </div>
        <div style={{ marginTop: 24, fontSize: 112, fontWeight: 800, letterSpacing: -2 }}>
          {siteConfig.name}
        </div>
        <div style={{ marginTop: 24, fontSize: 40, lineHeight: 1.3, color: "#cbd5e1", maxWidth: 940 }}>
          Landing pages, e-commerce, reservas y plataformas web a la medida. Sin plantillas ni
          comisiones ocultas.
        </div>
        <div style={{ marginTop: 48, fontSize: 28, color: "#3b82f6" }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size,
  );
}
