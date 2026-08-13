"use client";

import { AppCard } from "@/components/AppCard";
import type { AppView } from "@/data/github";

export function AppsSection({ views }: { views: AppView[] }) {
  return (
    <section id="apps" className="catalog-section scroll-mt-16">
      <div className="site-frame catalog-grid">
        {views.map((view) => <AppCard key={view.id} app={view} />)}
      </div>
    </section>
  );
}
