import type { ParsedAnalysis } from "../types/analysis";

function cleanText(value: string) {
  return value.replace(/\r\n/g, "\n").trim();
}

function readSection(content: string, heading: string) {
  const pattern = new RegExp(
    `${heading}\\s*:?\\s*([\\s\\S]*?)(?=\\n\\s*(?:Root Cause|Explanation|Suggested Fix)\\s*:|$)`,
    "i",
  );
  const match = content.match(pattern);

  return match?.[1]?.trim() ?? "";
}

export function parseAnalysis(content: string): ParsedAnalysis {
  const normalized = cleanText(content);
  const rootCause = readSection(normalized, "Root Cause");
  const explanation = readSection(normalized, "Explanation");
  const suggestedFix = readSection(normalized, "Suggested Fix");

  if (rootCause || explanation || suggestedFix) {
    return {
      rootCause: rootCause || "No explicit root cause section was returned.",
      explanation:
        explanation || "No explicit explanation section was returned.",
      suggestedFix:
        suggestedFix || "No explicit suggested fix section was returned.",
    };
  }

  const paragraphs = normalized
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const firstParagraph = paragraphs[0] ?? normalized;
  const remainingParagraphs = paragraphs.slice(1).join("\n\n");
  const fixParagraph =
    paragraphs.find((paragraph) => /fix|resolve|recommend|next step/i.test(paragraph)) ??
    paragraphs.at(-1) ??
    normalized;

  return {
    rootCause: firstParagraph,
    explanation: remainingParagraphs || firstParagraph,
    suggestedFix: fixParagraph,
  };
}
