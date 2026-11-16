import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Code2, Search, X } from "lucide-react";
import { useState } from "react";
import {
  frameworkCategories,
  frameworksLibraries,
  type FrameworkCategory,
} from "@/lib/technology-guides";

export const Route = createFileRoute("/_site/fwks-libs/")({
  component: FrameworksLibrariesGuidePage,
});

type FrameworkCategoryFilter = "全部" | FrameworkCategory;

const frameworkLanguages = [...new Set(frameworksLibraries.map((entry) => entry.language))].sort();

function FrameworksLibrariesGuidePage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FrameworkCategoryFilter>("全部");
  const [selectedLanguage, setSelectedLanguage] = useState("全部語言");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredOptions = frameworksLibraries.filter((option) => {
    const matchesCategory = selectedCategory === "全部" || option.category === selectedCategory;
    const matchesLanguage = selectedLanguage === "全部語言" || option.language === selectedLanguage;
    const searchableText = [
      option.name,
      option.language,
      option.category,
      option.kind,
      option.summary,
      option.bestFor,
      ...option.strengths,
      ...option.considerations,
      ...option.useCases,
    ]
      .join(" ")
      .toLocaleLowerCase();

    return (
      matchesCategory &&
      matchesLanguage &&
      (normalizedQuery.length === 0 || searchableText.includes(normalizedQuery))
    );
  });

  return (
    <div className="bg-white">
      <section className="border-b border-slate-100 bg-gradient-to-b from-violet-50/70 to-white px-6 pb-14 pt-8 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="麵包屑" className="flex items-center gap-2 text-sm text-slate-500">
            <Link className="transition hover:text-blue-700" to="/">
              LangCompass
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-slate-800">
              框架與函式庫
            </span>
          </nav>

          <div className="mt-10 grid items-end gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-3.5 py-2 text-sm font-medium text-violet-800">
                <Code2 className="h-4 w-4" aria-hidden="true" />
                依語言與產品目標挑選
              </span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                找到合適的框架與函式庫
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                比較常見工具的定位、適用場景與需要留意的成本。先確認要解決的問題，再選擇符合團隊經驗和產品需求的工具。
              </p>
            </div>
            <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-semibold text-slate-900">如何開始比較</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  先選擇應用平台和主要程式語言。
                </li>
                <li className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  小型工具可優先考慮輕量函式庫；大型產品可評估完整框架。
                </li>
                <li className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  也要考量團隊熟悉度、部署環境和長期維護。
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
              <p className="text-sm font-semibold tracking-wide text-violet-700">
                框架與函式庫圖鑑
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                按應用類型和語言探索
              </h2>
            </div>
            <p className="text-sm text-slate-500" aria-live="polite">
              顯示 <span className="font-semibold text-slate-900">{filteredOptions.length}</span> 種
              工具
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-[minmax(0,1fr)_15rem]">
            <label
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100"
              htmlFor="framework-search"
            >
              <Search className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
              <input
                className="min-w-0 flex-1 border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                id="framework-search"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜尋工具、語言或應用情境…"
                type="search"
                value={query}
              />
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100">
              <span className="shrink-0">程式語言</span>
              <select
                aria-label="依程式語言篩選"
                className="min-w-0 flex-1 border-0 bg-transparent font-medium text-slate-900 outline-none"
                onChange={(event) => setSelectedLanguage(event.target.value)}
                value={selectedLanguage}
              >
                <option>全部語言</option>
                {frameworkLanguages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="依應用類型篩選">
            {(["全部", ...frameworkCategories] as FrameworkCategoryFilter[]).map((category) => (
              <button
                aria-pressed={selectedCategory === category}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 ${
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

          {filteredOptions.length > 0 ? (
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {filteredOptions.map((option) => (
                <article
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-200 hover:shadow-[0_16px_36px_-24px_rgba(15,23,42,0.3)] sm:p-6"
                  key={option.slug}
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                      <Code2 className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-slate-950">{option.name}</h3>
                        <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                          {option.category}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full border border-violet-100 bg-violet-50/60 px-2.5 py-1 text-xs font-medium text-violet-800">
                          {option.kind}
                        </span>
                        <span className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-500">
                          {option.language}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{option.summary}</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-violet-50/70 p-4">
                    <p className="text-xs font-semibold tracking-wide text-violet-800">適合情境</p>
                    <p className="mt-1.5 text-sm leading-6 text-slate-700">{option.bestFor}</p>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-800">優勢</h4>
                      <ul className="mt-2 space-y-2">
                        {option.strengths.map((strength) => (
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
                        {option.considerations.map((consideration) => (
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

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                    {option.useCases.map((useCase) => (
                      <span
                        className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-500"
                        key={useCase}
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                  <Link
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition hover:text-violet-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                    to="/fwks-libs/$slug"
                    params={{ slug: option.slug }}
                  >
                    查看詳細介紹
                    <ArrowRight
                      className="h-4 w-4 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <Search className="mx-auto h-6 w-6 text-slate-400" aria-hidden="true" />
              <p className="mt-3 font-medium text-slate-900">找不到符合條件的框架或函式庫</p>
              <p className="mt-1 text-sm text-slate-500">試試其他關鍵字，或重設篩選條件。</p>
              <button
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900"
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("全部");
                  setSelectedLanguage("全部語言");
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
              <p className="text-sm font-semibold text-cyan-300">也要挑選資料儲存方式？</p>
              <h2 className="mt-2 text-xl font-semibold">讓資料需求也納入技術選擇</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                比較不同資料庫的資料模型、工作負載和維運取捨。
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
