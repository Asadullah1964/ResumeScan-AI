import UploadBox from "../components/UploadBox";
import {
  ShieldCheck,
  Sparkles,
  ScanSearch,
  BadgeCheck,
  FileBadge,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* Top bar */}
      <header className="border-b border-[var(--line)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-sm">
              <ScanSearch className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold leading-none text-[var(--ink)]">
                ResumeScan AI
              </p>

              <p className="mt-1 text-xs text-[var(--ink)]/50">
                ATS resume checker
              </p>
            </div>
          </div>


          <div className="flex items-center gap-2">

            <a
              href=""
              className="rounded-full bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[var(--accent)]/90 md:px-4"
            >
              Made for Digital Heroes
            </a>


            <div className="hidden items-center gap-3 md:flex">

              <div className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-xs font-medium text-[var(--ink)]/55">
                PDF, DOCX, TXT supported
              </div>


              <div className="rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)]">
                Instant AI feedback
              </div>

            </div>

          </div>

        </div>
      </header>

      {/* Hero + workspace */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          {/* Left content */}
          <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/15 bg-[var(--accent-soft)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
              Professional ATS Analysis
            </div>

            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold tracking-tight text-[var(--ink)] md:text-4xl">
                Improve your resume before recruiters see it
              </h1>
              <p className="mt-4 text-sm leading-7 text-[var(--ink)]/65 md:text-base">
                Upload your resume and get a structured ATS review with keyword
                matching, formatting checks, and AI suggestions to strengthen
                clarity, impact, and role relevance.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--ink)]/45">
                  Scan quality
                </p>
                <p className="mt-2 text-lg font-semibold text-[var(--ink)]">
                  ATS-focused
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--ink)]/55">
                  Built for resume parsing and recruiter readability.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--ink)]/45">
                  Output
                </p>
                <p className="mt-2 text-lg font-semibold text-[var(--ink)]">
                  Instant review
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--ink)]/55">
                  See issues, strengths, and missing signals quickly.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--ink)]/45">
                  Privacy
                </p>
                <p className="mt-2 text-lg font-semibold text-[var(--ink)]">
                  Secure flow
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--ink)]/55">
                  Resume content is processed only for analysis.
                </p>
              </div>
            </div>
          </div>

          {/* Right trust panel */}
          <aside className="flex flex-col gap-4">
            <div className="rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(247,250,249,1))] p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <BadgeCheck className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-[var(--ink)]">
                What the scan checks
              </h2>

              <div className="mt-4 space-y-3">
                {[
                  "Resume formatting and ATS readability",
                  "Missing keywords for technical roles",
                  "Weak bullet points and vague phrasing",
                  "Impact language and measurable achievements",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
                  >
                    <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                    <p className="text-sm leading-6 text-[var(--ink)]/70">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--ink)]">
                    Secure and private
                  </p>
                  <p className="text-xs text-[var(--ink)]/55">
                    Built for safe resume review workflows
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-[var(--ink)]/65">
                Your uploaded file or pasted text is used only for ATS analysis
                and feedback generation during the active session.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Upload area */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-6 md:pb-10">
        <div className="rounded-[32px] border border-[var(--line)] bg-white p-5 shadow-sm md:p-8">
          <div className="mb-6 flex flex-col gap-3 border-b border-[var(--line)] pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                Resume workspace
              </p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">
                Upload and scan
              </h2>
              <p className="mt-1 text-sm text-[var(--ink)]/60">
                Choose a resume file or paste plain text to generate your ATS
                evaluation.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["PDF", "DOCX", "TXT", "AI Review"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1 text-xs font-medium text-[var(--ink)]/60"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <UploadBox />
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-12 md:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <FileBadge className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-base font-semibold text-[var(--ink)]">
              Keyword matching
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--ink)]/62">
              Compare resume content against high-value skills and identify
              missing technical keywords.
            </p>
          </div>

          <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-base font-semibold text-[var(--ink)]">
              AI critique
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--ink)]/62">
              Get actionable guidance on bullet quality, impact metrics,
              formatting, and phrasing strength.
            </p>
          </div>

          <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-base font-semibold text-[var(--ink)]">
              Private analysis
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--ink)]/62">
              A cleaner and more trustworthy experience for users who want fast
              review without clutter.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}