import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Database, ExternalLink, Lightbulb } from "lucide-react";
import { databases } from "@/lib/technology-guides";

export const Route = createFileRoute("/_site/databases/$slug")({
  component: DatabaseDetailPage,
});

function DatabaseDetailPage() {
  const { slug } = Route.useParams();
  const database = databases.find((entry) => entry.slug === slug);

  if (!database) {
    return (
      <div className="px-6 py-24 text-center">
        <p className="text-sm font-semibold text-blue-700">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">找不到這個資料庫</h1>
        <p className="mt-3 text-slate-600">回到資料庫圖鑑，依需求探索其他選項。</p>
        <Link
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          to="/databases"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          回到資料庫圖鑑
        </Link>
      </div>
    );
  }

  const relatedDatabases = databases
    .filter(
      (entry) =>
        entry.slug !== database.slug && entry.needs.some((need) => database.needs.includes(need))
    )
    .sort((left, right) => {
      const leftMatches = left.needs.filter((need) => database.needs.includes(need)).length;
      const rightMatches = right.needs.filter((need) => database.needs.includes(need)).length;
      return rightMatches - leftMatches || left.name.localeCompare(right.name);
    })
    .slice(0, 3);

  return (
    <div className="bg-white">
      <section className="border-b border-slate-100 bg-gradient-to-b from-blue-50/70 to-white px-6 pb-14 pt-8 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="麵包屑" className="flex items-center gap-2 text-sm text-slate-500">
            <Link className="transition hover:text-blue-700" to="/databases">
              資料庫圖鑑
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-slate-800">
              {database.name}
            </span>
          </nav>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold text-blue-800">
                  {database.model}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                  {database.hosting}
                </span>
              </div>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                {database.name}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{database.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  to="/databases"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  回到資料庫圖鑑
                </Link>
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-800 transition hover:border-blue-300 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href={database.officialSite}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  官方網站
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.75rem] border border-blue-100 bg-gradient-to-br from-white via-blue-50/80 to-cyan-50 p-5 shadow-[0_32px_80px_-36px_rgba(15,23,42,0.22)] sm:p-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border-[24px] border-blue-100/50"
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-sm shadow-blue-900/20">
                    <Database className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-blue-700">
                      資料庫選型路徑
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-600">
                      從需求確認這項工具的定位
                    </p>
                  </div>
                </div>

                <div className="relative mt-6 space-y-3 before:absolute before:bottom-7 before:left-[17px] before:top-7 before:w-px before:bg-blue-200">
                  {[
                    { label: "資料模型", value: database.model },
                    { label: "優先需求", value: database.needs.join("、") },
                    { label: "部署方式", value: database.hosting },
                  ].map((step, index) => (
                    <div className="relative flex items-center gap-3" key={step.label}>
                      <span className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-white text-xs font-semibold text-blue-800">
                        0{index + 1}
                      </span>
                      <div className="min-w-0 flex-1 rounded-xl border border-white/80 bg-white/90 px-4 py-3 shadow-sm">
                        <p className="text-xs font-medium text-slate-500">{step.label}</p>
                        <p className="mt-1 text-sm font-semibold leading-5 text-slate-900">
                          {step.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200/70 bg-amber-50/80 p-4">
                  <Lightbulb
                    className="mt-0.5 h-4 w-4 shrink-0 text-amber-700"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold text-amber-900">導入前先確認</p>
                    <p className="mt-1 text-sm leading-5 text-slate-700">
                      {database.considerations[0]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16 lg:py-20">
        <main className="min-w-0">
          <section>
            <p className="text-sm font-semibold tracking-wide text-blue-700">資料庫概覽</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {database.name} 適合用在哪裡？
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{database.bestFor}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {database.needs.map((need) => (
                <span
                  className="rounded-full border border-blue-100 bg-blue-50/70 px-3.5 py-2 text-sm font-medium text-blue-800"
                  key={need}
                >
                  {need}
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
                {database.strengths.map((strength) => (
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
                {database.considerations.map((consideration) => (
                  <li className="flex gap-3 text-sm leading-6 text-slate-600" key={consideration}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {consideration}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {relatedDatabases.length > 0 ? (
            <section className="mt-16 border-t border-slate-100 pt-12">
              <p className="text-sm font-semibold tracking-wide text-blue-700">延伸比較</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                也看看這些資料庫
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {relatedDatabases.map((related) => (
                  <Link
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
                    key={related.slug}
                    to="/databases/$slug"
                    params={{ slug: related.slug }}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Database className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-slate-900">{related.name}</span>
                      <span className="mt-1 block truncate text-xs text-slate-500">
                        {related.model}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
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
              <FactRow label="資料模型" value={database.model} />
              <FactRow label="部署方式" value={database.hosting} />
              <FactRow label="適用需求" value={database.needs.join("、")} />
            </dl>
            <Link
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              to="/databases"
            >
              比較其他資料庫
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
