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
      className="icon-button ml-1 w-auto min-w-11 px-3 font-mono text-xs font-semibold"
    >
      {labels[nextLocale]}
    </button>
  );
}
