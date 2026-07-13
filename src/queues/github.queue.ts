import { Queue } from "bullmq";

export const githubQueue = new Queue("github-workflows", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});