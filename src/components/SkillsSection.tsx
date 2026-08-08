"use client";

import { useState } from "react";
import { resumeData } from "../data/resumeData";
import { UnderlineDoodle, SparklesDoodle } from "./DoodleSVGs";
import { motion } from "framer-motion";

export const SkillsSection = () => {
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    category: string;
    desc: string;
  }>({
    name: "Python",
    category: "Languages & GenAI",
    desc: "Primary language for ETL automation pipelines, FastAPI REST servers, PyTorch vision transformers, and multi-agent LangChain/PydanticAI workflows.",
  });

  const skillDetailsMap: Record<string, { category: string; desc: string }> = {
    Python: {
      category: "Core Language",
      desc: "Built enterprise ETL scripts cutting manual reporting turnaround from 2 days to under an hour at Sparkx Automations. Created high-precision Placidus birth chart engine.",
    },
    FastAPI: {
      category: "Backend Framework",
      desc: "Exposed asynchronous REST endpoints for background Python tasks, Vision Transformer accessibility audits, and PydanticAI streaming booking workflows.",
    },
    LangChain: {
      category: "GenAI Orchestration",
      desc: "Engineered lead classification pipelines for unstructured emails with ~50% efficiency gains. Built in-browser ATS resume keyword analyzer with local Ollama LLM.",
    },
    LangGraph: {
      category: "Multi-Agent Graph",
      desc: "Orchestrated complex stateful multi-agent workflows for conversational scheduling and natural language slot resolution.",
    },
    PydanticAI: {
      category: "Agent Framework",
      desc: "Designed structured agent logic with type-safe schema validation and live Google Calendar API synchronization.",
    },
    "React.js": {
      category: "Frontend UI",
      desc: "Crafted modern single-page applications, drag-and-drop PDF ATS analyzers, real-time conversational booking interfaces, and dynamic SVG wheels.",
    },
    PyTorch: {
      category: "Computer Vision",
      desc: "Custom-trained Vision Transformer (ViT-B/16) for WCAG visual accessibility audit detection with Grad-CAM explainability maps.",
    },
    Docker: {
      category: "DevOps & Infra",
      desc: "Containerized FastAPI and Selenium audit workers for scalable enterprise deployments and automated continuous integration.",
    },
  };

  const orbitSkills = [
    { name: "Python", icon: "🐍" },
    { name: "FastAPI", icon: "⚡" },
    { name: "LangChain", icon: "🦜" },
    { name: "LangGraph", icon: "🕸️" },
    { name: "PydanticAI", icon: "🤖" },
    { name: "React.js", icon: "⚛️" },
    { name: "PyTorch", icon: "🔥" },
    { name: "Docker", icon: "🐳" },
  ];

  return (
    <section id="skills" className="py-24 px-4 md:px-20 max-w-5xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative inline-block mx-auto left-1/2 -translate-x-1/2 group z-10"
      >
        <h2 className="font-serif font-medium italic text-5xl md:text-7xl text-ink-dark dark:text-[#EBE5D9] transition-transform group-hover:scale-105 duration-300">
          Skills & Toolkit.
        </h2>
        <div className="absolute -bottom-4 w-[110%] -left-[5%] rotate-[-1deg] opacity-70 group-hover:opacity-100 transition-opacity">
          <UnderlineDoodle className="text-black/10 dark:text-white/10 stroke-draw animate-draw" />
        </div>
      </motion.div>

      {/* Interactive Orbit & Skill Inspector Layout */}
      <div className="mb-16 p-8 rounded-3xl bg-white/70 dark:bg-black/30 border border-black/10 dark:border-white/10 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Circular Skill Hub Orbit */}
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
          {/* Center Hub */}
          <div className="w-20 h-20 rounded-full bg-ink-dark dark:bg-ink-light text-white dark:text-black flex flex-col items-center justify-center text-center shadow-lg z-20 font-sketch">
            <span className="text-2xl">🍃</span>
            <span className="text-xs font-bold">Arshal</span>
          </div>

          {/* Orbit Circle Rings */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-black/15 dark:border-white/15 animate-[spin_30s_linear_infinite]" />

          {/* Orbiting Skill Nodes */}
          {orbitSkills.map((skill, idx) => {
            const angle = (idx * 360) / orbitSkills.length;
            const radius = 100; // px
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            const isSelected = selectedSkill.name === skill.name;

            return (
              <motion.button
                key={skill.name}
                onClick={() => {
                  const detail = skillDetailsMap[skill.name] || {
                    category: "Tech Stack",
                    desc: "Core technology utilized in production full-stack & GenAI systems.",
                  };
                  setSelectedSkill({
                    name: skill.name,
                    category: detail.category,
                    desc: detail.desc,
                  });
                }}
                whileHover={{ scale: 1.25 }}
                className={`absolute z-30 w-11 h-11 rounded-full flex items-center justify-center text-lg shadow-md border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-highlighter-yellow dark:bg-neon-pink text-black border-black scale-110 shadow-lg"
                    : "bg-white dark:bg-[#252528] border-black/10 dark:border-white/10 text-ink-dark dark:text-ink-light"
                }`}
                style={{
                  left: `calc(50% + ${x}px - 22px)`,
                  top: `calc(50% + ${y}px - 22px)`,
                }}
                title={skill.name}
              >
                {skill.icon}
              </motion.button>
            );
          })}
        </div>

        {/* Skill Detail Inspector Card */}
        <div className="p-6 rounded-2xl bg-notebook-light dark:bg-notebook-dark border border-black/10 dark:border-white/10 shadow-md relative">
          <div className="masking-tape"></div>
          <div className="flex items-center gap-2 mb-2">
            <SparklesDoodle className="w-5 h-5 text-highlighter-pink dark:text-neon-pink" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              {selectedSkill.category}
            </span>
          </div>

          <h3 className="font-sans font-black text-3xl text-ink-dark dark:text-ink-light mb-3">
            {selectedSkill.name}
          </h3>

          <p className="font-sans text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-light mb-4">
            {selectedSkill.desc}
          </p>

          <p className="font-sketch text-sm text-slate-400">
            👈 Click any icon node on the orbit ring to inspect project applications!
          </p>
        </div>

      </div>

      {/* Structured Category Cloud Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {resumeData.skills.map((skillGroup, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
            className="group/section relative p-6 md:p-8 rounded-3xl bg-white/60 dark:bg-black/30 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="mb-6 relative">
              <span className="absolute -top-4 -left-2 font-sketch text-4xl text-slate-400 dark:text-slate-500 opacity-20 group-hover/section:opacity-40 transition-opacity">
                0{i + 1}
              </span>
              <h3 className="font-sans font-black text-2xl text-ink-dark dark:text-ink-light tracking-tight pb-2 inline-block relative z-10">
                {skillGroup.category}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-highlighter-pink/40 dark:bg-neon-pink/40 scale-x-0 group-hover/section:scale-x-100 transition-transform origin-left duration-300 rounded-full"></span>
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3 relative z-10">
              {skillGroup.items.map((item, j) => (
                <span
                  key={j}
                  onClick={() => {
                    const detail = skillDetailsMap[item] || {
                      category: skillGroup.category,
                      desc: `Proficient in ${item} with application across production architectures.`,
                    };
                    setSelectedSkill({
                      name: item,
                      category: detail.category,
                      desc: detail.desc,
                    });
                  }}
                  className="px-4 py-2 font-sans font-medium text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-highlighter-yellow dark:hover:border-neon-pink hover:bg-highlighter-yellow/30 dark:hover:bg-neon-pink/10 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-rotate-2 hover:shadow-md"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
