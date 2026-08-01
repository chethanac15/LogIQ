import { Link } from "react-router-dom";
import type { WorkflowAnalysis } from "../types/analysis";
import { formatDateTime } from "../utils/format";
import { StatusBadge } from "./StatusBadge";

interface WorkflowCardProps {
  workflow: WorkflowAnalysis;
}

function getConclusionTone(conclusion: string) {
  if (conclusion === "success") {
    return "success";
  }

  if (conclusion === "failure") {
    return "failure";
  }

  return "warning";
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 transition hover:border-slate-300">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-slate-500">
            {workflow.owner}
          </p>
          <h3 className="text-lg font-semibold text-slate-900">
            {workflow.repository}
          </h3>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <StatusBadge label={workflow.status} tone="default" />
          <StatusBadge
            label={workflow.conclusion}
            tone={getConclusionTone(workflow.conclusion)}
          />
        </div>
      </div>

      <dl className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
        <div>
          <dt className="text-[13px] font-medium text-slate-500">Run ID</dt>
          <dd className="mt-1 font-medium text-slate-900">{workflow.runId}</dd>
        </div>

        <div>
          <dt className="text-[13px] font-medium text-slate-500">Created</dt>
          <dd className="mt-1 font-medium text-slate-900">
            {formatDateTime(workflow.createdAt)}
          </dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <Link
          to={`/analysis/${workflow.runId}`}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
