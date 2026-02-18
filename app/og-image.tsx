import { ImageResponse } from "next/og";
import { BUSINESS_NAME } from "../lib/seo";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(145deg, #09090b 0%, #18181b 55%, #27272a 100%)",
          color: "#fafafa",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: "#d4d4d8" }}>
          Barbier in Ninove
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}>
          <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.04 }}>{BUSINESS_NAME}</div>
          <div style={{ fontSize: 34, color: "#e4e4e7" }}>Premium fades, baardverzorging en walk-ins welkom.</div>
        </div>
        <div style={{ fontSize: 28, color: "#a1a1aa" }}>Beverstraat 22, 9400 Ninove</div>
      </div>
    ),
    size,
  );
}
