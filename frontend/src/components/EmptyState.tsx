interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <div className="rounded-2xl bg-slate-100 p-3">
        <svg
          aria-hidden="true"
          className="h-6 w-6 text-slate-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 8H17M7 12H13M5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 className="mt-5 text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 max-w-md text-[15px] leading-7 text-slate-600">
        {description}
      </p>

      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
