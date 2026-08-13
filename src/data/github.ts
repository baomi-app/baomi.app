// Live data pulled from GitHub, called only from Server Components and cached
// on an interval (ISR) so the site stays current without a redeploy.
//   - Repo stats (stars / version / updated) come from the REST API. Set
//     GITHUB_TOKEN to lift the unauthenticated rate limit.
//   - Each app's bilingual content comes from `baomi.json` in its own repo,
//     fetched from raw.githubusercontent.com (CDN, no rate limit / token).

import { apps, type AppConfig, type AppContent } from "@/data/apps";
import { getGitHubToken } from "@/data/github-token";

const GITHUB_REVALIDATE_SECONDS = 3600;
const GITHUB_REQUEST_TIMEOUT_MS = 8000;
const GITHUB_CACHE_TAG = "github";
const MAX_CACHE_TAG_LENGTH = 256;

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

type DevContentCache = Map<string, Promise<AppContent | null>>;

function devContentCache(): DevContentCache {
  const scope = globalThis as typeof globalThis & {
    __baomiAppContentCache?: DevContentCache;
  };
  return (scope.__baomiAppContentCache ??= new Map());
}

function assetVersion(content: AppContent): string | null {
  const parts = [content.version, content.build]
    .filter((part): part is string | number => part !== undefined && part !== null)
    .map(String)
    .filter(Boolean);

  return parts.length > 0 ? parts.join("-") : null;
}

function proxiedRepoAssetUrl(
  config: AppConfig,
  path: string,
  content: AppContent
): string {
  const params = new URLSearchParams({
    repo: config.repo,
    path,
    branch: config.branch ?? "main",
  });
  const version = assetVersion(content);
  if (version) params.set("v", version);

  return `/api/proxy?${params.toString()}`;
}

