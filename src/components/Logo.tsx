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
          <span className="text-orange-400">.app</span>
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
      {/* lowercase "b" monogram */}
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
  );
}
