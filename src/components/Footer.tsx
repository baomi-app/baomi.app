"use client";

import { Logo } from "@/components/Logo";
import { ui, useLocale } from "@/i18n";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="mt-auto bg-[var(--foreground)] text-[var(--background)]">
      <div className="mx-auto max-w-[1480px] px-5 py-10 sm:px-8 lg:px-14 xl:px-20">
        <div className="flex flex-col justify-between gap-8 border-t border-[color:var(--background)]/18 pt-8 sm:flex-row sm:items-end">
          <div>
            <Logo className="[&>span]:text-[var(--background)]" />
            <p className="mt-4 text-sm opacity-55">© 2026 {t(ui.brand.tagline)}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <a
              href="https://github.com/baomi-app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-[color:var(--background)]/18 px-4 opacity-70 transition-[opacity,border-color] hover:border-[color:var(--background)]/45 hover:opacity-100"
            >
              GitHub ↗
            </a>
            <a
              href="mailto:hi@baomi.app"
              className="inline-flex min-h-11 items-center rounded-full border border-[color:var(--background)]/18 px-4 opacity-70 transition-[opacity,border-color] hover:border-[color:var(--background)]/45 hover:opacity-100"
            >
              {t(ui.footer.contact)}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