function resolveIconUrl(config: AppConfig, content: AppContent): string | null {
  const icon = content.icon;
  if (!icon) return null;
  if (/^https?:\/\//.test(icon)) return icon;
  return proxiedRepoAssetUrl(config, icon, content);
}

function resolveScreenshotUrls(config: AppConfig, content: AppContent): string[] {
  const screenshots = content.screenshots;
  if (!screenshots) return [];
  return screenshots.map((path) => {
    if (/^https?:\/\//.test(path)) return path;
    return proxiedRepoAssetUrl(config, path, content);
  });
}

function encodeRepoPath(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/");
}

function stringHash(value: string): string {
  let hash = 5381;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}

function cacheTag(value: string): string {
  if (value.length <= MAX_CACHE_TAG_LENGTH) return value;
  return `${value.slice(0, MAX_CACHE_TAG_LENGTH - 12)}:${stringHash(value)}`;
}

function repoTag(repo: string): string {
  return cacheTag(`github:${repo}`);
}

function repoFileTag(config: AppConfig, path: string): string {
  return cacheTag(`github:${config.repo}:${config.branch ?? "main"}:${path}`);
}

async function githubJsonHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = await getGitHubToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function githubRawHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.raw",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = await getGitHubToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function isDynamicServerUsageError(err: unknown): boolean {
  const digest =
    typeof err === "object" && err !== null && "digest" in err
      ? (err as { digest?: unknown }).digest
      : undefined;
  const message = err instanceof Error ? err.message : "";
  return (
    digest === "DYNAMIC_SERVER_USAGE" ||
    message.includes("Dynamic server usage")
  );
}

async function fetchRepoRaw(
  config: AppConfig,
  path: string,
  responseType: "json"
): Promise<Record<string, unknown> | null>;
async function fetchRepoRaw(
  config: AppConfig,
  path: string,
  responseType: "text"
): Promise<string | null>;
async function fetchRepoRaw(
  config: AppConfig,
  path: string,
  responseType: "json" | "text"
): Promise<Record<string, unknown> | string | null> {
  const branch = config.branch ?? "main";
  const encodedPath = encodeRepoPath(path);

  // 1. Try public raw GitHub CDN first.
  try {
    const headers = await githubRawHeaders();
    const res = await fetch(
      `https://raw.githubusercontent.com/${config.repo}/${branch}/${encodedPath}`,
      {
        headers,
        signal: AbortSignal.timeout(GITHUB_REQUEST_TIMEOUT_MS),
        next: {
          revalidate: GITHUB_REVALIDATE_SECONDS,
          tags: [GITHUB_CACHE_TAG, repoTag(config.repo), repoFileTag(config, path)],
        },
      }
    );
    if (res.ok) {
      return responseType === "json" ? await res.json() : await res.text();
    }
    console.warn(
      `[GitHub CDN] Public CDN returned status ${res.status} for ${config.repo}/${path}`
    );
  } catch (err: unknown) {
    if (isDynamicServerUsageError(err)) {
      throw err;
    }
    console.warn(
      `[GitHub CDN] Failed to fetch via public CDN for ${config.repo}/${path}:`,
      err
    );
  }

  // 2. Fall back to GitHub REST API, which supports private repos with GITHUB_TOKEN.
  try {
    const headers = await githubRawHeaders();
    if (!("Authorization" in headers)) {
      return null;
    }

    const res = await fetch(
      `https://api.github.com/repos/${config.repo}/contents/${encodedPath}?ref=${encodeURIComponent(branch)}`,
      {
        headers,
        signal: AbortSignal.timeout(GITHUB_REQUEST_TIMEOUT_MS),
        next: {
          revalidate: GITHUB_REVALIDATE_SECONDS,
          tags: [GITHUB_CACHE_TAG, repoTag(config.repo), repoFileTag(config, path)],
        },
      }
    );
    if (res.ok) {
      return responseType === "json" ? await res.json() : await res.text();
    }
    console.warn(
      `[GitHub API] API returned status ${res.status} for ${config.repo}/${path}. Token might not have read access to private repos.`
    );
  } catch (err: unknown) {
    if (isDynamicServerUsageError(err)) {
      throw err;
    }
    console.warn(
      `[GitHub API] Failed to fetch via API for ${config.repo}/${path}:`,
      err
    );
  }

  return null;
}

async function ghGet(path: string): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(`https://api.github.com/${path}`, {
      headers: await githubJsonHeaders(),
      signal: AbortSignal.timeout(GITHUB_REQUEST_TIMEOUT_MS),
      next: {
        revalidate: GITHUB_REVALIDATE_SECONDS,
        tags: [GITHUB_CACHE_TAG, cacheTag(`github:${path}`)],
      },
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
  if (config.content) return config.content;
  const file = config.contentFile ?? "baomi.json";
  const load = () => fetchRepoRaw(config, file, "json") as Promise<AppContent | null>;

  // Browser hard refreshes bypass Next's fetch cache in development. Keep the
  // remote config (including a missing file) for the lifetime of `next dev` so
  // CSS/component HMR never waits on GitHub again.
  if (process.env.NODE_ENV === "development") {
    const key = `${config.repo}:${config.branch ?? "main"}:${file}`;
    const cache = devContentCache();
    const cached = cache.get(key);
    if (cached) return cached;

    const pending = load();
    cache.set(key, pending);
    return pending;
  }

  return load();
}

export async function getRepoText(
  config: AppConfig,
  path: string
): Promise<string | null> {
  return fetchRepoRaw(config, path, "text");
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
  // Catalog cards do not render repository statistics. Avoid two extra GitHub
  // API calls per app on every cold dev start; detail pages still load them.
  const views = await Promise.all(
    apps.map(async (config): Promise<AppView | null> => {
      const content = await getAppContent(config);
      if (!content) return null;
      return {
        ...config,
        content,
        meta: null,
        iconUrl: resolveIconUrl(config, content),
        screenshotUrls: resolveScreenshotUrls(config, content),
      };
    })
  );
  return views.filter((v): v is AppView => v !== null);
}
