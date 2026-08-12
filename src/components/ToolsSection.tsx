"use client";

import Link from "next/link";
import { ui, useLocale } from "@/i18n";

export function ToolsSection({ standalone = false }: { standalone?: boolean }) {
  const { locale, t } = useLocale();

  return (
    <section id="tools" className={`tools-stage ${standalone ? "tools-stage-standalone" : ""}`}>
      <div className="site-frame tools-stage-grid">
        <div className="tools-stage-intro">
          <div className="tools-stage-index"><span>01</span><i /></div>
          <h1>{locale === "zh" ? <>浏览器<br />工具</> : t(ui.tools.heading)}</h1>
          <p>{t(ui.tools.sub)}</p>
        </div>

        <Link href="/tools/hy2" className="tool-machine">
          <div className="tool-machine-top">
            <span>{t(ui.tools.hy2.platform)}</span>
            <span className="machine-status"><i /> LOCAL</span>
          </div>
          <div className="tool-machine-flow" aria-hidden="true">
            <span>HY2</span><b>→</b><span>Clash</span><b>→</b><span>Shadowrocket</span>
          </div>
          <div className="tool-machine-copy">
            <h2>{t(ui.tools.hy2.name)}</h2>
            <p>{t(ui.tools.hy2.tagline)}</p>
          </div>
          <div className="tool-machine-open">
            <span>{t(ui.tools.open)}</span><span aria-hidden="true">↗</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
