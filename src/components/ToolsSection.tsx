"use client";

import Link from "next/link";
import { ui, useLocale } from "@/i18n";

export function ToolsSection({ standalone = false }: { standalone?: boolean }) {
  const { t } = useLocale();
  const Heading = standalone ? "h1" : "h2";
  const ToolHeading = standalone ? "h2" : "h3";

  return (
    <section id="tools" className={`tools-stage ${standalone ? "tools-stage-standalone" : ""}`}>
      <div className="site-frame tools-stage-grid">
        <div className="tools-stage-intro">
          <Heading>{t(ui.tools.heading)}</Heading>
          <p>{t(ui.tools.sub)}</p>
        </div>

        <Link href="/tools/hy2" className="tool-machine">
          <div className="tool-machine-copy">
            <ToolHeading>{t(ui.tools.hy2.name)}</ToolHeading>
            <p>{t(ui.tools.hy2.tagline)}</p>
          </div>
          <div className="tool-machine-open">
            <span>{t(ui.tools.open)}</span><span aria-hidden="true">→</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
