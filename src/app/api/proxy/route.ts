import { NextRequest } from "next/server";
import { getGitHubToken } from "@/data/github-token";

const PROXY_REVALIDATE_SECONDS = 3600;
const EDGE_CACHE_SECONDS = 86400;
const STALE_WHILE_REVALIDATE_SECONDS = 604800;
const MAX_CACHE_TAG_LENGTH = 256;

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get("repo");
  const path = searchParams.get("path");
  const branch = searchParams.get("branch") || "main";

  if (!repo || !path) {
    return new Response("Missing parameters", { status: 400 });
  }

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.raw",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = await getGitHubToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const encodedPath = encodeRepoPath(path);
    const cacheOptions = {
      revalidate: PROXY_REVALIDATE_SECONDS,
      tags: [
        "github-proxy",
        cacheTag(`github-proxy:${repo}`),
        cacheTag(`github-proxy:${repo}:${branch}:${path}`),
      ],
    };
    const rawRes = await fetch(
      `https://raw.githubusercontent.com/${repo}/${encodeURIComponent(branch)}/${encodedPath}`,
      {
        headers,
        next: cacheOptions,
      }
    );

    const res = rawRes.ok
      ? rawRes
      : await fetch(
          `https://api.github.com/repos/${repo}/contents/${encodedPath}?ref=${encodeURIComponent(branch)}`,
          {
            headers,
            cache: "no-store",
          }
        );

    if (!res.ok) return new Response("Not found", { status: 404 });

    const contentType = res.headers.get("content-type") || "application/octet-stream";
    const responseHeaders = new Headers({
      "Content-Type": contentType,
      "Cache-Control": `public, max-age=${PROXY_REVALIDATE_SECONDS}, s-maxage=${EDGE_CACHE_SECONDS}, stale-while-revalidate=${STALE_WHILE_REVALIDATE_SECONDS}`,
    });
    const etag = res.headers.get("etag");
    const lastModified = res.headers.get("last-modified");
    if (etag) responseHeaders.set("ETag", etag);
    if (lastModified) responseHeaders.set("Last-Modified", lastModified);

    return new Response(res.body, {
      headers: responseHeaders,
    });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
