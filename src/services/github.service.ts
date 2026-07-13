import { octokit } from "../config/github";

/**
 * Verify that the GitHub token is valid.
 */
export async function verifyGithubConnection() {
  const response = await octokit.rest.users.getAuthenticated();

  console.log("✅ GitHub Authenticated As:", response.data.login);

  return response.data.login;
}

/**
 * Get the temporary download URL for workflow logs.
 */
export async function getWorkflowLogsUrl(
  owner: string,
  repo: string,
  runId: number
) {
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs",
    {
      owner,
      repo,
      run_id: runId,
    }
  );

  return response.url;
}