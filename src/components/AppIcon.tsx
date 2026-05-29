import type { AppView } from "@/data/github";

/** Renders the app's own icon (hosted in its repo), or a lettered fallback. */
export function AppIcon({
  app,
  className = "",
}: {
  app: AppView;
  className?: string;
}) {
  if (app.iconUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={app.iconUrl}
        alt={`${app.content.name} icon`}
        loading="lazy"
        className={`rounded-2xl object-cover shadow-lg ${className}`}
      />
    );
  }

  return (
    <span
      className={`grid place-items-center rounded-2xl bg-gradient-to-br ${app.accent} font-semibold text-black shadow-lg ${className}`}
    >
      {app.content.name.charAt(0)}
    </span>
  );
}
