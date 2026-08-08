"use client";

import { resumeData } from "../data/resumeData";

export const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 border-t border-black/10 dark:border-white/10 text-center relative z-10 bg-black/5 dark:bg-white/5">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-sketch text-lg text-slate-600 dark:text-slate-400">
        <p>
          🍃 Handcrafted Notebook Portfolio for <strong className="text-ink-dark dark:text-ink-light">{resumeData.name}</strong> &copy; 2026
        </p>

        <div className="flex items-center gap-6">
          <a href={resumeData.github} target="_blank" rel="noreferrer" className="hover:text-ink-blue dark:hover:text-neon-pink transition-colors">
            GitHub
          </a>
          <a href={resumeData.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink-blue dark:hover:text-neon-pink transition-colors">
            LinkedIn
          </a>
          <a href={`mailto:${resumeData.email}`} className="hover:text-ink-blue dark:hover:text-neon-pink transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};
