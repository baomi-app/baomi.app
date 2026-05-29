// Live data pulled from GitHub, called only from Server Components and cached
// on an interval (ISR) so the site stays current without a redeploy.
//   - Repo stats (stars / version / updated) come from the REST API. Set
//     GITHUB_TOKEN to lift the unauthenticated rate limit.
//   - Each app's bilingual content comes from `baomi.json` in its own repo,
//     fetched from raw.githubusercontent.com (CDN, no rate limit / token).

import {
  apps,
  fallbackContent,
  type AppConfig,
  type AppContent,
} from "@/data/apps";

const REVALIDATE_SECONDS = 3600; // refresh at most once per hour

export type RepoMeta = {
  stars: number;
  version: string | null; // latest release tag, or null if no releases
  updatedAt: string; // ISO: latest release date, else last push
};

export type AppView = AppConfig & {
  content: AppContent;
  meta: RepoMeta | null;
  /** Absolute URL to the app's icon, resolved from content.icon, or null. */
  iconUrl: string | null;
};

function resolveIconUrl(config: AppConfig, content: AppContent): string | null {
  const icon = content.icon;
  if (!icon) return null;
  if (/^https?:\/\//.test(icon)) return icon;
  const branch = config.branch ?? "main";
  return `https://raw.githubusercontent.com/${config.repo}/${branch}/${icon}`;
}

function ghHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function ghGet(path: string): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(`https://api.github.com/${path}`, {
      headers: ghHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function getRepoMeta(repo: string): Promise<RepoMeta | null> {
  const [info, release] = await Promise.all([
    ghGet(`repos/${repo}`),
    ghGet(`repos/${repo}/releases/latest`),
  ]);
  if (!info) return null;
  return {
    stars: typeof info.stargazers_count === "number" ? info.stargazers_count : 0,
    version: (release?.tag_name as string) ?? null,
    updatedAt:
      (release?.published_at as string) ?? (info.pushed_at as string) ?? "",
  };
}

export async function getAppContent(config: AppConfig): Promise<AppContent> {
  const branch = config.branch ?? "main";
  const file = config.contentFile ?? "baomi.json";
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${config.repo}/${branch}/${file}`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (res.ok) {
      return (await res.json()) as AppContent;
    }
  } catch {
    // fall through to bundled content
  }
  return fallbackContent[config.id];
}

export async function getAppView(config: AppConfig): Promise<AppView> {
  const [content, meta] = await Promise.all([
    getAppContent(config),
    getRepoMeta(config.repo),
  ]);
  return { ...config, content, meta, iconUrl: resolveIconUrl(config, content) };
}

export async function getAllAppViews(): Promise<AppView[]> {
  return Promise.all(apps.map(getAppView));
}
