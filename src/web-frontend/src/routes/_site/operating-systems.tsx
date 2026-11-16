import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Laptop,
  Search,
  Server,
  Smartphone,
  Terminal,
  X,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import {
  operatingSystemCategories,
  operatingSystems,
  type OperatingSystemCategory,
  type OperatingSystemProfile,
} from "@/lib/operating-systems";

export const Route = createFileRoute("/_site/operating-systems")({
  component: OperatingSystemsPage,
});

type OperatingSystemFilter = "全部" | OperatingSystemCategory;

function OperatingSystemsPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<OperatingSystemFilter>("全部");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredSystems = operatingSystems.filter((system) => {
    const matchesCategory =
      selectedCategory === "全部" || system.categories.includes(selectedCategory);
    const searchableText = [
      system.name,
      system.family,
      system.summary,
      system.bestFor,
      ...system.categories,
      ...system.strengths,
      ...system.considerations,
    ]
      .join(" ")
      .toLocaleLowerCase();

    return (
      matchesCategory && (normalizedQuery.length === 0 || searchableText.includes(normalizedQuery))
    );
  });

  return (
    <div className="bg-white">
      <section className="border-b border-slate-100 bg-gradient-to-b from-cyan-50/70 to-white px-6 pb-14 pt-8 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="麵包屑" className="flex items-center gap-2 text-sm text-slate-500">
            <Link className="transition hover:text-blue-700" to="/">
              LangCompass
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-slate-800">
              作業系統指南
            </span>
          </nav>

          <div className="mt-10 grid items-end gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-3.5 py-2 text-sm font-medium text-cyan-800">
                <Laptop className="h-4 w-4" aria-hidden="true" />
                從使用裝置與工作負載開始
              </span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                找到適合情境的作業系統
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                從桌面、伺服器到行動裝置，認識常見作業系統的定位、優勢和需要先確認的相容性。
                選擇時也要考量硬體支援、更新週期、軟體需求與團隊維運能力。
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-semibold text-slate-900">如何開始比較</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  先確認目標是桌面、伺服器、行動裝置還是自架服務。
                </li>
                <li className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  確認必要軟體、裝置驅動與硬體是否受支援。
                </li>
                <li className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  比較更新週期、支援來源和日常維護成本。
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold tracking-wide text-cyan-800">作業系統圖鑑</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                依裝置和工作負載探索
              </h2>
            </div>
            <p className="text-sm text-slate-500" aria-live="polite">
              顯示 <span className="font-semibold text-slate-900">{filteredSystems.length}</span> 種
              作業系統
            </p>
          </div>

          <div className="mt-7 max-w-xl">
            <label
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-cyan-300 focus-within:ring-4 focus-within:ring-cyan-100"
              htmlFor="operating-system-search"
            >
              <Search className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
              <input
                className="min-w-0 flex-1 border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                id="operating-system-search"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜尋作業系統、裝置或用途…"
                type="search"
                value={query}
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="依裝置和工作負載篩選">
            {(["全部", ...operatingSystemCategories] as OperatingSystemFilter[]).map((category) => (
              <button
                aria-pressed={selectedCategory === category}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700 ${
                  selectedCategory === category
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950"
                }`}
                key={category}
                onClick={() => setSelectedCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          {filteredSystems.length > 0 ? (
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {filteredSystems.map((system) => (
                <OperatingSystemCard key={system.slug} system={system} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <Search className="mx-auto h-6 w-6 text-slate-400" aria-hidden="true" />
              <p className="mt-3 font-medium text-slate-900">找不到符合條件的作業系統</p>
              <p className="mt-1 text-sm text-slate-500">試試其他關鍵字，或重設篩選條件。</p>
              <button
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-800 hover:text-cyan-950"
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("全部");
                }}
                type="button"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                清除條件
              </button>
            </div>
          )}

          <div className="mt-12 flex flex-col justify-between gap-5 rounded-2xl bg-slate-950 p-6 text-white sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="text-sm font-semibold text-cyan-300">也在規劃應用技術？</p>
              <h2 className="mt-2 text-xl font-semibold">從作業系統延伸探索開發工具</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                了解作業系統後，也可以比較資料庫、程式語言和常見框架。
              </p>
            </div>
            <Link
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
              to="/databases"
            >
              資料庫指南
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function OperatingSystemCard({ system }: { system: OperatingSystemProfile }) {
  const Icon = getOperatingSystemIcon(system);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-cyan-200 hover:shadow-[0_16px_36px_-24px_rgba(15,23,42,0.3)] sm:p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-800">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-slate-950">{system.name}</h3>
            <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
              {system.family}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{system.summary}</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-cyan-50/70 p-4">
        <p className="text-xs font-semibold tracking-wide text-cyan-900">適合情境</p>
        <p className="mt-1.5 text-sm leading-6 text-slate-700">{system.bestFor}</p>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold text-emerald-800">優勢</h4>
          <ul className="mt-2 space-y-2">
            {system.strengths.map((strength) => (
              <li className="flex gap-2 text-xs leading-5 text-slate-600" key={strength}>
                <Check
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                {strength}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-amber-800">先確認</h4>
          <ul className="mt-2 space-y-2">
            {system.considerations.map((consideration) => (
              <li className="flex gap-2 text-xs leading-5 text-slate-600" key={consideration}>
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                  aria-hidden="true"
                />
                {consideration}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="flex flex-wrap gap-2">
          {system.categories.map((category) => (
            <span
              className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-500"
              key={category}
            >
              {category}
            </span>
          ))}
        </div>
        <a
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-800 transition hover:text-cyan-950"
          href={system.officialSite}
          rel="noopener noreferrer"
          target="_blank"
        >
          官方網站
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function getOperatingSystemIcon(system: OperatingSystemProfile): LucideIcon {
  if (system.categories.includes("行動裝置")) return Smartphone;
  if (system.categories.includes("伺服器與雲端")) return Server;
  if (system.categories.includes("開發與自架")) return Terminal;
  return Laptop;
}
