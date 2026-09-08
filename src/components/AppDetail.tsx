"use client";

import { useEffect, useRef, useState } from "react";
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

  const dialogRef = useRef<HTMLDialogElement>(null);
  const screenshotTrigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeScreenshot) return;
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; screenshotTrigger.current?.focus(); };
  }, [activeScreenshot]);

  return (
    <article className="border-b border-[var(--rule)]">
      <div className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <Link href="/#apps" className="group inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-[var(--ink-muted)] transition-colors hover:text-[var(--accent)]">
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          {t(ui.detail.back)}
        </Link>

        <header className="detail-hero">
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
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={index === 0 ? "inline-flex min-h-11 items-center whitespace-nowrap rounded-[14px] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--on-accent)] transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 hover:opacity-85 active:translate-y-px" : "inline-flex min-h-11 items-center whitespace-nowrap rounded-[14px] border border-[var(--rule)] bg-[var(--background)] px-5 text-sm font-semibold transition-colors hover:border-[var(--accent)] active:translate-y-px"}>
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
                <button type="button" key={url} onClick={(event) => { screenshotTrigger.current = event.currentTarget; setActiveScreenshot(url); }} className="h-[15rem] flex-none cursor-zoom-in snap-start overflow-hidden rounded-[14px] border border-[var(--rule)] bg-[var(--surface)] transition-[transform,border-color] hover:-translate-y-1 hover:border-[var(--accent)] sm:h-[22rem]">
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
        <dialog ref={dialogRef} className="screenshot-dialog animate-scale-up" aria-label={t(ui.detail.screenshots)} onKeyDown={(event) => { if (event.key === "Tab") { event.preventDefault(); event.currentTarget.querySelector<HTMLButtonElement>("button")?.focus(); } }} onCancel={() => setActiveScreenshot(null)} onClick={(event) => { if (event.target === event.currentTarget) setActiveScreenshot(null); }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={activeScreenshot} alt={locale === "zh" ? `${content.name} 放大界面预览` : `${content.name} enlarged screenshot`} />
          <button type="button" autoFocus onClick={() => setActiveScreenshot(null)} className="dialog-close" aria-label={t(ui.detail.close)}>×</button>
        </dialog>
      )}
    </article>
  );
}
