import { Queue } from "bullmq";

export const githubQueue = new Queue("github-workflows", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});