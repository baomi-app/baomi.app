"use client";

import { ui, useLocale } from "@/i18n";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="mt-auto border-t border-[var(--rule)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-[var(--ink-muted)] sm:flex-row">
        <p>© 2026 baomi.app · {t(ui.brand.tagline)}</p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/baomi-app"
            target="_blank"
            rel="noreferrer"
            className="rounded-md transition-colors hover:text-[var(--foreground)]"
          >
            GitHub
          </a>
          <a
            href="mailto:hi@baomi.app"
            className="rounded-md transition-colors hover:text-[var(--foreground)]"
          >
            {t(ui.footer.contact)}
          </a>
        </div>
      </div>
    </footer>
  );
}
