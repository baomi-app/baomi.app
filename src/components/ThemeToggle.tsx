"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/i18n";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const { locale } = useLocale();
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Theme is applied by the inline boot script before hydration; sync the button afterward.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const next = theme === "dark" ? "light" : "dark";
  const label = locale === "zh" ? `切换到${next === "dark" ? "深色" : "浅色"}模式` : `Switch to ${next} mode`;

  return (
    <button type="button" className="icon-button ml-1" aria-label={label} title={label} onClick={() => {
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem("baomi.theme", next);
      setTheme(next);
    }}>
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20.2 14.2A8.2 8.2 0 0 1 9.8 3.8 8.2 8.2 0 1 0 20.2 14.2Z"/></svg>
      )}
    </button>
  );
}
