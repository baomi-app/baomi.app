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
    tagline: { en: "Small, sharp apps", zh: "小而精，只做好一件事" },
  },
  nav: {
    apps: { en: "Apps", zh: "应用" },
  },
  hero: {
    badge: { en: "Independent apps, built with care", zh: "独立开发，用心打磨" },
    titleLead: { en: "Small, sharp apps that", zh: "小而精的应用，" },
    titleAccent: { en: "do one thing well.", zh: "只把一件事做好。" },
    subtitle: {
      en: "baomi is a tiny studio crafting fast, focused tools — light to use and easy to love.",
      zh: "baomi 是一个小小的工作室，专注打磨轻快、好用的小工具——用起来轻盈，越用越顺手。",
    },
    ctaExplore: { en: "Explore the apps", zh: "看看应用" },
    ctaGithub: { en: "View on GitHub", zh: "在 GitHub 查看" },
  },
  apps: {
    heading: { en: "The apps", zh: "全部应用" },
    sub: {
      en: "Open source. Built to be fast and stay out of your way.",
      zh: "开源。快，而且不打扰你。",
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
