"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LangToggle } from "@/components/LangToggle";
import { ui, useLocale } from "@/i18n";

export function Nav() {
  const { t } = useLocale();
  return (
    <header className="sticky top-0 z-50 bg-[color:var(--background)]/88 backdrop-blur-xl">
      <nav className="mx-auto flex h-[4.5rem] max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-14 xl:px-20">
        <Link href="/" className="rounded-lg transition-opacity hover:opacity-70">
          <Logo />
        </Link>
        <div className="flex items-center gap-1 text-sm font-medium text-[var(--ink-muted)] sm:gap-2">
          <Link
            href="/#apps"
            className="hidden min-h-10 items-center rounded-full px-3 transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)] sm:inline-flex"
          >
            {t(ui.nav.apps)}
          </Link>
          <Link
            href="/tools"
            className="inline-flex min-h-10 items-center rounded-full px-3 transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
          >
            {t(ui.nav.tools)}
          </Link>
          <a
            href="https://github.com/baomi-app"
            target="_blank"
            rel="noreferrer"
            className="hidden min-h-10 items-center rounded-full px-3 transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)] md:inline-flex"
          >
            GitHub ↗
          </a>
          <LangToggle />
        </div>
      </nav>
    </header>
  );
}
