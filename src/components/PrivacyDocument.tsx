"use client";

import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { useLocale, type L } from "@/i18n";

export function PrivacyDocument({ appSlug, appName, title, updated, body }: { appSlug: string; appName: string; title: L; updated: L; body: L }) {
  const { locale, t } = useLocale();

  return (
    <article className="policy-page site-frame">
      <div className="policy-back-row">
        <Link href={`/${appSlug}`}><span aria-hidden="true">←</span>{appName}</Link>
      </div>
      <div className="policy-main">
        <header>
          <h1>{t(title)}</h1>
          <span>{locale === "zh" ? "更新于" : "Updated"} · {t(updated)}</span>
        </header>
        <Markdown text={t(body)} className="prose-baomi policy-copy" />
      </div>
    </article>
  );
}
