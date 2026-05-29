"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LangToggle } from "@/components/LangToggle";
import { ui, useLocale } from "@/i18n";

export function Nav() {
  const { t } = useLocale();
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Logo />
        </Link>
        <div className="flex items-center gap-4 text-sm text-white/60 sm:gap-6">
          <a
            href="/#apps"
            className="hidden transition-colors hover:text-white sm:inline"
          >
            {t(ui.nav.apps)}
          </a>
          <a
            href="https://github.com/baomi-app"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
          <LangToggle />
        </div>
      </nav>
    </header>
  );
}
