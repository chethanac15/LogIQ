import fs from "fs";
import path from "path";

export function mergeWorkflowLogs(folderPath: string): string {
  // Check if the folder exists
  if (!fs.existsSync(folderPath)) {
    throw new Error(`Folder not found: ${folderPath}`);
  }

  // Read all files in the folder
  const files = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".txt"))
    .sort();

  if (files.length === 0) {
    throw new Error("No log files found to merge.");
  }

  let mergedLogs = "";

  console.log(`📄 Found ${files.length} log files`);

  for (const file of files) {
    const filePath = path.join(folderPath, file);

    console.log(`📖 Reading: ${file}`);

    const content = fs.readFileSync(filePath, "utf-8");

    mergedLogs += `
==================================================
FILE: ${file}
==================================================

${content}

`;
  }

  console.log("✅ All log files merged successfully.");

  return mergedLogs;
}