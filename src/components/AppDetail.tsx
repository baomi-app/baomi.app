"use client";

import type { CSSProperties } from "react";
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
  const style = {
    "--app-from": content.accent?.from ?? "var(--accent)",
    "--app-to": content.accent?.to ?? "var(--accent)",
  } as CSSProperties;

  useEffect(() => {
    if (!activeScreenshot) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setActiveScreenshot(null);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [activeScreenshot]);

  return (
    <article className="detail-accent" style={style}>
      <div className="site-frame pb-24 pt-10 sm:pb-28 sm:pt-14">
        <Link href="/#apps" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--ink-muted)] transition-colors hover:text-[var(--foreground)]">
          <span aria-hidden="true">←</span> {t(ui.detail.back)}
        </Link>

        <header className="mt-10 grid gap-10 border-b border-[var(--rule)] pb-14 sm:mt-14 sm:pb-16 lg:grid-cols-[minmax(17rem,.7fr)_minmax(0,1.3fr)] lg:items-end lg:gap-20">
          <div>
            <AppIcon app={app} eager className="h-28 w-28 rounded-[26px] text-4xl sm:h-36 sm:w-36 sm:rounded-[32px]" />
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[var(--ink-muted)]">
              <span>{t(content.platform)}</span>
              <span aria-hidden="true">·</span>
              <span>{t(ui.status[content.status])}</span>
            </div>
            <RepoStats meta={app.meta} className="mt-2" />
          </div>

          <div>
            <h1 className="text-balance font-display text-[clamp(3.2rem,8vw,6.8rem)] font-semibold leading-[.92] tracking-[-.065em]">{content.name}</h1>
            <p className="mt-6 max-w-[42ch] text-lg leading-8 text-[var(--ink-muted)] sm:text-xl sm:leading-9">{t(content.tagline)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {content.links.map((link, index) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={index === 0 ? "primary-button" : "secondary-button"}>{t(link.label)} <span className="ml-2" aria-hidden="true">↗</span></a>
              ))}
              {content.privacy && <Link href={`/${app.id}/privacy`} className="secondary-button">{locale === "zh" ? "隐私政策" : "Privacy"}</Link>}
            </div>
          </div>
        </header>

        <div className="grid gap-14 pt-14 sm:pt-16 lg:grid-cols-[minmax(14rem,.56fr)_minmax(0,1.44fr)] lg:gap-20">
          <h2 className="section-kicker pt-1">{t(ui.detail.about)}</h2>
          <Markdown text={t(content.description)} className="prose-baomi max-w-3xl text-base leading-8 sm:text-lg" />
        </div>

        {app.screenshotUrls.length > 0 && (
          <section className="mt-16 border-t border-[var(--rule)] pt-8 sm:mt-20 sm:pt-10">
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-[-.025em]">{t(ui.detail.screenshots)}</h2>
              <span className="font-mono text-[10px] text-[var(--ink-muted)]">{app.screenshotUrls.length.toString().padStart(2, "0")}</span>
            </div>
            <div className="screenshot-strip flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5">
              {app.screenshotUrls.map((url, index) => (
                <button type="button" key={url} onClick={() => setActiveScreenshot(url)} className="screenshot-button h-[16rem] flex-none cursor-zoom-in snap-start overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-2 sm:h-[24rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={locale === "zh" ? `${content.name} 界面预览 ${index + 1}` : `${content.name} screenshot ${index + 1}`} className="h-full w-auto rounded-lg object-contain" loading="lazy" />
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 grid gap-8 border-t border-[var(--rule)] pt-8 sm:mt-20 sm:pt-10 lg:grid-cols-[minmax(14rem,.56fr)_minmax(0,1.44fr)] lg:gap-20">
          <div>
            <h2 className="text-xl font-semibold tracking-[-.025em]">{t(ui.detail.features)}</h2>
          </div>
          <ol>
            {features.map((feature, index) => (
              <li key={feature} className="feature-row">
                <span className="pt-1 font-mono text-[10px] text-[var(--ink-muted)]">{(index + 1).toString().padStart(2, "0")}</span>
                <span className="leading-7 text-[var(--ink-muted)]">{feature}</span>
              </li>
            ))}
            <li className="border-t border-[var(--rule)]" />
          </ol>
        </section>

        {content.troubleshooting && (
          <section className="mt-16 grid gap-6 border-t border-[var(--rule)] pt-8 sm:mt-20 sm:pt-10 lg:grid-cols-[minmax(14rem,.56fr)_minmax(0,1.44fr)] lg:gap-20">
            <h2 className="text-xl font-semibold tracking-[-.025em]">{t(ui.detail.troubleshooting)}</h2>
            <Markdown text={t(content.troubleshooting)} className="prose-baomi max-w-3xl" />
          </section>
        )}
      </div>

      {activeScreenshot && (
        <div role="dialog" aria-modal="true" aria-label={t(ui.detail.close)} onClick={() => setActiveScreenshot(null)} className="animate-fade-in fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6">
          <div className="animate-scale-up relative max-h-[92dvh] max-w-[96vw]" onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeScreenshot} alt={locale === "zh" ? `${content.name} 放大界面预览` : `${content.name} enlarged screenshot`} className="max-h-[92dvh] max-w-[96vw] rounded-xl object-contain" />
            <button type="button" onClick={() => setActiveScreenshot(null)} className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-lg bg-black/70 text-xl text-white backdrop-blur" aria-label={t(ui.detail.close)}>×</button>
          </div>
        </div>
      )}
    </article>
  );
}
