import { getCloudflareContext } from "@opennextjs/cloudflare";

type GitHubTokenEnv = {
  GITHUB_TOKEN?: string;
};

export async function getGitHubToken(): Promise<string | undefined> {
  const token = process.env.GITHUB_TOKEN;
  if (token) return token;

  // `next dev` does not use Cloudflare bindings. Asking OpenNext for its
  // context here starts a separate workerd process on the first page request,
  // which makes local refreshes slow and can contend with Next's dev cache.
  if (process.env.NODE_ENV === "development") return undefined;

  try {
    const { env } = await getCloudflareContext({ async: true });
    const cloudflareToken = (env as GitHubTokenEnv).GITHUB_TOKEN;
    return cloudflareToken || undefined;
  } catch {
    return undefined;
  }
}
