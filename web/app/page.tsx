import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | DukaanAI",
  description: "DukaanAI Store Overview & Performance",
};

export default function HomePage() {
  const stats = [
    {
      title: "Today's Sales",
      value: "₹14,850",
      change: "+12.4%",
      isPositive: true,
      description: "28 orders completed today",
      icon: (
        <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Active Products",
      value: "142",
      change: "+4 this week",
      isPositive: true,
      description: "Across 8 grocery categories",
      icon: (
        <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: "Low Stock Items",
      value: "4",
      change: "Action required",
      isPositive: false,
      description: "Sugar, Mustard Oil, Toor Dal",
      icon: (
        <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      title: "AI Listings Created",
      value: "38",
      change: "Local Ollama active",
      isPositive: true,
      description: "Vernacular descriptions generated",
      icon: (
        <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md mb-3">
            ✨ DukaanAI Foundations
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Namaste! Apna Kirana Store is ready.
          </h1>
          <p className="mt-2 text-indigo-100 text-sm sm:text-base leading-relaxed">
            Manage your store with AI-assisted product descriptions, instant inventory tracking, and swift billing.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-indigo-700 font-semibold text-xs sm:text-sm hover:bg-indigo-50 shadow-sm transition-all"
            >
              <span>+ Add Product with AI</span>
            </Link>
            <Link
              href="/billing"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-800/80 hover:bg-indigo-800 text-white font-medium text-xs sm:text-sm border border-indigo-400/30 transition-all"
            >
              <span>New Bill / POS</span>
            </Link>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none hidden sm:block">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs transition-shadow hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {stat.title}
              </span>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                {stat.icon}
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {stat.value}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className={stat.isPositive ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-amber-600 dark:text-amber-400 font-semibold"}>
                {stat.change}
              </span>
              <span className="text-slate-400 dark:text-slate-500 truncate max-w-[150px]">
                {stat.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module 1: Inventory Alerts */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Inventory Watch
            </h2>
            <Link
              href="/inventory"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View All →
            </Link>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Items running below safety reorder levels:
          </p>
          <div className="space-y-3">
            {[
              { name: "Madhur Pure Sugar 5kg", stock: 2, threshold: 10 },
              { name: "Fortune Mustard Oil 1L", stock: 3, threshold: 15 },
              { name: "Tata Sampann Toor Dal 1kg", stock: 1, threshold: 8 },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs"
              >
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</p>
                  <p className="text-slate-500 dark:text-slate-400">Reorder threshold: {item.threshold}</p>
                </div>
                <span className="font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                  {item.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: AI Assistance */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              AI Listing Assistant
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              Ollama
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Create optimized listings with vernacular names, categories, and tags:
          </p>
          <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300 flex items-center justify-center mb-2">
              📸
            </div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Scan Barcode or Product Photo
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 mb-3">
              Automatically populates title, Hindi name, MRP, and description.
            </p>
            <Link
              href="/products"
              className="inline-block px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700"
            >
              Open AI Generator
            </Link>
          </div>
        </div>

        {/* Module 3: Quick POS */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Billing & Khata
            </h2>
            <Link
              href="/billing"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Open POS →
            </Link>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Fast checkout for counter customers:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <span className="text-slate-600 dark:text-slate-300">Cash Payments Today</span>
              <span className="font-semibold text-slate-900 dark:text-white">₹8,400</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <span className="text-slate-600 dark:text-slate-300">UPI / QR Code</span>
              <span className="font-semibold text-slate-900 dark:text-white">₹6,450</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <span className="text-slate-600 dark:text-slate-300">Udhaar / Credit Added</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">₹820</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/billing"
              className="w-full block text-center py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Start Counter Billing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
