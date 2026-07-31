import { prisma } from "../lib/prisma";

export async function saveWorkflowAnalysis(
  runId: number,
  owner: string,
  repository: string,
  status: string,
  conclusion: string,
  analysis: string
) {
  try {
    const savedAnalysis = await prisma.workflowAnalysis.create({
      data: {
        runId: BigInt(runId),
        owner,
        repository,
        status,
        conclusion,
        analysis,
      },
    });

    console.log("✅ Workflow analysis saved to PostgreSQL.");

    return savedAnalysis;
  } catch (error) {
    console.error("❌ Error saving workflow analysis:");
    console.error(error);
    throw error;
  }
}

export async function getAllAnalyses() {
  try {
    const analyses = await prisma.workflowAnalysis.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return analyses;
  } catch (error) {
    console.error("❌ Error fetching workflow analyses:");
    console.error(error);
    throw error;
  }
}

export async function getAnalysisByRunId(runId: number) {
  try {
    const analysis = await prisma.workflowAnalysis.findUnique({
      where: {
        runId: BigInt(runId),
      },
    });

    return analysis;
  } catch (error) {
    console.error("❌ Error fetching workflow analysis:");
    console.error(error);
    throw error;
  }
}