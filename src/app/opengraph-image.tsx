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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            style={{ width: 80, height: 80, display: "flex" }}
          >

          {/* Tapered corn cob and brackets, Suggestion 5 */}
          <g>
            {/* Tapered corn cob shape (pure solid golden #fbbf24) */}
            <path
              d="M 9.0 16.5 C 9.0 10.5, 10.0 5.5, 12 5.5 C 14.0 5.5, 15.0 10.5, 15.0 16.5 C 15.0 18.2, 13.8 19, 12 19 C 10.2 19, 9.0 18.2, 9.0 16.5 Z"
              fill="#fbbf24"
            />
            {/* Left green leaf brace { (upright, shifted 0.5px outward for breathing room, thinned to 1.6, colored with tech green #4ade80) */}
            <path
              d="M 6.0 5.5 C 4.5 5.5, 4.0 6.5, 4.0 8.0 L 4.0 11.0 C 4.0 12.25, 2.5 12.25, 2.5 12.25 C 2.5 12.25, 4.0 12.25, 4.0 13.5 L 4.0 16.5 C 4.0 18.0, 4.5 19.0, 6.0 19.0"
              stroke="#4ade80"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right green leaf brace } (upright, perfectly symmetrical, shifted 0.5px outward, thinned to 1.6, colored with tech green #4ade80) */}
            <path
              d="M 18.0 5.5 C 19.5 5.5, 20.0 6.5, 20.0 8.0 L 20.0 11.0 C 20.0 12.25, 21.5 12.25, 21.5 12.25 C 21.5 12.25, 20.0 12.25, 20.0 13.5 L 20.0 16.5 C 20.0 18.0, 19.5 19.0, 18.0 19.0"
              stroke="#4ade80"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            </g>
          </svg>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 800, color: "#fff" }}>
            baomi.
            <span style={{ color: "#fbbf24" }}>app</span>
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
