import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { apps, getApp } from "@/data/apps";

const statusLabel = {
  released: "Released",
  beta: "Beta",
  wip: "In progress",
} as const;

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return { title: "Not found" };
  return {
    title: app.name,
    description: app.tagline,
    openGraph: { title: `${app.name} — baomi`, description: app.tagline },
  };
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div
              className={`animate-float-slow absolute -top-32 left-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gradient-to-br ${app.accent} opacity-20 blur-[120px]`}
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
              All apps
            </Link>

            <div className="mt-8 flex items-center gap-5">
              <div
                className={`grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br ${app.accent} text-4xl text-black shadow-lg`}
              >
                {app.glyph}
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {app.name}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/60">
                    {app.platform}
                  </span>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-emerald-300">
                    {statusLabel[app.status]}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-8 text-xl leading-relaxed text-white/80">
              {app.tagline}
            </p>
            {app.taglineZh && (
              <p className="mt-1 font-mono text-white/40">{app.taglineZh}</p>
            )}

            <p className="mt-6 text-white/60">{app.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {app.links.map((link, i) => (
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
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-14">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/40">
                Features
              </h2>
              <ul className="mt-5 space-y-3">
                {app.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-white/70"
                  >
                    <span
                      className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br ${app.accent}`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/40">
                Built with
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {app.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-sm text-white/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
