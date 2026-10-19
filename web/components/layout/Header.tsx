import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Left: Mobile Menu & Brand for small screens */}
        <div className="flex items-center gap-3">
          <MobileMenu />

          <Link href="/" className="flex items-center gap-2.5 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.25A2.25 2.25 0 010 18.75V10.5M18 21h3.75A2.25 2.25 0 0024 18.75V10.5M3 10.5l9-6 9 6" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
              Dukaan<span className="text-indigo-600 dark:text-indigo-400">AI</span>
            </span>
          </Link>

          {/* Desktop Search / Quick Context */}
          <div className="hidden lg:flex items-center text-sm text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-200">Apna Kirana Store</span>
            <span className="mx-2 text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">Retail & Kirana Mode</span>
          </div>
        </div>

        {/* Right Actions & Health Pill */}
        <div className="flex items-center gap-3">
          <Link
            href="/health"
            className="flex items-center gap-2 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60 transition-colors"
            title="Check API and Server Health"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">System</span>
            <span>Healthy</span>
          </Link>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold text-xs shadow-sm">
              AK
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-none">Nagesh S.</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none mt-1">Shop Owner</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
