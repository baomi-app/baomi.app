"use client";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`group flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 transition-transform duration-300 group-hover:-rotate-3"
      >
        <path
          d="M 9.0 16.5 C 9.0 10.5, 10.0 5.5, 12 5.5 C 14.0 5.5, 15.0 10.5, 15.0 16.5 C 15.0 18.2, 13.8 19, 12 19 C 10.2 19, 9.0 18.2, 9.0 16.5 Z"
          fill="var(--brand-yellow)"
        />
        <path
          d="M 6.0 5.5 C 4.5 5.5, 4.0 6.5, 4.0 8.0 L 4.0 11.0 C 4.0 12.25, 2.5 12.25, 2.5 12.25 C 2.5 12.25, 4.0 12.25, 4.0 13.5 L 4.0 16.5 C 4.0 18.0, 4.5 19.0, 6.0 19.0"
          stroke="var(--brand-green)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 18.0 5.5 C 19.5 5.5, 20.0 6.5, 20.0 8.0 L 20.0 11.0 C 20.0 12.25, 21.5 12.25, 21.5 12.25 C 21.5 12.25, 20.0 12.25, 20.0 13.5 L 20.0 16.5 C 20.0 18.0, 19.5 19.0, 18.0 19.0"
          stroke="var(--brand-green)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="select-none text-lg font-extrabold tracking-tight text-[var(--foreground)]"
      >
        baomi.
        <span className="text-[var(--accent)] transition-colors duration-300 group-hover:text-[var(--brand-yellow)]">app</span>
      </span>
    </div>
  );
}
