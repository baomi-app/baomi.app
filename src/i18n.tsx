"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Locale = "en" | "zh";
export type L = { en: string; zh: string };

export const locales: Locale[] = ["en", "zh"];
export const defaultLocale: Locale = "en";

const STORAGE_KEY = "baomi.locale";

/** UI string dictionary. Each entry is localized. */
export const ui = {
  brand: {
    // baomi's own studio tagline. (Pop's "咔，一爆即得" slogan lives on Pop.)
    tagline: { en: "Small, sharp, and focused.", zh: "小而精悍，专注一事" },
  },
  nav: {
    apps: { en: "Apps", zh: "应用" },
  },
  hero: {
    badge: { en: "Let tools be tools", zh: "让工具回归工具" },
    // EN keeps a trailing space before the gradient accent; ZH has none (no
    // space after a full-width comma). The Hero joins them without inserting one.
    titleLead: { en: "Agile in form, ", zh: "敏捷于形，" },
    titleAccent: { en: "focused on one.", zh: "专精于一。" },
    subtitle: {
      en: "Lightweight tools by baomi — pure, agile, and a pleasure at your fingertips.",
      zh: "来自 baomi 的轻量工具 —— 纯粹、敏捷，悦于指尖。",
    },
    ctaExplore: { en: "Explore the apps", zh: "看看应用" },
    ctaGithub: { en: "View on GitHub", zh: "在 GitHub 查看" },
  },
  apps: {
    heading: { en: "The apps", zh: "全部应用" },
    sub: {
      en: "Focused, native utility apps that do one thing and stay out of your way.",
      zh: "专注特定功能的原生工具，用完即走。",
    },
    count: { en: "apps", zh: "个应用" },
    viewDetails: { en: "View details", zh: "查看详情" },
  },
  detail: {
    back: { en: "All apps", zh: "全部应用" },
    features: { en: "Features", zh: "功能" },
    builtWith: { en: "Built with", zh: "技术栈" },
  },
  status: {
    released: { en: "Released", zh: "已发布" },
    beta: { en: "Beta", zh: "测试版" },
    wip: { en: "In progress", zh: "开发中" },
  },
  footer: {
    contact: { en: "Contact", zh: "联系" },
  },
} as const;

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Resolve a localized string for the active locale. */
  t: (value: L) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function detectInitial(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "zh") return stored;
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Always start at defaultLocale so server and first client render match,
  // then sync to the user's stored / browser preference after mount.
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    setLocaleState(detectInitial());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback((value: L) => value[locale], [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}
