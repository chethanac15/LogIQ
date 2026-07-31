import { Request, Response } from "express";
import {
  getAllAnalyses,
  getAnalysisByRunId,
} from "../services/analysis.service";

/**
 * Convert BigInt values to strings so Express can serialize them.
 */
function serializeBigInt(data: any) {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

/**
 * GET /analysis
 */
export async function getAllAnalysis(
  req: Request,
  res: Response
) {
  try {
    const analyses = await getAllAnalyses();

    return res.status(200).json({
      success: true,
      count: analyses.length,
      data: serializeBigInt(analyses),
    });
  } catch (error) {
    console.error("❌ Error fetching analyses:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch workflow analyses.",
    });
  }
}

/**
 * GET /analysis/:runId
 */
export async function getAnalysis(
  req: Request,
  res: Response
) {
  try {
    const runId = Number(req.params.runId);

    if (isNaN(runId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Run ID.",
      });
    }

    const analysis = await getAnalysisByRunId(runId);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Workflow analysis not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: serializeBigInt(analysis),
    });
  } catch (error) {
    console.error("❌ Error fetching workflow analysis:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch workflow analysis.",
    });
  }
}