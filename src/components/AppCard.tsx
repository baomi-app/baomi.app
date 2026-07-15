"use client";

import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import { RepoStats } from "@/components/RepoStats";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function AppCard({ app }: { app: AppView }) {
  const { t } = useLocale();
  const { content } = app;
  return (
    <Link
      href={`/${app.id}`}
      className="group relative flex min-h-[16rem] flex-col overflow-hidden rounded-[14px] border border-[var(--rule)] bg-[var(--surface-strong)] p-5 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-[var(--accent)]"
    >
      <div className="flex items-start justify-between gap-4">
        <AppIcon app={app} className="h-12 w-12" />
        <div className="flex flex-wrap justify-end gap-2 text-xs">
          <span className="rounded-lg border border-[var(--rule)] bg-[var(--surface)] px-2.5 py-1 text-[var(--ink-muted)]">
            {t(content.platform)}
          </span>
          <span className="rounded-lg bg-[var(--accent-soft)] px-2.5 py-1 font-semibold text-[var(--accent)]">
            {t(ui.status[content.status])}
          </span>
        </div>
      </div>

      <h3 className="mt-5 text-2xl font-semibold tracking-[-.03em] text-[var(--foreground)]">
        {content.name}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--ink-muted)]">
        {t(content.tagline)}
      </p>

      <RepoStats meta={app.meta} className="mt-3" />

      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
        {t(ui.apps.viewDetails)}
        <span className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
