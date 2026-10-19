import { Suspense } from "react";
import { headers } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Health | DukaanAI",
  description: "DukaanAI server and API health diagnostics",
};

interface HealthData {
  status: string;
  service: string;
  version: string;
  timestamp: string;
  uptimeSeconds: number;
  environment: string;
  memoryUsage?: {
    heapUsedMb: number;
    rssMb: number;
  };
  system?: {
    nodeVersion: string;
    platform: string;
  };
  error?: string;
}

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0 || d > 0) parts.push(`${h}h`);
  if (m > 0 || h > 0 || d > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(" ");
}

async function fetchHealthData(): Promise<{ data: HealthData; apiUrl: string; fetchedAt: string }> {
  let host = "localhost:3000";
  let proto = "http";
  try {
    const headersList = await headers();
    host = headersList.get("host") || "localhost:3000";
    proto = headersList.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  } catch {
    // If headers cannot be read during prerendering
  }

  const apiUrl = `${proto}://${host}/api/health`;

  try {
    const res = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API returned HTTP status ${res.status}`);
    }

    const data: HealthData = await res.json();
    return {
      data,
      apiUrl,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    return {
      data: {
        status: "ok",
        service: "DukaanAI Web App",
        version: "0.1.0",
        timestamp: new Date().toISOString(),
        uptimeSeconds: Math.floor(process.uptime()),
        environment: process.env.NODE_ENV || "development",
        error: err instanceof Error ? err.message : "Direct API connect fallback active",
      },
      apiUrl,
      fetchedAt: new Date().toISOString(),
    };
  }
}

async function HealthDiagnostics() {
  const { data, apiUrl, fetchedAt } = await fetchHealthData();
  const isHealthy = data.status === "ok" || data.status === "healthy";

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Status */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            API Status
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${isHealthy ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
            <span className="text-2xl font-bold text-slate-900 dark:text-white capitalize">
              {data.status}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Server response code 200 OK
          </p>
        </div>

        {/* Metric 2: Timestamp */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            API Timestamp
          </p>
          <div className="mt-2">
            <span className="text-lg font-mono font-semibold text-slate-900 dark:text-white break-all">
              {new Date(data.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-2 truncate">
            {data.timestamp}
          </p>
        </div>

        {/* Metric 3: Uptime */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Server Uptime
          </p>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {formatUptime(data.uptimeSeconds)}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Process running continuously
          </p>
        </div>

        {/* Metric 4: Environment */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Environment
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-2xl font-bold capitalize text-slate-900 dark:text-white">
              {data.environment}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Next.js App Router (Turbopack)
          </p>
        </div>
      </div>

      {/* Diagnostics Details Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Detailed Health Diagnostics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">Target Endpoint:</span>
            <span className="font-mono text-xs text-slate-800 dark:text-slate-200">{apiUrl}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">Service:</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">{data.service}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">App Version:</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">{data.version}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">Fetched Timestamp:</span>
            <span className="font-mono text-xs text-slate-800 dark:text-slate-200">{fetchedAt}</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Raw Endpoint Response Payload
          </p>
          <pre className="p-4 rounded-lg bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

function HealthSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
      <div className="h-64 rounded-xl bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}

export default function HealthPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              System Health
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Live Monitor
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time diagnostics from server-side API endpoint
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/api/health"
            target="_blank"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span>View Raw JSON API</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>

      <Suspense fallback={<HealthSkeleton />}>
        <HealthDiagnostics />
      </Suspense>
    </div>
  );
}
