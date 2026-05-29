// Live repo metadata pulled from the GitHub REST API. Called only from Server
// Components; results are cached and refreshed on an interval (ISR) so the site
// stays up to date without a redeploy. Set GITHUB_TOKEN in the environment to
// lift the unauthenticated rate limit (optional — traffic here is tiny).

export type RepoMeta = {
  stars: number;
  /** Latest release tag (e.g. "v0.1.0"), or null if the repo has no releases. */
  version: string | null;
  /** ISO timestamp: latest release date, falling back to last push. */
  updatedAt: string;
  /** The repo's GitHub description (single language), or null. */
  description: string | null;
};

const REVALIDATE_SECONDS = 3600; // refresh at most once per hour

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
    description: (info.description as string) ?? null,
  };
}

export async function getAllRepoMeta(
  repos: string[]
): Promise<Record<string, RepoMeta>> {
  const entries = await Promise.all(
    repos.map(async (repo) => [repo, await getRepoMeta(repo)] as const)
  );
  const result: Record<string, RepoMeta> = {};
  for (const [repo, meta] of entries) {
    if (meta) result[repo] = meta;
  }
  return result;
}
