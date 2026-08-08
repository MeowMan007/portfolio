import React from "react";

export const StarDoodle = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export const CircleDoodle = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
    <path d="M50 10 C 80 10, 95 30, 90 60 C 85 90, 60 95, 30 90 C 5 85, 5 50, 20 25 C 35 5, 70 5, 85 20" />
  </svg>
);

export const AsteriskDoodle = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
  </svg>
);

export const ArrowDoodle = ({ className = "w-6 h-6", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 40 C 20 35, 35 25, 40 10" />
    <path d="M25 12 L 40 10 L 38 25" />
  </svg>
);

export const UnderlineDoodle = ({ className = "w-full h-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 20" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
    <path d="M5 12 C 50 18, 150 2, 195 12 C 140 16, 60 8, 10 14" />
  </svg>
);

export const SparklesDoodle = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
  </svg>
);

export const ConstellationDoodle = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <circle cx="20" cy="20" r="4" fill="currentColor" />
    <circle cx="50" cy="30" r="4" fill="currentColor" />
    <circle cx="80" cy="20" r="4" fill="currentColor" />
    <circle cx="35" cy="70" r="4" fill="currentColor" />
    <circle cx="75" cy="80" r="4" fill="currentColor" />
    <path d="M20 20 L50 30 L80 20 M50 30 L35 70 L75 80" />
  </svg>
);

export const CrownDoodle = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M2 18h20L19 7l-5 4-2-7-2 7-5-4z" />
  </svg>
);

export const LightbulbDoodle = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
  </svg>
);
