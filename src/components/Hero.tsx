"use client";

import Link from "next/link";
import { ui, useLocale } from "@/i18n";

export function Hero() {
  const { t } = useLocale();
  return (
    <section className="relative overflow-hidden">
      {/* aurora background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-float-slow absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-orange-500/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-20 h-[26rem] w-[26rem] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute right-0 top-20 h-[20rem] w-[20rem] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
        <span className="animate-pop-in inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          {t(ui.hero.badge)}
        </span>

        <h1 className="animate-pop-in mt-6 max-w-3xl text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          {t(ui.hero.titleLead)}{" "}
          <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
            {t(ui.hero.titleAccent)}
          </span>
        </h1>

        <p className="animate-pop-in mt-6 max-w-xl text-lg leading-relaxed text-white/60">
          {t(ui.hero.subtitle)}{" "}
          <span className="text-white/80">{t(ui.brand.slogan)}</span>
        </p>

        <div className="animate-pop-in mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="#apps"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
          >
            {t(ui.hero.ctaExplore)}
          </Link>
          <a
            href="https://github.com/baomi-app"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-white"
          >
            {t(ui.hero.ctaGithub)}
          </a>
        </div>
      </div>
    </section>
  );
}
