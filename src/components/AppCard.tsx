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
      className="group relative flex min-h-[20rem] flex-col border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-[0_0_0_0_var(--foreground)] transition-all hover:-translate-y-1 hover:border-[var(--foreground)] hover:shadow-[6px_6px_0_var(--foreground)]"
    >
      <div className="flex items-start justify-between gap-4">
        <AppIcon app={app} className="h-14 w-14" />
        <div className="flex flex-wrap justify-end gap-2 text-xs">
          <span className="rounded-md border border-[var(--rule)] bg-white px-2.5 py-1 text-[var(--ink-muted)]">
            {t(content.platform)}
          </span>
          <span className="rounded-md border border-[var(--teal)] bg-[rgba(11,107,99,0.08)] px-2.5 py-1 font-semibold text-[var(--teal)]">
            {t(ui.status[content.status])}
          </span>
        </div>
      </div>

      <h3 className="mt-6 text-2xl font-bold tracking-tight text-[var(--foreground)]">
        {content.name}
      </h3>
      <p className="mt-3 line-clamp-3 leading-7 text-[var(--ink-muted)]">
        {t(content.tagline)}
      </p>

      <RepoStats meta={app.meta} className="mt-4" />

      <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold text-[var(--foreground)] transition-colors group-hover:text-[var(--teal)]">
        {t(ui.apps.viewDetails)}
        <span className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
