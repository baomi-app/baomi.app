"use client";

import Link from "next/link";
import { ui, useLocale } from "@/i18n";

export function ToolsSection() {
  const { t } = useLocale();

  return (
    <section id="tools" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <div className="grid gap-6 border-b border-[var(--foreground)] pb-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tomato)]">
            {t(ui.tools.eyebrow)}
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-normal text-[var(--foreground)] sm:text-5xl">
            {t(ui.tools.heading)}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--ink-muted)]">
            {t(ui.tools.sub)}
          </p>
        </div>
        <span className="w-fit border border-[var(--foreground)] bg-[var(--saffron)] px-3 py-2 font-mono text-sm font-semibold text-[var(--foreground)] shadow-[3px_3px_0_var(--foreground)]">
          1 {t(ui.tools.count)}
        </span>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Link
          href="/tools/hy2"
          className="group relative flex min-h-[17rem] flex-col border border-[var(--rule)] bg-[var(--surface)] p-5 transition-all hover:-translate-y-1 hover:border-[var(--foreground)] hover:shadow-[6px_6px_0_var(--foreground)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-md border border-[var(--foreground)] bg-[var(--saffron)] font-mono text-lg font-bold text-[var(--foreground)] shadow-[3px_3px_0_var(--foreground)]">
              H2
            </div>
            <span className="rounded-md border border-[var(--rule)] bg-white px-2.5 py-1 text-xs text-[var(--ink-muted)]">
              {t(ui.tools.hy2.platform)}
            </span>
          </div>

          <h3 className="mt-6 text-2xl font-bold tracking-tight text-[var(--foreground)]">
            {t(ui.tools.hy2.name)}
          </h3>
          <p className="mt-3 line-clamp-3 leading-7 text-[var(--ink-muted)]">
            {t(ui.tools.hy2.tagline)}
          </p>

          <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold text-[var(--foreground)] transition-colors group-hover:text-[var(--teal)]">
            {t(ui.tools.open)}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
