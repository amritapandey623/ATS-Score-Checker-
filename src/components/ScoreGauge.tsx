import type { ScoreBreakdown } from "@/lib/resumeEnhancer";

type ScoreGaugeProps = {
  score: number;
  breakdown: ScoreBreakdown;
};

const labels: Array<[keyof ScoreBreakdown, string]> = [
  ["actionVerbs", "Action verbs"],
  ["technicalKeywords", "Technical keywords"],
  ["clarity", "Clarity"],
  ["professionalWording", "Professional wording"]
];

export function ScoreGauge({ score, breakdown }: ScoreGaugeProps) {
  const scoreColor = score >= 82 ? "#2EA67A" : score >= 65 ? "#D99B18" : "#F47C64";

  return (
    <div className="rounded-lg border border-ink/10 bg-white/50 p-5 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-5">
        <div
          className="score-ring grid h-28 w-28 shrink-0 place-items-center rounded-full"
          style={
            {
              "--score": score,
              "--score-color": scoreColor
            } as React.CSSProperties
          }
          aria-label={`ATS score ${score} out of 100`}
        >
          <div className="text-center">
            <p className="text-3xl font-black leading-none">{score}</p>
            <p className="text-xs font-bold uppercase tracking-normal text-ink/55 dark:text-white/55">ATS</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-black">ATS Score</h3>
          <p className="mt-1 text-sm leading-6 text-ink/65 dark:text-white/65">
            Scored from action verbs, keywords, clarity, and professional language.
          </p>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {labels.map(([key, label]) => (
          <div key={key}>
            <div className="mb-1 flex items-center justify-between text-sm font-semibold">
              <span>{label}</span>
              <span>{breakdown[key]}/25</span>
            </div>
            <div className="h-2 rounded-full bg-ink/10 dark:bg-white/10">
              <div
                className="h-2 rounded-full bg-coral transition-all duration-700"
                style={{ width: `${(breakdown[key] / 25) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
