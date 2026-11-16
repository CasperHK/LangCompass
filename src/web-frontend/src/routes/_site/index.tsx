import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Braces,
  Cloud,
  Code2,
  Cpu,
  Database,
  Globe2,
  Laptop,
  Search,
  Sparkles,
  Terminal,
  X,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { languages, type LanguageCategory } from "@/lib/languages";

export const Route = createFileRoute("/_site/")({
  component: HomePage,
});

type CategoryFilter = "全部" | LanguageCategory;

const categories: {
  name: LanguageCategory;
  description: string;
  icon: LucideIcon;
  color: string;
  examples: string;
}[] = [
  {
    name: "系統與效能",
    description: "從底層控制到高效能服務，打造可靠的核心系統。",
    icon: Cpu,
    color: "bg-orange-50 text-orange-700 ring-orange-100",
    examples: "Rust · C++ · Zig",
  },
  {
    name: "Web 與全端",
    description: "探索現代網站、互動介面與跨平台產品的技術選擇。",
    icon: Globe2,
    color: "bg-blue-50 text-blue-700 ring-blue-100",
    examples: "TypeScript · JavaScript · Dart",
  },
  {
    name: "資料科學與 AI",
    description: "認識資料分析、科學運算與人工智慧的常用工具。",
    icon: Sparkles,
    color: "bg-violet-50 text-violet-700 ring-violet-100",
    examples: "Python · Julia · R",
  },
  {
    name: "雲端與分散式",
    description: "了解雲端原生、服務部署與分散式基礎設施。",
    icon: Cloud,
    color: "bg-cyan-50 text-cyan-700 ring-cyan-100",
    examples: "Go · Bash",
  },
  {
    name: "晶片設計",
    description: "走進硬體描述語言，探索數位電路與晶片開發。",
    icon: Database,
    color: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    examples: "Veryl · Spade",
  },
  {
    name: "應用程式與行動",
    description: "從桌面、行動裝置到企業系統，探索不同平台的應用開發。",
    icon: Code2,
    color: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    examples: "Swift · Delphi · Visual Basic",
  },
  {
    name: "遊戲與互動",
    description: "認識遊戲腳本、互動體驗與可嵌入應用的語言。",
    icon: Cpu,
    color: "bg-rose-50 text-rose-700 ring-rose-100",
    examples: "GDScript · Lua",
  },
  {
    name: "資料庫與查詢",
    description: "使用資料庫專用語言，在資料儲存端撰寫查詢和程序。",
    icon: Database,
    color: "bg-teal-50 text-teal-700 ring-teal-100",
    examples: "PL/SQL",
  },
];

