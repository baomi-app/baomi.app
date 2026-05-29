export type AppLink = {
  label: string;
  href: string;
};

export type App = {
  id: string;
  name: string;
  tagline: string;
  taglineZh?: string;
  description: string;
  features: string[];
  tech: string[];
  platform: string;
  status: "released" | "beta" | "wip";
  accent: string; // tailwind gradient classes "from-... to-..."
  glyph: string; // emoji / short symbol used as a fallback icon
  website?: string; // the live app, if it has one
  links: AppLink[];
};

export const apps: App[] = [
  {
    id: "pop",
    name: "Pop",
    tagline: "A macOS screenshot tool. Click, instant capture.",
    taglineZh: "咔，一爆即得。",
    description:
      "A lightweight, fast screenshot utility for macOS. Hit a hotkey, pick a window or region, and the shot is on your clipboard before you blink.",
    features: [
      "Global hotkey (⌘⇧X) to summon the capture layer",
      "Window, region, and full-screen modes",
      "Auto-copies the result straight to your clipboard",
      "Hover highlighting to lock onto the right window",
      "Custom hotkeys, local saving, and launch-at-login",
    ],
    tech: ["Swift", "AppKit"],
    platform: "macOS",
    status: "released",
    accent: "from-amber-400 to-orange-500",
    glyph: "✂",
    links: [
      {
        label: "Download",
        href: "https://github.com/baomi-app/pop/releases",
      },
      { label: "GitHub", href: "https://github.com/baomi-app/pop" },
    ],
  },
  {
    id: "peoples-rss",
    name: "People's RSS",
    tagline:
      "A minimal RSS / Atom reader on Vercel, with bring-your-own-key AI summaries.",
    description:
      "A self-hosted, privacy-first feed reader. Add any RSS or Atom URL, summarize any article in one click with your own AI key, and sync everything across devices with GitHub sign-in.",
    features: [
      "Add any RSS / Atom feed — Chinese & English UI",
      "One-click AI summaries (OpenAI / Anthropic, your key)",
      "Cross-device sync of feeds & read state via GitHub",
      "Full-text extraction with Readability & Jina fallback",
      "Built-in image proxy, SSRF protection & rate limiting",
    ],
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "Upstash Redis"],
    platform: "Web",
    status: "released",
    accent: "from-sky-400 to-indigo-500",
    glyph: "❡",
    website: "https://rss.baomi.app",
    links: [
      { label: "Open app", href: "https://rss.baomi.app" },
      {
        label: "GitHub",
        href: "https://github.com/people-s-organization/people-s-rss",
      },
    ],
  },
];

export function getApp(id: string): App | undefined {
  return apps.find((app) => app.id === id);
}
