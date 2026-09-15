"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const reveal = (delay: number, y = 20) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-36 pb-16 md:pt-44 md:pb-24 border-b border-[#0D2E26]/10 grid-overlay">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#70BA28]/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div {...reveal(0.1, 14)} className="flex items-center gap-3 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-[#70BA28]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#2E4D45]">
              Intelligence & Engineering Perspectives
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...reveal(0.2, 24)}
            className="text-[clamp(2.8rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0D2E26] mb-6"
          >
            Insights &amp; <span className="text-[#70BA28]">Perspectives.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...reveal(0.3, 20)}
            className="text-[clamp(1.05rem,1.8vw,1.25rem)] leading-relaxed text-[#2E4D45] max-w-2xl"
          >
            Our open repository of thoughts on high-performance software engineering, autonomous
            telemetry, data systems, and sustainable venture growth engines.
          </motion.p>

          {/* Metadata badges */}
          <motion.div
            {...reveal(0.4, 16)}
            className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-[#0D2E26]/10 text-xs font-mono text-[#4B635D]"
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#70BA28]" />
              <span>Fullstack Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#70BA28]" />
              <span>Data &amp; Automation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#70BA28]" />
              <span>Venture Growth Loops</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
