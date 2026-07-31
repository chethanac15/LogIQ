-- CreateTable
CREATE TABLE "WorkflowAnalysis" (
    "id" SERIAL NOT NULL,
    "runId" BIGINT NOT NULL,
    "owner" TEXT NOT NULL,
    "repository" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "conclusion" TEXT NOT NULL,
    "analysis" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkflowAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowAnalysis_runId_key" ON "WorkflowAnalysis"("runId");
