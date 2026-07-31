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
    console.log("📡 Connecting to PostgreSQL...");

    await prisma.$connect();

    console.log("✅ Connected to PostgreSQL");

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

    console.log("✅ Analysis saved to PostgreSQL");

    return savedAnalysis;
  } catch (error) {
    console.error("❌ Error inside analysis.service");
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log("🔌 Prisma disconnected");
  }
}