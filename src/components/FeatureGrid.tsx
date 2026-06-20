import { BarChart3, BrainCircuit, ClipboardCheck, GraduationCap, SearchCheck, Zap } from "lucide-react";

const features = [
  {
    title: "Rule-Based Enhancements",
    description: "Transforms vague bullets with action verbs, impact language, and polished grammar.",
    icon: BrainCircuit
  },
  {
    title: "ATS Scoring",
    description: "Scores each bullet across action verbs, technical keywords, clarity, and wording.",
    icon: BarChart3
  },
  {
    title: "Weak Word Detection",
    description: "Flags words like made, did, worked on, helped, and used with stronger alternatives.",
    icon: SearchCheck
  },
  {
    title: "Role Optimization",
    description: "Adapts output for software, AI/ML, data, frontend, and backend internship roles.",
    icon: GraduationCap
  },
  {
    title: "Copy Ready",
    description: "Produces a final polished bullet that can be copied directly into a resume draft.",
    icon: ClipboardCheck
  },
  {
    title: "Vercel Friendly",
    description: "Runs fully in the browser with no paid AI APIs, server costs, or external services.",
    icon: Zap
  }
];

export function FeatureGrid() {
  return (
    <section id="features" className="scroll-mt-20 border-b border-ink/10 bg-white/40 px-5 py-16 dark:border-white/10 dark:bg-white/[0.03] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-normal text-coral dark:text-mint">Features</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">Built for stronger student resumes</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-lg border border-ink/10 bg-paper/70 p-5 transition hover:-translate-y-1 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.06]"
              >
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-mint/35 text-ink dark:bg-mint/20 dark:text-mint">
                  <Icon size={21} />
                </div>
                <h3 className="mt-4 text-lg font-black">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/65 dark:text-white/65">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
