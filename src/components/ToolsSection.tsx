"use client";

import Link from "next/link";
import { ui, useLocale } from "@/i18n";

export function ToolsSection() {
  const { locale, t } = useLocale();
  return (
    <section id="tools" className="border-y border-[var(--rule)] bg-[var(--foreground)] text-[var(--background)]">
      <div className="mx-auto grid max-w-[1480px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.74fr_1.26fr] lg:items-end lg:px-14 xl:px-20">
        <div>
          <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.2em] text-[var(--brand-green)]">
            <span className="h-px w-8 bg-current" />
            {t(ui.tools.eyebrow)}
          </div>
          <h2
            className={`mt-7 text-balance font-display font-semibold ${
              locale === "zh"
                ? "max-w-[4.5em] text-[clamp(2.8rem,4.8vw,4.8rem)] leading-[1.02] tracking-[-.035em]"
                : "max-w-[10ch] text-[clamp(2.9rem,6vw,6.2rem)] leading-[.88] tracking-[-.065em]"
            }`}
          >
            {t(ui.tools.heading)}
          </h2>
          <p className="mt-7 max-w-[42ch] text-base leading-7 opacity-60">{t(ui.tools.sub)}</p>
        </div>

        <Link
          href="/tools/hy2"
          className="group relative min-h-[23rem] overflow-hidden rounded-[28px] bg-[var(--brand-yellow)] p-7 text-[#161910] transition-transform duration-500 hover:-translate-y-1 sm:min-h-[28rem] sm:rounded-[34px] sm:p-10"
        >
          <div className="absolute -right-10 -top-16 select-none font-mono text-[13rem] font-bold leading-none text-black/[.055] sm:text-[19rem]" aria-hidden="true">H2</div>
          <div className="relative flex h-full min-h-[inherit] flex-col">
            <div className="flex items-start justify-between gap-6">
              <span className="font-mono text-[11px] uppercase tracking-[.18em] text-black/55">{t(ui.tools.hy2.platform)}</span>
              <span className="grid h-12 w-12 place-items-center rounded-full border border-black/20 text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </div>
            <div className="mt-auto max-w-2xl">
              <h3 className="text-3xl font-semibold leading-tight tracking-[-.045em] sm:text-5xl">{t(ui.tools.hy2.name)}</h3>
              <p className="mt-5 max-w-[50ch] text-base leading-7 text-black/62 sm:text-lg">{t(ui.tools.hy2.tagline)}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">
                {t(ui.tools.open)}
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
