"use client";

import { useState, useMemo } from "react";
import hooksData from "../data/hooks.json";

interface Hook {
  id: string;
  name: string;
  category: string;
  jobRole: string;
  description: string;
  repositoryUrl: string;
}

const hooks: Hook[] = hooksData;

const CATEGORY_COLORS: Record<string, string> = {
  "Code Quality": "bg-blue-100 text-blue-700",
  Testing: "bg-green-100 text-green-700",
  Git: "bg-orange-100 text-orange-700",
  Notifications: "bg-purple-100 text-purple-700",
  Monitoring: "bg-yellow-100 text-yellow-700",
  Security: "bg-red-100 text-red-700",
  Automation: "bg-indigo-100 text-indigo-700",
};

const JOB_ROLE_COLORS: Record<string, string> = {
  General: "bg-gray-100 text-gray-700",
  "Full Stack": "bg-cyan-100 text-cyan-700",
  DevOps: "bg-emerald-100 text-emerald-700",
  "Data Engineer": "bg-violet-100 text-violet-700",
};

function categoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? "bg-gray-100 text-gray-700";
}

function jobRoleColor(role: string): string {
  return JOB_ROLE_COLORS[role] ?? "bg-gray-100 text-gray-700";
}

function Badge({ label, colorClass }: { label: string; colorClass: string }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${colorClass}`}
    >
      {label}
    </span>
  );
}

function HookCard({ hook, onClick }: { hook: Hook; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900">{hook.name}</h3>
        <Badge label={hook.category} colorClass={categoryColor(hook.category)} />
      </div>
      <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
        {hook.description}
      </p>
      <Badge label={hook.jobRole} colorClass={jobRoleColor(hook.jobRole)} />
    </button>
  );
}

function HookDetailModal({
  hook,
  onClose,
}: {
  hook: Hook;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">{hook.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge label={hook.category} colorClass={categoryColor(hook.category)} />
          <Badge label={hook.jobRole} colorClass={jobRoleColor(hook.jobRole)} />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          {hook.description}
        </p>
        <a
          href={hook.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: string[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </span>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === opt
              ? "bg-indigo-600 text-white"
              : "border border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeRole, setActiveRole] = useState("All");
  const [selectedHook, setSelectedHook] = useState<Hook | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(hooks.map((h) => h.category))).sort()],
    []
  );

  const jobRoles = useMemo(
    () => ["All", ...Array.from(new Set(hooks.map((h) => h.jobRole))).sort()],
    []
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return hooks.filter((h) => {
      const matchesCategory =
        activeCategory === "All" || h.category === activeCategory;
      const matchesRole = activeRole === "All" || h.jobRole === activeRole;
      const matchesSearch =
        !q ||
        h.name.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q) ||
        h.jobRole.toLowerCase().includes(q);
      return matchesCategory && matchesRole && matchesSearch;
    });
  }, [search, activeCategory, activeRole]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <h1 className="text-xl font-bold text-indigo-600">HookHub</h1>
          <input
            type="search"
            placeholder="Search hooks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4">
          <FilterGroup
            label="Category"
            options={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
          <FilterGroup
            label="Job Role"
            options={jobRoles}
            active={activeRole}
            onChange={setActiveRole}
          />
        </div>

        {/* Results count */}
        <p className="mb-4 text-sm text-gray-400">
          {filtered.length} hook{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Hook Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((hook) => (
              <HookCard
                key={hook.id}
                hook={hook}
                onClick={() => setSelectedHook(hook)}
              />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-gray-400">
            No hooks found for &ldquo;{search}&rdquo;.
          </p>
        )}
      </main>

      {/* Detail Modal */}
      {selectedHook && (
        <HookDetailModal
          hook={selectedHook}
          onClose={() => setSelectedHook(null)}
        />
      )}
    </div>
  );
}
