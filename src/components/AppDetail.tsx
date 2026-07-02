"use client";

import { useState } from "react";
import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import { RepoStats } from "@/components/RepoStats";
import { accentGradient } from "@/data/apps";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";
import { Markdown } from "@/components/Markdown";

export function AppDetail({ app }: { app: AppView }) {
  const { locale, t } = useLocale();
  const { content } = app;
  const features = content.features[locale];
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden border-b border-[var(--rule)]">
      <div className="mx-auto max-w-5xl px-6 pt-12 pb-20 sm:pt-16">
        <Link
          href="/#apps"
          className="group inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-[var(--ink-muted)] transition-colors hover:text-[var(--foreground)]"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          {t(ui.detail.back)}
        </Link>

        <div className="mt-8 grid gap-8 border border-[var(--foreground)] bg-[var(--surface)] p-5 shadow-[8px_8px_0_var(--foreground)] md:grid-cols-[auto_1fr] md:p-8">
          <AppIcon app={app} className="h-24 w-24 shrink-0 text-5xl" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-md border border-[var(--rule)] bg-white px-2.5 py-1 text-[var(--ink-muted)]">
                {t(content.platform)}
              </span>
              <span className="rounded-md border border-[var(--teal)] bg-[rgba(11,107,99,0.08)] px-2.5 py-1 font-semibold text-[var(--teal)]">
                {t(ui.status[content.status])}
              </span>
            </div>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-none tracking-normal text-[var(--foreground)] sm:text-6xl">
              {content.name}
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-[var(--foreground)]">
              {t(content.tagline)}
            </p>
            <RepoStats meta={app.meta} className="mt-5" />
          </div>
        </div>

        <div className="mt-12 max-w-3xl text-base leading-7">
          <Markdown text={t(content.description)} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {content.links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={
                i === 0
                  ? "rounded-md bg-[var(--foreground)] px-5 py-2.5 text-sm font-semibold text-white shadow-[4px_4px_0_var(--saffron)] transition-transform hover:-translate-y-0.5"
                  : "rounded-md border border-[var(--foreground)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-white"
              }
            >
              {t(link.label)}
            </a>
          ))}
        </div>

        {app.screenshotUrls && app.screenshotUrls.length > 0 && (
          <div className="mt-14">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tomato)]">
              {t(ui.detail.screenshots)}
            </h2>
            <div className="mt-5 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
              {app.screenshotUrls.map((url, idx) => (
                <button
                  type="button"
                  key={url}
                  onClick={() => setActiveScreenshot(url)}
                  className="group relative h-[220px] flex-none cursor-zoom-in snap-start overflow-hidden rounded-lg border border-[var(--rule)] bg-[var(--surface)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--foreground)] sm:h-[320px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={
                      locale === "zh"
                        ? `${content.name} 界面预览 ${idx + 1}`
                        : `${content.name} screenshot ${idx + 1}`
                    }
                    className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-[rgba(23,32,27,0.45)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <svg
                      className="h-8 w-8 translate-y-2 text-white drop-shadow-md transition-transform duration-300 group-hover:translate-y-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                      />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tomato)]">
            {t(ui.detail.features)}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 border border-[var(--rule)] bg-[var(--surface)] p-4 text-[var(--ink-muted)]"
              >
                <span
                  style={{ backgroundImage: accentGradient(content.accent) }}
                  className="mt-2 h-2 w-2 shrink-0 rounded-full"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {content.troubleshooting && (
          <div className="mt-14">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tomato)]">
              {t(ui.detail.troubleshooting)}
            </h2>
            <Markdown text={t(content.troubleshooting)} className="mt-4" />
          </div>
        )}

      </div>

      {activeScreenshot && (
        <div
          onClick={() => setActiveScreenshot(null)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-[rgba(23,32,27,0.86)] p-4 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
        >
          <div
            className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-lg border border-white/20 shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeScreenshot}
              alt={
                locale === "zh"
                  ? `${content.name} 放大界面预览`
                  : `${content.name} enlarged screenshot`
              }
              className="h-auto max-h-[85vh] w-full rounded-lg object-contain"
            />
            <button
              type="button"
              onClick={() => setActiveScreenshot(null)}
              className="absolute top-4 right-4 cursor-pointer rounded-md border border-white/20 bg-black/60 p-2.5 text-white/75 transition-colors hover:bg-black/80 hover:text-white"
              aria-label={t(ui.detail.close)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
