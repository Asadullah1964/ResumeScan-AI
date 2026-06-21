"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Result() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const result = localStorage.getItem("resumeResult");
    if (result) {
      try {
        const parsed = JSON.parse(result);
        setData(parsed);
        
        // Animate score ring and number
        const targetScore = parsed.score ?? 0;
        let start = 0;
        const duration = 800; // ms
        const stepTime = 16; // ~60fps
        const totalSteps = duration / stepTime;
        const increment = targetScore / totalSteps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= targetScore) {
            setAnimatedScore(targetScore);
            clearInterval(timer);
          } else {
            setAnimatedScore(Math.round(start));
          }
        }, stepTime);

        return () => clearInterval(timer);
      } catch (e) {
        console.error("Invalid result in localStorage", e);
      }
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-[var(--paper)] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white border border-[var(--line)] p-8 rounded-3xl max-w-md shadow-sm space-y-5">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--ink)]">No Analysis Found</h1>
            <p className="text-[var(--ink)]/60 text-sm mt-2">
              Please upload or paste your resume first to view the dashboard.
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-xl font-semibold transition-all duration-200"
          >
            Go to Scanner
          </button>
        </div>
      </div>
    );
  }

  const score = data.score ?? 0;
  const atsFriendly = data.atsFriendly ?? score >= 70;
  const matched = data.keywords?.matched || [];
  const missing = data.keywords?.missing || [];
  const totalKeywords = matched.length + missing.length;
  const keywordMatchRate = totalKeywords > 0 ? Math.round((matched.length / totalKeywords) * 100) : 0;

  // Circular Gauge Config
  const radius = 70;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  // Score Color Classes
  const getScoreColor = (val: number) => {
    if (val >= 80) return "text-green-600 stroke-green-600";
    if (val >= 60) return "text-amber-500 stroke-amber-500";
    return "text-red-500 stroke-red-500";
  };

  const getScoreBg = (val: number) => {
    if (val >= 80) return "bg-green-50 text-green-700 border-green-200";
    if (val >= 60) return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-red-50 text-red-700 border-red-200";
  };

  return (
    <main className="min-h-screen bg-[var(--paper)] py-12 px-4 md:px-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[var(--line)] pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--ink)] serif">
            ATS Scan Report
          </h1>
          <p className="text-[var(--ink)]/60 text-sm mt-1">
            Real-time keyword matching and generative AI resume evaluation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 border border-[var(--line)] bg-white text-[var(--ink)] rounded-xl text-sm font-medium hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.617 0-1.11-.476-1.12-1.227L6.34 18m11.318 0h-11.32m11.318 0a3 3 0 00-.73-2.25L15 12H9l-1.588 3.75a3 3 0 00-.73 2.25M9 7.5h6M9 4.5h6m3 6.75h.008v.008H18v-.008z"
              />
            </svg>
            <span>Print Report</span>
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-[var(--accent)] text-white rounded-xl text-sm font-medium hover:bg-[var(--accent)]/90 active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Scan Another</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7-7H5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Side: Score & Core Metrics */}
        <div className="md:col-span-1 space-y-6">
          {/* ATS Score Circular Card */}
          <div className="bg-white border border-[var(--line)] rounded-3xl p-6 shadow-sm text-center flex flex-col items-center justify-center space-y-5">
            <h2 className="text-md font-semibold text-[var(--ink)]/80 uppercase tracking-wider text-xs">
              ATS Score
            </h2>

            {/* SVG Progress Circle */}
            <div className="relative flex items-center justify-center">
              <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                {/* Background Ring */}
                <circle
                  stroke="#f1eedb"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                {/* Foreground Progress Ring */}
                <circle
                  className={`score-ring transition-all duration-700 ease-out ${getScoreColor(score)}`}
                  strokeDasharray={`${circumference} ${circumference}`}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
              </svg>
              {/* Central Text */}
              <div className="absolute text-center">
                <span className={`text-4xl font-extrabold tracking-tight ${getScoreColor(score)}`}>
                  {animatedScore}
                </span>
                <span className="text-[var(--ink)]/40 text-xs block -mt-1">/100</span>
              </div>
            </div>

            {/* Verdict Tag */}
            <div className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${getScoreBg(score)}`}>
              {atsFriendly ? "ATS Compatible Format" : "Requires Optimisation"}
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="bg-white border border-[var(--line)] rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-[var(--ink)]/80 border-b border-[var(--line)] pb-2">
              Resume Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-[var(--ink)]/50 text-xs font-medium">Word Count</p>
                <p className="text-xl font-bold text-[var(--ink)] mt-1">{data.wordCount ?? 0}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-[var(--ink)]/50 text-xs font-medium">Characters</p>
                <p className="text-xl font-bold text-[var(--ink)] mt-1">{data.characters ?? 0}</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-[var(--ink)]/50 text-xs font-medium">Keyword Rate</p>
                <p className="text-xl font-bold text-[var(--ink)] mt-1">{keywordMatchRate}%</p>
              </div>
              <div className="text-right text-xs text-[var(--ink)]/40">
                {matched.length} / {totalKeywords} keywords
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: AI In-depth Evaluation */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Strengths / Weaknesses / Suggestions */}
          <div className="bg-white border border-[var(--line)] rounded-3xl p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-[var(--ink)] serif border-b border-[var(--line)] pb-3">
              AI Professional Analysis
            </h2>

            {/* Strengths */}
            <div className="space-y-3">
              <h3 className="flex items-center text-sm font-bold text-green-700 gap-2 uppercase tracking-wide text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                Key Strengths
              </h3>
              {data.strengths && data.strengths.length > 0 ? (
                <ul className="space-y-2">
                  {data.strengths.map((str: string, i: number) => (
                    <li key={i} className="flex gap-2.5 items-start text-sm text-[var(--ink)]/80">
                      <span className="text-green-500 font-bold mt-0.5">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--ink)]/50 italic">No clear strengths highlighted by AI.</p>
              )}
            </div>

            {/* Weaknesses */}
            <div className="space-y-3 pt-2">
              <h3 className="flex items-center text-sm font-bold text-amber-700 gap-2 uppercase tracking-wide text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                Areas to Improve
              </h3>
              {data.weaknesses && data.weaknesses.length > 0 ? (
                <ul className="space-y-2">
                  {data.weaknesses.map((weak: string, i: number) => (
                    <li key={i} className="flex gap-2.5 items-start text-sm text-[var(--ink)]/80">
                      <span className="text-amber-500 font-bold mt-0.5">!</span>
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--ink)]/50 italic">No significant flaws flagged by AI.</p>
              )}
            </div>

            {/* Suggestions */}
            <div className="space-y-3 pt-2">
              <h3 className="flex items-center text-sm font-bold text-[var(--accent)] gap-2 uppercase tracking-wide text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096L9 21zm0 0h1m-9-6.078a7.5 7.5 0 0113.39-4.717m-11.82 2.907a7.5 7.5 0 0012.001 7.637m-15.54-2.907a9.014 9.014 0 015.541-11.018m-4.5 12.577a9.014 9.014 0 008.38 7.378" />
                </svg>
                Actionable AI Suggestions
              </h3>
              {data.suggestions && data.suggestions.length > 0 ? (
                <ul className="space-y-2">
                  {data.suggestions.map((sug: string, i: number) => (
                    <li key={i} className="flex gap-2.5 items-start text-sm text-[var(--ink)]/80">
                      <span className="text-[var(--accent)] font-bold mt-0.5">→</span>
                      <span>{sug}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--ink)]/50 italic">No suggestions provided.</p>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Keywords Section */}
      <div className="bg-white border border-[var(--line)] rounded-3xl p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-[var(--ink)] serif border-b border-[var(--line)] pb-3">
          Keyword Match Analysis
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Matched Keywords */}
          <div className="border border-green-100 bg-green-50/10 p-5 rounded-2xl space-y-3">
            <h3 className="font-bold text-green-700 text-sm flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs">✓</span>
              Matched Keywords ({matched.length})
            </h3>
            {matched.length === 0 ? (
              <p className="text-xs text-[var(--ink)]/50 italic">No keywords from the tech keyword registry were matched.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {matched.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-semibold bg-green-50 text-green-700 border border-green-200 rounded-lg shadow-sm hover:scale-105 transition-transform duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Missing Keywords */}
          <div className="border border-red-100 bg-red-50/10 p-5 rounded-2xl space-y-3">
            <h3 className="font-bold text-red-700 text-sm flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs">✗</span>
              Missing Keywords ({missing.length})
            </h3>
            {missing.length === 0 ? (
              <p className="text-xs text-[var(--ink)]/50 italic">Excellent! No missing standard keywords identified.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {missing.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-semibold bg-red-50 text-red-700 border border-red-200 rounded-lg shadow-sm hover:scale-105 transition-transform duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}