import { NextRequest } from "next/server";

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
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) {
      return new Response("Not found", { status: 404 });
    }
    const contentType = res.headers.get("content-type") || "application/octet-stream";
    
    return new Response(res.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store, must-revalidate",
      },
    });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
