import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  ExternalLink,
  Layers3,
  Lightbulb,
} from "lucide-react";
import { frameworksLibraries } from "@/lib/technology-guides";

export const Route = createFileRoute("/_site/fwks-libs/$slug")({
  component: FrameworkLibraryDetailPage,
});

function FrameworkLibraryDetailPage() {
  const { slug } = Route.useParams();
  const option = frameworksLibraries.find((entry) => entry.slug === slug);

  if (!option) {
    return (
      <div className="px-6 py-24 text-center">
        <p className="text-sm font-semibold text-violet-700">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">找不到這項框架或函式庫</h1>
        <p className="mt-3 text-slate-600">回到圖鑑，依語言和應用情境探索其他選項。</p>
        <Link
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
          to="/fwks-libs"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          回到框架與函式庫
        </Link>
      </div>
    );
  }

  const relatedOptions = frameworksLibraries
    .filter(
      (entry) =>
        entry.slug !== option.slug &&
        (entry.category === option.category || entry.language === option.language)
    )
    .sort((left, right) => {
      const leftMatches =
        Number(left.category === option.category) + Number(left.language === option.language);
      const rightMatches =
        Number(right.category === option.category) + Number(right.language === option.language);
      return rightMatches - leftMatches || left.name.localeCompare(right.name);
    })
    .slice(0, 3);

  return (
    <div className="bg-white">
      <section className="border-b border-slate-100 bg-gradient-to-b from-violet-50/70 to-white px-6 pb-14 pt-8 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="麵包屑" className="flex items-center gap-2 text-sm text-slate-500">
            <Link className="transition hover:text-violet-700" to="/fwks-libs">
              框架與函式庫
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-slate-800">
              {option.name}
            </span>
          </nav>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-violet-100 bg-white px-3 py-1.5 text-xs font-semibold text-violet-800">
                  {option.kind}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                  {option.category}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                  {option.language}
                </span>
              </div>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                {option.name}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{option.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                  to="/fwks-libs"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  回到框架與函式庫
                </Link>
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-5 py-3 text-sm font-semibold text-violet-800 transition hover:border-violet-300 hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                  href={option.officialSite}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  官方網站
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] bg-slate-950 p-5 shadow-[0_32px_80px_-36px_rgba(15,23,42,0.5)] sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="font-mono text-xs text-slate-400">{option.slug}</span>
              </div>
              <div className="flex min-h-52 flex-col justify-center py-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                  <Layers3 className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-5 text-lg font-semibold text-white">從需求選擇工具</p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">{option.bestFor}</p>
              </div>
              <div className="flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-slate-400">
                <Code2 className="h-4 w-4 text-violet-300" aria-hidden="true" />
                {option.language}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16 lg:py-20">
        <main className="min-w-0">
          <section>
            <p className="text-sm font-semibold tracking-wide text-violet-700">適用情境</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {option.name} 適合用在哪裡？
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{option.bestFor}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {option.useCases.map((useCase) => (
                <span
                  className="rounded-full border border-violet-100 bg-violet-50/70 px-3.5 py-2 text-sm font-medium text-violet-800"
                  key={useCase}
                >
                  {useCase}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-16 grid gap-8 border-t border-slate-100 pt-12 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 text-emerald-700">
                <Check className="h-5 w-5" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-slate-950">值得考慮的優勢</h2>
              </div>
              <ul className="mt-5 space-y-4">
                {option.strengths.map((strength) => (
                  <li className="flex gap-3 text-sm leading-6 text-slate-600" key={strength}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 text-amber-700">
                <Lightbulb className="h-5 w-5" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-slate-950">導入前先評估</h2>
              </div>
              <ul className="mt-5 space-y-4">
                {option.considerations.map((consideration) => (
                  <li className="flex gap-3 text-sm leading-6 text-slate-600" key={consideration}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {consideration}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {relatedOptions.length > 0 ? (
            <section className="mt-16 border-t border-slate-100 pt-12">
              <p className="text-sm font-semibold tracking-wide text-violet-700">延伸比較</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                也看看這些工具
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {relatedOptions.map((related) => (
                  <Link
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-violet-200 hover:shadow-sm"
                    key={related.slug}
                    to="/fwks-libs/$slug"
                    params={{ slug: related.slug }}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                      <Code2 className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-slate-900">{related.name}</span>
                      <span className="mt-1 block truncate text-xs text-slate-500">
                        {related.category}・{related.language}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-violet-700"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </main>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-950">快速資料</h2>
            <dl className="mt-4 divide-y divide-slate-100">
              <FactRow label="類型" value={option.kind} />
              <FactRow label="應用領域" value={option.category} />
              <FactRow label="程式語言" value={option.language} />
            </dl>
            <Link
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
              to="/fwks-libs"
            >
              探索其他工具
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 text-sm">
      <dt className="shrink-0 text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-800">{value}</dd>
    </div>
  );
}
