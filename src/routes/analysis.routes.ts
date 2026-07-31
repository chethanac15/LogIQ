import { Router } from "express";
import {
  getAllAnalysis,
  getAnalysis,
} from "../controllers/analysis.controller";

const router = Router();

/**
 * GET /analysis
 * Get all workflow analyses
 */
router.get("/", getAllAnalysis);

/**
 * GET /analysis/:runId
 * Get a workflow analysis by GitHub Run ID
 */
router.get("/:runId", getAnalysis);

export default router;