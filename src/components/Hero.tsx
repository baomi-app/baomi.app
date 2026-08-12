"use client";

import { AppIcon } from "@/components/AppIcon";
import { accentGradient } from "@/data/apps";
import type { AppView } from "@/data/github";
import { ui, useLocale } from "@/i18n";

export function Hero({ views }: { views: AppView[] }) {
  const { locale, t } = useLocale();
  const spotlight = views.slice(0, 3);

  return (
    <section className="px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="hero-stage relative mx-auto min-h-[calc(100dvh-5.25rem)] max-w-[1480px] overflow-hidden rounded-[28px] text-white sm:rounded-[36px]">
        <div className="grid min-h-[inherit] items-center gap-14 px-6 pb-8 pt-20 sm:px-10 sm:pb-10 lg:grid-cols-[minmax(0,.92fr)_minmax(31rem,1.08fr)] lg:px-14 xl:px-20">
          <div className="animate-rise-in relative z-10 max-w-2xl pb-2 pt-6 lg:py-16">
            <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] text-white/62">
              <span className="h-px w-8 bg-[var(--brand-green)]" />
              {t(ui.hero.badge)}
            </div>
            <h1
              className={`mt-7 text-balance font-display font-semibold ${
                locale === "zh"
                  ? "text-[3rem] leading-[.98] tracking-[-.035em] sm:text-[3.6rem] lg:text-[3.75rem] 2xl:text-[4.4rem]"
                  : "text-[clamp(3.35rem,8vw,7.35rem)] leading-[.84] tracking-[-.072em]"
              }`}
            >
              <span className={`block text-white ${locale === "zh" ? "lg:whitespace-nowrap" : ""}`}>{t(ui.hero.titleLead)}</span>
              <span className={`block text-[var(--brand-green)] ${locale === "zh" ? "lg:whitespace-nowrap" : ""}`}>{t(ui.hero.titleAccent)}</span>
            </h1>
            <p className="mt-8 max-w-[43ch] text-base leading-7 text-white/63 sm:text-lg sm:leading-8">
              {t(ui.hero.subtitle)}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#apps"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--brand-green)] px-6 text-sm font-semibold text-[#0e1711] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#7be9a6] active:translate-y-px"
              >
                {t(ui.hero.ctaExplore)}
                <span className="ml-2.5" aria-hidden="true">↓</span>
              </a>
              <a
                href="https://github.com/baomi-app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white/80 transition-[border-color,color,transform] hover:-translate-y-0.5 hover:border-white/35 hover:text-white active:translate-y-px"
              >
                {t(ui.hero.ctaGithub)} <span className="ml-2" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="animate-rise-in-delayed relative z-10 mx-auto flex min-h-[28rem] w-full max-w-[39rem] items-center justify-center lg:min-h-[35rem]">
            <div className="absolute right-[8%] top-[4%] font-mono text-[10px] uppercase tracking-[.2em] text-white/45">
              {views.length.toString().padStart(2, "0")} / {t(ui.hero.catalogLabel)}
            </div>

            {spotlight.map((app, index) => {
              const rotations = ["-rotate-[7deg] -translate-x-[18%] translate-y-[6%]", "rotate-[2deg] translate-x-[3%] -translate-y-[4%]", "rotate-[9deg] translate-x-[24%] translate-y-[10%]"];
              const layers = ["z-10 opacity-75", "z-30", "z-20 opacity-90"];
              return (
                <a
                  key={app.id}
                  href={`/${app.id}`}
                  className={`group hero-app-art absolute aspect-[.78] w-[52%] overflow-hidden rounded-[30px] border border-white/14 p-6 shadow-[0_35px_90px_rgba(0,0,0,.38)] transition-[transform,opacity] duration-500 hover:z-40 hover:rotate-0 hover:scale-[1.035] hover:opacity-100 ${rotations[index]} ${layers[index]}`}
                  style={{ backgroundImage: accentGradient(app.content.accent) }}
                >
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <AppIcon app={app} className="h-16 w-16 rounded-[18px] text-2xl sm:h-[4.5rem] sm:w-[4.5rem]" />
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-black/10 text-xl text-white/90 backdrop-blur-sm transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                    </div>
                    <div className="mt-auto text-white [text-shadow:0_1px_20px_rgba(0,0,0,.3)]">
                      <p className="font-mono text-[10px] uppercase tracking-[.2em] text-white/72">{t(app.content.platform)}</p>
                      <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-[-.04em] sm:text-3xl">{app.content.name}</h2>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/76">{t(app.content.tagline)}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
