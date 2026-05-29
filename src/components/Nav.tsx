import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-bold text-black shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-105">
            b
          </span>
          <span className="text-lg tracking-tight">baomi</span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-white/60">
          <Link href="#apps" className="transition-colors hover:text-white">
            Apps
          </Link>
          <a
            href="https://github.com/baomi-app"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
