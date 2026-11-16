import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-9">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold tracking-tight text-slate-950">LangCompass</p>
            <p className="mt-1 text-sm text-slate-500">程式語言圖鑑與導航網</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
            <a className="transition hover:text-blue-700" href="/#categories">
              探索分類
            </a>
            <a className="transition hover:text-blue-700" href="/#language-index">
              語言圖鑑
            </a>
            <Link className="transition hover:text-blue-700" to="/databases">
              資料庫指南
            </Link>
            <Link className="transition hover:text-blue-700" to="/fwks-libs">
              框架與函式庫
            </Link>
          </div>
        </div>
        <div className="mt-7 border-t border-slate-100 pt-5">
          <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} LangCompass</p>
        </div>
      </div>
    </footer>
  );
}
