"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import { RepoStats } from "@/components/RepoStats";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function Hero({ views }: { views: AppView[] }) {
  const { t } = useLocale();
  const initialId = views.find((view) => view.screenshotUrls.length > 0)?.id ?? views[0]?.id ?? "";
  const [activeId, setActiveId] = useState(initialId);
  const activeIndex = Math.max(0, views.findIndex((view) => view.id === activeId));
  const active = useMemo(() => views[activeIndex] ?? views[0], [activeIndex, views]);

  if (!active) return null;

  const style = {
    "--stage-from": active.content.accent?.from ?? "#777b74",
    "--stage-to": active.content.accent?.to ?? "#30332f",
  } as CSSProperties;

  return (
    <section className="product-stage site-frame" style={style}>
      <div className="product-stage-shell">
        <aside className="product-stage-rail">
          <div className="stage-rail-head">
            <p>{t(ui.hero.title)}</p>
            <span>{views.length.toString().padStart(2, "0")}</span>
          </div>

          <div className="stage-tabs" role="tablist" aria-label={t(ui.hero.catalogLabel)}>
            {views.map((app, index) => (
              <button
                key={app.id}
                type="button"
                role="tab"
                aria-selected={app.id === active.id}
                aria-controls="featured-app"
                onClick={() => setActiveId(app.id)}
                className="stage-tab"
              >
                <span className="stage-tab-index">{(index + 1).toString().padStart(2, "0")}</span>
                <AppIcon app={app} eager={index < 4} className="stage-tab-icon h-10 w-10 rounded-[10px] text-sm" />
                <span className="stage-tab-name">{app.content.name}</span>
              </button>
            ))}
          </div>

          <a href="#apps" className="stage-rail-foot">
            <span>{t(ui.hero.ctaExplore)}</span>
            <span aria-hidden="true">↓</span>
          </a>
        </aside>

        <div id="featured-app" role="tabpanel" className="product-stage-main">
          <div key={`${active.id}-copy`} className="stage-copy stage-change">
            <div className="stage-meta">
              <span>{t(active.content.platform)}</span>
              <span>{t(ui.status[active.content.status])}</span>
            </div>
            <h1>{active.content.name}</h1>
            <p>{t(active.content.tagline)}</p>
            <RepoStats meta={active.meta} className="stage-repo-stats" />
            <Link href={`/${active.id}`} className="stage-open-link">
              <span>{t(ui.apps.viewDetails)}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div key={`${active.id}-visual`} className="stage-visual stage-change" aria-live="polite">
            <span className="stage-watermark" aria-hidden="true">{(activeIndex + 1).toString().padStart(2, "0")}</span>
            <AppIcon app={active} eager className="stage-app-icon h-20 w-20 rounded-[20px] text-2xl sm:h-24 sm:w-24 sm:rounded-[24px]" />
            {active.screenshotUrls[0] ? (
              <div className="stage-screen">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.screenshotUrls[0]} alt={t(active.content.tagline)} loading="eager" fetchPriority="high" />
              </div>
            ) : (
              <div className="stage-no-screen" aria-hidden="true">
                <span>{active.content.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="product-stage-caption">
        <p>{t(ui.hero.subtitle)}</p>
        <a href="https://github.com/baomi-app" target="_blank" rel="noreferrer">GitHub ↗</a>
      </div>
    </section>
  );
}
