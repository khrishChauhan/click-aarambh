"use client";

import { motion, Variants } from "framer-motion";
import { GrowthCore } from "./GrowthCore";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
};

export default function Hero() {
  return (
    <section className="relative flex items-center min-h-screen overflow-hidden bg-[#061917] noise grid-overlay">

      {/* Layered depth backgrounds */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Far glow — top-right */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#82C21C]/4 rounded-full blur-[200px] translate-x-1/3 -translate-y-1/3" />
        {/* Mid glow — bottom-left */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0d3b36]/60 rounded-full blur-[160px] -translate-x-1/3 translate-y-1/3" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#061917]/0 via-transparent to-[#061917]/80" />
      </div>

      <div className="container relative z-10 grid items-center grid-cols-1 lg:grid-cols-2 gap-8 px-6 pt-32 pb-20 mx-auto max-w-7xl lg:gap-0">

        {/* ── LEFT: Typography ── */}
        <motion.div
          className="flex flex-col justify-center lg:pr-16"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-[#82C21C]" />
            <span className="text-[#82C21C] uppercase tracking-[0.22em] text-[11px] font-bold">
              Not An Agency. A Growth Engine.
            </span>
          </motion.div>

          {/* Headline – massive, tight */}
          <motion.h1 variants={item} className="text-[clamp(3.2rem,8vw,7rem)] font-bold leading-[0.88] tracking-[-0.03em] text-white mb-8">
            Technology<br />
            Driven<br />
            <span className="text-gradient-brand glow-text">Growth.</span>
          </motion.h1>

          {/* Body */}
          <motion.p variants={item} className="text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-white/50 max-w-[420px] mb-12">
            We architect scalable infrastructure, precision marketing, and automation systems — engineered as a single, connected growth engine.
          </motion.p>

          {/* CTA Row */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
            <button
              className="group relative px-8 py-4 text-sm font-bold tracking-wider uppercase bg-[#82C21C] text-[#061917] rounded-lg overflow-hidden focus-visible:ring-2 focus-visible:ring-[#82C21C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061917]"
              style={{ transition: "box-shadow 0.3s ease" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 40px rgba(130,194,28,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
            >
              {/* Shimmer on hover */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                   style={{ transition: "transform 0.6s ease" }} />
              <span className="relative z-10">Initiate Partnership</span>
            </button>

            <button className="px-8 py-4 text-sm font-semibold tracking-wider uppercase text-white/70 rounded-lg border border-white/10 hover:border-white/25 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061917]"
                    style={{ transition: "border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              View Our Work
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={item} className="flex gap-8 mt-16 pt-8 border-t border-white/5">
            {[
              { n: "4+", label: "Years Building" },
              { n: "40+", label: "Systems Shipped" },
              { n: "∞",  label: "Growth Loops Built" },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-[#82C21C] tracking-tight">{stat.n}</div>
                <div className="text-xs text-white/40 tracking-wide mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Visualization ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
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
