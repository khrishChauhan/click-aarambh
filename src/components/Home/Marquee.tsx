"use client";

import { useReducedMotion } from "framer-motion";

const ITEMS = [
  "GROWTH INFRASTRUCTURE",
  "SYSTEM ARCHITECTURE",
  "AUTOMATION ENGINEERING",
  "PERFORMANCE MARKETING",
  "DIGITAL TRANSFORMATION",
  "AI WORKFLOWS",
  "CUSTOM SOFTWARE",
  "ANALYTICS SYSTEMS",
  "REVENUE OPERATIONS",
  "SCALABLE GROWTH",
];

// Duplicate the items exactly once so that the content is 2 sets.
// This allows translateX(-50%) to perfectly shift the view by exactly 1 full set, creating an infinite loop.
const MARQUEE_CONTENT = [...ITEMS, ...ITEMS];

export default function Marquee() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section className="relative flex flex-col items-center pt-8 pb-16">
      
      {/* 
        The main Marquee container 
        Height fixed to 100px. Obsidian background with noise and grid.
      */}
      <div 
        className="group relative flex h-[100px] w-full items-center overflow-hidden border-y border-white/5 bg-[#061917] noise grid-overlay shadow-brand-intense"
        aria-label="Live System Status"
      >
        {/* Top Border Light Pulse */}
        {!reducedMotion && (
          <div className="absolute top-0 left-0 h-px w-[200px] bg-gradient-to-r from-transparent via-[#82C21C] to-transparent animate-border-pulse" />
        )}

        {/* Soft Moving Light Sweep */}
        {!reducedMotion && (
          <div className="pointer-events-none absolute inset-y-0 w-[400px] bg-[radial-gradient(ellipse_at_center,rgba(130,194,28,0.15)_0%,transparent_70%)] mix-blend-screen animate-light-sweep" />
        )}

        {/* 
          Layer 2 (Background Parallax):
          Oversized, faint typography moving slower. 
          We use style={{ animationDuration: '90s' }} for slow speed.
        */}
        <div 
          className={`absolute inset-0 flex w-max flex-shrink-0 items-center whitespace-nowrap opacity-[0.03] marquee-track`}
          style={reducedMotion ? {} : { animation: "marquee-scroll 90s linear infinite" }}
          aria-hidden="true"
        >
          {MARQUEE_CONTENT.map((item, idx) => (
            <div key={`bg-${idx}`} className="flex items-center">
              <span className="mx-8 font-mono text-[clamp(4rem,8vw,6rem)] font-extrabold uppercase leading-none text-white">
                {item.split(" ")[0]} {/* Just use the first word for massive background impact */}
              </span>
              <span className="mx-8 text-[#82C21C]">✦</span>
            </div>
          ))}
        </div>

        {/* 
          Layer 1 (Foreground Main):
          Primary scrolling text.
        */}
        <div 
          className={`relative z-10 flex w-max flex-shrink-0 items-center whitespace-nowrap marquee-track`}
          style={reducedMotion ? {} : { animation: "marquee-scroll 35s linear infinite" }}
        >
          {MARQUEE_CONTENT.map((item, idx) => (
            <div key={`fg-${idx}`} className="flex items-center transition-opacity duration-300 group-hover:opacity-70 hover:!opacity-100 cursor-default">
              <span className="mx-12 font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-white/70">
                {item}
              </span>
              <span className="text-[10px] text-[#82C21C]">✦</span>
            </div>
          ))}
        </div>

      </div>

      {/* Trust Indicator Bridge */}
      <div className="mt-6 flex w-full justify-center">
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
          Trusted By Growing Businesses Across India
        </p>
      </div>

    </section>
  );
}
