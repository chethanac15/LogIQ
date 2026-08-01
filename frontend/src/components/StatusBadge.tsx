import { formatStatusLabel } from "../utils/format";

interface StatusBadgeProps {
  label: string;
  tone: "default" | "success" | "failure" | "warning";
}

const toneClasses = {
  default: "border-slate-200 bg-slate-50 text-slate-600",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  failure: "border-red-200 bg-red-50 text-red-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
};

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]}`}
    >
      {formatStatusLabel(label)}
    </span>
  );
}
