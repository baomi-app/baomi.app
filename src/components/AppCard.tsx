"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import { RepoStats } from "@/components/RepoStats";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function AppCard({ app, index }: { app: AppView; index: number }) {
  const { t } = useLocale();
  const { content } = app;
  const style = { "--app-accent": content.accent?.from ?? "var(--accent)" } as CSSProperties;

  return (
    <Link href={`/${app.id}`} className="app-index-row" style={style}>
      <span className="self-start pt-1 font-mono text-[10px] text-[var(--ink-muted)] sm:self-center sm:pt-0">
        {(index + 1).toString().padStart(2, "0")}
      </span>

      <div className="app-index-copy flex min-w-0 items-center gap-4">
        <AppIcon app={app} className="h-14 w-14 shrink-0 rounded-[14px] text-lg" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="truncate text-xl font-semibold tracking-[-.03em] sm:text-2xl">{content.name}</h3>
            <span className="font-mono text-[10px] uppercase tracking-[.08em] text-[var(--ink-muted)]">{t(ui.status[content.status])}</span>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--ink-muted)]">
            <span>{t(content.platform)}</span>
            <RepoStats meta={app.meta} />
          </div>
        </div>
      </div>

      <p className="app-index-tagline max-w-[48ch] text-sm leading-6 text-[var(--ink-muted)] sm:text-[15px] sm:leading-7">
        {t(content.tagline)}
      </p>

      <span className="app-index-arrow row-arrow grid h-11 w-11 place-items-center justify-self-end text-lg" aria-hidden="true">↗</span>
      <span className="sr-only">{t(ui.apps.viewDetails)}</span>
    </Link>
  );
}
