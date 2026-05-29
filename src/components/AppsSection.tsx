"use client";

import { AppCard } from "@/components/AppCard";
import { apps } from "@/data/apps";
import type { RepoMeta } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function AppsSection({
  meta = {},
}: {
  meta?: Record<string, RepoMeta>;
}) {
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
          {apps.length} {t(ui.apps.count)}
        </span>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} meta={meta[app.repo]} />
        ))}
      </div>
    </section>
  );
}
