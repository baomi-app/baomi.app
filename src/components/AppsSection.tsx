"use client";

import { AppCard } from "@/components/AppCard";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function AppsSection({ views }: { views: AppView[] }) {
  const { t } = useLocale();

  return (
    <section id="apps" className="scroll-mt-20 border-t border-[var(--rule)]">
      <div className="site-frame py-20 sm:py-24">
        <div className="mb-10 flex items-end justify-between gap-6 sm:mb-12">
          <div>
            <p className="section-kicker">{views.length.toString().padStart(2, "0")} {t(ui.apps.count)}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">{t(ui.apps.heading)}</h2>
          </div>
        </div>
        <div>
          {views.map((view, index) => <AppCard key={view.id} app={view} index={index} />)}
          <div className="border-t border-[var(--rule)]" />
        </div>
      </div>
    </section>
  );
}
