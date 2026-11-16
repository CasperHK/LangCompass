import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  const isAdminRoute = useRouterState({
    select: (state) => state.location.pathname.startsWith("/admin"),
  });

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 320);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!visible) return null;

  function scrollToTop() {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    window.scrollTo({ top: 0, behavior });
  }

  return (
    <button
      aria-label="回到頁面頂端"
      className={`group fixed ${isAdminRoute ? "bottom-24" : "bottom-6"} right-6 z-40 flex h-12 w-12 animate-[scroll-top-enter_420ms_cubic-bezier(0.16,1,0.3,1)_both] items-center justify-center overflow-hidden border border-blue-300/50 bg-slate-950 text-white shadow-[0_12px_30px_-10px_rgba(15,23,42,0.65)] transition-[background-color,border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-700 hover:shadow-[0_18px_38px_-12px_rgba(37,99,235,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 active:translate-y-0 motion-reduce:animate-none motion-reduce:transition-none`}
      onClick={scrollToTop}
      title="回到頁面頂端"
      type="button"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-1 border border-white/15 transition-colors duration-300 group-hover:border-white/35"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full origin-bottom scale-y-0 bg-blue-600 transition-transform duration-300 ease-out group-hover:scale-y-100 motion-reduce:transition-none"
      />
      <span className="relative h-5 w-5 overflow-hidden">
        <ArrowUp
          aria-hidden="true"
          className="absolute inset-0 transition-transform duration-300 ease-out group-hover:-translate-y-full motion-reduce:transition-none"
        />
        <ArrowUp
          aria-hidden="true"
          className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 motion-reduce:transition-none"
        />
      </span>
    </button>
  );
}
