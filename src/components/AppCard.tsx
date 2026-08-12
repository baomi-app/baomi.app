"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import { RepoStats } from "@/components/RepoStats";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function AppCard({ app, index }: { app: AppView; index: number }) {
  const { t } = useLocale();
  const { content } = app;
  const style = {
    "--app-from": content.accent?.from ?? "#777b74",
    "--app-to": content.accent?.to ?? "#30332f",
  } as CSSProperties;

  return (
    <Link href={`/${app.id}`} className={`catalog-cell catalog-cell-${index}`} style={style}>
      <div className="catalog-cell-top">
        <span>{(index + 1).toString().padStart(2, "0")}</span>
        <span>{t(content.platform)}</span>
      </div>
      <div className="catalog-cell-body">
        <AppIcon app={app} className="catalog-icon h-16 w-16 rounded-[16px] text-xl sm:h-20 sm:w-20 sm:rounded-[20px]" />
        <div>
          <h3>{content.name}</h3>
          <p>{t(content.tagline)}</p>
        </div>
      </div>
      <div className="catalog-cell-foot">
        <RepoStats meta={app.meta} />
        <span className="catalog-arrow" aria-hidden="true">↗</span>
        <span className="sr-only">{t(ui.apps.viewDetails)}</span>
      </div>
    </Link>
  );
}
