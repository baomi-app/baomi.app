"use client";

import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import { RepoStats } from "@/components/RepoStats";
import { accentGradient } from "@/data/apps";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function AppCard({ app }: { app: AppView }) {
  const { t } = useLocale();
  const { content } = app;
  return (
    <Link
      href={`/${app.id}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/20"
    >
      {/* accent glow */}
      <div
        aria-hidden
        style={{ backgroundImage: accentGradient(content.accent) }}
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-20"
      />

      <div className="flex items-start justify-between gap-4">
        <AppIcon app={app} className="h-14 w-14" />
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/60">
            {t(content.platform)}
          </span>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-emerald-300">
            {t(ui.status[content.status])}
          </span>
        </div>
      </div>

      <h3 className="mt-6 text-2xl font-semibold tracking-tight">
        {content.name}
      </h3>
      <p className="mt-2 text-white/70">{t(content.tagline)}</p>

      <RepoStats meta={app.meta} className="mt-4" />



      <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
        {t(ui.apps.viewDetails)}
        <span className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}
