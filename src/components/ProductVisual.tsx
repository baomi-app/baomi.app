"use client";

import { useState } from "react";
import { AppIcon } from "@/components/AppIcon";
import type { AppView } from "@/data/github";
import { useLocale } from "@/i18n";

/** Real repository imagery with a branded fallback when an asset is unavailable. */
export function ProductVisual({ app, priority = false }: { app: AppView; priority?: boolean }) {
  const { t } = useLocale();
  const [failed, setFailed] = useState(false);
  const source = app.screenshotUrls[0];
  return <div className={`product-visual ${source && !failed ? "has-screenshot" : "icon-visual"}`}>
    {source && !failed ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={source} alt={t({ en: `${app.content.name} interface preview`, zh: `${app.content.name} 界面预览` })} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} onError={() => setFailed(true)} />
    ) : <AppIcon app={app} className="visual-app-icon" />}
  </div>;
}
