import axios from "axios";

export async function analyzeLogs(logs: string): Promise<string> {
  const prompt = `
You are a senior DevOps engineer.

Analyze the following GitHub Actions workflow logs.

Provide:

1. Root Cause
2. Explanation
3. Suggested Fix

Logs:

${logs}
`;

  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "llama3.2:latest",
      prompt,
      stream: false,
    }
  );

  return response.data.response;
}