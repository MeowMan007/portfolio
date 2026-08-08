"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SparklesDoodle, ConstellationDoodle } from "./DoodleSVGs";

export const PlacidusAiPreview = () => {
  const [selectedZodiac, setSelectedZodiac] = useState("Leo");
  const [selectedPlanet, setSelectedPlanet] = useState("Sun");

  const zodiacData: Record<
    string,
    { symbol: string; element: string; ruler: string; insight: string }
  > = {
    Aries: {
      symbol: "♈",
      element: "Fire",
      ruler: "Mars",
      insight: "Diurnal Sect Ruler: High instinctual momentum with courageous leadership in authentic life purpose synthesis.",
    },
    Taurus: {
      symbol: "♉",
      element: "Earth",
      ruler: "Venus",
      insight: "Essential Dignity: Anchored stability, grounding traditional astrological values with tactile creative expression.",
    },
    Gemini: {
      symbol: "♊",
      element: "Air",
      ruler: "Mercury",
      insight: "Chart Ruler Dynamics: Dual mental processing, linking traditional aspect matrices with modern agentic AI logic.",
    },
    Cancer: {
      symbol: "♋",
      element: "Water",
      ruler: "Moon",
      insight: "Nocturnal Sect Ruler: Deep intuitive perception, synthesizing emotional core values with Sun life purpose.",
    },
    Leo: {
      symbol: "♌",
      element: "Fire",
      ruler: "Sun",
      insight: "Diurnal Sect Light: Radiant vital energy, authentic creative authority, and strong Ascendant lord expression.",
    },
    Virgo: {
      symbol: "♍",
      element: "Earth",
      ruler: "Mercury",
      insight: "Precision Dignity: Analytical craftsmanship, high mathematical accuracy in Placidus house cusp calculations.",
    },
    Scorpio: {
      symbol: "♏",
      element: "Water",
      ruler: "Mars",
      insight: "Essential Strength: Transformative depth, unearthing natal core potential through Demetra George sect analysis.",
    },
    Sagittarius: {
      symbol: "♐",
      element: "Fire",
      ruler: "Jupiter",
      insight: "Expansion Dignity: Philosophical seeking, integrating traditional astrology with state-of-the-art Hugging Face models.",
    },
  };

  const current = zodiacData[selectedZodiac] || zodiacData["Leo"];

  return (
    <div className="mt-8 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/90 to-purple-950/90 text-white shadow-2xl border border-purple-500/30 relative overflow-hidden">
      {/* Background Constellation Doodles */}
      <div className="absolute top-4 right-4 opacity-30 animate-pulse">
        <ConstellationDoodle className="w-16 h-16 text-amber-300" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left: Dynamic Interactive SVG Wheel Visualizer */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Outer Zodiac Circle */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="45" fill="rgba(255,255,255,0.03)" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="2" />

            {/* Placidus House Cusps Lines */}
            <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(251, 191, 36, 0.6)" strokeWidth="2" />
            <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(251, 191, 36, 0.6)" strokeWidth="2" />
            <line x1="36" y1="36" x2="164" y2="164" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="164" y1="36" x2="36" y2="164" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />

            {/* Active Planet Marker */}
            <motion.circle
              cx="145"
              cy="70"
              r="8"
              fill="#fbbf24"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.circle
              cx="55"
              cy="130"
              r="6"
              fill="#c084fc"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl">{current.symbol}</span>
            <span className="font-sketch text-lg text-amber-300 font-bold">{selectedZodiac}</span>
            <span className="text-[10px] uppercase tracking-wider text-purple-200">{current.element} Element</span>
          </div>
        </div>

        {/* Right: Live Interactive Astrologer Counselor Engine */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-sketch text-sm">
              <SparklesDoodle className="w-4 h-4" /> Demetra George AI Engine Live Sandbox
            </span>
            <span className="text-xs text-purple-300 font-mono">Hugging Face Qwen-72B</span>
          </div>

          {/* Interactive Zodiac Selector Buttons */}
          <div>
            <p className="text-xs text-purple-200 mb-2 font-sketch text-base">Select Sun / Ascendant Sign:</p>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(zodiacData).map((z) => (
                <button
                  key={z}
                  onClick={() => setSelectedZodiac(z)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    selectedZodiac === z
                      ? "bg-amber-400 text-black shadow-lg scale-105"
                      : "bg-white/10 hover:bg-white/20 text-purple-200"
                  }`}
                >
                  {zodiacData[z].symbol} {z}
                </button>
              ))}
            </div>
          </div>

          {/* Demetra George Synthesis Insight */}
          <div className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-2 backdrop-blur-xs">
            <div className="flex justify-between items-center text-xs text-amber-300 font-mono">
              <span>Sect: Diurnal | Chart Lord: {current.ruler}</span>
              <span>Authentic Self Matrix</span>
            </div>
            <p className="font-sans text-sm text-slate-100 leading-relaxed font-light">
              "{current.insight}"
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
