import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | DukaanAI",
  description: "AI-assisted product catalog and listing manager",
};

export default function ProductsPage() {
  const sampleProducts = [
    {
      id: "PRD-001",
      name: "Aashirvaad Shudh Chakki Atta",
      category: "Flour & Grains",
      mrp: 235,
      sellingPrice: 220,
      stock: 45,
      sku: "AASH-ATTA-5KG",
      status: "In Stock",
    },
    {
      id: "PRD-002",
      name: "Tata Salt Vacuum Evaporated 1kg",
      category: "Spices & Essentials",
      mrp: 28,
      sellingPrice: 26,
      stock: 80,
      sku: "TATA-SALT-1KG",
      status: "In Stock",
    },
    {
      id: "PRD-003",
      name: "Fortune Sunlite Refined Sunflower Oil 1L",
      category: "Edible Oils",
      mrp: 155,
      sellingPrice: 145,
      stock: 3,
      sku: "FORT-OIL-1L",
      status: "Low Stock",
    },
    {
      id: "PRD-004",
      name: "Amul Butter Pasteurized 100g",
      category: "Dairy",
      mrp: 60,
      sellingPrice: 58,
      stock: 22,
      sku: "AMUL-BUT-100G",
      status: "In Stock",
    },
    {
      id: "PRD-005",
      name: "Maggi 2-Minute Noodles 70g",
      category: "Instant Food",
      mrp: 14,
      sellingPrice: 14,
      stock: 120,
      sku: "MAGG-NOD-70G",
      status: "In Stock",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Product Catalog
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your store items, pricing, and AI-generated listings
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
            <span>+ AI Add Product</span>
          </button>
        </div>
      </div>

      {/* AI Assistant Banner */}
      <div className="rounded-xl p-4 sm:p-5 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200 dark:border-purple-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
            🤖
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              AI Listing Generator Ready
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Snap a picture of any packet or barcode. DukaanAI infers the vernacular title, ingredients, MRP, and suggested retail price.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="shrink-0 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs"
        >
          Try Demo Scan
        </button>
      </div>

      {/* Business Rules Callout */}
      <div className="p-3.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
        <span className="font-semibold text-slate-800 dark:text-slate-200">Catalog Pricing Policy:</span> Selling price must be strictly greater than ₹0. MRP, when provided, cannot be lower than the selling price.
      </div>

      {/* Products Table / Cards (Responsive) */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Table for Tablet / Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Product Name</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3 text-right">MRP</th>
                <th className="px-5 py-3 text-right">Selling Price</th>
                <th className="px-5 py-3 text-center">Stock</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sampleProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{p.name}</p>
                    <p className="text-slate-400 font-mono text-[11px]">{p.sku}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-medium text-slate-400 line-through">
                    ₹{p.mrp}
                  </td>
                  <td className="px-5 py-3.5 text-right font-bold text-slate-900 dark:text-white">
                    ₹{p.sellingPrice}
                  </td>
                  <td className="px-5 py-3.5 text-center font-medium text-slate-700 dark:text-slate-300">
                    {p.stock}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        p.status === "In Stock"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      type="button"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 font-semibold"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card View for Mobile (down to 375px) */}
        <div className="sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
          {sampleProducts.map((p) => (
            <div key={p.id} className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-tight">
                    {p.name}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">{p.sku}</span>
                </div>
                <span
                  className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    p.status === "In Stock"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500">Category: {p.category}</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">Stock: {p.stock}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 line-through mr-2">MRP ₹{p.mrp}</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">₹{p.sellingPrice}</span>
                </div>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-200"
                >
                  Edit Item
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
