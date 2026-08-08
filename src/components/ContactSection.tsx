"use client";

import { useState } from "react";
import { resumeData } from "../data/resumeData";
import { motion } from "framer-motion";

export const ContactSection = () => {
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mlgwqolj", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setFormState("success");
        form.reset();
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-4 pb-36 max-w-3xl mx-auto relative flex justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-lg bg-white dark:bg-[#222225] p-8 md:p-12 shadow-2xl border border-black/10 dark:border-white/10 mt-6 hover:rotate-0 transition-transform duration-500 rounded-xl"
      >
        {/* Subtle top tape */}
        <div className="masking-tape"></div>

        {/* Stamp */}
        <div className="absolute top-6 right-6 w-16 h-20 border-2 border-dotted border-red-500/60 dark:border-neon-pink/40 opacity-80 flex flex-col items-center justify-center p-1 rotate-[4deg]">
          <span className="font-sketch text-xs uppercase tracking-[0.2em] text-red-500/80 dark:text-neon-pink/60">POST</span>
          <span className="text-2xl mt-1 opacity-70">✉</span>
        </div>

        <h2 className="font-serif font-medium italic text-5xl md:text-6xl mb-6 leading-none tracking-tight text-ink-dark dark:text-ink-light">
          Let's Connect.
        </h2>
        
        <p className="font-sans text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-sm">
          Have an agentic architecture to design or a workflow to automate? Drop a message or send an email directly!
        </p>

        {formState === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-10 text-center"
          >
            <div className="text-5xl mb-4">✉️</div>
            <h3 className="font-sketch text-2xl text-ink-dark dark:text-ink-light mb-2">Message sent!</h3>
            <p className="font-sans text-slate-500 dark:text-slate-400 mb-6">Thanks for reaching out. I'll respond promptly.</p>
            <button
              onClick={() => setFormState("idle")}
              className="font-sketch text-lg text-ink-blue dark:text-neon-pink hover:underline decoration-wavy cursor-pointer"
            >
              Send another message →
            </button>
          </motion.div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-5 font-sketch text-xl w-full relative z-10"
          >
            <div className="flex flex-col relative">
              <label htmlFor="name" className="text-slate-500 mb-1 text-lg">Dear Arshal,</label>
              <input 
                type="text" 
                name="name"
                id="name" 
                placeholder="My name is..." 
                required
                disabled={formState === "sending"}
                className="bg-transparent border-none outline-none border-b-2 border-black/10 dark:border-white/10 focus:border-ink-blue dark:focus:border-neon-pink focus:ring-0 text-ink-dark dark:text-ink-light placeholder:text-black/25 dark:placeholder:text-white/25 px-1 py-1 transition-colors w-full disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col relative">
              <input 
                type="email" 
                name="email"
                id="email" 
                placeholder="My email address is..." 
                required
                disabled={formState === "sending"}
                className="bg-transparent border-none outline-none border-b-2 border-black/10 dark:border-white/10 focus:border-ink-blue dark:focus:border-neon-pink focus:ring-0 text-ink-dark dark:text-ink-light placeholder:text-black/25 dark:placeholder:text-white/25 px-1 py-1 transition-colors w-full disabled:opacity-50"
              />
            </div>
            
            <div className="flex flex-col relative mt-2">
              <textarea 
                name="message"
                id="message" 
                placeholder="I would like to discuss..." 
                required
                rows={4}
                disabled={formState === "sending"}
                className="bg-transparent border-none outline-none border-b-2 border-black/10 dark:border-white/10 focus:border-ink-blue dark:focus:border-neon-pink focus:ring-0 text-ink-dark dark:text-ink-light placeholder:text-black/25 dark:placeholder:text-white/25 px-1 py-1 resize-none transition-colors w-full disabled:opacity-50"
                style={{
                  lineHeight: "32px",
                  backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(0,0,0,0.05) 31px, rgba(0,0,0,0.05) 32px)"
                }}
              />
            </div>

            {formState === "error" && (
              <p className="font-sans text-sm text-red-500">
                Something went wrong. Please email directly at {resumeData.email}
              </p>
            )}
            
            <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
              <div className="flex gap-4 font-sans text-sm font-bold uppercase tracking-wider text-slate-500">
                <a href={resumeData.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink-blue dark:hover:text-neon-pink transition-colors">
                  LinkedIn ↗
                </a>
                <a href={resumeData.github} target="_blank" rel="noreferrer" className="hover:text-ink-blue dark:hover:text-neon-pink transition-colors">
                  GitHub ↗
                </a>
              </div>
              
              <button 
                type="submit"
                disabled={formState === "sending"}
                className="group px-6 py-2.5 border-2 border-ink-dark dark:border-ink-light text-ink-dark dark:text-ink-light rounded-full font-sans font-bold text-base hover:bg-ink-dark hover:text-white dark:hover:bg-ink-light dark:hover:text-black transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {formState === "sending" ? "Sending..." : <>Send Message <span className="group-hover:translate-x-1 transition-transform inline-block">✈️</span></>}
              </button>
            </div>
          </form>
        )}

        <div className="mt-12 pt-6 border-t border-dashed border-slate-200 dark:border-slate-800 text-right">
          <span className="font-handwritten text-4xl text-ink-dark dark:text-ink-light opacity-90 transform -rotate-2 inline-block">
            {resumeData.name}
          </span>
        </div>
      </motion.div>
    </section>
  );
};
