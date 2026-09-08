"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ui, useLocale } from "@/i18n";

export function ToolsSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const { t } = useLocale();
  return <section id="tools" className="tools-section shell"><Reveal>
    <div className="tools-intro"><Heading className="section-title">{t(ui.tools.heading)}</Heading><p className="section-description">{t(ui.tools.sub)}</p></div>
    <Link href="/tools/hy2" className="tool-feature">
      <div className="tool-symbol" aria-hidden="true"><span>HY2</span><span>↔</span><span>Clash</span></div>
      <div className="tool-copy"><p className="muted text-sm">{t(ui.tools.hy2.platform)}</p><h3>{t(ui.tools.hy2.name)}</h3><p>{t(ui.tools.hy2.tagline)}</p></div>
      <span className="tool-action">{t(ui.tools.open)} <span aria-hidden="true">↗</span></span>
    </Link>
  </Reveal></section>;
}
