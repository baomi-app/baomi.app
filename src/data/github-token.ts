import { getCloudflareContext } from "@opennextjs/cloudflare";

type GitHubTokenEnv = {
  GITHUB_TOKEN?: string;
};

export async function getGitHubToken(): Promise<string | undefined> {
  const token = process.env.GITHUB_TOKEN;
  if (token) return token;

  try {
    const { env } = await getCloudflareContext({ async: true });
    const cloudflareToken = (env as GitHubTokenEnv).GITHUB_TOKEN;
    return cloudflareToken || undefined;
  } catch {
    return undefined;
  }
}
