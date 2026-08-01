import { Link, useParams } from "react-router-dom";
import { AnalysisSection } from "../components/AnalysisSection";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { StatusBadge } from "../components/StatusBadge";
import { useAnalysisDetails } from "../hooks/useAnalysisDetails";
import { AppLayout } from "../layout/AppLayout";
import { parseAnalysis } from "../utils/analysis";
import { formatDateTime } from "../utils/format";

function getConclusionTone(conclusion: string) {
  if (conclusion === "success") {
    return "success";
  }

  if (conclusion === "failure") {
    return "failure";
  }

  return "warning";
}

function WorkflowDetails() {
  const { runId } = useParams();
  const { analysis, isLoading, error, reload } = useAnalysisDetails(runId);
  const parsedAnalysis = analysis ? parseAnalysis(analysis.analysis) : null;

  return (
    <AppLayout
      title="Workflow Details"
      description="Inspect the full workflow run metadata, read the AI-generated analysis, and review a structured root-cause summary."
      headerActions={
        <div>
          <Link
            to="/"
            className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Back to Dashboard
          </Link>
        </div>
      }
    >
      {isLoading ? <LoadingSpinner /> : null}

      {!isLoading && error ? (
        <EmptyState
          title="Unable to load workflow details"
          description="This run could not be fetched from the backend. Confirm that the run ID exists and the API is available."
          actionLabel="Retry"
          onAction={() => void reload()}
        />
      ) : null}

      {!isLoading && analysis && parsedAnalysis ? (
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-slate-500">
                  {analysis.owner}
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  {analysis.repository}
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-slate-600">
                  Run ID <span className="font-semibold text-slate-900">{analysis.runId}</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <StatusBadge label={analysis.status} tone="default" />
                <StatusBadge
                  label={analysis.conclusion}
                  tone={getConclusionTone(analysis.conclusion)}
                />
              </div>
            </div>

            <dl className="mt-8 grid gap-5 border-t border-slate-100 pt-6 text-sm sm:grid-cols-2 xl:grid-cols-3">
              <div>
                <dt className="text-[13px] font-medium text-slate-500">Repository</dt>
                <dd className="mt-1 text-[15px] font-medium text-slate-900">
                  {analysis.repository}
                </dd>
              </div>
              <div>
                <dt className="text-[13px] font-medium text-slate-500">Owner</dt>
                <dd className="mt-1 text-[15px] font-medium text-slate-900">
                  {analysis.owner}
                </dd>
              </div>
              <div>
                <dt className="text-[13px] font-medium text-slate-500">Created time</dt>
                <dd className="mt-1 text-[15px] font-medium text-slate-900">
                  {formatDateTime(analysis.createdAt)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
            <h2 className="text-2xl font-semibold text-slate-900">AI Analysis</h2>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="whitespace-pre-wrap text-[15px] leading-8 text-slate-700">
                {analysis.analysis}
              </p>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-3">
            <AnalysisSection title="Root Cause" content={parsedAnalysis.rootCause} />
            <AnalysisSection
              title="Explanation"
              content={parsedAnalysis.explanation}
            />
            <AnalysisSection
              title="Suggested Fix"
              content={parsedAnalysis.suggestedFix}
            />
          </section>
        </div>
      ) : null}
    </AppLayout>
  );
}

export default WorkflowDetails;
