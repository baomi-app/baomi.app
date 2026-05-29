import type { App } from "@/data/apps";

const statusLabel: Record<App["status"], string> = {
  released: "Released",
  beta: "Beta",
  wip: "In progress",
};

export function AppCard({ app }: { app: App }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/20">
      {/* accent glow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${app.accent} opacity-10 blur-3xl transition-opacity group-hover:opacity-20`}
      />

      <div className="flex items-start justify-between gap-4">
        <div
          className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${app.accent} text-2xl text-black shadow-lg`}
        >
          {app.glyph}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/60">
            {app.platform}
          </span>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-emerald-300">
            {statusLabel[app.status]}
          </span>
        </div>
      </div>

      <h3 className="mt-6 text-2xl font-semibold tracking-tight">{app.name}</h3>
      <p className="mt-2 text-white/70">{app.tagline}</p>
      {app.taglineZh && (
        <p className="mt-1 font-mono text-sm text-white/40">{app.taglineZh}</p>
      )}

      <p className="mt-4 text-sm leading-relaxed text-white/55">
        {app.description}
      </p>

      <ul className="mt-6 space-y-2">
        {app.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-white/65"
          >
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br ${app.accent}`}
            />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {app.tech.map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-xs text-white/50"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {app.links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={
              i === 0
                ? "rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
                : "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-white"
            }
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
