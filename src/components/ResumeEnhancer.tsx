"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Clipboard, Moon, Sparkles, Sun, Wand2 } from "lucide-react";
import { enhanceResumeBullet, roles, type Role } from "@/lib/resumeEnhancer";
import { ScoreGauge } from "@/components/ScoreGauge";

const starterBullet = "Created a website using React.";

export function ResumeEnhancer() {
  const [input, setInput] = useState(starterBullet);
  const [role, setRole] = useState<Role>("Software Engineer");
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const result = useMemo(() => enhanceResumeBullet(input, role), [input, role]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const copyOutput = async () => {
    await navigator.clipboard.writeText(result.internshipOptimizedBullet);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="glass-panel animate-fade-up rounded-lg p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black">Resume Bullet Enhancer</h2>
            <p className="mt-1 text-sm leading-6 text-ink/65 dark:text-white/65">
              Enter one bullet and get a sharper, ATS-friendly achievement.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDarkMode((value) => !value)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-ink/10 bg-white/65 px-4 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>

        <label htmlFor="resume-bullet" className="mt-6 block text-sm font-bold">
          Resume bullet point
        </label>
        <textarea
          id="resume-bullet"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="mt-2 min-h-40 w-full resize-none rounded-lg border border-ink/10 bg-white/75 p-4 text-base leading-7 text-ink outline-none transition placeholder:text-ink/40 focus:border-coral focus:ring-4 focus:ring-coral/20 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/35"
          placeholder="Example: Created a website using React."
        />

        <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto]">
          <div>
            <label htmlFor="role" className="block text-sm font-bold">
              Internship target role
            </label>
            <select
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value as Role)}
              className="mt-2 h-12 w-full rounded-lg border border-ink/10 bg-white/75 px-4 text-sm font-semibold text-ink outline-none transition focus:border-coral focus:ring-4 focus:ring-coral/20 dark:border-white/10 dark:bg-[#1B2225] dark:text-white"
            >
              {roles.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => setInput(input.trim() || starterBullet)}
            className="inline-flex h-12 items-center justify-center gap-2 self-end rounded-lg bg-ink px-5 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-plum dark:bg-mint dark:text-ink dark:hover:bg-gold"
          >
            <Wand2 size={18} />
            Enhance
          </button>
        </div>
      </div>

      <div className="grid gap-5">
        <ScoreGauge score={result.atsScore} breakdown={result.scoreBreakdown} />

        <div className="glass-panel rounded-lg p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black">Enhanced Output</h2>
            <button
              type="button"
              onClick={copyOutput}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-ink/10 bg-white/70 px-3 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
            >
              {copied ? <Check size={16} /> : <Clipboard size={16} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="mt-4 rounded-lg border border-ink/10 bg-white/60 p-4 text-base font-semibold leading-7 dark:border-white/10 dark:bg-black/20">
            {result.enhancedBullet}
          </div>

          <h3 className="mt-5 text-sm font-black uppercase tracking-normal text-plum dark:text-mint">
            {role} optimized
          </h3>
          <div className="mt-2 rounded-lg border border-coral/30 bg-coral/10 p-4 text-base font-semibold leading-7 dark:border-mint/25 dark:bg-mint/10">
            {result.internshipOptimizedBullet}
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:col-span-2 lg:grid-cols-3">
        <InsightPanel
          title="Weak Word Detector"
          empty="No weak words detected."
          items={
            result.weakWords.length
              ? result.weakWords.map((item) => `${item.word} -> ${item.alternatives.join(", ")}`)
              : []
          }
        />
        <InsightPanel
          title="Action Verb Suggestions"
          empty="Strong verbs already look good."
          items={
            result.actionVerbSuggestions.length
              ? result.actionVerbSuggestions.map((item) => `${item.original} -> ${item.suggestions.join(", ")}`)
              : ["Created -> Developed, Engineered, Designed", "Worked -> Implemented, Built, Optimized"]
          }
        />
        <InsightPanel
          title="Detected ATS Keywords"
          empty="Add role-specific tools or technologies."
          items={result.detectedKeywords.length ? result.detectedKeywords.map((item) => item.toUpperCase()) : []}
        />
      </div>

      <div className="glass-panel rounded-lg p-5 lg:col-span-2">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-1 text-coral dark:text-mint" size={20} />
          <div>
            <h2 className="text-xl font-black">Improvement Notes</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.improvementTips.map((tip) => (
                <span
                  key={tip}
                  className="rounded-full border border-ink/10 bg-white/55 px-3 py-2 text-sm font-semibold dark:border-white/10 dark:bg-white/10"
                >
                  {tip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightPanel({
  title,
  items,
  empty
}: {
  title: string;
  items: string[];
  empty: string;
}) {
  return (
    <div className="glass-panel rounded-lg p-5">
      <h3 className="text-lg font-black">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-ink/10 bg-white/55 px-3 py-2 text-sm font-bold dark:border-white/10 dark:bg-white/10"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-sm font-semibold text-ink/60 dark:text-white/60">{empty}</span>
        )}
      </div>
    </div>
  );
}
