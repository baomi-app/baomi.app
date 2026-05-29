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
            <svg width="62" height="62" viewBox="0 0 32 32">
              <rect x="8.8" y="5.5" width="3.6" height="21" rx="1.8" fill="#1a1205" />
              <circle
                cx="16.4"
                cy="19.7"
                r="6.4"
                fill="none"
                stroke="#1a1205"
                strokeWidth="3.6"
              />
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
