"use client";

import { ui, useLocale } from "@/i18n";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="mt-auto border-t border-white/5">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-white/40 sm:flex-row">
        <p>© 2026 baomi · {t(ui.brand.tagline)}</p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/baomi-app"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a
            href="mailto:hi@baomi.app"
            className="transition-colors hover:text-white"
          >
            {t(ui.footer.contact)}
          </a>
        </div>
      </div>
    </footer>
  );
}
