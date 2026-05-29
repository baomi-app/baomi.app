import Image from "next/image";
import type { AppView } from "@/data/github";

/** Renders an app's own icon image, or a drawn fallback icon. */
export function AppIcon({
  app,
  className = "",
}: {
  app: AppView;
  className?: string;
}) {
  if (app.image) {
    return (
      <Image
        src={app.image}
        alt={`${app.content.name} icon`}
        width={160}
        height={160}
        className={`rounded-2xl shadow-lg ${className}`}
      />
    );
  }

  return (
    <span
      className={`grid place-items-center rounded-2xl bg-gradient-to-br ${app.accent} font-semibold text-black shadow-lg ${className}`}
    >
      {app.id === "rss" ? <RssGlyph /> : app.content.name.charAt(0)}
    </span>
  );
}

function RssGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[55%] w-[55%]" fill="currentColor">
      <circle cx="6.18" cy="17.82" r="2.18" />
      <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83C19.56 11.4 12.6 4.44 4 4.44z" />
      <path d="M4 10.1v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83C13.9 14.3 9.7 10.1 4 10.1z" />
    </svg>
  );
}
