"use client";

import { useLocale, type Locale } from "@/i18n";

const labels: Record<Locale, string> = {
  en: "EN",
  zh: "中",
};

export function LangToggle() {
  const { locale, setLocale } = useLocale();
  const nextLocale: Locale = locale === "en" ? "zh" : "en";

  return (
    <button
      type="button"
      onClick={() => setLocale(nextLocale)}
      aria-label={locale === "en" ? "切换到中文" : "Switch to English"}
      title={locale === "en" ? "切换到中文" : "Switch to English"}
      className="ml-1 grid h-10 min-w-10 place-items-center rounded-full border border-[var(--rule)] bg-[var(--surface-strong)] px-3 font-mono text-xs font-semibold text-[var(--foreground)] transition-[transform,border-color,background-color] hover:-translate-y-0.5 hover:border-[var(--foreground)] active:translate-y-px"
    >
      {labels[nextLocale]}
    </button>
  );
}
