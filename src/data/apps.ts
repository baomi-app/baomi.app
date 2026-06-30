import type { L } from "@/i18n";

export type AppLink = {
  label: L;
  href: string;
};

export type Accent = { from: string; to: string };

export type AppPrivacy = {
  /** Optional route title. Falls back to "<app name> Privacy Policy". */
  title?: L;
  /** Short metadata description for the privacy page. */
  summary?: L;
  /** Human-readable last-updated label. */
  updated: L;
  /** Repo-relative Markdown files for the privacy policy body. */
  files: L;
};

/**
 * The bilingual content for one app — the source of truth, maintained in the
 * app's OWN repo as `baomi.json` on its default branch. The website fetches it
 * (see src/data/github.ts); there is no bundled copy.
 */
export type AppContent = {
  name: string;
  status: "released" | "beta" | "wip";
  version?: string;
  build?: string | number;
  /** Icon: a path relative to the repo root (e.g. "icon.png") or an absolute URL. */
  icon?: string;
  screenshots?: string[];
  /** Brand gradient as two hex colors. Falls back to a neutral gradient. */
  accent?: Accent;
  platform: L;
  tagline: L;
  description: L;
  features: { en: string[]; zh: string[] };
  troubleshooting?: L;
  privacy?: AppPrivacy;
  links: AppLink[];
};

/**
 * Site-side registration for one app. To add a new app, append one entry here
 * and drop a `baomi.json` in its repo — the card and /<id> page are generated
 * automatically. Everything visual/textual lives in the repo's baomi.json.
 */
export type AppConfig = {
  id: string; // URL slug, e.g. "pop"
  repo: string; // "owner/name" on GitHub
  branch?: string; // default "main"
  contentFile?: string; // default "baomi.json"
};

export const apps: AppConfig[] = [
  { id: "pop", repo: "baomi-app/pop" },
  { id: "open-youtube-music", repo: "baomi-app/open-youtube-music" },
  { id: "everlex", repo: "baomi-app/everlex-ios" },
  { id: "rss", repo: "people-s-organization/people-s-rss" },
  { id: "codex-provider-bridge", repo: "people-s-organization/codex-provider-bridge" },
  { id: "forge-next", repo: "baomi-app/forge-next" },
];


export function getConfig(id: string): AppConfig | undefined {
  return apps.find((app) => app.id === id);
}

const DEFAULT_ACCENT: Accent = { from: "#a1a1aa", to: "#52525b" };

/** CSS gradient string for an app's accent, used in inline styles. */
export function accentGradient(accent?: Accent): string {
  const { from, to } = accent ?? DEFAULT_ACCENT;
  return `linear-gradient(to bottom right, ${from}, ${to})`;
}
