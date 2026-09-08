"use client";

import { useState } from "react";
import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import { ProductVisual } from "@/components/ProductVisual";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function Hero({ views }: { views: AppView[] }) {
  const { t } = useLocale();
  const featured = [...views].sort((a, b) => Number(b.screenshotUrls.length > 0) - Number(a.screenshotUrls.length > 0)).slice(0, 4);
  const [selected, setSelected] = useState(0);
  const app = featured[selected] ?? featured[0];
  return (
    <section className="studio-hero shell">
      <div className="hero-copy animate-rise-in">
        <p className="eyebrow">{t(ui.hero.badge)}</p>
        <h1>{t(ui.hero.titleLead)}<br /><span>{t(ui.hero.titleAccent)}</span></h1>
        <div className="hero-bottom">
          <p>{t(ui.hero.subtitle)}</p>
          <a href="#apps" className="button-primary">{t(ui.hero.ctaExplore)} <span aria-hidden="true">↘</span></a>
        </div>
      </div>
      {app ? (
        <div className="showcase animate-rise-in-delayed">
          <div className="showcase-stage" key={app.id}>
            <Link href={`/${app.id}`} className="showcase-link" aria-label={`${t(ui.apps.viewDetails)}: ${app.content.name}`}>
              <ProductVisual app={app} priority />
            </Link>
            <div className="showcase-caption">
              <div><span className="muted text-xs">{t(app.content.platform)}</span><h2>{app.content.name}</h2></div>
              <Link href={`/${app.id}`} className="round-link" aria-label={`${t(ui.apps.viewDetails)}: ${app.content.name}`}>↗</Link>
            </div>
          </div>
          <div className="showcase-dock" role="group" aria-label={t(ui.hero.catalogLabel)}>
            {featured.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className="dock-item"><AppIcon app={item} className="h-9 w-9" /><span>{item.content.name}</span></button>)}
          </div>
        </div>
      ) : <p className="empty-state">{t(ui.hero.catalogEmpty)}</p>}
    </section>
  );
}
