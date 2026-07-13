import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";

export function extractWorkflowLogs(zipPath: string) {
  try {
    const extractDir = path.join(
      process.cwd(),
      "extracted",
      path.basename(zipPath, ".zip")
    );

    if (!fs.existsSync(extractDir)) {
      fs.mkdirSync(extractDir, { recursive: true });
    }

    console.log("📂 Extracting workflow logs...");

    const zip = new AdmZip(zipPath);

    zip.extractAllTo(extractDir, true);

    console.log("✅ Logs extracted to:");
    console.log(extractDir);

    return extractDir;
  } catch (err) {
    console.error("❌ Extraction failed:");
    console.error(err);
    throw err;
  }
}