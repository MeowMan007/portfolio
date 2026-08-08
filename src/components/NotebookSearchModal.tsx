"use client";

import { useEffect, useState } from "react";
import { Search, X, Command, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { resumeData } from "../data/resumeData";

export const NotebookSearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const searchItems = [
    ...resumeData.projects.map((p) => ({
      type: "Project",
      title: p.title,
      subtitle: p.subtitle,
      tags: p.techStack,
      href: "#projects",
    })),
    ...resumeData.skills.flatMap((s) =>
      s.items.map((item) => ({
        type: `Skill (${s.category})`,
        title: item,
        subtitle: `Category: ${s.category}`,
        tags: [s.category],
        href: "#skills",
      }))
    ),
    {
      type: "Experience",
      title: "Sparkx Automations Internship",
      subtitle: "AI & Python Automation Engineer Intern (Oct 2025 – Mar 2026)",
      tags: ["Python", "ETL", "FastAPI", "LangChain"],
      href: "#experience",
    },
    {
      type: "Education",
      title: "NIET Greater Noida",
      subtitle: "B.Tech Computer Science (AI & ML) — CGPA 7.29",
      tags: ["AI/ML", "DSA", "DBMS"],
      href: "#about",
    },
    {
      type: "Contact",
      title: "Get In Touch / Hire Arshal",
      subtitle: "Email: arshal.real@outlook.com | LinkedIn | GitHub",
      tags: ["Email", "LinkedIn", "GitHub"],
      href: "#contact",
    },
  ];

  const filteredItems = query.trim() === ""
    ? searchItems.slice(0, 6)
    : searchItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      );

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery("");
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating Trigger Pill */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 px-4 py-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg text-ink-dark dark:text-ink-light font-sketch text-base flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
      >
        <Search className="w-4 h-4 text-ink-blue dark:text-neon-pink" />
        <span>Search Notebook</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-mono font-bold bg-black/10 dark:bg-white/10 rounded-md">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              transition={{ type: "spring", bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-notebook-light dark:bg-notebook-dark p-6 rounded-2xl shadow-2xl border border-black/15 dark:border-white/15 overflow-hidden"
            >
              {/* Top Search Input */}
              <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-4 mb-4">
                <Search className="w-6 h-6 text-ink-blue dark:text-neon-pink" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, skills, experience, or keywords..."
                  autoFocus
                  className="w-full bg-transparent border-none outline-none font-sketch text-2xl text-ink-dark dark:text-ink-light placeholder:text-slate-400"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results List */}
              <div className="max-h-80 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {filteredItems.length === 0 ? (
                  <p className="font-sketch text-lg text-slate-400 text-center py-8">
                    No matching items found in Arshal's notebook.
                  </p>
                ) : (
                  filteredItems.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelect(item.href)}
                      className="group p-3 rounded-xl hover:bg-highlighter-yellow/30 dark:hover:bg-neon-pink/10 transition-colors cursor-pointer flex items-center justify-between border border-transparent hover:border-black/5 dark:hover:border-white/5"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-ink-blue dark:text-neon-pink font-sans">
                            {item.type}
                          </span>
                          <span className="font-sans font-bold text-lg text-ink-dark dark:text-ink-light group-hover:text-black dark:group-hover:text-white">
                            {item.title}
                          </span>
                        </div>
                        <p className="font-sketch text-sm text-slate-500 dark:text-slate-400">
                          {item.subtitle}
                        </p>
                      </div>

                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-ink-blue dark:group-hover:text-neon-pink transition-all flex-shrink-0" />
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex justify-between text-xs text-slate-400 font-mono">
                <span>Press <kbd className="font-bold text-ink-dark dark:text-ink-light">ESC</kbd> to exit</span>
                <span>{filteredItems.length} items found</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
