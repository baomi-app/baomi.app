export function Footer() {
  const year = 2026;
  return (
    <footer className="mt-auto border-t border-white/5">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-white/40 sm:flex-row">
        <p>© {year} baomi · 咔，一爆即得</p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/baomi-app"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a
            href="mailto:hi@baomi.app"
            className="transition-colors hover:text-white"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
