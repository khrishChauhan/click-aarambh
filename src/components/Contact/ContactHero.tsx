"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useDataScramble } from "@/hooks/useDataScramble";
import { EASE } from "@/lib/motion";

export default function ContactHero() {
  const reducedMotion = useReducedMotion() ?? false;
  
  // Scramble the key word
  const scrambledScales = useDataScramble("Scales.", 800, 400, !reducedMotion);

  return (
    <section className="relative flex flex-col items-center justify-center bg-transparent px-6 pt-40 pb-16 md:px-12 lg:px-24">
      {/* Ambient Emerald Glow directly behind text */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40vh] w-[60vw] rounded-full bg-[#82C21C] opacity-[0.05] blur-[100px]" 
      />

      <div className="relative z-10 w-full max-w-4xl text-center">
        <motion.p
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#82C21C]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Partnership Initiation
        </motion.p>

        <motion.h1
          className="mx-auto font-extrabold leading-[1.05] tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
        >
          Let&apos;s Build Something That <br className="hidden md:block" />
          <span className="text-[#82C21C] inline-block min-w-[3em] text-left">
            {scrambledScales}
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-8 max-w-2xl text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.6] text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
        >
          We don&apos;t just write code or launch campaigns. We architect interconnected growth systems designed to solve your most complex bottlenecks. Tell us where the friction is.
        </motion.p>
      </div>
    </section>
  );
}
