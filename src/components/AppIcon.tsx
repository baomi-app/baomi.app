"use client";

import { useState } from "react";
import type { AppView } from "@/data/github";

/** Renders the app's own icon (hosted in its repo), or a lettered fallback. */
export function AppIcon({
  app,
  className = "",
  eager = false,
}: {
  app: AppView;
  className?: string;
  eager?: boolean;
}) {
  const [errored, setErrored] = useState(false);

  if (app.iconUrl && !errored) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={app.iconUrl}
        alt={`${app.content.name} icon`}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        onError={() => setErrored(true)}
        className={`object-cover ring-1 ring-black/10 ${className}`}
      />
    );
  }

  return (
    <span
      style={{ backgroundColor: app.content.accent?.from ?? "var(--accent)" }}
      className={`grid place-items-center font-semibold text-white ring-1 ring-black/10 ${className}`}
    >
      {app.content.name.charAt(0)}
    </span>
  );
}
