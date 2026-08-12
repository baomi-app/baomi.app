"use client";

import Link from "next/link";
import { ui, useLocale } from "@/i18n";

export function ToolsSection({ standalone = false }: { standalone?: boolean }) {
  const { t } = useLocale();

  return (
    <section id="tools" className={standalone ? "" : "border-t border-[var(--rule)]"}>
      <div className={`site-frame ${standalone ? "py-20 sm:py-28" : "py-20 sm:py-24"}`}>
        <div className="mb-10 max-w-2xl sm:mb-12">
          <p className="section-kicker">01 {t(ui.tools.count)}</p>
          <h1 className={`${standalone ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl"} mt-3 font-semibold tracking-[-.045em]`}>
            {t(ui.tools.heading)}
          </h1>
          {standalone && <p className="mt-5 max-w-[42ch] text-base leading-7 text-[var(--ink-muted)]">{t(ui.tools.sub)}</p>}
        </div>

        <Link href="/tools/hy2" className="tool-index-row group">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.12em] text-[var(--ink-muted)]">{t(ui.tools.hy2.platform)}</p>
            <h2 className="mt-2 text-xl font-semibold tracking-[-.03em] sm:text-2xl">{t(ui.tools.hy2.name)}</h2>
          </div>
          <p className="tool-index-description max-w-[52ch] text-sm leading-6 text-[var(--ink-muted)] sm:text-[15px] sm:leading-7">{t(ui.tools.hy2.tagline)}</p>
          <div className="tool-flow flex items-center gap-2 text-xs" aria-hidden="true">
            <span>HY2</span><b>→</b><span>Clash</span><b>→</b><span>Shadowrocket</span><b className="ml-2 transition-transform group-hover:translate-x-1">↗</b>
          </div>
          <span className="sr-only">{t(ui.tools.open)}</span>
        </Link>
      </div>
    </section>
  );
}
