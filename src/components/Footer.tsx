"use client";

import { ui, useLocale } from "@/i18n";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="mt-auto border-t border-[var(--rule)]">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 py-10 text-sm text-[var(--ink-muted)] sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p>© 2026 baomi.app. {t(ui.brand.tagline)}</p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/baomi-app"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg transition-colors hover:text-[var(--foreground)]"
          >
            GitHub
          </a>
          <a
            href="mailto:hi@baomi.app"
            className="rounded-lg transition-colors hover:text-[var(--foreground)]"
          >
            {t(ui.footer.contact)}
          </a>
        </div>
      </div>
    </footer>
  );
}
