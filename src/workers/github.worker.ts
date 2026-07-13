import { Worker } from "bullmq";
import {
  verifyGithubConnection,
  downloadWorkflowLogs,
} from "../services/github.service";

const worker = new Worker(
  "github-workflows",
  async (job) => {
    try {
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

      // Request workflow logs
      const response = await downloadWorkflowLogs(
        owner,
        repo,
        runId
      );

      console.log("HTTP Status:", response.status);
      console.log("Redirect URL:", response.headers.location);

    } catch (error) {
      console.error("❌ Worker failed:");
      console.error(error);
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