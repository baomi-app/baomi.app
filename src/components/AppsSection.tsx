"use client";

import { AppCard } from "@/components/AppCard";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function AppsSection({ views }: { views: AppView[] }) {
  const { t } = useLocale();
  return (
    <section id="apps" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <div className="grid gap-6 border-b border-[var(--foreground)] pb-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tomato)]">
            {t(ui.apps.eyebrow)}
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-normal text-[var(--foreground)] sm:text-5xl">
            {t(ui.apps.heading)}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--ink-muted)]">
            {t(ui.apps.sub)}
          </p>
        </div>
        <span className="w-fit border border-[var(--foreground)] bg-[var(--saffron)] px-3 py-2 font-mono text-sm font-semibold text-[var(--foreground)] shadow-[3px_3px_0_var(--foreground)]">
          {views.length} {t(ui.apps.count)}
        </span>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {views.map((view) => (
          <AppCard key={view.id} app={view} />
        ))}
      </div>
    </section>
  );
}
