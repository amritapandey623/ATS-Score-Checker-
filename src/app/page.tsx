import { ResumeEnhancer } from "@/components/ResumeEnhancer";
import { ExampleSection } from "@/components/ExampleSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { ResumeUploadAnalyzer } from "@/components/ResumeUploadAnalyzer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-ink transition-colors duration-300 dark:bg-[#111517] dark:text-[#F8F3E8]">
      <NavBar />
      <section id="enhancer" className="relative scroll-mt-20 border-b border-ink/10 dark:border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(122,215,183,0.28),rgba(245,196,81,0.18)_42%,rgba(244,124,100,0.18))] dark:bg-[linear-gradient(135deg,rgba(122,215,183,0.12),rgba(245,196,81,0.08)_42%,rgba(244,124,100,0.12))]" />
        <div className="absolute inset-0 opacity-[0.22] dark:opacity-[0.14] resume-grid" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          <div className="max-w-4xl animate-fade-up">
            <p className="mb-4 inline-flex rounded-full border border-ink/10 bg-white/40 px-4 py-2 text-sm font-semibold text-plum shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-mint">
              Rule-based ATS optimization, no paid APIs
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              AI Resume Bullet Enhancer
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/72 dark:text-white/76">
              Transform weak resume points into ATS-friendly achievements.
            </p>
          </div>
          <ResumeEnhancer />
        </div>
      </section>
      <ResumeUploadAnalyzer />
      <FeatureGrid />
      <ExampleSection />
      <Footer />
    </main>
  );
}
