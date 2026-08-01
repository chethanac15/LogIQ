import { useEffect, useState } from "react";
import { fetchAnalyses } from "../api/analysis";
import type { WorkflowAnalysis } from "../types/analysis";

export function useAnalyses() {
  const [analyses, setAnalyses] = useState<WorkflowAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnalyses = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchAnalyses();
      setAnalyses(data);
    } catch {
      setError("Unable to load workflow analyses right now.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const initializeAnalyses = async () => {
      try {
        const data = await fetchAnalyses();

        if (!isCancelled) {
          setAnalyses(data);
          setError(null);
        }
      } catch {
        if (!isCancelled) {
          setError("Unable to load workflow analyses right now.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void initializeAnalyses();

    return () => {
      isCancelled = true;
    };
  }, []);

  return {
    analyses,
    isLoading,
    error,
    reload: loadAnalyses,
  };
}
