import { useDeferredValue, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { FilterDropdown } from "../components/FilterDropdown";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { SearchBar } from "../components/SearchBar";
import { WorkflowCard } from "../components/WorkflowCard";
import { useAnalyses } from "../hooks/useAnalyses";
import { AppLayout } from "../layout/AppLayout";
import type { WorkflowFilter, WorkflowSort } from "../types/analysis";

const filterOptions = [
  { label: "All workflows", value: "all" },
  { label: "Success", value: "success" },
  { label: "Failure", value: "failure" },
  { label: "Completed", value: "completed" },
];

const sortOptions = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
];

function Dashboard() {
  const { analyses, isLoading, error, reload } = useAnalyses();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<WorkflowFilter>("all");
  const [sort, setSort] = useState<WorkflowSort>("newest");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredAnalyses = analyses
    .filter((analysis) => {
      const matchesSearch = analysis.repository
        .toLowerCase()
        .includes(deferredSearchTerm.trim().toLowerCase());

      if (!matchesSearch) {
        return false;
      }

      if (filter === "success") {
        return analysis.conclusion === "success";
      }

      if (filter === "failure") {
        return analysis.conclusion === "failure";
      }

      if (filter === "completed") {
        return analysis.status === "completed";
      }

      return true;
    })
    .sort((left, right) => {
      const leftDate = new Date(left.createdAt).getTime();
      const rightDate = new Date(right.createdAt).getTime();

      return sort === "newest" ? rightDate - leftDate : leftDate - rightDate;
    });

  const summary = {
    total: analyses.length,
    failures: analyses.filter((analysis) => analysis.conclusion === "failure").length,
    completed: analyses.filter((analysis) => analysis.status === "completed").length,
  };

  return (
    <AppLayout
      title="Workflow Intelligence"
      description="Track GitHub Actions outcomes, scan failures across repositories, and move directly into AI-generated incident analysis."
      headerActions={
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
          <div className="flex-1">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <FilterDropdown
              label="Filter"
              value={filter}
              options={filterOptions}
              onChange={(value) => setFilter(value as WorkflowFilter)}
            />
            <FilterDropdown
              label="Sort"
              value={sort}
              options={sortOptions}
              onChange={(value) => setSort(value as WorkflowSort)}
            />
          </div>
        </div>
      }
    >
      {isLoading ? <LoadingSpinner /> : null}

      {!isLoading && error ? (
        <EmptyState
          title="Unable to load analyses"
          description="The dashboard could not reach your backend. Make sure the API is running on the configured base URL and try again."
          actionLabel="Retry"
          onAction={() => void reload()}
        />
      ) : null}

      {!isLoading && !error ? (
        <div className="space-y-6">
          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
              <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Total analyses
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                {summary.total}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
              <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Failed runs
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-red-600">
                {summary.failures}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
              <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Completed workflows
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                {summary.completed}
              </p>
            </div>
          </section>

          {analyses.length === 0 ? (
            <EmptyState
              title="No workflow analyses yet"
              description="When GitHub webhook events finish processing, analyzed workflow runs will appear here automatically."
            />
          ) : null}

          {analyses.length > 0 && filteredAnalyses.length === 0 ? (
            <EmptyState
              title="No matching workflows"
              description="Adjust the repository search or filters to broaden the current view."
            />
          ) : null}

          {filteredAnalyses.length > 0 ? (
            <section className="grid gap-5 xl:grid-cols-2">
              {filteredAnalyses.map((analysis) => (
                <WorkflowCard key={analysis.runId} workflow={analysis} />
              ))}
            </section>
          ) : null}
        </div>
      ) : null}
    </AppLayout>
  );
}

export default Dashboard;
