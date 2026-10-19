import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | DukaanAI",
  description: "Shop configuration, AI preferences, and store preferences",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-5 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Settings & Configuration
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your store profile, local AI model parameters, and regional defaults
        </p>
      </div>

      {/* Store Profile Section */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            🏪
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Store Profile
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Basic retail shop details printed on invoices and customer receipts
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Store / Dukaan Name
            </label>
            <input
              type="text"
              defaultValue="Apna Kirana Store"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Owner Name
            </label>
            <input
              type="text"
              defaultValue="Nagesh S."
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Phone / WhatsApp Number
            </label>
            <input
              type="text"
              defaultValue="+91 98765 43210"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              GSTIN / Registration Number (Optional)
            </label>
            <input
              type="text"
              defaultValue="27AAAAA0000A1Z5"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* AI Assistant Configuration */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            🧠
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Local AI Engine (Ollama)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Offline-first model parameters for automated product listing generation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Ollama Server URL
            </label>
            <input
              type="text"
              defaultValue="http://localhost:11434"
              className="w-full px-3.5 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Active LLM Model
            </label>
            <input
              type="text"
              defaultValue="llama3.2:latest"
              className="w-full px-3.5 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              readOnly
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Primary Listing Languages
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              {["English", "Hindi (हिन्दी)", "Hinglish", "Tamil (தமிழ்)", "Telugu (తెలుగు)"].map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Regional Defaults */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Regional & Currency Defaults
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <p className="text-slate-500 dark:text-slate-400">Default Currency</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">INR (₹ Indian Rupee)</p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400">Weight & Units</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Metric (kg, g, L, ml, pcs)</p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400">Tax Regime</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">GST Composition Scheme</p>
          </div>
        </div>
      </div>
    </div>
  );
}
