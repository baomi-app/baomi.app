"use client";

import { ui, useLocale } from "@/i18n";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="product-stage site-frame" aria-labelledby="site-intro-title">
      <div className="product-stage-intro">
        <div className="product-stage-statement">
          <p className="product-stage-eyebrow">{t(ui.hero.badge)}</p>
          <h1 id="site-intro-title">
            <span className="product-stage-title-lead">{t(ui.hero.titleLead)}</span>
            <span className="product-stage-title-accent">{t(ui.hero.titleAccent)}</span>
          </h1>
        </div>
        <p className="product-stage-copy">{t(ui.hero.subtitle)}</p>
      </div>
    </section>
  );
}
