"use client";
import { useLocale, type Locale } from "@/i18n";
export function LangToggle() {
  const { locale, setLocale, t } = useLocale();
  return <div className="language-switch" role="group" aria-label={t({ en: "Language", zh: "语言" })}>{(["en", "zh"] as Locale[]).map(l => <button key={l} type="button" onClick={() => setLocale(l)} aria-pressed={locale === l} lang={l}>{l === "en" ? "EN" : "中文"}</button>)}</div>;
}
