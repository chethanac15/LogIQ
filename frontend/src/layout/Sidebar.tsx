import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { label: "Dashboard", to: "/" },
  { label: "Repositories", to: "/" },
  { label: "Settings", to: "/" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/30 transition lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 transition lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              LogIQ
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Failure Analyzer
            </h1>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 p-2 text-slate-500 lg:hidden"
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-slate-500">
            Monitoring
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Review workflow failures, inspect AI findings, and move from noisy
            logs to a clear root cause faster.
          </p>
        </div>
      </aside>
    </>
  );
}
