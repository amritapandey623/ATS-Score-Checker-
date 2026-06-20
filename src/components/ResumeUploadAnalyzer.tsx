"use client";

import { useMemo, useState } from "react";
import { AlertCircle, FileUp, Loader2, Target, UploadCloud } from "lucide-react";
import { analyzeResumeText, roles, type Role } from "@/lib/resumeEnhancer";
import { extractResumeText } from "@/lib/fileTextExtraction";

const sampleResume = `Amrita Pandey
Frontend Developer Intern
amritapandey3210@gmail.com

Education
Bachelor of Computer Applications

Skills
React, JavaScript, TypeScript, HTML, CSS, Tailwind CSS, Git

Projects
- Developed a responsive React portfolio website with reusable UI components.
- Implemented a resume bullet enhancer using TypeScript and rule-based ATS scoring.
- Improved page clarity and mobile usability across multiple screen sizes.`;

export function ResumeUploadAnalyzer() {
  const [resumeText, setResumeText] = useState(sampleResume);
  const [fileName, setFileName] = useState("sample-resume.txt");
  const [role, setRole] = useState<Role>("Frontend Developer");
  const [status, setStatus] = useState("");
  const [isReading, setIsReading] = useState(false);

  const analysis = useMemo(() => analyzeResumeText(resumeText, role), [resumeText, role]);

  const handleFile = async (file: File | undefined) => {
    if (!file) {
      return;
    }

    setIsReading(true);
    setStatus("");
    setFileName(file.name);

    try {
      const text = await extractResumeText(file);
      setResumeText(text);
      setStatus(`Uploaded ${file.name} and analyzed the extracted resume text.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not read this resume file. Paste the text instead.");
    } finally {
      setIsReading(false);
    }
  };

  return (
    <section id="resume-check" className="border-b border-ink/10 px-5 py-16 dark:border-white/10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-normal text-coral dark:text-mint">Resume Upload</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">Check your full resume ATS score</h2>
          <p className="mt-3 text-base leading-7 text-ink/68 dark:text-white/68">
            Upload a resume file or paste the text to get a role-specific ATS score, missing sections, keyword matches,
            and improvement suggestions.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-panel rounded-lg p-5 sm:p-6">
            <label
              htmlFor="resume-file"
              className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-ink/20 bg-white/45 p-6 text-center transition hover:border-coral hover:bg-white/70 dark:border-white/15 dark:bg-white/[0.05] dark:hover:border-mint dark:hover:bg-white/[0.08]"
            >
              {isReading ? (
                <Loader2 className="animate-spin text-coral dark:text-mint" size={34} />
              ) : (
                <UploadCloud className="text-coral dark:text-mint" size={38} />
              )}
              <span className="mt-4 text-lg font-black">Upload Resume</span>
              <span className="mt-2 max-w-md text-sm font-semibold leading-6 text-ink/62 dark:text-white/62">
                Supports TXT, MD, DOCX, and best-effort PDF text extraction. You can also paste resume text below.
              </span>
              <input
                id="resume-file"
                type="file"
                accept=".txt,.md,.docx,.pdf,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="sr-only"
                onChange={(event) => handleFile(event.target.files?.[0])}
              />
            </label>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="resume-role" className="block text-sm font-bold">
                  Target role
                </label>
                <select
                  id="resume-role"
                  value={role}
                  onChange={(event) => setRole(event.target.value as Role)}
                  className="mt-2 h-12 w-full rounded-lg border border-ink/10 bg-white/75 px-4 text-sm font-semibold text-ink outline-none transition focus:border-coral focus:ring-4 focus:ring-coral/20 dark:border-white/10 dark:bg-[#1B2225] dark:text-white"
                >
                  {roles.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="rounded-lg border border-ink/10 bg-white/55 p-4 dark:border-white/10 dark:bg-white/[0.06]">
                <p className="text-xs font-black uppercase tracking-normal text-ink/50 dark:text-white/50">Current file</p>
                <p className="mt-2 break-words text-sm font-bold">{fileName}</p>
              </div>
            </div>

            {status ? (
              <div className="mt-4 flex gap-2 rounded-lg border border-coral/25 bg-coral/10 p-3 text-sm font-semibold leading-6 dark:border-mint/20 dark:bg-mint/10">
                <AlertCircle className="mt-0.5 shrink-0" size={17} />
                <span>{status}</span>
              </div>
            ) : null}

            <label htmlFor="resume-text" className="mt-5 block text-sm font-bold">
              Resume text
            </label>
            <textarea
              id="resume-text"
              value={resumeText}
              onChange={(event) => {
                setResumeText(event.target.value);
                setFileName("pasted-resume-text");
              }}
              className="mt-2 min-h-72 w-full resize-none rounded-lg border border-ink/10 bg-white/75 p-4 text-sm leading-7 text-ink outline-none transition placeholder:text-ink/40 focus:border-coral focus:ring-4 focus:ring-coral/20 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/35"
              placeholder="Paste your resume text here..."
            />
          </div>

          <div className="glass-panel rounded-lg p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div
                className="score-ring grid h-32 w-32 shrink-0 place-items-center rounded-full"
                style={
                  {
                    "--score": analysis.atsScore,
                    "--score-color": analysis.atsScore >= 80 ? "#2EA67A" : analysis.atsScore >= 60 ? "#D99B18" : "#F47C64"
                  } as React.CSSProperties
                }
              >
                <div className="text-center">
                  <p className="text-4xl font-black leading-none">{analysis.atsScore}</p>
                  <p className="text-xs font-bold uppercase tracking-normal text-ink/55 dark:text-white/55">Resume ATS</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black">ATS Resume Report</h3>
                <p className="mt-2 text-sm leading-6 text-ink/65 dark:text-white/65">
                  Based on resume structure, target-role keywords, achievement quality, and readable professional wording.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Metric label="Words" value={analysis.wordCount} />
              <Metric label="Bullets" value={analysis.bulletCount} />
              <Metric label="Impact signals" value={analysis.metricCount} />
            </div>

            <div className="mt-6 space-y-3">
              {analysis.scoreBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between text-sm font-semibold">
                    <span>{item.label}</span>
                    <span>
                      {item.score}/{item.max}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-ink/10 dark:bg-white/10">
                    <div
                      className="h-2 rounded-full bg-coral transition-all duration-700 dark:bg-mint"
                      style={{ width: `${(item.score / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <TagGroup title="Sections Found" items={analysis.sections.found} empty="No clear sections detected." />
              <TagGroup title="Missing Sections" items={analysis.sections.missing} empty="All core sections found." />
              <TagGroup title="Matched Keywords" items={analysis.matchedKeywords.slice(0, 12)} empty="No keywords found yet." />
              <TagGroup
                title="Weak Words"
                items={analysis.weakWords.map((item) => item.word)}
                empty="No weak words detected."
              />
            </div>

            <div className="mt-6 rounded-lg border border-ink/10 bg-white/55 p-4 dark:border-white/10 dark:bg-white/[0.06]">
              <div className="flex items-center gap-2">
                <Target size={18} className="text-coral dark:text-mint" />
                <h4 className="font-black">Recommended Fixes</h4>
              </div>
              <ul className="mt-3 space-y-2">
                {analysis.recommendations.map((item) => (
                  <li key={item} className="text-sm font-semibold leading-6 text-ink/70 dark:text-white/70">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-ink/10 bg-white/55 p-4 dark:border-white/10 dark:bg-white/[0.06]">
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs font-black uppercase tracking-normal text-ink/50 dark:text-white/50">{label}</p>
    </div>
  );
}

function TagGroup({ title, items, empty }: { title: string; items: string[]; empty: string }) {
  return (
    <div className="rounded-lg border border-ink/10 bg-white/45 p-4 dark:border-white/10 dark:bg-white/[0.05]">
      <h4 className="text-sm font-black">{title}</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 text-xs font-bold dark:border-white/10 dark:bg-white/10"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-sm font-semibold text-ink/58 dark:text-white/58">{empty}</span>
        )}
      </div>
    </div>
  );
}
