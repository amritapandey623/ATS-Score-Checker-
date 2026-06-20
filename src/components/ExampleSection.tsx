import { sampleBullets } from "@/lib/resumeEnhancer";

export function ExampleSection() {
  return (
    <section id="examples" className="scroll-mt-20 px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-coral dark:text-mint">Examples</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Before and after bullets</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {sampleBullets.map((example) => (
            <article
              key={example.input}
              className="rounded-lg border border-ink/10 bg-white/55 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.06]"
            >
              <p className="text-xs font-black uppercase tracking-normal text-ink/50 dark:text-white/50">Before</p>
              <p className="mt-2 min-h-14 text-base font-bold leading-7">{example.input}</p>
              <div className="my-5 h-px bg-ink/10 dark:bg-white/10" />
              <p className="text-xs font-black uppercase tracking-normal text-coral dark:text-mint">After</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-ink/72 dark:text-white/72">{example.output}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
