export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-9">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold tracking-tight text-slate-950">LangCompass</p>
            <p className="mt-1 text-sm text-slate-500">程式語言圖鑑與導航網</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a className="transition hover:text-blue-700" href="/#categories">
              探索分類
            </a>
            <a className="transition hover:text-blue-700" href="/#language-index">
              語言圖鑑
            </a>
          </div>
        </div>
        <div className="mt-7 border-t border-slate-100 pt-5">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} LangCompass
          </p>
        </div>
      </div>
    </footer>
  )
}
