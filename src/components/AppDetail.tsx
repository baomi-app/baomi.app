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
    "--app-from": content.accent?.from ?? "#777b74",
    "--app-to": content.accent?.to ?? "#30332f",
  } as CSSProperties;

  useEffect(() => {
    if (!activeScreenshot) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setActiveScreenshot(null);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [activeScreenshot]);

  return (
    <article className="app-product" style={style}>
      <div className="site-frame app-product-back-row">
        <Link href="/#apps" className="app-product-back"><span aria-hidden="true">←</span>{t(ui.detail.back)}</Link>
        <span>{app.repo}</span>
      </div>

      <header className="site-frame app-product-hero">
        <div className="app-product-copy">
          <AppIcon app={app} eager className="app-product-icon h-24 w-24 rounded-[24px] text-3xl sm:h-32 sm:w-32 sm:rounded-[30px]" />
          <div className="app-product-status">
            <span>{t(content.platform)}</span><i /><span>{t(ui.status[content.status])}</span>
          </div>
          <h1>{content.name}</h1>
          <p>{t(content.tagline)}</p>
          <RepoStats meta={app.meta} className="app-product-stats" />
          <div className="app-product-actions">
            {content.links.map((link, index) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={index === 0 ? "product-action product-action-primary" : "product-action"}>{t(link.label)}<span aria-hidden="true">↗</span></a>
            ))}
            {content.privacy && <Link href={`/${app.id}/privacy`} className="product-action">{locale === "zh" ? "隐私政策" : "Privacy"}</Link>}
          </div>
        </div>

        <div className="app-product-visual">
          <span className="app-product-visual-mark" aria-hidden="true">{content.name.slice(0, 2).toUpperCase()}</span>
          {app.screenshotUrls[0] ? (
            <button type="button" onClick={() => setActiveScreenshot(app.screenshotUrls[0])} className="app-product-screen cursor-zoom-in">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={app.screenshotUrls[0]} alt={locale === "zh" ? `${content.name} 界面预览` : `${content.name} screenshot`} loading="eager" fetchPriority="high" />
            </button>
          ) : (
            <div className="app-product-blank"><AppIcon app={app} eager className="h-40 w-40 rounded-[36px] text-5xl" /></div>
          )}
        </div>
      </header>

      <div className="site-frame app-product-story">
        <div className="app-story-label"><span>01</span><p>{t(ui.detail.about)}</p></div>
        <Markdown text={t(content.description)} className="prose-baomi app-story-copy" />
      </div>

      {app.screenshotUrls.length > 1 && (
        <section className="app-gallery">
          <div className="site-frame app-gallery-heading"><span>02</span><h2>{t(ui.detail.screenshots)}</h2><p>{app.screenshotUrls.length.toString().padStart(2, "0")}</p></div>
          <div className="app-gallery-track">
            {app.screenshotUrls.map((url, index) => (
              <button type="button" key={url} onClick={() => setActiveScreenshot(url)} className="app-gallery-shot cursor-zoom-in">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={locale === "zh" ? `${content.name} 界面预览 ${index + 1}` : `${content.name} screenshot ${index + 1}`} loading="lazy" />
                <span>{(index + 1).toString().padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="site-frame app-features">
        <div className="app-story-label"><span>{app.screenshotUrls.length > 1 ? "03" : "02"}</span><p>{t(ui.detail.features)}</p></div>
        <ol>
          {features.map((feature, index) => (
            <li key={feature}><span>{(index + 1).toString().padStart(2, "0")}</span><p>{feature}</p></li>
          ))}
        </ol>
      </section>

      {content.troubleshooting && (
        <section className="site-frame app-support">
          <div className="app-story-label"><span>+</span><p>{t(ui.detail.troubleshooting)}</p></div>
          <Markdown text={t(content.troubleshooting)} className="prose-baomi app-story-copy" />
        </section>
      )}

      {activeScreenshot && (
        <div role="dialog" aria-modal="true" aria-label={t(ui.detail.close)} onClick={() => setActiveScreenshot(null)} className="animate-fade-in screenshot-dialog">
          <div className="animate-scale-up screenshot-dialog-inner" onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeScreenshot} alt={locale === "zh" ? `${content.name} 放大界面预览` : `${content.name} enlarged screenshot`} />
            <button type="button" onClick={() => setActiveScreenshot(null)} aria-label={t(ui.detail.close)}>×</button>
          </div>
        </div>
      )}
    </article>
  );
}
