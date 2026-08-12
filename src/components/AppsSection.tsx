"use client";

import { AppCard } from "@/components/AppCard";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function AppsSection({ views }: { views: AppView[] }) {
  const { t } = useLocale();

  return (
    <section id="apps" className="catalog-section scroll-mt-16">
      <div className="site-frame catalog-heading">
        <p>{views.length.toString().padStart(2, "0")}</p>
        <h2>{t(ui.apps.heading)}</h2>
        <span>{t(ui.apps.count)}</span>
      </div>
      <div className="site-frame catalog-grid">
        {views.map((view, index) => <AppCard key={view.id} app={view} index={index} />)}
      </div>
    </section>
  );
}
