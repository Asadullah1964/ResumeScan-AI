import { readPDF } from "./pdfReader";
import { readDOCX } from "./docReader";
import { cleanText } from "./textCleaner";
import { calculateATSScore } from "./atsScore";
import { techKeywords } from "./keywords";

export async function analyzeResume(file?: File, pastedText?: string) {
  let text = "";

  if (pastedText && pastedText.trim()) {
    text = pastedText.trim();
  }


  if (file) {
    const fileName = file.name.toLowerCase();

    if (file.type === "application/pdf" || fileName.endsWith(".pdf")) {
      const arrayBuffer = await file.arrayBuffer();
      text = await readPDF(arrayBuffer);
    } else if (fileName.endsWith(".docx")) {
      const arrayBuffer = await file.arrayBuffer();
      text = await readDOCX(arrayBuffer);
    } else if (fileName.endsWith(".txt") || file.type === "text/plain") {
      text = await file.text();
    } else if (fileName.endsWith(".doc")) {
      throw new Error(
        "Old .doc files are not supported. Please convert the file to .docx or .pdf."
      );
    } else {
      throw new Error("Unsupported file type. Please upload PDF, DOCX, or TXT.");
    }
  }

  text = cleanText(text);

  const score = calculateATSScore(text);
  const lower = text.toLowerCase();

  const matched: string[] = [];
  const missing: string[] = [];

  techKeywords.forEach((keyword) => {
    if (lower.includes(keyword.toLowerCase())) {
      matched.push(keyword);
    } else {
      missing.push(keyword);
    }
  });

  return {
    text,
    score,
    keywords: {
      matched,
      missing,
    },
    wordCount: text.split(/\s+/).filter(Boolean).length,
    characters: text.length,
  };
}