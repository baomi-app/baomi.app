"use client";

/** The baomi wordmark with a refined, geek-inspired brackets-corn SVG logo styled with the Sora premium typeface. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`group flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]"
      >


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
      </svg>
      <span
        className="font-sora font-extrabold tracking-tight text-white text-lg select-none"
      >
        baomi.
        <span className="text-amber-400 group-hover:text-amber-300 transition-colors duration-300">app</span>
      </span>
    </div>
  );
}

