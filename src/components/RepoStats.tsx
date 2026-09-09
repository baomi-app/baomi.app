"use client";

import type { RepoMeta } from "@/data/github";
import { useLocale } from "@/i18n";

const labels = {
  updated: { en: "Updated", zh: "更新于" },
  stars: { en: "stars", zh: "Star" },
};

/** A subtle row of live GitHub facts: version · stars · last-updated date. */
export function RepoStats({
  meta,
  className = "",
}: {
  meta?: RepoMeta | null;
  className?: string;
}) {
  const { t } = useLocale();
  if (!meta) return null;

  const date = meta.updatedAt ? meta.updatedAt.slice(0, 10) : null;
  const hasVersion = Boolean(meta.version);
  const hasStars = meta.stars > 0;
  if (!hasVersion && !hasStars && !date) return null;

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-[var(--ink-muted)] ${className}`}
    >
      {hasVersion && <span>{meta.version}</span>}
      {hasStars && (
      <span className="inline-flex items-center gap-1">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
          <path d="M12 2l2.9 6.26 6.85.62-5.18 4.52 1.55 6.7L12 17.27 5.88 20.6l1.55-6.7L2.25 8.88l6.85-.62L12 2z" />
        </svg>
        {meta.stars} {t(labels.stars)}
      </span>
      )}
      {date && (
        <span>
          {t(labels.updated)} {date}
        </span>
      )}
    </div>
  );
}
