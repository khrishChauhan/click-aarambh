"use client";

import { motion } from "framer-motion";
import { GrowthCore } from "./GrowthCore";

/* Shared easing — premium cubic bezier matching Framer/Linear */
const EASE = [0.23, 1, 0.32, 1] as const;

/* Reusable reveal props factory */
const reveal = (delay: number, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: EASE },
});

export default function Hero() {
  return (
    <section className="relative flex items-center min-h-screen overflow-hidden bg-[#061917] noise grid-overlay">

      {/* ── Layered depth backgrounds ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#82C21C]/[0.035] rounded-full blur-[200px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0d3b36]/60 rounded-full blur-[160px] -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061917]/0 via-transparent to-[#061917]/80" />
      </div>

      <div className="container relative z-10 grid items-center grid-cols-1 lg:grid-cols-2 gap-8 px-6 pt-32 pb-20 mx-auto max-w-7xl lg:gap-0">

        {/* ── LEFT — Typography with cinematic staggered entrance ── */}
        <div className="flex flex-col justify-center lg:pr-16">

          {/* 1 — Eyebrow: 0.10s */}
          <motion.div {...reveal(0.10, 16)} className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-[#82C21C]" />
            <span className="text-[#82C21C] uppercase tracking-[0.22em] text-[11px] font-bold">
              Not An Agency. A Growth Engine.
            </span>
          </motion.div>

          {/* 2-4 — Headline lines: 0.35 / 0.50 / 0.65s */}
          <h1 className="text-[clamp(3.2rem,8vw,7rem)] font-bold leading-[0.88] tracking-[-0.03em] text-white mb-8">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: EASE }}
            >
              Technology
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.50, ease: EASE }}
            >
              Driven
            </motion.span>
            <motion.span
              className="block text-gradient-brand glow-text"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.65, ease: EASE }}
            >
              Growth.
            </motion.span>
          </h1>

          {/* 5 — Body: 0.85s */}
          <motion.p {...reveal(0.85)} className="text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-white/50 max-w-[420px] mb-12">
            We architect scalable infrastructure, precision marketing, and automation
            systems — engineered as a single, connected growth engine.
          </motion.p>

          {/* 6 — CTAs: 1.05s */}
          <motion.div {...reveal(1.05, 16)} className="flex flex-col sm:flex-row gap-4">
            <button
              className="group relative px-8 py-4 text-sm font-bold tracking-wider uppercase bg-[#82C21C] text-[#061917] rounded-lg overflow-hidden focus-visible:ring-2 focus-visible:ring-[#82C21C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061917]"
              style={{ transition: "box-shadow 0.3s ease" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 40px rgba(130,194,28,0.55)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
            >
              <div
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                style={{ transition: "transform 0.6s ease" }}
              />
              <span className="relative z-10">Initiate Partnership</span>
            </button>

            <button
              className="px-8 py-4 text-sm font-semibold tracking-wider uppercase text-white/70 rounded-lg border border-white/10 hover:border-white/25 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061917]"
              style={{ transition: "border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              View Our Work
            </button>
          </motion.div>

          {/* 7 — Stats row: 1.25s */}
          <motion.div {...reveal(1.25, 12)} className="flex gap-8 mt-16 pt-8 border-t border-white/5">
            {[
              { n: "4+",  label: "Years Building"    },
              { n: "40+", label: "Systems Shipped"   },
              { n: "∞",   label: "Growth Loops Built" },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-[#82C21C] tracking-tight">{stat.n}</div>
                <div className="text-xs text-white/40 tracking-wide mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT — Growth Engine visualization: 1.45s ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 1.45, ease: EASE }}
          className="relative flex items-center justify-center w-full"
        >
          <GrowthCore />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#061917] to-transparent pointer-events-none" />
    </section>
  );
}
