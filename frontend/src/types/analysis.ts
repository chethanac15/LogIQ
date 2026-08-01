export interface WorkflowAnalysis {
  id: number;
  runId: string;
  owner: string;
  repository: string;
  status: string;
  conclusion: string;
  analysis: string;
  createdAt: string;
}

export interface ApiCollectionResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

export interface ApiItemResponse<T> {
  success: boolean;
  data: T;
}

export type WorkflowFilter = "all" | "success" | "failure" | "completed";
export type WorkflowSort = "newest" | "oldest";

export interface ParsedAnalysis {
  rootCause: string;
  explanation: string;
  suggestedFix: string;
}
