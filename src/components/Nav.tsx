"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { LangToggle } from "@/components/LangToggle";
import { ui, useLocale } from "@/i18n";

export function Nav() {
  const { t } = useLocale();
  const path = usePathname();
  return <header className="site-header"><nav className="shell nav-inner" aria-label={t({ en: "Main navigation", zh: "主导航" })}>
    <Link href="/" aria-label={t({ en: "baomi.app home", zh: "baomi.app 首页" })}><Logo /></Link>
    <div className="nav-links"><Link href="/#apps" aria-current={!path.startsWith("/tools") ? "page" : undefined}>{t(ui.nav.apps)}</Link><Link href="/tools" aria-current={path.startsWith("/tools") ? "page" : undefined}>{t(ui.nav.tools)}</Link><a className="nav-github" href="https://github.com/baomi-app" target="_blank" rel="noreferrer">GitHub ↗</a></div>
    <LangToggle />
  </nav></header>;
}
