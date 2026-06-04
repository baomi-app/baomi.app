// Live data pulled from GitHub, called only from Server Components and cached
// on an interval (ISR) so the site stays current without a redeploy.
//   - Repo stats (stars / version / updated) come from the REST API. Set
//     GITHUB_TOKEN to lift the unauthenticated rate limit.
//   - Each app's bilingual content comes from `baomi.json` in its own repo,
//     fetched from raw.githubusercontent.com (CDN, no rate limit / token).

import { apps, type AppConfig, type AppContent } from "@/data/apps";

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
  /** Absolute URLs to the app's screenshots. */
  screenshotUrls: string[];
};

function resolveIconUrl(config: AppConfig, content: AppContent): string | null {
  const icon = content.icon;
  if (!icon) return null;
  if (/^https?:\/\//.test(icon)) return icon;
  const branch = config.branch ?? "main";
  return `/api/proxy?repo=${encodeURIComponent(config.repo)}&path=${encodeURIComponent(icon)}&branch=${encodeURIComponent(branch)}`;
}

function resolveScreenshotUrls(config: AppConfig, content: AppContent): string[] {
  const screenshots = content.screenshots;
  if (!screenshots) return [];
  const branch = config.branch ?? "main";
  return screenshots.map((path) => {
    if (/^https?:\/\//.test(path)) return path;
    return `/api/proxy?repo=${encodeURIComponent(config.repo)}&path=${encodeURIComponent(path)}&branch=${encodeURIComponent(branch)}`;
  });
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
      cache: "no-store",
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

export async function getAppContent(
  config: AppConfig
): Promise<AppContent | null> {
  const branch = config.branch ?? "main";
  const file = config.contentFile ?? "baomi.json";

  // 1. Try public raw GitHub CDN first
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${config.repo}/${branch}/${file}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      return (await res.json()) as AppContent;
    } else {
      console.warn(`[GitHub CDN] Public CDN returned status ${res.status} for ${config.repo}`);
    }
  } catch (err: any) {
    if (err && (err.digest === "DYNAMIC_SERVER_USAGE" || (err.message && err.message.includes("Dynamic server usage")))) {
      throw err;
    }
    console.warn(`[GitHub CDN] Failed to fetch via public CDN for ${config.repo}:`, err);
  }

  // 2. Fall back to GitHub REST API (which supports private repos when GITHUB_TOKEN is configured)
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.raw",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    } else {
      console.warn(`[GitHub API] GITHUB_TOKEN is not defined in environment variables!`);
    }
    const res = await fetch(
      `https://api.github.com/repos/${config.repo}/contents/${file}?ref=${branch}`,
      {
        headers,
        cache: "no-store",
      }
    );
    if (res.ok) {
      return (await res.json()) as AppContent;
    } else {
      console.warn(`[GitHub API] API returned status ${res.status} for ${config.repo}. Token might not have read access to private repos.`);
    }
  } catch (err: any) {
    if (err && (err.digest === "DYNAMIC_SERVER_USAGE" || (err.message && err.message.includes("Dynamic server usage")))) {
      throw err;
    }
    console.warn(`[GitHub API] Failed to fetch via API for ${config.repo}:`, err);
  }

  return null;
}

export async function getAppView(config: AppConfig): Promise<AppView | null> {
  const [content, meta] = await Promise.all([
    getAppContent(config),
    getRepoMeta(config.repo),
  ]);
  if (!content) return null;
  return {
    ...config,
    content,
    meta,
    iconUrl: resolveIconUrl(config, content),
    screenshotUrls: resolveScreenshotUrls(config, content),
  };
}

export async function getAllAppViews(): Promise<AppView[]> {
  const views = await Promise.all(apps.map(getAppView));
  return views.filter((v): v is AppView => v !== null);
}
