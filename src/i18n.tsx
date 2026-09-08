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
    tagline: { en: "Small apps for everyday tasks.", zh: "做一些日常用得上的小应用" },
  },
  nav: {
    apps: { en: "Apps", zh: "应用" },
    tools: { en: "Tools", zh: "工具" },
  },
  hero: {
    badge: { en: "Independent apps and tools", zh: "独立应用和小工具" },
    // EN keeps a trailing space before the accent phrase; ZH has none. The Hero
    // joins them without inserting extra whitespace.
    titleLead: { en: "Useful apps.", zh: "做点好用的。" },
    titleAccent: { en: "Less friction.", zh: "让日常简单一点。" },
    subtitle: {
      en: "Small apps for macOS, iOS, and the web. Thoughtfully made for the things you do every day.",
      zh: "我们为 macOS、iOS 和网页做一些小应用。每个应用解决一个具体问题。",
    },
    ctaExplore: { en: "See all apps", zh: "查看全部应用" },
    ctaGithub: { en: "GitHub", zh: "GitHub" },
    catalogLabel: { en: "Apps", zh: "应用" },
    catalogMeta: { en: "Available now", zh: "当前可用" },
    catalogEmpty: { en: "App information is loading.", zh: "正在加载应用信息。" },
  },
  apps: {
    eyebrow: { en: "The shelf", zh: "工具架" },
    heading: { en: "Apps from baomi", zh: "baomi 的应用" },
    sub: {
      en: "Native apps and developer tools for the things we do often.",
      zh: "一些原生应用和开发工具，用来处理经常遇到的事情。",
    },
    count: { en: "apps", zh: "个应用" },
    viewDetails: { en: "View details", zh: "查看详情" },
  },
  tools: {
    eyebrow: { en: "Tools", zh: "工具" },
    heading: { en: "Tools that run in your browser", zh: "直接在浏览器里用的工具" },
    sub: {
      en: "No account required. Your configuration stays in the browser.",
      zh: "不需要账号，配置内容只在浏览器本地处理。",
    },
    count: { en: "tools", zh: "个工具" },
    open: { en: "Open tool", zh: "打开工具" },
    hy2: {
      name: { en: "HY2 config converter", zh: "HY2 配置转换工具" },
      tagline: {
        en: "Generate Clash profiles from Hysteria 2 server configs, then turn Clash HY2 nodes into Shadowrocket links.",
        zh: "根据 Hysteria 2 服务端配置生成 Clash 配置，再把 Clash HY2 节点转换成 Shadowrocket 链接。",
      },
      platform: { en: "Web utility", zh: "网页工具" },
    },
  },
  detail: {
    back: { en: "All apps", zh: "全部应用" },
    about: { en: "About", zh: "关于" },
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
