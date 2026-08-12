"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { LangToggle } from "@/components/LangToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ui, useLocale } from "@/i18n";

export function Nav() {
  const { t } = useLocale();
  const pathname = usePathname();
  const toolsActive = pathname.startsWith("/tools");

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--rule)]/80 bg-[color:var(--background)]/90 backdrop-blur-xl">
      <nav className="site-frame flex h-16 items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="rounded-lg" aria-label="baomi.app home"><Logo /></Link>
        <div className="flex items-center gap-0.5 text-sm font-medium">
          <Link href="/#apps" className="nav-link nav-apps" aria-current={!toolsActive && pathname !== "/" ? "page" : undefined}>{t(ui.nav.apps)}</Link>
          <Link href="/tools" className="nav-link" aria-current={toolsActive ? "page" : undefined}>{t(ui.nav.tools)}</Link>
          <a href="https://github.com/baomi-app" target="_blank" rel="noreferrer" className="nav-link nav-github">GitHub ↗</a>
          <ThemeToggle />
          <LangToggle />
        </div>
      </nav>
    </header>
  );
}
