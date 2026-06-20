import { ExternalLink, FileText } from "lucide-react";

const navItems = [
  { href: "#enhancer", label: "Enhancer" },
  { href: "#resume-check", label: "Resume ATS" },
  { href: "#features", label: "Features" },
  { href: "#examples", label: "Examples" }
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/82 backdrop-blur-xl dark:border-white/10 dark:bg-[#111517]/86">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
        <a href="#enhancer" className="flex items-center gap-2 font-black">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-white dark:bg-mint dark:text-ink">
            <FileText size={18} />
          </span>
          <span className="hidden sm:inline">AI Resume Bullet Enhancer</span>
          <span className="sm:hidden">AI Resume</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-bold text-ink/68 transition hover:bg-white/65 hover:text-ink dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-coral px-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-plum dark:bg-gold dark:text-ink dark:hover:bg-mint"
        >
          Digital Heroes
          <ExternalLink size={15} />
        </a>
      </nav>
    </header>
  );
}
