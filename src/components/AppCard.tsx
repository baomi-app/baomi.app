"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

function inkFor(background: string): "#11130f" | "#fffdf7" {
  const match = background.match(/^#([\da-f]{6})$/i);
  if (!match) return "#fffdf7";
  const [red, green, blue] = match[1].match(/.{2}/g)!.map((part) => Number.parseInt(part, 16));
  const luminance = (red * 299 + green * 587 + blue * 114) / 255000;
  return luminance > 0.58 ? "#11130f" : "#fffdf7";
}

export function AppCard({ app }: { app: AppView }) {
  const { t } = useLocale();
  const { content } = app;
  const accent = content.accent?.from ?? "#176c4f";
  const style = {
    "--app-accent": accent,
    "--app-ink": inkFor(accent),
  } as CSSProperties;

  return (
    <Link href={`/${app.id}`} className="catalog-cell" style={style}>
      <div className="catalog-cell-top">
        <span>{t(content.platform)}</span>
      </div>
      <div className="catalog-cell-body">
        <AppIcon app={app} className="catalog-icon h-16 w-16 rounded-[15px] text-xl" />
        <div>
          <h3>{content.name}</h3>
          <p>{t(content.tagline)}</p>
        </div>
      </div>
      <div className="catalog-cell-foot">
        <span>{t(ui.apps.viewDetails)}</span>
        <span className="catalog-arrow" aria-hidden="true">→</span>
      </div>
    </Link>
  );
}
