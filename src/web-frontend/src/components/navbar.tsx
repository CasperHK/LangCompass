import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Compass, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-white shadow-sm shadow-blue-900/20">
            <Compass className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-950">LangCompass</span>
        </Link>

        <div className="hidden items-center gap-4 xl:flex">
          <a
            className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            href="/#categories"
          >
            探索分類
          </a>
          <a
            className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            href="/#language-index"
          >
            語言圖鑑
          </a>
          <Link
            className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            to="/databases"
          >
            資料庫指南
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            to="/operating-systems"
          >
            作業系統
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            to="/fwks-libs"
          >
            框架與函式庫
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            to="/blog"
          >
            文章
          </Link>
          <a
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            href="/#language-index"
          >
            開始探索
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 xl:hidden"
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "關閉導覽選單" : "開啟導覽選單"}
          type="button"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-slate-100 bg-white xl:hidden" id="mobile-navigation">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            <Link
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
              to="/"
              hash="categories"
            >
              探索分類
            </Link>
            <Link
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
              to="/"
              hash="language-index"
            >
              語言圖鑑
            </Link>
            <Link
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
              to="/databases"
            >
              資料庫指南
            </Link>
            <Link
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
              to="/operating-systems"
            >
              作業系統指南
            </Link>
            <Link
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
              to="/fwks-libs"
            >
              框架與函式庫
            </Link>
            <Link
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
              to="/blog"
            >
              文章
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
