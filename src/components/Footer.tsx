"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ui, useLocale } from "@/i18n";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="site-footer">
      <div className="site-frame site-footer-grid">
        <div className="site-footer-mark"><Logo /><span>© 2026</span></div>
        <p>{t(ui.brand.tagline)}</p>
        <div className="site-footer-links">
          <Link href="/tools">{t(ui.nav.tools)}</Link>
          <a href="https://github.com/baomi-app" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="mailto:hi@baomi.app">{t(ui.footer.contact)}</a>
        </div>
      </div>
    </footer>
  );
}
