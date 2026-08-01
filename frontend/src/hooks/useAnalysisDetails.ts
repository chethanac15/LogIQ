import { useEffect, useState } from "react";
import { fetchAnalysisByRunId } from "../api/analysis";
import type { WorkflowAnalysis } from "../types/analysis";

export function useAnalysisDetails(runId: string | undefined) {
  const [analysis, setAnalysis] = useState<WorkflowAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnalysis = async () => {
    if (!runId) {
      setError("Workflow run ID is missing.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchAnalysisByRunId(runId);
      setAnalysis(data);
    } catch {
      setError("Unable to load this workflow analysis.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const initializeAnalysis = async () => {
      if (!runId) {
        if (!isCancelled) {
          setError("Workflow run ID is missing.");
          setIsLoading(false);
        }
        return;
      }

      try {
        const data = await fetchAnalysisByRunId(runId);

        if (!isCancelled) {
          setAnalysis(data);
          setError(null);
        }
      } catch {
        if (!isCancelled) {
          setError("Unable to load this workflow analysis.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void initializeAnalysis();

    return () => {
      isCancelled = true;
    };
  }, [runId]);

  return {
    analysis,
    isLoading,
    error,
    reload: loadAnalysis,
  };
}
