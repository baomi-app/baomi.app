"use client";

import { useState } from "react";
import { accentGradient } from "@/data/apps";
import type { AppView } from "@/data/github";

/** Renders the app's own icon (hosted in its repo), or a lettered fallback. */
export function AppIcon({
  app,
  className = "",
}: {
  app: AppView;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (app.iconUrl && !errored) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={app.iconUrl}
        alt={`${app.content.name} icon`}
        loading="lazy"
        onError={() => setErrored(true)}
        className={`rounded-lg object-cover shadow-sm ring-1 ring-black/10 ${className}`}
      />
    );
  }

  return (
    <span
      style={{ backgroundImage: accentGradient(app.content.accent) }}
      className={`grid place-items-center rounded-lg font-semibold text-black shadow-sm ring-1 ring-black/10 ${className}`}
    >
      {app.content.name.charAt(0)}
    </span>
  );
}
