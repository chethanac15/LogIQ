import type { ReactNode } from "react";

interface NavbarProps {
  title: string;
  description: string;
  onMenuClick: () => void;
  actions?: ReactNode;
}

export function Navbar({
  title,
  description,
  onMenuClick,
  actions,
}: NavbarProps) {
  return (
    <header className="border-b border-slate-200 bg-slate-50/80 px-4 py-5 backdrop-blur-sm sm:px-6 lg:px-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              className="mt-1 rounded-xl border border-slate-200 bg-white p-2 text-slate-600 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 5H17M3 10H17M3 15H12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Overview
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-[36px]">
                {title}
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-7 text-slate-600">
                {description}
              </p>
            </div>
          </div>
        </div>

        {actions ? <div>{actions}</div> : null}
      </div>
    </header>
  );
}
