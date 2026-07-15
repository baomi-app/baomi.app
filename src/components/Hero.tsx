"use client";

import { AppIcon } from "@/components/AppIcon";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function Hero({ views }: { views: AppView[] }) {
  const { t } = useLocale();
  return (
    <section className="overflow-hidden border-b border-[var(--rule)]">
      <div className="mx-auto grid min-h-[calc(88dvh-4rem)] max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_.82fr] lg:px-8 lg:py-20">
        <div className="animate-rise-in max-w-xl">
          <p className="text-sm font-semibold text-[var(--accent)]">{t(ui.hero.badge)}</p>
          <h1 className="mt-5 text-balance font-display text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl">
            {t(ui.hero.titleLead)}<span className="text-[var(--accent)] transition-colors duration-300 hover:text-[var(--brand-yellow)]">{t(ui.hero.titleAccent)}</span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-base leading-7 text-[var(--ink-muted)] sm:text-lg">{t(ui.hero.subtitle)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#apps" className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-[14px] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--on-accent)] transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-[var(--brand-yellow)] hover:text-[#172019] active:translate-y-px">{t(ui.hero.ctaExplore)}</a>
            <a href="https://github.com/baomi-app" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-[14px] px-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--accent)] active:translate-y-px">{t(ui.hero.ctaGithub)} <span className="ml-2">↗</span></a>
          </div>
        </div>

        <div className="animate-rise-in-delayed overflow-hidden rounded-[14px] border border-[var(--rule)] bg-[var(--surface)] p-2">
          <div className="flex items-center justify-between px-3 py-2 text-sm">
            <span className="font-semibold text-[var(--foreground)]">{t(ui.hero.catalogLabel)}</span>
            <span className="font-mono text-xs text-[var(--ink-muted)]">{views.length} {t(ui.apps.count)}</span>
          </div>
          <div className="max-h-[25rem] space-y-1 overflow-y-auto overscroll-contain pr-1">
            {views.length === 0 && (
              <p className="rounded-[11px] bg-[var(--surface-strong)] px-4 py-8 text-center text-sm text-[var(--ink-muted)]">{t(ui.hero.catalogEmpty)}</p>
            )}
            {views.map((app) => (
              <a key={app.id} href={`/${app.id}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[11px] bg-[var(--surface-strong)] px-3 py-3 transition-colors hover:bg-[var(--accent-soft)] active:translate-y-px">
                <AppIcon app={app} className="h-11 w-11" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[var(--foreground)]">{app.content.name}</p>
                  <p className="mt-0.5 truncate text-xs text-[var(--ink-muted)]">{t(app.content.platform)}</p>
                </div>
                <span className="text-sm text-[var(--ink-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--accent)]">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
