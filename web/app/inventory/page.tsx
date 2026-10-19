import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory | DukaanAI",
  description: "Stock tracking and inventory alert management",
};

export default function InventoryPage() {
  const stockItems = [
    {
      sku: "FORT-OIL-1L",
      name: "Fortune Sunlite Refined Sunflower Oil 1L",
      stock: 3,
      minThreshold: 15,
      unit: "Bottles",
      status: "Critical Low",
      lastRestocked: "12 Oct 2026",
    },
    {
      sku: "MDHR-SGR-5KG",
      name: "Madhur Pure & Hygienic Sugar 5kg",
      stock: 2,
      minThreshold: 10,
      unit: "Packets",
      status: "Critical Low",
      lastRestocked: "10 Oct 2026",
    },
    {
      sku: "TATA-DAL-1KG",
      name: "Tata Sampann Unpolished Toor Dal 1kg",
      stock: 4,
      minThreshold: 12,
      unit: "Packets",
      status: "Low Stock",
      lastRestocked: "08 Oct 2026",
    },
    {
      sku: "MDH-CHANA-100G",
      name: "MDH Chana Masala 100g",
      stock: 0,
      minThreshold: 20,
      unit: "Boxes",
      status: "Out of Stock",
      lastRestocked: "28 Sep 2026",
    },
    {
      sku: "AASH-ATTA-5KG",
      name: "Aashirvaad Shudh Chakki Atta 5kg",
      stock: 45,
      minThreshold: 15,
      unit: "Bags",
      status: "Sufficient",
      lastRestocked: "14 Oct 2026",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Inventory & Stock Tracking
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time shop inventory levels, low-stock notifications, and vendor restocking
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium text-xs sm:text-sm hover:bg-indigo-700 shadow-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Stock In / Restock</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Tracked SKUs</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">142</p>
          <p className="text-[11px] text-slate-400 mt-1">Across all categories</p>
        </div>
        <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 shadow-xs">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase">Low Stock Alerts</p>
          <p className="text-2xl font-bold text-amber-900 dark:text-amber-200 mt-1">3</p>
          <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-1">Need supplier reorder</p>
        </div>
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 shadow-xs">
          <p className="text-xs font-semibold text-rose-700 dark:text-rose-300 uppercase">Out of Stock</p>
          <p className="text-2xl font-bold text-rose-900 dark:text-rose-200 mt-1">1</p>
          <p className="text-[11px] text-rose-700 dark:text-rose-400 mt-1">Zero units remaining</p>
        </div>
        <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-xs">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase">Healthy Stock</p>
          <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-200 mt-1">138</p>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">Above safety margin</p>
        </div>
      </div>

      {/* Inventory Rules Callout */}
      <div className="p-3.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
        <span className="font-semibold text-slate-800 dark:text-slate-200">Inventory Tracking Integrity:</span> Stock counts must always be non-negative integers (≥ 0). Invalid or negative inventory updates are blocked.
      </div>

      {/* Stock Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Current Stock Levels
          </h2>
          <span className="text-xs text-slate-500">Sorted by urgency</span>
        </div>

        {/* Desktop / Tablet View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-5 py-3">Item / SKU</th>
                <th className="px-5 py-3 text-center">Available Stock</th>
                <th className="px-5 py-3 text-center">Reorder Threshold</th>
                <th className="px-5 py-3 text-center">Unit</th>
                <th className="px-5 py-3 text-center">Health Status</th>
                <th className="px-5 py-3 text-right">Last Restocked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {stockItems.map((item) => (
                <tr key={item.sku} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{item.name}</p>
                    <p className="text-slate-400 font-mono text-[11px]">{item.sku}</p>
                  </td>
                  <td className="px-5 py-3.5 text-center font-bold text-sm text-slate-900 dark:text-white">
                    {item.stock}
                  </td>
                  <td className="px-5 py-3.5 text-center text-slate-500">
                    {item.minThreshold}
                  </td>
                  <td className="px-5 py-3.5 text-center text-slate-600 dark:text-slate-400">
                    {item.unit}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.status === "Sufficient"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : item.status === "Out of Stock"
                          ? "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right text-slate-500 font-mono text-[11px]">
                    {item.lastRestocked}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
          {stockItems.map((item) => (
            <div key={item.sku} className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-tight">
                    {item.name}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">{item.sku}</span>
                </div>
                <span
                  className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    item.status === "Sufficient"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : item.status === "Out of Stock"
                      ? "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                      : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-slate-500">Available: <strong className="text-slate-900 dark:text-white">{item.stock} {item.unit}</strong></span>
                <span className="text-slate-400">Reorder at: {item.minThreshold}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
