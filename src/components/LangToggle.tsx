"use client";

import { useLocale, type Locale } from "@/i18n";

const labels: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
};

export function LangToggle() {
  const { locale, setLocale } = useLocale();
  return (
    <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 text-xs font-medium">
      {(Object.keys(labels) as Locale[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={
            locale === l
              ? "rounded-full bg-white px-2.5 py-1 text-black"
              : "rounded-full px-2.5 py-1 text-white/60 transition-colors hover:text-white"
          }
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
