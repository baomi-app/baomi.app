"use client";

import { AppCard } from "@/components/AppCard";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function AppsSection({ views }: { views: AppView[] }) {
  const { t } = useLocale();
  return (
    <section id="apps" className="mx-auto max-w-5xl px-6 pb-28">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t(ui.apps.heading)}
          </h2>
          <p className="mt-2 text-white/55">{t(ui.apps.sub)}</p>
        </div>
        <span className="hidden font-mono text-sm text-white/30 sm:block">
          {views.length} {t(ui.apps.count)}
        </span>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {views.map((view) => (
          <AppCard key={view.id} app={view} />
        ))}
      </div>
    </section>
  );
}
