// To add a new app, append an entry to the `apps` array below — that's the only
// file you need to touch. The home card and its /<id> detail page are generated
// automatically. Optionally drop an icon PNG in /public and set `image`; without
// one, the app's first letter is shown on a gradient tile.

import type { L, Locale } from "@/i18n";

export type AppLink = {
  label: L;
  href: string;
};

export type App = {
  id: string;
  name: string;
  tagline: L;
  /** A short brand slogan shown verbatim regardless of locale, if any. */
  slogan?: string;
  description: L;
  features: { en: string[]; zh: string[] };
  tech: string[];
  platform: L;
  status: "released" | "beta" | "wip";
  /** "owner/name" on GitHub — used to pull live stars / version / updated time. */
  repo: string;
  /** Language of the repo's GitHub description, so it slots into the right locale. */
  repoLocale: Locale;
  accent: string; // tailwind gradient classes "from-... to-..."
  /** Path to the app's own icon image; falls back to a drawn icon if absent. */
  image?: string;
  website?: string; // the live app, if it has one
  links: AppLink[];
};

export const apps: App[] = [
  {
    id: "pop",
    name: "Pop",
    tagline: {
      en: "A macOS screenshot tool. Click, instant capture.",
      zh: "macOS 截图工具。一键，即拍即得。",
    },
    slogan: "咔，一爆即得。",
    description: {
      en: "A lightweight, fast screenshot utility for macOS. Hit a hotkey, pick a window or region, and the shot is on your clipboard before you blink.",
      zh: "轻量、快速的 macOS 截图工具。按下快捷键，框选窗口或区域，截图瞬间就到了你的剪贴板里。",
    },
    features: {
      en: [
        "Global hotkey (⌘⇧X) to summon the capture layer",
        "Window, region, and full-screen modes",
        "Auto-copies the result straight to your clipboard",
        "Hover highlighting to lock onto the right window",
        "Custom hotkeys, local saving, and launch-at-login",
      ],
      zh: [
        "全局快捷键（⌘⇧X）唤起截图层",
        "窗口、区域、全屏三种模式",
        "自动把结果复制到剪贴板",
        "悬停高亮，精准锁定目标窗口",
        "自定义快捷键、本地保存、开机自启",
      ],
    },
    tech: ["Swift", "AppKit"],
    platform: { en: "macOS", zh: "macOS" },
    status: "released",
    repo: "baomi-app/pop",
    repoLocale: "zh",
    accent: "from-amber-400 to-orange-500",
    image: "/pop.png",
    links: [
      {
        // Stable "latest release" URL — always serves the newest Pop.zip, so it
        // does not change between versions (as long as the asset stays Pop.zip).
        label: { en: "Download", zh: "下载" },
        href: "https://github.com/baomi-app/pop/releases/latest/download/Pop.zip",
      },
      { label: { en: "GitHub", zh: "GitHub" }, href: "https://github.com/baomi-app/pop" },
    ],
  },
  {
    id: "rss",
    name: "People's RSS",
    tagline: {
      en: "A minimal RSS / Atom reader on Vercel, with bring-your-own-key AI summaries.",
      zh: "运行在 Vercel 上的极简 RSS / Atom 阅读器，用你自己的 Key 生成 AI 摘要。",
    },
    description: {
      en: "A self-hosted, privacy-first feed reader. Add any RSS or Atom URL, summarize any article in one click with your own AI key, and sync everything across devices with GitHub sign-in.",
      zh: "自托管、隐私优先的阅读器。添加任意 RSS 或 Atom 源，用你自己的 AI Key 一键总结文章，并通过 GitHub 登录在多设备间同步。",
    },
    features: {
      en: [
        "Add any RSS / Atom feed — Chinese & English UI",
        "One-click AI summaries (OpenAI / Anthropic, your key)",
        "Cross-device sync of feeds & read state via GitHub",
        "Full-text extraction with Readability & Jina fallback",
        "Built-in image proxy, SSRF protection & rate limiting",
      ],
      zh: [
        "添加任意 RSS / Atom 源——中英文界面",
        "一键 AI 摘要（OpenAI / Anthropic，用你的 Key）",
        "通过 GitHub 跨设备同步订阅与已读状态",
        "全文提取，Readability 与 Jina 兜底",
        "内置图片代理、SSRF 防护与限流",
      ],
    },
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "Upstash Redis"],
    platform: { en: "Web", zh: "网页" },
    status: "released",
    repo: "people-s-organization/people-s-rss",
    repoLocale: "en",
    accent: "from-sky-400 to-indigo-500",
    website: "https://rss.baomi.app",
    links: [
      { label: { en: "Open app", zh: "打开应用" }, href: "https://rss.baomi.app" },
      {
        label: { en: "GitHub", zh: "GitHub" },
        href: "https://github.com/people-s-organization/people-s-rss",
      },
    ],
  },
];

export function getApp(id: string): App | undefined {
  return apps.find((app) => app.id === id);
}
