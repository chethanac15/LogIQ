import { apiClient } from "./client";
import type {
  ApiCollectionResponse,
  ApiItemResponse,
  WorkflowAnalysis,
} from "../types/analysis";

export async function fetchAnalyses() {
  const { data } = await apiClient.get<ApiCollectionResponse<WorkflowAnalysis>>(
    "/analysis",
  );

  return data.data;
}

export async function fetchAnalysisByRunId(runId: string) {
  const { data } = await apiClient.get<ApiItemResponse<WorkflowAnalysis>>(
    `/analysis/${runId}`,
  );

  return data.data;
}
