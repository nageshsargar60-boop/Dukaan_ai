import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing & POS | DukaanAI",
  description: "Point of Sale counter billing and invoice generation",
};

export default function BillingPage() {
  const cartItems = [
    { name: "Aashirvaad Shudh Chakki Atta 5kg", qty: 1, price: 220, mrp: 235 },
    { name: "Tata Salt Vacuum Evaporated 1kg", qty: 2, price: 26, mrp: 28 },
    { name: "Amul Butter Pasteurized 100g", qty: 1, price: 58, mrp: 60 },
  ];

  const subtotal = 220 * 1 + 26 * 2 + 58 * 1; // 330
  const savings = (235 - 220) + (28 - 26) * 2 + (60 - 58); // 15 + 4 + 2 = 21
  const gst = 0; // standard essential groceries
  const grandTotal = subtotal;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Quick Billing & POS
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Fast checkout, instant invoice generation, and customer credit (Udhaar) tracking
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Bill #INV-2026-0842
          </span>
        </div>
      </div>

      {/* POS Grid: Search & Cart on Left, Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Product Entry & Current Cart */}
        <div className="lg:col-span-2 space-y-4">
          {/* Quick Search / Scan Bar */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Scan barcode or type item name (e.g. Atta, Oil)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                readOnly
                value=""
              />
              <svg className="w-5 h-5 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="button"
              className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-xs sm:text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>Scan Barcode</span>
            </button>
          </div>

          {/* Current Cart Items Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Active Order Items ({cartItems.length})
              </h2>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer">
                Clear Cart
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {cartItems.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      ₹{item.price} each <span className="line-through text-slate-400 ml-1">MRP ₹{item.mrp}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                      <button type="button" className="px-2 py-1 text-slate-500 hover:text-slate-800 dark:hover:text-white text-xs">-</button>
                      <span className="px-2 text-xs font-semibold text-slate-900 dark:text-white">{item.qty}</span>
                      <button type="button" className="px-2 py-1 text-slate-500 hover:text-slate-800 dark:hover:text-white text-xs">+</button>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white text-sm min-w-[60px] text-right">
                      ₹{item.price * item.qty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Bill Summary & Checkout */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Payment Summary
            </h2>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-medium text-slate-900 dark:text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>Total Customer Savings</span>
                <span className="font-semibold">-₹{savings}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>GST (0% exempt grocery)</span>
                <span className="font-medium text-slate-900 dark:text-white">₹{gst}</span>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline">
                <span className="text-base font-bold text-slate-900 dark:text-white">Grand Total</span>
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">₹{grandTotal}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Select Payment Mode
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  className="py-2.5 px-3 rounded-lg border-2 border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold text-center"
                >
                  💵 Cash
                </button>
                <button
                  type="button"
                  className="py-2.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-center hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  📱 UPI / QR
                </button>
                <button
                  type="button"
                  className="py-2.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-center hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  💳 Card
                </button>
                <button
                  type="button"
                  className="py-2.5 px-3 rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50/30 text-amber-800 dark:text-amber-300 font-medium text-center"
                >
                  📒 Udhaar Khata
                </button>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-colors"
            >
              Complete Sale & Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
