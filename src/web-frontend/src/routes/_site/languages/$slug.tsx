import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Compass,
  Cpu,
  ExternalLink,
  Layers3,
  Lightbulb,
  Terminal,
} from "lucide-react";
import { LanguageArtwork } from "@/components/language-artwork";
import { getLanguageBySlug, languages } from "@/lib/languages";

export const Route = createFileRoute("/_site/languages/$slug")({
  component: LanguageDetailPage,
});

function LanguageDetailPage() {
  const { slug } = Route.useParams();
  const language = getLanguageBySlug(slug);

  if (!language) {
    return (
      <div className="px-6 py-24 text-center">
        <p className="text-sm font-semibold text-blue-700">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">找不到這門語言</h1>
        <p className="mt-3 text-slate-600">試試從語言圖鑑選擇其他項目。</p>
        <Link
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          to="/"
          hash="language-index"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          回到語言圖鑑
        </Link>
      </div>
    );
  }

  const relatedLanguages = language.related
    .map((relatedSlug) => languages.find((entry) => entry.slug === relatedSlug))
    .filter((entry) => entry !== undefined);

  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white px-6 pb-14 pt-8 sm:pb-20">
        <LanguageArtwork slug={language.slug} category={language.category} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <nav aria-label="麵包屑" className="flex items-center gap-2 text-sm text-slate-500">
            <Link className="transition hover:text-blue-700" to="/" hash="language-index">
              語言圖鑑
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-slate-800">
              {language.name}
            </span>
          </nav>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl font-mono text-sm font-bold ${language.color}`}
                >
                  {language.mark}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                  {language.category}
                </span>
              </div>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                {language.name}
              </h1>
              <p className="mt-4 max-w-2xl text-xl font-medium leading-8 text-slate-700">
                {language.tagline}
              </p>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">{language.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  to="/"
                  hash="language-index"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  回到語言圖鑑
                </Link>
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href="#overview"
                >
                  了解語言特色
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-800 transition hover:border-blue-300 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href={language.officialSite}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  官方網站
                </a>
              </div>
            </div>

            <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-slate-950 p-5 shadow-[0_32px_80px_-36px_rgba(15,23,42,0.5)] sm:p-7">
              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="font-mono text-xs text-slate-300">
                    {language.example
                      ? `hello.${language.slug}`
                      : language.category === "晶片設計"
                        ? "hardware-design"
                        : language.slug}
                  </span>
                </div>
                {language.example ? (
                  <pre className="min-h-52 overflow-x-auto py-7 font-mono text-sm leading-7 text-slate-100">
                    <code>{language.example}</code>
                  </pre>
                ) : (
                  <div className="flex min-h-52 flex-col justify-center py-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                      {language.category === "晶片設計" ? (
                        <Cpu className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Code2 className="h-6 w-6" aria-hidden="true" />
                      )}
                    </div>
                    <p className="mt-5 text-lg font-semibold text-white">
                      {language.category === "晶片設計" ? "以型別描述電路" : "語言設計重點"}
                    </p>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-300">
                      {language.category === "晶片設計"
                        ? "硬體描述語言用來表達電路結構、資料寬度與時脈行為，再交由硬體工具鏈實作。"
                        : language.description}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-slate-300">
                  <Code2 className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                  {language.example
                    ? "簡短語法示例"
                    : language.category === "晶片設計"
                      ? "硬體設計語言"
                      : language.category}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16 lg:py-20">
        <main className="min-w-0">
          <section className="scroll-mt-24" id="overview">
            <p className="text-sm font-semibold tracking-wide text-blue-700">語言概覽</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              認識 {language.name}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{language.overview}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <FactCard icon={Layers3} label="程式典範" value={language.paradigm} />
              <FactCard icon={Check} label="型別系統" value={language.typeSystem} />
              <FactCard icon={Terminal} label="執行方式" value={language.runtime} />
            </div>
          </section>

          <section className="mt-16 border-t border-slate-100 pt-12">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Compass className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-wide text-blue-700">應用方向</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  {language.name} 適合用在哪裡？
                </h2>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {language.useCases.map((useCase, index) => (
                <div
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                  key={useCase}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 font-mono text-xs font-semibold text-slate-500">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700">{useCase}</span>
                </div>
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
                {language.strengths.map((strength) => (
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
                <h2 className="text-xl font-semibold text-slate-950">導入前先了解</h2>
              </div>
              <ul className="mt-5 space-y-4">
                {language.considerations.map((consideration) => (
                  <li className="flex gap-3 text-sm leading-6 text-slate-600" key={consideration}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {consideration}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-16 border-t border-slate-100 pt-12">
            <p className="text-sm font-semibold tracking-wide text-blue-700">工具與生態</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              常見的 {language.name} 工具
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              以下是常見的相關工具與技術，實際選擇仍可依專案需求調整。
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {language.ecosystem.map((tool) => (
                <span
                  className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-700"
                  key={tool}
                >
                  {tool}
                </span>
              ))}
            </div>
          </section>
        </main>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-950">快速資料</h2>
            <dl className="mt-4 divide-y divide-slate-100">
              <FactRow label="領域" value={language.category} />
              <FactRow label="程式典範" value={language.paradigm} />
              <FactRow label="型別系統" value={language.typeSystem} />
              <FactRow label="執行方式" value={language.runtime} />
            </dl>
            <Link
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              to="/"
              hash="language-index"
            >
              探索其他語言
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>

      {relatedLanguages.length > 0 ? (
        <section className="border-t border-slate-100 bg-slate-50 px-6 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold tracking-wide text-blue-700">繼續探索</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              也看看這些語言
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedLanguages.map((related) => (
                <Link
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
                  key={related.slug}
                  to="/languages/$slug"
                  params={{ slug: related.slug }}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold ${related.color}`}
                  >
                    {related.mark}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-slate-900">{related.name}</span>
                    <span className="mt-1 block truncate text-xs text-slate-500">
                      {related.category}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function FactCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Layers3;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
      <Icon className="h-4 w-4 text-blue-700" aria-hidden="true" />
      <p className="mt-3 text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
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
