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
  /** Brand colors. The first color is used as the catalog hover background. */
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
  /** Bilingual fallback for legacy repositories that do not have baomi.json yet. */
  content?: AppContent;
};

export const apps: AppConfig[] = [
  { id: "knot", repo: "baomi-app/knot" },
  { id: "pop", repo: "baomi-app/pop" },
  { id: "open-youtube-music", repo: "baomi-app/open-youtube-music" },
  { id: "everlex", repo: "baomi-app/everlex-ios" },
  { id: "rss", repo: "people-s-organization/people-s-rss" },
  { id: "codex-provider-bridge", repo: "people-s-organization/codex-provider-bridge" },
  { id: "forge-next", repo: "baomi-app/forge-next" },
  {
    id: "porter",
    repo: "arjenzhou/porter",
    branch: "master",
    content: {
      name: "Porter",
      status: "released",
      accent: { from: "#4ade80", to: "#fbbf24" },
      platform: { en: "Java 11+ library", zh: "Java 11+ 类库" },
      tagline: {
        en: "An open-source framework for moving data between different sources and destinations.",
        zh: "在不同数据源和目标之间传输数据的开源框架。",
      },
      description: {
        en: "Porter is a Java data-transmission framework with JDBC and HTTP clients, an extension SPI, and pluggable data-source modules.",
        zh: "Porter 是一个 Java 数据传输框架，支持 JDBC 和 HTTP 客户端，并提供扩展 SPI 和可插拔数据源模块。",
      },
      features: {
        en: [
          "JDBC and HTTP clients",
          "Extension points through Porter SPI",
          "Pluggable data-source modules",
        ],
        zh: [
          "支持 JDBC 和 HTTP 客户端",
          "通过 Porter SPI 扩展能力",
          "可插拔的数据源模块",
        ],
      },
      links: [
        {
          label: { en: "GitHub repository", zh: "GitHub 仓库" },
          href: "https://github.com/arjenzhou/porter",
        },
      ],
    },
  },
];
export function getConfig(id: string): AppConfig | undefined {
  return apps.find((app) => app.id === id);
}
