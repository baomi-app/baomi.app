"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import { RepoStats } from "@/components/RepoStats";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";
import { Markdown } from "@/components/Markdown";

export function AppDetail({ app }: { app: AppView }) {
  const { locale, t } = useLocale();
  const { content } = app;
  const features = content.features[locale];
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);

  useEffect(() => {
    if (!activeScreenshot) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setActiveScreenshot(null);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [activeScreenshot]);

  return (
    <article className="border-b border-[var(--rule)]">
      <div className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <Link href="/#apps" className="group inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-[var(--ink-muted)] transition-colors hover:text-[var(--accent)]">
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          {t(ui.detail.back)}
        </Link>

        <header className="mt-8 rounded-[14px] border border-[var(--rule)] bg-[var(--surface-strong)] p-6 shadow-[0_18px_60px_rgba(32,70,45,0.08)] sm:p-8">
          <div className="grid gap-7 md:grid-cols-[auto_1fr] md:items-start">
            <AppIcon app={app} className="h-24 w-24 shrink-0 text-5xl" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--ink-muted)]">
                <span>{t(content.platform)}</span>
                <span className="font-semibold text-[var(--accent)]">{t(ui.status[content.status])}</span>
              </div>
              <h1 className="mt-3 text-balance font-display text-5xl font-semibold leading-none tracking-[-.045em] sm:text-6xl">{content.name}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--ink-muted)]">{t(content.tagline)}</p>
              <RepoStats meta={app.meta} className="mt-5" />
              <div className="mt-7 flex flex-wrap gap-3">
                {content.links.map((link, index) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={index === 0 ? "inline-flex min-h-11 items-center whitespace-nowrap rounded-[14px] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--on-accent)] transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-[var(--brand-yellow)] hover:text-[#172019] active:translate-y-px" : "inline-flex min-h-11 items-center whitespace-nowrap rounded-[14px] border border-[var(--rule)] bg-[var(--background)] px-5 text-sm font-semibold transition-colors hover:border-[var(--accent)] active:translate-y-px"}>
                    {t(link.label)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-xl font-semibold tracking-[-.02em]">{t(ui.detail.about)}</h2>
          <Markdown text={t(content.description)} className="mt-4 text-base leading-7" />
        </section>

        {app.screenshotUrls && app.screenshotUrls.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-semibold tracking-[-.02em]">{t(ui.detail.screenshots)}</h2>
            <div className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
              {app.screenshotUrls.map((url, index) => (
                <button type="button" key={url} onClick={() => setActiveScreenshot(url)} className="h-[15rem] flex-none cursor-zoom-in snap-start overflow-hidden rounded-[14px] border border-[var(--rule)] bg-[var(--surface)] transition-[transform,border-color] hover:-translate-y-1 hover:border-[var(--accent)] sm:h-[22rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={locale === "zh" ? `${content.name} 界面预览 ${index + 1}` : `${content.name} screenshot ${index + 1}`} className="h-full w-auto object-contain" loading="lazy" />
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-[-.02em]">{t(ui.detail.features)}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="rounded-[14px] bg-[var(--surface)] p-4 leading-7 text-[var(--ink-muted)]">
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {content.troubleshooting && (
          <section className="mt-14 rounded-[14px] bg-[var(--surface)] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-.02em]">{t(ui.detail.troubleshooting)}</h2>
            <Markdown text={t(content.troubleshooting)} className="mt-4" />
          </section>
        )}
      </div>

      {activeScreenshot && (
        <div role="dialog" aria-modal="true" aria-label={t(ui.detail.close)} onClick={() => setActiveScreenshot(null)} className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-[#101612e8] p-4 backdrop-blur-md animate-fade-in">
          <div className="relative max-h-[90dvh] max-w-[94vw] overflow-hidden rounded-[14px] border border-white/20 animate-scale-up" onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeScreenshot} alt={locale === "zh" ? `${content.name} 放大界面预览` : `${content.name} enlarged screenshot`} className="h-auto max-h-[90dvh] w-full object-contain" />
            <button type="button" onClick={() => setActiveScreenshot(null)} className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-[14px] bg-[#172019d9] text-2xl leading-none text-white transition-transform hover:scale-105 active:scale-95" aria-label={t(ui.detail.close)}>×</button>
          </div>
        </div>
      )}
    </article>
  );
}
