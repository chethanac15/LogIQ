import { octokit } from "../config/github";

export async function verifyGithubConnection() {
  const response = await octokit.rest.users.getAuthenticated();

  console.log("✅ GitHub Authenticated As:", response.data.login);

  return response.data.login;
}

export async function downloadWorkflowLogs(
  owner: string,
  repo: string,
  runId: number
) {
  return await octokit.request(
    "GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs",
    {
      owner,
      repo,
      run_id: runId,
    }
  );
}