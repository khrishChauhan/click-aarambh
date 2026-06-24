"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { EASE } from "@/lib/motion";

export default function ContactCTA() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section className="relative flex min-h-[80vh] w-full items-center justify-center bg-[#04110F] px-6 py-24 md:px-12 lg:px-24 overflow-hidden border-t border-white/5">
      
      {/* Structural background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      
      {/* Harsh Ambient Radial Base for Button */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-[#82C21C] opacity-10 blur-[80px]" 
      />

      <motion.div 
        className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
        whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, clipPath: "circle(150% at 50% 50%)" }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.5, ease: EASE }}
      >
        <h2 className="mb-12 font-extrabold leading-[1.05] tracking-[-0.04em] text-white" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
          Ready To Turn Ideas <br className="hidden md:block" />
          Into Infrastructure?
        </h2>

        {/* Premium Enterprise CTA Button */}
        <Link
          href="/contact"
          className="group relative inline-flex items-center justify-center overflow-hidden bg-black px-12 py-5 rounded-xl transition-all duration-300"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(130,194,28,0.4), 0 0 30px rgba(130,194,28,0.1)",
          }}
        >
          {/* Subtle directional bottom glow */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#82C21C] opacity-40 shadow-[0_0_20px_rgba(130,194,28,0.8)] transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Border Snap on Hover */}
          <div className="absolute inset-0 rounded-xl border border-[#82C21C] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Text with tightening letter-spacing on hover */}
          <span className="relative z-10 font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-[#82C21C] transition-all duration-300 group-hover:tracking-[0.18em]">
            Start Your Growth Journey
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
