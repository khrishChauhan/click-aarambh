"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { EASE } from "@/lib/motion";

export default function WorkCTA() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section className="relative flex min-h-[70vh] w-full items-center justify-center bg-[#04110F] px-6 py-24 md:px-12 lg:px-24 overflow-hidden">
      
      {/* Structural background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <motion.div 
        className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
        whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, clipPath: "circle(150% at 50% 50%)" }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.5, ease: EASE }}
      >
        <h2 className="mb-12 font-extrabold leading-[1.05] tracking-[-0.04em] text-white" style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
          Ready to scale?
        </h2>

        {/* Premium Enterprise CTA Button */}
        <Link
          href="/contact"
          className="group relative inline-flex items-center justify-center overflow-hidden bg-black px-12 py-5 transition-all duration-300"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(156,223,59,0.4)",
          }}
        >
          {/* Subtle directional bottom glow */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#9CDF3B] opacity-40 shadow-[0_0_20px_rgba(156,223,59,0.8)] transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Border Snap on Hover */}
          <div className="absolute inset-0 border border-[#9CDF3B] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Text with tightening letter-spacing on hover */}
          <span className="relative z-10 font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-[#9CDF3B] transition-all duration-300 group-hover:tracking-[0.18em]">
            Initiate Project
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
