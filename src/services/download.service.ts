import axios from "axios";
import fs from "fs";
import path from "path";

export async function downloadWorkflowLogs(
  logsUrl: string,
  runId: number
): Promise<string> {
  try {
    const downloadsDir = path.join(process.cwd(), "downloads");

    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }

    const zipPath = path.join(downloadsDir, `${runId}.zip`);

    const response = await axios.get(logsUrl, {
      responseType: "arraybuffer",
      maxRedirects: 5,
    });

    fs.writeFileSync(zipPath, response.data);

    return zipPath;
  } catch (error) {
    console.error("❌ Failed to download workflow logs");
    throw error;
  }
}