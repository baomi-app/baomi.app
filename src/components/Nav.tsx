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
    <header className="site-nav-wrap">
      <nav className="site-frame site-nav" aria-label="Main navigation">
        <Link href="/" className="site-nav-logo" aria-label="baomi.app home"><Logo /></Link>
        <div className="site-nav-center">
          <Link href="/#apps" className="site-nav-link nav-apps" aria-current={!toolsActive && pathname !== "/" ? "page" : undefined}>{t(ui.nav.apps)}</Link>
          <Link href="/tools" className="site-nav-link" aria-current={toolsActive ? "page" : undefined}>{t(ui.nav.tools)}</Link>
          <a href="https://github.com/baomi-app" target="_blank" rel="noreferrer" className="site-nav-link nav-github">GitHub ↗</a>
        </div>
        <div className="site-nav-controls"><ThemeToggle /><LangToggle /></div>
      </nav>
    </header>
  );
}
