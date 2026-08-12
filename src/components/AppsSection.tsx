"use client";

import { AppCard } from "@/components/AppCard";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function AppsSection({ views }: { views: AppView[] }) {
  const { t } = useLocale();
  return (
    <section id="apps" className="scroll-mt-24">
      <div className="mx-auto max-w-[1480px] px-5 py-24 sm:px-8 sm:py-32 lg:px-14 xl:px-20">
        <div className="grid gap-6 pb-12 md:grid-cols-[minmax(0,.72fr)_minmax(20rem,.38fr)] md:items-end md:justify-between sm:pb-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[.2em] text-[var(--accent)]">
              {t(ui.apps.eyebrow)} · {views.length.toString().padStart(2, "0")}
            </p>
            <h2 className="mt-5 max-w-4xl text-balance font-display text-[clamp(2.8rem,6.5vw,6.4rem)] font-semibold leading-[.9] tracking-[-.065em]">
              {t(ui.apps.heading)}
            </h2>
          </div>
          <p className="max-w-[44ch] text-base leading-7 text-[var(--ink-muted)] md:justify-self-end">
            {t(ui.apps.sub)}
          </p>
        </div>

        <div>
          {views.map((view, index) => (
            <AppCard key={view.id} app={view} index={index} />
          ))}
          <div className="border-t border-[var(--rule)]" />
        </div>
      </div>
    </section>
  );
}
