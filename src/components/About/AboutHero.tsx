"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useDecryptText } from "@/hooks/useDecryptText";

/* ─── Shared easing — same premium cubic bezier as homepage ─── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Framer Motion variant factory ───────────────────────────── */
const fadeUp = (delay: number, y = 20) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

/* ─── The isolated decrypt span ────────────────────────────────── */
function DecryptWord({
  word,
  delay,
  reducedMotion,
}: {
  word: string;
  delay: number;
  reducedMotion: boolean;
}) {
  // Hook fires after `delay` ms and scrambles for 600 ms before locking.
  const display = useDecryptText({
    word,
    duration: 600,
    interval: 40,
    startDelay: reducedMotion ? 0 : delay,
  });

  return (
    <span
      className="text-[#9CDF3B]"
      style={{
        textShadow: reducedMotion
          ? "none"
          : "0 0 40px rgba(156, 223, 59, 0.35), 0 0 80px rgba(156, 223, 59, 0.12)",
        fontVariantNumeric: "tabular-nums",
        fontFamily: "inherit",
      }}
      aria-label={word}
    >
      {display}
    </span>
  );
}

/* ─── Main Hero component ───────────────────────────────────────── */
export default function AboutHero() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#001715]"
      aria-label="About Hero"
    >
      {/* ── Layer 1: Ambient Emerald Glow ── */}
      {/* Fades in at T=1.20s, then breathes on an infinite 8s loop.   */}
      {/* Sits BEHIND the content; purely atmospheric.                  */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          animation: reducedMotion
            ? "none"
            : "glow-fade-in 0.8s ease-out 1.2s both, glow-breath 8s ease-in-out 2s infinite",
        }}
      >
        <div
          className="h-[700px] w-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(156,223,59,0.12) 0%, rgba(156,223,59,0.04) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ── Layer 2: Vertical Scan-Line ── */}
      {/* A single 2px-wide gradient band travelling downward,          */}
      {/* at 2% max opacity. 25s per cycle, infinite.                   */}
      {/* Disabled entirely for prefers-reduced-motion.                 */}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute left-0 right-0 h-[30vh]"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(156,223,59,0.02) 50%, transparent 100%)",
              animation: "scan-line 25s linear 1.5s infinite",
              willChange: "transform",
            }}
          />
        </div>
      )}

      {/* ── Layer 3: Editorial Content ── */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">

        {/* Eyebrow — T=0.15s */}
        <motion.div
          {...fadeUp(reducedMotion ? 0 : 0.15, 10)}
          className="mb-10 flex items-center gap-3"
          aria-label="Eyebrow label"
        >
          <div
            className="h-px w-8 bg-[#9CDF3B]"
            style={{ opacity: 0.5 }}
          />
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#9CDF3B]/70"
          >
            [ SYSTEM ARCHITECTS ]
          </span>
          <div
            className="h-px w-8 bg-[#9CDF3B]"
            style={{ opacity: 0.5 }}
          />
        </motion.div>

        {/* Headline — T=0.30s */}
        {/* Only the word "Growth" undergoes the decrypt effect.         */}
        <motion.h1
          {...fadeUp(reducedMotion ? 0 : 0.3, 24)}
          className="mb-10 text-[clamp(3rem,8vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-white"
        >
          We Build{" "}
          <DecryptWord
            word="Growth"
            /* Decrypt starts at T=0.30s, runs 0.60s, locks at T=0.90s */
            delay={300}
            reducedMotion={reducedMotion}
          />{" "}
          Infrastructure.
        </motion.h1>

        {/* Subheadline — T=1.00s */}
        <motion.p
          {...fadeUp(reducedMotion ? 0 : 1.0, 16)}
          className="max-w-[600px] text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed text-white/50"
        >
          Beyond websites, campaigns, and automation.{" "}
          <br className="hidden sm:block" />
          We design connected growth systems that help ambitious businesses scale
          with clarity, speed, and measurable results.
        </motion.p>

        {/* Subtle scroll indicator — visible only on desktop */}
        <motion.div
          {...fadeUp(reducedMotion ? 0 : 1.6, 8)}
          className="mt-20 hidden flex-col items-center gap-2 md:flex"
          aria-hidden="true"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">
            scroll
          </span>
          <div className="h-8 w-px overflow-hidden bg-white/5">
            <div
              className="h-1/2 w-full bg-[#9CDF3B]/40"
              style={{
                animation: reducedMotion
                  ? "none"
                  : "scan-line 2s ease-in-out infinite",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
