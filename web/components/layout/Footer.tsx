import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm py-6 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700 dark:text-slate-300">DukaanAI</span>
          <span>•</span>
          <span>AI-assisted retail & Kirana management</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
            Foundations v0.1.0
          </span>
          <Link
            href="/health"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            System Status
          </Link>
          <Link
            href="/settings"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Preferences
          </Link>
        </div>
      </div>
    </footer>
  );
}
