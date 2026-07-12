import { Worker } from "bullmq";

const worker = new Worker(
  "github-workflows",
  async (job) => {
    console.log("📦 Received Job");
    console.log(job.data);
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);

worker.on("ready", () => {
  console.log(" Worker is listening...");
});

worker.on("error", (err) => {
  console.error(" Worker Error:", err);
});