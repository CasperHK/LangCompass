import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Database, Search, X } from "lucide-react";
import { useState } from "react";
import { databases, databaseNeeds, type DatabaseNeed } from "@/lib/technology-guides";

export const Route = createFileRoute("/_site/databases")({
  component: DatabasesGuidePage,
});

type DatabaseNeedFilter = "全部" | DatabaseNeed;

function DatabasesGuidePage() {
  const [query, setQuery] = useState("");
  const [selectedNeed, setSelectedNeed] = useState<DatabaseNeedFilter>("全部");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredDatabases = databases.filter((database) => {
    const matchesNeed = selectedNeed === "全部" || database.needs.includes(selectedNeed);
    const searchableText = [
      database.name,
      database.model,
      database.hosting,
      database.summary,
      database.bestFor,
      ...database.needs,
      ...database.strengths,
      ...database.considerations,
    ]
      .join(" ")
      .toLocaleLowerCase();

    return (
      matchesNeed && (normalizedQuery.length === 0 || searchableText.includes(normalizedQuery))
    );
  });

  return (
    <div className="bg-white">
      <section className="border-b border-slate-100 bg-gradient-to-b from-blue-50/70 to-white px-6 pb-14 pt-8 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="麵包屑" className="flex items-center gap-2 text-sm text-slate-500">
            <Link className="transition hover:text-blue-700" to="/">
              LangCompass
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-slate-800">
              資料庫指南
            </span>
          </nav>

          <div className="mt-10 grid items-end gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3.5 py-2 text-sm font-medium text-blue-800">
                <Database className="h-4 w-4" aria-hidden="true" />
                從資料需求開始
              </span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                找到適合需求的資料庫
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                從資料模型、工作負載與維運方式出發，比較常見資料庫的適用情境與取捨。沒有一種資料庫適合所有問題，先找出最重要的需求。
              </p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-semibold text-slate-900">快速選擇方向</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  需要多筆資料一致更新？先看交易型 SQL 資料庫。
                </li>
                <li className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  做報表或事件分析？選擇為分析工作負載設計的工具。
                </li>
                <li className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  先從小型應用開始？評估免維運或內嵌式方案。
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
              <p className="text-sm font-semibold tracking-wide text-blue-700">資料庫圖鑑</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                依你的優先需求比較
              </h2>
            </div>
            <p className="text-sm text-slate-500" aria-live="polite">
              顯示 <span className="font-semibold text-slate-900">{filteredDatabases.length}</span>{" "}
              種 資料庫
            </p>
          </div>

          <div className="mt-7 max-w-xl">
            <label
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100"
              htmlFor="database-search"
            >
              <Search className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
              <input
                className="min-w-0 flex-1 border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                id="database-search"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜尋資料庫、資料模型或用途…"
                type="search"
                value={query}
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="依需求篩選資料庫">
            {(["全部", ...databaseNeeds] as DatabaseNeedFilter[]).map((need) => (
              <button
                aria-pressed={selectedNeed === need}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  selectedNeed === need
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950"
                }`}
                key={need}
                onClick={() => setSelectedNeed(need)}
                type="button"
              >
                {need}
              </button>
            ))}
          </div>

          {filteredDatabases.length > 0 ? (
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {filteredDatabases.map((database) => (
                <article
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-[0_16px_36px_-24px_rgba(15,23,42,0.3)] sm:p-6"
                  key={database.slug}
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Database className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-slate-950">{database.name}</h3>
                        <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                          {database.model}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{database.summary}</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-blue-50/70 p-4">
                    <p className="text-xs font-semibold tracking-wide text-blue-800">適合情境</p>
                    <p className="mt-1.5 text-sm leading-6 text-slate-700">{database.bestFor}</p>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-800">優勢</h4>
                      <ul className="mt-2 space-y-2">
                        {database.strengths.map((strength) => (
                          <li
                            className="flex gap-2 text-xs leading-5 text-slate-600"
                            key={strength}
                          >
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
                      <h4 className="text-sm font-semibold text-amber-800">先評估</h4>
                      <ul className="mt-2 space-y-2">
                        {database.considerations.map((consideration) => (
                          <li
                            className="flex gap-2 text-xs leading-5 text-slate-600"
                            key={consideration}
                          >
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
                      {database.needs.map((need) => (
                        <span
                          className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-500"
                          key={need}
                        >
                          {need}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">{database.hosting}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <Search className="mx-auto h-6 w-6 text-slate-400" aria-hidden="true" />
              <p className="mt-3 font-medium text-slate-900">找不到符合條件的資料庫</p>
              <p className="mt-1 text-sm text-slate-500">試試其他關鍵字，或重設篩選條件。</p>
              <button
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
                onClick={() => {
                  setQuery("");
                  setSelectedNeed("全部");
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
              <p className="text-sm font-semibold text-cyan-300">還在選擇開發技術？</p>
              <h2 className="mt-2 text-xl font-semibold">從語言和應用情境一起探索</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                資料庫只是技術選擇的一部分，也可以看看常見語言或框架與函式庫。
              </p>
            </div>
            <Link
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
              to="/fwks-libs"
            >
              框架與函式庫
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
