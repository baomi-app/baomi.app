"use client";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`group inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[22px] w-[22px]">
        <path d="M9.1 16.3c0-6.1 1-10.7 2.9-10.7s2.9 4.6 2.9 10.7c0 1.8-1.1 2.7-2.9 2.7s-2.9-.9-2.9-2.7Z" fill="var(--brand-yellow)" />
        <path d="M6 5.7c-1.4 0-2 .9-2 2.3v3.1c0 .8-.5 1.2-1.5 1.2 1 0 1.5.4 1.5 1.2v3.1c0 1.5.6 2.3 2 2.3M18 5.7c1.4 0 2 .9 2 2.3v3.1c0 .8.5 1.2 1.5 1.2-1 0-1.5.4-1.5 1.2v3.1c0 1.5-.6 2.3-2 2.3" stroke="var(--brand-green)" strokeWidth="1.55" strokeLinecap="round" />
      </svg>
      <span className="select-none text-[17px] font-bold tracking-[-.035em] text-[var(--foreground)]">baomi<span className="text-[var(--brand-yellow)]">.</span>app</span>
    </span>
  );
}
