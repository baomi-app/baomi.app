"use client";

import { AppCard } from "@/components/AppCard";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function AppsSection({ views }: { views: AppView[] }) {
  const { t } = useLocale();
  return (
    <section id="apps" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="max-w-3xl">
        <div>
          <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-.045em] sm:text-6xl">
            {t(ui.apps.heading)}
          </h2>
          <p className="mt-5 max-w-[60ch] text-base leading-7 text-[var(--ink-muted)]">
            {t(ui.apps.sub)}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {views.map((view) => (
          <AppCard key={view.id} app={view} />
        ))}
      </div>
    </section>
  );
}
