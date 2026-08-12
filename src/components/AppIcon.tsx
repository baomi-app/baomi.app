"use client";

import { useState } from "react";
import { accentGradient } from "@/data/apps";
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
        className={`object-cover shadow-[0_8px_24px_rgba(0,0,0,.10)] ring-1 ring-black/10 ${className}`}
      />
    );
  }

  return (
    <span
      style={{ backgroundImage: accentGradient(app.content.accent) }}
      className={`grid place-items-center font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,.10)] ring-1 ring-black/10 ${className}`}
    >
      {app.content.name.charAt(0)}
    </span>
  );
}
