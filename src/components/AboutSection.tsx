"use client";

import { useEffect, useState } from "react";
import { resumeData } from "../data/resumeData";
import { motion } from "framer-motion";

export const AboutSection = () => {
  const [stats, setStats] = useState({
    github: {
      stars: 12,
      repos: 10,
      followers: 8,
      languages: [
        { name: "Python", percentage: 45 },
        { name: "TypeScript", percentage: 30 },
        { name: "JavaScript", percentage: 15 },
        { name: "C++", percentage: 10 },
      ],
    },
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (!res.ok) throw new Error("Failed to fetch GitHub stats");
        const data = await res.json();
        setStats({
          github: {
            stars: data.github?.stars ?? 12,
            repos: data.github?.repos ?? 10,
            followers: data.github?.followers ?? 8,
            languages: data.github?.languages ?? [
              { name: "Python", percentage: 45 },
              { name: "TypeScript", percentage: 30 },
              { name: "JavaScript", percentage: 15 },
              { name: "C++", percentage: 10 },
            ],
          },
          loading: false,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  return (
    <section id="about" className="py-24 px-4 md:px-20 max-w-6xl mx-auto relative overflow-hidden">
      <div className="flex flex-col items-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-3xl relative"
        >
          <h2 className="font-serif font-medium italic text-5xl md:text-7xl mb-8 tracking-tight text-ink-dark dark:text-ink-light">
            About Me.
          </h2>

          <div className="relative">
            <span className="absolute -left-8 -top-4 font-sketch text-6xl text-highlighter-pink/50">"</span>

            <div className="font-sans text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-light space-y-6">
              <p>
                I am a dedicated <strong className="font-medium text-ink-dark dark:text-white">Full-Stack Developer & GenAI Engineer</strong> with hands-on experience building production React/FastAPI applications and intelligent agentic AI systems using <span className="font-sketch text-3xl mx-1 text-ink-dark dark:text-ink-light">LangChain, LangGraph & PydanticAI</span>.
              </p>
              <p>
                Having shipped complex end-to-end projects and completed an internship automating real enterprise workflows, my experience spans RAG pipelines, multi-agent orchestration, and vision-based auditing systems.
              </p>
            </div>
          </div>

          {/* Interactive Metric Cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            
            {/* Live GitHub Card */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative p-6 bg-blue-50/80 dark:bg-blue-950/10 border-2 border-blue-500/20 rounded-2xl shadow-md backdrop-blur-xs flex flex-col justify-between min-h-[220px]"
            >
              <div className="absolute -top-3 left-3/4 -translate-x-1/2 w-16 h-6 bg-highlighter-blue/30 dark:bg-blue-500/10 rotate-[3deg] pointer-events-none" style={{ clipPath: "polygon(0% 15%, 100% 0%, 95% 85%, 3% 100%)" }} />

              <a href={resumeData.github} target="_blank" rel="noreferrer" className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6 text-blue-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span className="font-sketch text-2xl text-slate-800 dark:text-slate-200">GitHub</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                      ⭐ {stats.loading ? "..." : `${stats.github.stars} Stars`}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider font-semibold">Top Languages</p>
                    <div className="h-2 w-full rounded-full flex overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
                      {stats.github.languages.map((lang, idx) => {
                        const colors = ["bg-sky-400", "bg-blue-500", "bg-yellow-500", "bg-rose-500"];
                        return (
                          <motion.div
                            key={lang.name}
                            className={colors[idx % colors.length]}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${lang.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
                            title={`${lang.name}: ${lang.percentage}%`}
                          />
                        );
                      })}
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {stats.github.languages.map((lang, idx) => {
                        const colors = ["bg-sky-400", "bg-blue-500", "bg-yellow-500", "bg-rose-500"];
                        return (
                          <div key={lang.name} className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                            <span className={`w-2 h-2 rounded-full ${colors[idx % colors.length]}`} />
                            <span className="font-medium text-slate-700 dark:text-slate-300">{lang.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-blue-500/10 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <span>Repos: <strong>{stats.loading ? "..." : stats.github.repos}</strong></span>
                  <span className="flex items-center gap-0.5 text-blue-600 dark:text-blue-400 font-medium">
                    MeowMan007 ↗
                  </span>
                </div>
              </a>
            </motion.div>

            {/* DSA & Problem Solving Card */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative p-6 bg-amber-50/80 dark:bg-amber-950/10 border-2 border-amber-500/20 rounded-2xl shadow-md backdrop-blur-xs flex flex-col justify-between min-h-[220px]"
            >
              <div className="absolute -top-3 left-1/4 -translate-x-1/2 w-16 h-6 bg-highlighter-yellow/30 dark:bg-yellow-500/10 rotate-[-4deg] pointer-events-none" style={{ clipPath: "polygon(0% 15%, 100% 0%, 95% 85%, 3% 100%)" }} />

              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⚡</span>
                      <span className="font-sketch text-2xl text-slate-800 dark:text-slate-200">DSA & Algo</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      400+ Solved
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug mb-3 font-light">
                    Solves dynamic programming, graph algorithms, and tree structures across LeetCode & Codeforces.
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-500/10 flex justify-between items-center text-xs text-amber-600 dark:text-amber-400 font-medium">
                  <span>Collegiate Top 10%</span>
                  <span>Active Solver ↗</span>
                </div>
              </div>
            </motion.div>

            {/* Certifications Card */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative p-6 bg-emerald-50/80 dark:bg-emerald-950/10 border-2 border-emerald-500/20 rounded-2xl shadow-md backdrop-blur-xs flex flex-col justify-between min-h-[220px]"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-highlighter-green/30 dark:bg-emerald-500/10 rotate-[-2deg] pointer-events-none" style={{ clipPath: "polygon(0% 15%, 100% 0%, 95% 85%, 3% 100%)" }} />

              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🎓</span>
                      <span className="font-sketch text-2xl text-slate-800 dark:text-slate-200">Certifications</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      14+ Badges
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug mb-3 font-light">
                    Certified in GenAI systems, production RAG pipelines, and multi-agent workflows by IBM & DeepLearning.AI.
                  </p>
                </div>

                <div className="pt-3 border-t border-emerald-500/10 flex justify-between items-center text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Verified Credentials</span>
                  <span>IBM & DeepLearning.AI ↗</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Education Timeline */}
          <div className="mt-16 w-full">
            <h3 className="font-sketch text-3xl text-ink-dark dark:text-ink-light mb-8 flex items-center gap-2">
              <span>🎓</span> Academic Background
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumeData.education.map((edu, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/60 dark:bg-black/30 border border-black/10 dark:border-white/10 shadow-sm relative">
                  <div className="font-sketch text-sm text-slate-400 dark:text-slate-500 mb-1">{edu.duration}</div>
                  <h4 className="font-sans font-bold text-xl text-ink-dark dark:text-ink-light mb-1">{edu.degree}</h4>
                  <p className="font-sans text-sm text-slate-600 dark:text-slate-300 mb-3">{edu.institution}, {edu.location}</p>
                  <span className="inline-block px-3 py-1 bg-highlighter-yellow/40 dark:bg-yellow-500/20 text-ink-dark dark:text-ink-light text-xs font-bold rounded-md">
                    {edu.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
