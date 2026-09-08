"use client";

import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { AppIcon } from "@/components/AppIcon";
import { Reveal } from "@/components/Reveal";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function AppCard({ app }: { app: AppView }) {
  const { t } = useLocale();
  return <Reveal className="app-card-wrap"><Link href={`/${app.id}`} className="app-card">
    <div className="app-art"><ProductVisual app={app} /><span className="art-arrow" aria-hidden="true">↗</span></div>
    <div className="app-card-content"><div className="app-card-title"><AppIcon app={app} className="h-10 w-10" /><div><h3>{app.content.name}</h3><p>{t(app.content.platform)}</p></div><span className="app-status">{t(ui.status[app.content.status])}</span></div>
    <p className="app-description">{t(app.content.tagline)}</p></div>
  </Link></Reveal>;
}
