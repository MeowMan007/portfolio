"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-notebook-light dark:bg-notebook-dark"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="font-sketch text-4xl text-ink-dark dark:text-ink-light animate-bounce">
              🍃
            </div>
            <p className="font-sketch text-xl text-slate-500">Opening Arshal's Portfolio...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