function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("全部");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredLanguages = languages.filter((language) => {
    const matchesCategory = selectedCategory === "全部" || language.category === selectedCategory;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      `${language.name} ${language.category} ${language.description}`
        .toLocaleLowerCase()
        .includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  function showLanguages(category?: CategoryFilter) {
    if (category) setSelectedCategory(category);
    document.getElementById("language-index")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="relative overflow-hidden">
      <section className="home-hero-grid relative px-6 pb-20 pt-14 sm:pb-24 sm:pt-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-2 text-sm font-medium text-blue-800 shadow-sm">
              <CompassIcon />
              <span>程式語言圖鑑・探索開始</span>
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.2] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              找到適合你
              <span className="mt-2 block bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                下一步的程式語言
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              不只看語法，從應用場景、語言特色到生態系，帶你找到最適合手上目標的技術方向。
            </p>

            <form
              className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_12px_36px_-20px_rgba(15,23,42,0.28)] transition focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100"
              onSubmit={(event) => {
                event.preventDefault();
                showLanguages();
              }}
              role="search"
            >
              <Search className="ml-3 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
              <input
                aria-label="搜尋程式語言"
                className="min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜尋語言、應用方向…"
                type="search"
                value={query}
              />
              <button
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                type="submit"
              >
                開始探索
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <span className="font-medium text-slate-700">熱門探索</span>
              {["Rust", "TypeScript", "Python"].map((name) => (
                <button
                  className="transition hover:text-blue-700"
                  key={name}
                  onClick={() => {
                    setQuery(name);
                    showLanguages("全部");
                  }}
                  type="button"
                >
                  {name}
                </button>
              ))}
            </div>
            <a
              className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-blue-700"
              href="#categories"
            >
              依照你的目標找到方向
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-cyan-200/50 blur-3xl" />
            <div className="absolute -bottom-8 -right-6 h-48 w-48 rounded-full bg-indigo-200/60 blur-3xl" />
            <div className="home-image-frame relative overflow-hidden rounded-[1.75rem] border border-white bg-slate-950 p-2 shadow-[0_32px_80px_-36px_rgba(15,23,42,0.5)]">
              <img
                alt="LangCompass 程式語言圖鑑與技術生態世界地圖"
                className="aspect-[1.45] h-full w-full rounded-[1.25rem] object-cover"
                height="800"
                src="/langcompass-map.jpg"
                width="1408"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 rounded-2xl border border-white/15 bg-slate-950/70 p-4 text-white shadow-lg backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
                    LangCompass Atlas
                  </p>
                  <p className="mt-1 text-sm font-semibold sm:text-base">讓技術選擇更有方向</p>
                </div>
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 sm:flex">
                  <CompassIcon />
                </div>
              </div>
            </div>
            <div className="absolute -right-3 top-8 hidden items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-lg sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              依使用情境分類
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:justify-between">
          <p className="text-sm font-medium text-slate-500">讓下一個技術決策，更有依據</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <Braces className="h-4 w-4 text-blue-600" aria-hidden="true" />
              語言特色
            </span>
            <span className="inline-flex items-center gap-2">
              <Terminal className="h-4 w-4 text-indigo-600" aria-hidden="true" />
              應用場景
            </span>
            <span className="inline-flex items-center gap-2">
              <Code2 className="h-4 w-4 text-cyan-700" aria-hidden="true" />
              技術生態
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24" id="categories">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold tracking-wide text-blue-700">從需求開始</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                你想打造什麼？
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                先選擇你的應用方向，再認識適合這條路的程式語言。
              </p>
            </div>
            <a
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900"
              href="#language-index"
            >
              查看全部語言
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const count = languages.filter(
                (language) => language.category === category.name
              ).length;

              return (
                <button
                  className="group rounded-2xl border border-slate-200 bg-white p-6 text-left transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  key={category.name}
                  onClick={() => showLanguages(category.name)}
                  type="button"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset ${category.color}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <ArrowRight
                      className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-700"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{category.name}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
                    {category.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <span className="text-xs text-slate-500">{category.examples}</span>
                    <span className="shrink-0 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {count} 種
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold tracking-wide text-blue-700">更多技術選擇</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                從需求找到合適的工具
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                除了程式語言，也可以依照資料需求、裝置平台或產品類型探索常見技術。
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_16px_36px_-24px_rgba(15,23,42,0.3)] sm:p-6"
              to="/databases"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Database className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-slate-950">資料庫選擇指南</span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">
                  依資料模型、工作負載與維運需求，比較常見資料庫。
                </span>
              </span>
            </Link>
            <Link
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_16px_36px_-24px_rgba(15,23,42,0.3)] sm:p-6"
              to="/fwks-libs"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                <Code2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-slate-950">框架與函式庫</span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-violet-700"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">
                  依語言、應用類型和團隊需求，探索常見開發工具。
                </span>
              </span>
            </Link>
            <Link
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-[0_16px_36px_-24px_rgba(15,23,42,0.3)] sm:p-6"
              to="/operating-systems"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-800">
                <Laptop className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-slate-950">作業系統指南</span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-800"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">
                  從桌面、伺服器到行動裝置，探索不同系統的定位與取捨。
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 sm:py-24" id="language-index">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold tracking-wide text-blue-700">語言圖鑑</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                探索你的下一門語言
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                從語言的特色與用途出發，找到值得深入了解的技術。
              </p>
            </div>
            <p className="text-sm text-slate-500">
              共 <span className="font-semibold text-slate-900">{filteredLanguages.length}</span>{" "}
              門語言
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="依領域篩選">
            {(["全部", ...categories.map((category) => category.name)] as CategoryFilter[]).map(
              (category) => (
                <button
                  aria-pressed={selectedCategory === category}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
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
              )
            )}
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLanguages.map((language) => (
              <Link
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-[0_16px_36px_-24px_rgba(15,23,42,0.3)]"
                key={language.slug}
                to="/languages/$slug"
                params={{ slug: language.slug }}
                aria-label={`了解 ${language.name} 語言詳情`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold ${language.color}`}
                  >
                    {language.mark}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold text-slate-950">{language.name}</h3>
                      <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-500">
                        {language.category}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{language.description}</p>
                  </div>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-700">
                  查看語言介紹
                  <ArrowRight
                    className="h-3.5 w-3.5 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>

          {filteredLanguages.length === 0 ? (
            <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <Search className="mx-auto h-6 w-6 text-slate-400" aria-hidden="true" />
              <p className="mt-3 font-medium text-slate-900">找不到符合條件的語言</p>
              <p className="mt-1 text-sm text-slate-500">試試其他關鍵字，或重設篩選條件。</p>
              <button
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
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
          ) : null}
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[1.75rem] bg-slate-950 px-7 py-9 text-white sm:flex-row sm:items-center sm:px-10 sm:py-11">
          <div>
            <p className="text-sm font-semibold text-cyan-300">每一條技術路線，都有起點</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              從好奇開始，找到你的方向。
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
              依照興趣探索語言，也可以從實際的開發情境開始比較。
            </p>
          </div>
          <button
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => showLanguages("全部")}
            type="button"
          >
            瀏覽語言圖鑑
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}

function CompassIcon() {
  return (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-700 text-[10px] font-bold text-white"
      aria-hidden="true"
    >
      N
    </span>
  );
}
