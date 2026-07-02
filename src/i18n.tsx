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
    tagline: { en: "Focused on one, subtle yet extraordinary.", zh: "专注一事，微而不凡" },
  },
  nav: {
    apps: { en: "Apps", zh: "应用" },
  },
  hero: {
    badge: { en: "Small tools, kept sharp", zh: "小工具，保持锋利" },
    // EN keeps a trailing space before the accent phrase; ZH has none. The Hero
    // joins them without inserting extra whitespace.
    titleLead: { en: "Apps that stay small, ", zh: "把有用做快，" },
    titleAccent: { en: "and get useful fast.", zh: "把复杂放轻。" },
    subtitle: {
      en: "baomi.app is a bench of focused utilities: native-feeling, easy to inspect, and finished before they become platforms.",
      zh: "baomi.app 是一张轻量工具台：手感原生、边界清楚，在变成平台之前就把事情做完。",
    },
    ctaExplore: { en: "Browse the bench", zh: "浏览工具台" },
    ctaGithub: { en: "View on GitHub", zh: "在 GitHub 查看" },
    catalogLabel: { en: "Current bench", zh: "当前工具台" },
    catalogMeta: { en: "Live app index", zh: "实时应用索引" },
    catalogEmpty: { en: "Apps are loading", zh: "应用载入中" },
  },
  apps: {
    eyebrow: { en: "The shelf", zh: "工具架" },
    heading: { en: "Each app keeps a narrow promise.", zh: "每个应用只守住一个清楚承诺。" },
    sub: {
      en: "A small catalog of native utility apps and developer tools, pulled from each repository's bilingual baomi.json.",
      zh: "一组原生工具和开发者小应用，内容来自各自仓库的双语 baomi.json。",
    },
    count: { en: "apps", zh: "个应用" },
    viewDetails: { en: "View details", zh: "查看详情" },
  },
  detail: {
    back: { en: "All apps", zh: "全部应用" },
    features: { en: "Features", zh: "功能" },
    builtWith: { en: "Built with", zh: "技术栈" },
    screenshots: { en: "Screenshots", zh: "界面预览" },
    troubleshooting: { en: "Troubleshooting", zh: "常见问题" },
    close: { en: "Close screenshot", zh: "关闭截图" },
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
    // Keep the first client render aligned with SSR, then apply stored/browser preference.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
