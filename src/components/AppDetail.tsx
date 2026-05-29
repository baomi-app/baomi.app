"use client";

import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import { RepoStats } from "@/components/RepoStats";
import { accentGradient } from "@/data/apps";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function AppDetail({ app }: { app: AppView }) {
  const { locale, t } = useLocale();
  const { content } = app;
  const features = content.features[locale];

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          style={{ backgroundImage: accentGradient(content.accent) }}
          className="animate-float-slow absolute -top-32 left-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        />
      </div>

      <div className="mx-auto max-w-3xl px-6 pt-16 pb-20 sm:pt-20">
        <Link
          href="/#apps"
          className="group inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          {t(ui.detail.back)}
        </Link>

        <div className="mt-8 flex items-center gap-5">
          <AppIcon app={app} className="h-20 w-20 shrink-0 text-4xl" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {content.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/60">
                {t(content.platform)}
              </span>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-emerald-300">
                {t(ui.status[content.status])}
              </span>
            </div>
            <RepoStats meta={app.meta} className="mt-3" />
          </div>
        </div>

        <p className="mt-8 text-xl leading-relaxed text-white/80">
          {t(content.tagline)}
        </p>

        <p className="mt-6 text-white/60">{t(content.description)}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {content.links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={
                i === 0
                  ? "rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
                  : "rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              }
            >
              {t(link.label)}
            </a>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/40">
            {t(ui.detail.features)}
          </h2>
          <ul className="mt-5 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-white/70">
                <span
                  style={{ backgroundImage: accentGradient(content.accent) }}
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/40">
            {t(ui.detail.builtWith)}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {content.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-sm text-white/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
