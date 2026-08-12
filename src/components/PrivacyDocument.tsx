"use client";

import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { useLocale, type L } from "@/i18n";

export function PrivacyDocument({ appSlug, appName, title, updated, body }: { appSlug: string; appName: string; title: L; updated: L; body: L }) {
  const { locale, t } = useLocale();

  return (
    <article className="site-frame py-12 sm:py-20">
      <Link href={`/${appSlug}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--ink-muted)] transition-colors hover:text-[var(--foreground)]">
        <span aria-hidden="true">←</span> {appName}
      </Link>
      <header className="mt-10 border-b border-[var(--rule)] pb-10 sm:mt-14 sm:pb-14">
        <p className="section-kicker">{locale === "zh" ? "隐私政策" : "Privacy policy"}</p>
        <h1 className="mt-4 max-w-[18ch] text-balance text-4xl font-semibold leading-[1.05] tracking-[-.045em] sm:text-6xl">{t(title)}</h1>
        <p className="mt-5 font-mono text-xs text-[var(--ink-muted)]">{locale === "zh" ? "更新于" : "Updated"} · {t(updated)}</p>
      </header>
      <Markdown text={t(body)} className="prose-baomi mx-auto mt-12 max-w-[44rem] text-[15px] leading-8 sm:mt-16 sm:text-base" />
    </article>
  );
}
