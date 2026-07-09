"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LangToggle } from "@/components/LangToggle";
import { ui, useLocale } from "@/i18n";

export function Nav() {
  const { t } = useLocale();
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--rule)] bg-[rgba(238,245,241,0.86)] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="transition-opacity hover:opacity-75">
          <Logo />
        </Link>
        <div className="flex items-center gap-3 text-sm font-medium text-[var(--ink-muted)] sm:gap-5">
          <Link
            href="/#apps"
            className="hidden rounded-md px-2 py-1 transition-colors hover:text-[var(--foreground)] sm:inline"
          >
            {t(ui.nav.apps)}
          </Link>
          <Link
            href="/tools"
            className="rounded-md px-2 py-1 transition-colors hover:text-[var(--foreground)]"
          >
            {t(ui.nav.tools)}
          </Link>
          <a
            href="https://github.com/baomi-app"
            target="_blank"
            rel="noreferrer"
            className="rounded-md px-2 py-1 transition-colors hover:text-[var(--foreground)]"
          >
            GitHub
          </a>
          <LangToggle />
        </div>
      </nav>
    </header>
  );
}
