"use client";

import Link from "next/link";
import { ui, useLocale } from "@/i18n";

export function ToolsSection() {
  const { t } = useLocale();
  return (
    <section id="tools" className="border-t border-[var(--rule)] bg-[var(--surface)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-28 md:grid-cols-[.75fr_1.25fr] md:items-center lg:px-8">
        <div>
          <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-.045em] sm:text-5xl">{t(ui.tools.heading)}</h2>
          <p className="mt-5 max-w-[48ch] leading-7 text-[var(--ink-muted)]">{t(ui.tools.sub)}</p>
        </div>
        <Link href="/tools/hy2" className="group grid min-h-[18rem] content-between rounded-[14px] bg-[var(--surface-strong)] p-6 text-[var(--foreground)] transition-transform hover:-translate-y-1 active:translate-y-px sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <span className="font-mono text-sm text-[var(--ink-muted)]">{t(ui.tools.hy2.platform)}</span>
            <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-[var(--brand-yellow)] font-mono font-bold text-[#172019]">H2</span>
          </div>
          <div>
            <h3 className="text-3xl font-semibold tracking-[-.035em]">{t(ui.tools.hy2.name)}</h3>
            <p className="mt-3 max-w-[48ch] leading-7 text-[var(--ink-muted)]">{t(ui.tools.hy2.tagline)}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">{t(ui.tools.open)} <span className="transition-transform group-hover:translate-x-1">→</span></span>
          </div>
        </Link>
      </div>
    </section>
  );
}
