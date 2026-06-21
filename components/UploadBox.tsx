"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  UploadCloud,
  X,
  ClipboardList,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function UploadBox() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const isReady = !!file || !!text.trim();

  async function analyze() {
    setLoading(true);

    try {
      const formData = new FormData();

      if (file) {
        formData.append("file", file);
      } else if (text.trim()) {
        formData.append("text", text.trim());
      } else {
        alert("Please upload a file or paste your resume text first.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to analyze resume");
      }

      localStorage.setItem("resumeResult", JSON.stringify(data));
      router.push("/result");
    } catch (error) {
      console.error("Analysis failed:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const validateAndSetFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    const fileName = selectedFile.name.toLowerCase();

    const isPdf =
      fileName.endsWith(".pdf") || selectedFile.type === "application/pdf";

    const isDocx =
      fileName.endsWith(".docx") ||
      selectedFile.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    const isTxt =
      fileName.endsWith(".txt") || selectedFile.type === "text/plain";

    const isOldDoc = fileName.endsWith(".doc");

    if (isOldDoc) {
      alert("Old .doc files are not supported. Please upload a .docx or .pdf.");
      return;
    }

    if (isPdf || isDocx || isTxt) {
      setFile(selectedFile);
      setText("");
      return;
    }

    alert("Please upload a PDF, DOCX, or TXT file.");
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <input
        ref={inputRef}
        id="file-upload"
        type="file"
        accept=".pdf,.docx,.txt"
        className="hidden"
        onChange={(e) => validateAndSetFile(e.target.files?.[0] || null)}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-[var(--ink)]">
              Resume input
            </h3>
            <p className="text-sm text-[var(--ink)]/60">
              Upload a file or paste plain resume text for ATS analysis.
            </p>
          </div>

          <div className="hidden rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1 text-xs font-medium text-[var(--ink)]/60 sm:block">
            PDF, DOCX, TXT
          </div>
        </div>

        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`rounded-3xl border-2 border-dashed p-6 text-center transition-all duration-200 md:p-8 ${dragActive
              ? "border-[var(--accent)] bg-[var(--accent-soft)]/50"
              : file
                ? "border-[var(--accent)]/30 bg-[var(--accent-soft)]/30"
                : "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--accent)]/40"
            }`}
        >
          {!file ? (
            <div className="space-y-5">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[var(--accent)] shadow-sm ring-1 ring-black/5">
                <UploadCloud className="h-6 w-6" />
              </div>

              <div className="space-y-2">
                <p className="text-base font-semibold text-[var(--ink)] md:text-lg">
                  Drag and drop your resume
                </p>
                <p className="mx-auto max-w-md text-sm leading-6 text-[var(--ink)]/60">
                  Drop your file here, or browse from your device to start the
                  ATS scan.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <label
                  htmlFor="file-upload"
                  className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent)]/90 active:scale-[0.99]"
                >
                  Choose file
                </label>

                <span className="text-xs text-[var(--ink)]/45">
                  Maximum file size: 5MB
                </span>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-lg rounded-2xl border border-[var(--line)] bg-white p-4 text-left shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <FileText className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--ink)]">
                      {file.name}
                    </p>
                    <p className="mt-1 text-xs text-[var(--ink)]/50">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to scan
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[var(--ink)]/45 transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Remove file"
                  title="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {!file && (
        <>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--line)]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]/40">
              Or paste text
            </span>
            <div className="h-px flex-1 bg-[var(--line)]" />
          </div>

          <div className="rounded-3xl border border-[var(--line)] bg-white p-4 shadow-sm md:p-5">
            <div className="mb-3 flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-[var(--accent)]" />
              <label className="text-sm font-semibold text-[var(--ink)]">
                Resume text
              </label>
            </div>

            <textarea
              className="min-h-[180px] w-full resize-none rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm leading-6 text-[var(--ink)] outline-none transition placeholder:text-[var(--ink)]/30 focus:border-[var(--accent)]/40 focus:ring-4 focus:ring-[var(--accent)]/10"
              placeholder="Paste your plain resume text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-xs text-[var(--ink)]/45">
                Best for quick testing or copied plain-text resumes.
              </p>
              <span className="text-xs text-[var(--ink)]/40">
                {text.trim().length} chars
              </span>
            </div>
          </div>
        </>
      )}

      <button
        type="button"
        onClick={analyze}
        disabled={loading || !isReady}
        className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${loading
            ? "cursor-not-allowed bg-[var(--accent)]/75 text-white"
            : !isReady
              ? "cursor-not-allowed border border-[var(--line)] bg-[var(--ink)]/5 text-[var(--ink)]/35"
              : "bg-[var(--accent)] text-white shadow-sm hover:bg-[var(--accent)]/90 active:scale-[0.99]"
          }`}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Analyzing resume...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            <span>Scan with AI ATS Checker</span>
          </>
        )}
      </button>
    </div>
  );
}