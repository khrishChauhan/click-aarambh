"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { EASE } from "@/lib/motion";

/* ── Animated grid overlay ─────────────────────────────────────── */
/* Moves slowly upward using transform — GPU-accelerated.          */
function AnimatedGrid({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-x-0 top-[-100%] h-[300%]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          animation: reducedMotion ? "none" : "grid-drift 30s linear infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}

/* ── Main CTA Component ────────────────────────────────────────── */
export default function AboutCTA() {
  const reducedMotion = useReducedMotion() ?? false;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.18,
        delayChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: EASE },
    },
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#001715] pb-[20vh] pt-[25vh]"
      aria-label="Final Call to Action"
    >
      {/* ── Animated grid texture ──────────────────────────── */}
      <AnimatedGrid reducedMotion={reducedMotion} />

      {/* ── Ambient emerald glow ──────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vw] w-[80vw] max-h-[800px] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(156,223,59,0.08) 0%, transparent 60%)",
          filter: "blur(80px)",
          animation: reducedMotion
            ? "none"
            : "glow-breath 10s ease-in-out infinite",
        }}
      />

      {/* ── Content ───────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          {/* Eyebrow */}
          <motion.div
            className="mb-10 flex items-center justify-center gap-3"
            variants={itemVariants}
          >
            <div className="h-px w-8 bg-[#9CDF3B] opacity-40" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#9CDF3B]/50">
              [ Ready To Build ]
            </span>
            <div className="h-px w-8 bg-[#9CDF3B] opacity-40" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="mb-8 font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
            variants={itemVariants}
          >
            Let&apos;s Build Something{" "}
            <span
              className="text-[#9CDF3B]"
              style={{
                textShadow: reducedMotion
                  ? "none"
                  : "0 0 40px rgba(156,223,59,0.25)",
              }}
            >
              That Scales.
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            className="mb-14 text-[clamp(1.05rem,1.6vw,1.2rem)] leading-relaxed text-white/50"
            variants={itemVariants}
          >
            Whether you&apos;re building from scratch, scaling operations, or
            modernizing existing systems, we&apos;ll help you create the
            foundation for sustainable growth.
          </motion.p>

          {/* Glass CTA Button */}
          <motion.div variants={itemVariants}>
            <Link
              href="/contact"
              id="about-cta-button"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl px-8 py-4 text-[1.05rem] font-semibold transition-all duration-300"
              style={{
                background: "rgba(8,34,32,0.5)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(156,223,59,0.25)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 0 rgba(156,223,59,0)",
                color: "#9CDF3B",
              }}
              onMouseEnter={(e) => {
                if (reducedMotion) return;
                const el = e.currentTarget;
                el.style.borderColor = "rgba(156,223,59,0.6)";
                el.style.boxShadow =
                  "inset 0 1px 0 rgba(255,255,255,0.12), 0 0 30px rgba(156,223,59,0.15)";
                el.style.color = "#ffffff";
                el.style.background = "rgba(8,34,32,0.75)";
              }}
              onMouseLeave={(e) => {
                if (reducedMotion) return;
                const el = e.currentTarget;
                el.style.borderColor = "rgba(156,223,59,0.25)";
                el.style.boxShadow =
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 0 rgba(156,223,59,0)";
                el.style.color = "#9CDF3B";
                el.style.background = "rgba(8,34,32,0.5)";
              }}
            >
              Start Your Growth Journey
              {/* Arrow icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M3.75 9H14.25M14.25 9L10.125 4.875M14.25 9L10.125 13.125"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Micro-trust label */}
          <motion.p
            className="mt-6 font-mono text-[9px] uppercase tracking-[0.2em] text-[#9CDF3B]/30"
            variants={itemVariants}
          >
            [ Secure Enterprise Consultation ]
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
