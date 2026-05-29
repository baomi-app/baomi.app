/** The baomi brand mark: a "pop" sparkle on a warm gradient tile + wordmark. */
export function Logo({
  className = "",
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <BaomiMark className="h-8 w-8" />
      {showWordmark && (
        <span className="text-lg font-semibold tracking-tight">
          baomi
          <span className="text-orange-400">.</span>
        </span>
      )}
    </span>
  );
}

export function BaomiMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="baomi"
    >
      <defs>
        <linearGradient id="baomi-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="32" height="32" rx="9" fill="url(#baomi-grad)" />
      {/* big "pop" sparkle */}
      <path
        d="M16 6c.55 5.6 2.8 7.85 8.4 8.4-5.6.55-7.85 2.8-8.4 8.4-.55-5.6-2.8-7.85-8.4-8.4 5.6-.55 7.85-2.8 8.4-8.4z"
        fill="#1a1205"
        fillOpacity="0.9"
      />
      {/* small accent sparkle */}
      <path
        d="M24 5.5c.16 1.6.8 2.24 2.4 2.4-1.6.16-2.24.8-2.4 2.4-.16-1.6-.8-2.24-2.4-2.4 1.6-.16 2.24-.8 2.4-2.4z"
        fill="#1a1205"
        fillOpacity="0.65"
      />
    </svg>
  );
}
