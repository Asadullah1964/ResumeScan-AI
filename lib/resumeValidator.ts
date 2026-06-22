// lib/resumeValidator.ts

const resumeKeywords = [
  "education",
  "experience",
  "skills",
  "projects",
  "work experience",
  "summary",
  "objective",
  "certification",
  "technical skills",
  "internship",
  "developer",
  "engineer",
  "college",
  "university",
  "github",
  "linkedin",
];

export function validateResume(text: string) {
  const lower = text.toLowerCase();

  let score = 0;

  resumeKeywords.forEach((keyword) => {
    if (lower.includes(keyword)) {
      score++;
    }
  });


  // minimum resume indicators
  const isResume = score >= 3;


  return {
    isResume,
    confidence: score,
  };
}