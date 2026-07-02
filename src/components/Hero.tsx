"use client";

import { AppIcon } from "@/components/AppIcon";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function Hero({ views }: { views: AppView[] }) {
  const { t } = useLocale();
  const featured = views.slice(0, 5);

  return (
    <section className="relative overflow-hidden border-b border-[var(--rule)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
        <div>
          <span className="animate-label-in label-cut inline-flex items-center gap-2 bg-[var(--saffron)] px-3.5 py-1.5 pr-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)] shadow-[4px_4px_0_var(--foreground)]">
            <span className="h-2 w-2 bg-[var(--tomato)]" />
            {t(ui.hero.badge)}
          </span>

          <h1 className="animate-label-in mt-8 max-w-4xl text-balance font-display text-5xl font-semibold leading-[0.98] tracking-normal text-[var(--foreground)] sm:text-7xl lg:text-8xl">
            {t(ui.hero.titleLead)}
            <span className="text-[var(--teal)]">
              {t(ui.hero.titleAccent)}
            </span>
          </h1>

          <p className="animate-label-in mt-6 max-w-2xl text-lg leading-8 text-[var(--ink-muted)] sm:text-xl">
            {t(ui.hero.subtitle)}
          </p>

          <div className="animate-label-in mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#apps"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--foreground)] px-5 text-sm font-semibold text-white shadow-[4px_4px_0_var(--saffron)] transition-transform hover:-translate-y-0.5"
            >
              {t(ui.hero.ctaExplore)}
            </a>
            <a
              href="https://github.com/baomi-app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-[var(--foreground)] bg-[var(--surface)] px-5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-white"
            >
              {t(ui.hero.ctaGithub)}
            </a>
          </div>
        </div>

        <div className="tool-ledger relative border border-[var(--foreground)] p-3 shadow-[8px_8px_0_var(--foreground)]">
          <div className="flex items-center justify-between border-b border-[var(--foreground)] bg-[var(--surface-strong)] px-3 py-2">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--teal)]">
              {t(ui.hero.catalogLabel)}
            </p>
            <p className="font-mono text-[11px] text-[var(--ink-muted)]">
              {t(ui.hero.catalogMeta)}
            </p>
          </div>

          <div className="mt-3 space-y-2">
            {featured.length === 0 && (
              <div className="border border-dashed border-[var(--rule)] bg-[var(--surface-strong)] px-4 py-8 text-sm text-[var(--ink-muted)]">
                {t(ui.hero.catalogEmpty)}
              </div>
            )}

            {featured.map((app, index) => (
              <a
                key={app.id}
                href={`/${app.id}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 border border-[var(--rule)] bg-[var(--surface-strong)] p-3 transition-transform hover:-translate-x-1 hover:border-[var(--foreground)]"
              >
                <AppIcon app={app} className="h-11 w-11" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[var(--foreground)]">
                    {app.content.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-[var(--ink-muted)]">
                    {t(app.content.platform)}
                  </p>
                </div>
                <span className="font-mono text-xs text-[var(--ink-muted)] transition-colors group-hover:text-[var(--teal)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
