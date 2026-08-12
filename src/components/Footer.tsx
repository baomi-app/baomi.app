"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ui, useLocale } from "@/i18n";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="mt-auto border-t border-[var(--rule)]">
      <div className="site-frame flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-[var(--ink-muted)]">© 2026 · {t(ui.brand.tagline)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--ink-muted)]">
          <Link href="/tools" className="min-h-11 content-center transition-colors hover:text-[var(--foreground)]">{t(ui.nav.tools)}</Link>
          <a href="https://github.com/baomi-app" target="_blank" rel="noreferrer" className="min-h-11 content-center transition-colors hover:text-[var(--foreground)]">GitHub ↗</a>
          <a href="mailto:hi@baomi.app" className="min-h-11 content-center transition-colors hover:text-[var(--foreground)]">{t(ui.footer.contact)}</a>
        </div>
      </div>
    </footer>
  );
}
