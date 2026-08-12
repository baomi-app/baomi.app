"use client";

import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function Hero({ views }: { views: AppView[] }) {
  const { locale, t } = useLocale();

  return (
    <section className="site-frame grid gap-14 pb-20 pt-20 sm:pb-24 sm:pt-28 lg:grid-cols-[minmax(0,1.05fr)_minmax(25rem,.75fr)] lg:items-end lg:gap-20 lg:pt-36">
      <div className="reveal max-w-3xl">
        <p className="section-kicker">baomi.app</p>
        <h1 className="mt-5 max-w-[13ch] font-display text-[clamp(3rem,7vw,5.75rem)] font-semibold leading-[.98] tracking-[-.055em]">
          {locale === "zh" ? <>小应用，<br /><span className="whitespace-nowrap">做好一件事。</span></> : t(ui.hero.title)}
        </h1>
        <p className="mt-7 max-w-[46ch] text-base leading-7 text-[var(--ink-muted)] sm:text-lg sm:leading-8">
          {t(ui.hero.subtitle)}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5 text-sm font-semibold">
          <a href="#apps" className="inline-flex min-h-11 items-center gap-2 text-[var(--foreground)] transition-colors hover:text-[var(--accent)]">
            {t(ui.hero.ctaExplore)} <span aria-hidden="true">↓</span>
          </a>
          <a href="https://github.com/baomi-app" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-[var(--ink-muted)] transition-colors hover:text-[var(--foreground)]">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="reveal-delayed lg:pb-1">
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.14em] text-[var(--ink-muted)]">
          <span>{t(ui.hero.catalogLabel)}</span>
          <span>{views.length.toString().padStart(2, "0")}</span>
        </div>
        <div className="app-launcher" aria-label={t(ui.hero.catalogLabel)}>
          {views.map((app) => (
            <Link key={app.id} href={`/${app.id}`} title={app.content.name} className="app-launcher-link rounded-xl">
              <AppIcon app={app} eager className="h-14 w-14 rounded-[14px] text-xl sm:h-16 sm:w-16 sm:rounded-[16px]" />
              <span className="sr-only">{app.content.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
