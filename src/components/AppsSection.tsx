"use client";

import { useState } from "react";
import { AppCard } from "@/components/AppCard";
import { Reveal } from "@/components/Reveal";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

const filters = [
  { id: "all", label: { en: "All apps", zh: "全部应用" } },
  { id: "mac", label: { en: "macOS", zh: "macOS" } },
  { id: "ios", label: { en: "iOS", zh: "iOS" } },
  { id: "other", label: { en: "Web & developer", zh: "网页与开发工具" } },
] as const;
export function AppsSection({ views }: { views: AppView[] }) {
  const { t } = useLocale();
  const [filter, setFilter] = useState<string>("all");
  const shown = views.filter(app => {
    const platform = app.content.platform.en.toLowerCase();
    return filter === "all" || (filter === "mac" && platform.includes("mac")) || (filter === "ios" && platform.includes("ios")) || (filter === "other" && !platform.includes("mac") && !platform.includes("ios"));
  });
  return <section id="apps" className="apps-section shell">
    <Reveal><h2 className="section-title">{t(ui.apps.heading)}<span className="title-count">{String(views.length).padStart(2, "0")}</span></h2>
    <p className="section-description">{t(ui.apps.sub)}</p></Reveal>
    <div className="catalog-toolbar"><div className="filter-group" role="group" aria-label={t({ en: "Filter by platform", zh: "按平台筛选" })}>
      {filters.map(item => <button type="button" key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{t(item.label)}</button>)}
    </div><span className="catalog-count" aria-live="polite">{shown.length} {t(ui.apps.count)}</span></div>
    <div className="app-grid" key={filter}>{shown.map(view => <AppCard key={view.id} app={view} />)}</div>
    {shown.length === 0 && <p className="empty-state">{t({ en: "No apps on this platform yet. Explore all apps.", zh: "这个平台暂时没有应用，试试查看全部应用。" })}</p>}
  </section>;
}
