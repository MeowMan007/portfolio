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
