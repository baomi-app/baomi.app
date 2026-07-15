"use client";

import { useLocale, type Locale } from "@/i18n";

const labels: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
};

export function LangToggle() {
  const { locale, setLocale } = useLocale();
  return (
    <div className="flex items-center rounded-[14px] border border-[var(--rule)] bg-[var(--surface)] p-0.5 text-xs font-semibold">
      {(Object.keys(labels) as Locale[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={
            locale === l
              ? "rounded-[10px] bg-[var(--foreground)] px-2.5 py-1 text-[var(--background)]"
              : "rounded-[10px] px-2.5 py-1 text-[var(--ink-muted)] transition-colors hover:text-[var(--foreground)]"
          }
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
