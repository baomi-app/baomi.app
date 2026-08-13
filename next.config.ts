import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  return {
    allowedDevOrigins: ["127.0.0.1"],
    // `next dev` and `next build` must not write into the same directory.
    // Running a production build while the dev server is alive otherwise
    // replaces assets that the dev server still references.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
    turbopack: {
      root: process.cwd(),
    },
  };
}
