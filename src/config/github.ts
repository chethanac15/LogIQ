import "dotenv/config";
import { Octokit } from "@octokit/rest";

console.log("Token length:", process.env.GITHUB_TOKEN?.length);

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});