"use client";

import type { CSSProperties } from "react";
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
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const galleryScreenshots = app.screenshotUrls.slice(1);
  const style = {
    "--app-accent": content.accent?.from ?? "var(--accent)",
  } as CSSProperties;

  useEffect(() => {
    if (!activeScreenshot) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveScreenshot(null);
    };
    document.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", close);
      requestAnimationFrame(() => lastTriggerRef.current?.focus());
    };
  }, [activeScreenshot]);

  return (
    <article className="app-product" style={style}>
      <div className="site-frame app-product-back-row">
        <Link href="/#apps" className="app-product-back"><span aria-hidden="true">←</span>{t(ui.detail.back)}</Link>
      </div>

      <header className={`site-frame app-product-hero ${app.screenshotUrls[0] ? "" : "app-product-hero-text-only"}`}>
        <div className="app-product-copy">
          <AppIcon app={app} eager className="app-product-icon h-20 w-20 rounded-[18px] text-2xl" />
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

        {app.screenshotUrls[0] && (
          <div className="app-product-visual">
            <button type="button" onClick={(event) => { lastTriggerRef.current = event.currentTarget; setActiveScreenshot(app.screenshotUrls[0]); }} className="app-product-screen cursor-zoom-in">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={app.screenshotUrls[0]} alt={locale === "zh" ? `${content.name} 界面预览` : `${content.name} screenshot`} loading="eager" fetchPriority="high" />
            </button>
          </div>
        )}
      </header>

      <div className="site-frame app-product-story">
        <h2 className="app-story-label">{t(ui.detail.about)}</h2>
        <Markdown text={t(content.description)} className="prose-baomi app-story-copy" />
      </div>

      {galleryScreenshots.length > 0 && (
        <section className="app-gallery">
          <div className="site-frame app-gallery-heading"><h2>{t(ui.detail.screenshots)}</h2></div>
          <div className="site-frame app-gallery-track">
            {galleryScreenshots.map((url, index) => (
              <button type="button" key={url} onClick={(event) => { lastTriggerRef.current = event.currentTarget; setActiveScreenshot(url); }} className="app-gallery-shot cursor-zoom-in">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={locale === "zh" ? `${content.name} 界面预览 ${index + 2}` : `${content.name} screenshot ${index + 2}`} loading="lazy" />
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="site-frame app-features">
        <h2 className="app-story-label">{t(ui.detail.features)}</h2>
        <ul>
          {features.map((feature) => (
            <li key={feature}><p>{feature}</p></li>
          ))}
        </ul>
      </section>

      {content.troubleshooting && (
        <section className="site-frame app-support">
          <h2 className="app-story-label">{t(ui.detail.troubleshooting)}</h2>
          <Markdown text={t(content.troubleshooting)} className="prose-baomi app-story-copy" />
        </section>
      )}

      {activeScreenshot && (
        <div role="dialog" aria-modal="true" aria-label={locale === "zh" ? `${content.name} 放大界面预览` : `${content.name} enlarged screenshot`} onClick={() => setActiveScreenshot(null)} className="animate-fade-in screenshot-dialog">
          <div className="screenshot-dialog-inner" onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeScreenshot} alt={locale === "zh" ? `${content.name} 放大界面预览` : `${content.name} enlarged screenshot`} />
            <button ref={closeButtonRef} type="button" onClick={() => setActiveScreenshot(null)} aria-label={t(ui.detail.close)}>×</button>
          </div>
        </div>
      )}
    </article>
  );
}
