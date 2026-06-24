"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useDataScramble } from "@/hooks/useDataScramble";
import { EASE } from "@/lib/motion";
import { useEffect, useState } from "react";

const DATA_POINTS = [
  "SYS.ARCH // ARR +120%",
  "RETENTION_VAL // 40% INC",
  "INFRA.SCALE // LATENCY -80%",
  "ACQUISITION_CAC // -35%",
];

export default function WorkHero() {
  const reducedMotion = useReducedMotion() ?? false;
  
  // Ticker state
  const [tickerIndex, setTickerIndex] = useState(0);
  const scrambledTicker = useDataScramble(
    DATA_POINTS[tickerIndex],
    800, // duration
    0, // delay
    !reducedMotion
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % DATA_POINTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#04110F] px-6 md:px-12 lg:px-24"
      aria-label="Work Hero"
    >
      {/* Structural background grid (no distortion, precise architectural lines) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl text-center">
        <motion.h1
          className="mx-auto max-w-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        >
          We Build Systems That Yield Outcomes.
        </motion.h1>

        <motion.p
          className="mx-auto mt-8 max-w-[500px] text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.6] text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
        >
          Not isolated campaigns. Not disconnected tools. We engineer interconnected architectures designed specifically for business scale.
        </motion.p>
      </div>

      {/* Pinned Data Ticker at the bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex h-16 items-center border-t border-white/5 bg-[#04110F]/80 px-6 backdrop-blur-md md:px-12 lg:px-24">
        <div className="flex w-full items-center justify-between font-mono text-[11px] font-bold tracking-[0.2em]">
          <span className="text-white/30 uppercase hidden md:inline-block">Live Telemetry</span>
          <span className="text-[#9CDF3B]">{scrambledTicker}</span>
          <span className="text-white/30 uppercase hidden md:inline-block">System Status: Optimal</span>
        </div>
      </div>
    </section>
  );
}
