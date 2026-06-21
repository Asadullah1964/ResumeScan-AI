// app/api/analyze/route.ts
import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { analyzeResume } from "@/lib/resumeAnalyzer";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function cleanJsonResponse(content: string) {
  let cleaned = content.trim();

  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json/, "");
  }

  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```/, "");
  }

  if (cleaned.endsWith("```")) {
    cleaned = cleaned.replace(/```$/, "");
  }

  return JSON.parse(cleaned.trim());
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const file = form.get("file") as File | null;
    const text = form.get("text") as string | null;

    if (!file && !text?.trim()) {
      return NextResponse.json(
        { error: "No resume file or text provided" },
        { status: 400 }
      );
    }

    const localAnalysis = await analyzeResume(
      file || undefined,
      text || undefined
    );

    const resumeText = localAnalysis.text;

    if (!resumeText.trim()) {
      return NextResponse.json(
        { error: "No resume content found" },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are an ATS resume expert.
Analyze the resume.
Return ONLY JSON.

Format:
{
  "score": number,
  "atsFriendly": boolean,
  "strengths": string[],
  "weaknesses": string[],
  "missingKeywords": string[],
  "suggestions": string[]
}

Score between 0 and 100.
Check ATS compatibility, skills, keywords, projects, experience, and formatting.
`,
        },
        {
          role: "user",
          content: resumeText,
        },
      ],
      response_format: { type: "json_object" },
    });

    const aiText = completion.choices[0]?.message?.content || "{}";
    const result = cleanJsonResponse(aiText);

    const aiScore =
      typeof result.score === "number" ? result.score : localAnalysis.score;

    const mergedResult = {
      score: aiScore,
      atsFriendly:
        typeof result.atsFriendly === "boolean"
          ? result.atsFriendly
          : aiScore >= 70,
      strengths: Array.isArray(result.strengths) ? result.strengths : [],
      weaknesses: Array.isArray(result.weaknesses) ? result.weaknesses : [],
      suggestions: Array.isArray(result.suggestions) ? result.suggestions : [],
      keywords: {
        matched: localAnalysis.keywords.matched,
        missing: Array.isArray(result.missingKeywords)
          ? result.missingKeywords
          : localAnalysis.keywords.missing,
      },
      wordCount: localAnalysis.wordCount,
      characters: localAnalysis.characters,
      text: localAnalysis.text,
    };

    return NextResponse.json(mergedResult);
  } catch (error) {
    console.error("FULL ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      }
    );
  }
}