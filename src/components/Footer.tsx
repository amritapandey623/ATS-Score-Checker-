import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink px-5 py-10 text-white dark:border-white/10 dark:bg-black sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-black">AI Resume Bullet Enhancer</p>
          <p className="mt-2 text-sm font-semibold text-white/70">Full Name: Amrita Pandey</p>
          <p className="mt-1 text-sm font-semibold text-white/70">Email: amritapandey3210@gmail.com</p>
        </div>
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gold px-5 text-sm font-black text-ink transition hover:-translate-y-0.5 hover:bg-mint"
        >
          Built for Digital Heroes
          <ExternalLink size={17} />
        </a>
      </div>
    </footer>
  );
}
