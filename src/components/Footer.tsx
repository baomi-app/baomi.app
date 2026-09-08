"use client";
import { Logo } from "@/components/Logo";
import { ui, useLocale } from "@/i18n";
export function Footer() {
  const { t } = useLocale();
  return <footer className="site-footer"><div className="shell"><div className="footer-top"><div><Logo /><p>{t(ui.brand.tagline)}</p></div><a className="footer-contact" href="mailto:hi@baomi.app">{t(ui.footer.contact)} <span aria-hidden="true">↗</span></a></div><div className="footer-bottom"><span>© 2026 baomi.app</span><a href="https://github.com/baomi-app" target="_blank" rel="noreferrer">GitHub ↗</a></div></div></footer>;
}
