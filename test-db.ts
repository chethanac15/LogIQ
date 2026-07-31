import "dotenv/config";
import { prisma } from "./src/lib/prisma";

async function main() {
  try {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);

    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL");

    const count = await prisma.workflowAnalysis.count();
    console.log("WorkflowAnalysis rows:", count);
  } catch (error) {
    console.error("❌ Database test failed");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();