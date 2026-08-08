"use client";

import { resumeData } from "../data/resumeData";
import { motion } from "framer-motion";
import { UnderlineDoodle } from "./DoodleSVGs";

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-4 md:px-20 max-w-5xl mx-auto relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-16 relative z-10 text-center"
      >
        <h2 className="font-serif font-medium italic text-5xl md:text-7xl mb-4 text-ink-dark dark:text-ink-light">
          Internship Experience.
        </h2>
        <div className="relative inline-block">
          <p className="font-sketch text-2xl text-slate-500 dark:text-slate-400">
            Real enterprise automation & GenAI development
          </p>
          <div className="absolute -bottom-3 w-full left-0 opacity-60">
            <UnderlineDoodle className="w-full h-3 text-highlighter-pink dark:text-neon-pink" />
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {resumeData.experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="relative p-8 md:p-10 bg-white dark:bg-[#202023] rounded-3xl border-2 border-black/10 dark:border-white/10 shadow-xl"
          >
            {/* Washi Tape */}
            <div className="masking-tape"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <h3 className="font-sans font-black text-2xl md:text-3xl text-ink-dark dark:text-ink-light">
                  {exp.role}
                </h3>
                <span className="font-sketch text-2xl text-ink-blue dark:text-neon-pink">
                  @ {exp.company}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-highlighter-yellow/50 dark:bg-yellow-500/20 text-ink-dark dark:text-ink-light font-sketch text-lg font-bold w-fit">
                📅 {exp.duration}
              </div>
            </div>

            <ul className="space-y-4 font-sans text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-highlighter-pink text-xl font-bold">✓</span>
                <div>
                  Built Python <strong>ETL scripts (Pandas, NumPy)</strong> to automate manual data workflows, cutting reporting turnaround times from 2 days to under an hour.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-highlighter-pink text-xl font-bold">✓</span>
                <div>
                  Designed and exposed <strong>FastAPI endpoints</strong> to trigger background Python scripts, letting internal teams activate backend automated tasks on demand.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-highlighter-pink text-xl font-bold">✓</span>
                <div>
                  Developed a <strong>LangChain-based text classifier</strong> that auto-categorizes incoming client leads from unstructured emails, optimizing sorting effort by ~50%.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-highlighter-pink text-xl font-bold">✓</span>
                <div>
                  Restructured and fixed 3 legacy scripts failing in production by writing robust error handling and introducing modularized architecture, enhancing general pipeline reliability.
                </div>
              </li>
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
