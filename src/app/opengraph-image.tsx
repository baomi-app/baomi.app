import { ImageResponse } from "next/og";

export const alt = "baomi — small, sharp apps that do one thing well";
export const size = { width: 1200, height: 630 };
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
          justifyContent: "space-between",
          background: "#0a0a0b",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: "9999px",
            background: "#f97316",
            opacity: 0.25,
            filter: "blur(120px)",
            display: "flex",
          }}
        />

        {/* brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 28,
              background: "linear-gradient(135deg, #fbbf24, #f97316)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="58" height="58" viewBox="0 0 24 24" fill="#1a1205">
              <path d="M12 2c.55 7 3.45 9.9 10 10.5-6.55.6-9.45 3.5-10 10.5-.55-7-3.45-9.9-10-10.5C8.55 11.9 11.45 9 12 2z" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, color: "#fff" }}>
            baomi<span style={{ color: "#fb923c" }}>.</span>
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#fff",
              maxWidth: 980,
            }}
          >
            Small, sharp apps that do one thing well.
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "rgba(255,255,255,0.55)" }}>
            Small tools by baomi — baomi.app
          </div>
        </div>
      </div>
    ),
    size
  );
}
