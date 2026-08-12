"use client";

import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import { RepoStats } from "@/components/RepoStats";
import { accentGradient } from "@/data/apps";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function AppCard({
  app,
  index,
}: {
  app: AppView;
  index: number;
}) {
  const { t } = useLocale();
  const { content } = app;

  return (
    <Link
      href={`/${app.id}`}
      className="group grid grid-cols-[2rem_minmax(0,1fr)_2.75rem] gap-x-4 gap-y-5 border-t border-[var(--rule)] py-7 transition-colors hover:border-[var(--foreground)] sm:grid-cols-[3rem_minmax(0,1fr)_minmax(16rem,.72fr)_3rem] sm:items-center sm:gap-7 sm:py-8"
    >
      <span className="col-start-1 row-start-1 pt-1 font-mono text-[11px] text-[var(--ink-muted)] sm:col-auto sm:row-auto sm:pt-0">
        {(index + 1).toString().padStart(2, "0")}
      </span>

      <div className="col-span-2 col-start-2 row-start-1 flex min-w-0 items-center gap-4 sm:col-auto sm:row-auto sm:gap-5">
        <span
          className="grid h-16 w-16 shrink-0 place-items-center rounded-[18px] transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-105"
          style={{ backgroundImage: accentGradient(content.accent) }}
        >
          <AppIcon app={app} className="h-12 w-12 rounded-[13px] text-lg" />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold tracking-[-.035em] text-[var(--foreground)] sm:text-2xl">
              {content.name}
            </h3>
            <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.08em] text-[var(--accent)]">
              {t(ui.status[content.status])}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--ink-muted)]">
            <span>{t(content.platform)}</span>
            <RepoStats meta={app.meta} />
          </div>
        </div>
      </div>

      <p className="col-start-2 row-start-2 max-w-[48ch] text-sm leading-6 text-[var(--ink-muted)] sm:col-auto sm:row-auto sm:text-base sm:leading-7">
        {t(content.tagline)}
      </p>

      <span className="col-start-3 row-start-2 grid h-11 w-11 place-items-center rounded-full border border-[var(--rule)] text-lg text-[var(--foreground)] transition-[transform,border-color,background-color,color] duration-300 group-hover:translate-x-1 group-hover:border-[var(--foreground)] group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] sm:col-auto sm:row-auto">
        <span aria-hidden="true">↗</span>
        <span className="sr-only">{t(ui.apps.viewDetails)}</span>
      </span>
    </Link>
  );
}
