import { Worker } from "bullmq";
import {
  verifyGithubConnection,
  getWorkflowLogsUrl,
} from "../services/github.service";
import { downloadWorkflowLogs } from "../services/download.service";
import { extractWorkflowLogs } from "../services/unzip.service";
import { mergeWorkflowLogs } from "../utils/mergeLogs";
import { analyzeLogs } from "../services/ollama.service";

const worker = new Worker(
  "github-workflows",
  async (job) => {
    try {
      console.log("\n======================================");
      console.log("📦 Received Job");

      const runId = job.data.workflow_run.id;
      const owner = job.data.repository.owner.login;
      const repo = job.data.repository.name;
      const action = job.data.action;
      const status = job.data.workflow_run.status;
      const conclusion = job.data.workflow_run.conclusion;

      console.log("Run ID:", runId);
      console.log("Owner:", owner);
      console.log("Repo:", repo);
      console.log("Action:", action);
      console.log("Status:", status);
      console.log("Conclusion:", conclusion);

      // Verify GitHub authentication
      await verifyGithubConnection();

      // Only process completed workflow runs
      if (action !== "completed") {
        console.log("⏭️ Workflow not completed. Skipping.");
        console.log("======================================\n");
        return;
      }

      // Step 1: Get workflow logs URL
      console.log("\n📥 Step 1: Getting workflow logs URL...");

      const logsUrl = await getWorkflowLogsUrl(
        owner,
        repo,
        runId
      );

      console.log("✅ Logs URL received");

      // Step 2: Download workflow logs ZIP
      console.log("\n⬇️ Step 2: Downloading workflow logs...");

      const zipPath = await downloadWorkflowLogs(
        logsUrl,
        runId
      );

      console.log("✅ ZIP downloaded");
      console.log("ZIP:", zipPath);

      // Step 3: Extract ZIP
      console.log("\n📂 Step 3: Extracting ZIP...");

      const extractedPath = extractWorkflowLogs(zipPath);

      console.log("✅ ZIP extracted");
      console.log("Folder:", extractedPath);

      // Step 4: Merge logs
      console.log("\n📖 Step 4: Merging log files...");

      const mergedLogs = mergeWorkflowLogs(extractedPath);

      console.log("✅ Logs merged successfully.");
      console.log("📏 Total merged log length:", mergedLogs.length);

      console.log("\n📄 Preview (first 500 characters):");
      console.log(mergedLogs.substring(0, 500));

      // Step 5: Analyze with Ollama
      console.log("\n🤖 Step 5: Sending logs to Ollama...");

      const analysis = await analyzeLogs(mergedLogs);

      console.log("\n================ AI ANALYSIS ================\n");
      console.log(analysis);
      console.log("\n=============================================\n");

      console.log("🎉 Workflow processing completed successfully.");
      console.log("======================================\n");
    } catch (error) {
      console.error("\n======================================");
      console.error("❌ Worker failed");
      console.error(error);
      console.error("======================================\n");
    }
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  }
);

worker.on("ready", () => {
  console.log("✅ Worker is listening...");
});

worker.on("error", (err) => {
  console.error("❌ Worker Error:", err);
});