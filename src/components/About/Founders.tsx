"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

/* ── Founder data ─────────────────────────────────────────────── */
const FOUNDER = {
  name: "Abhishek Kumar",
  title: "Founder & Growth Architect",
  shortStory:
    "Built to challenge the fragmented agency model. Click Aarambh was founded on the premise that business growth cannot be delegated to disconnected specialists — it requires a unified system that aligns software, strategy, and data into one coherent engine.",
  experience: [
    "Full-stack product development",
    "Growth automation & systems design",
    "Digital-first market expansion",
    "Cross-functional technical leadership",
  ],
  vision:
    "A world where ambitious businesses have access to the same interconnected, data-driven infrastructure that enterprise conglomerates use — without the overhead.",
  status: "Available for Consultation",
  focus: "Growth Systems Architecture",
};

/* ── Portrait placeholder layers ────────────────────────────────
   Color layer (always present) sits beneath a grayscale overlay
   layer whose opacity animates on hover. Only opacity is animated
   — always GPU-composited, never causes a paint. No filter jank. */
function PortraitContent({ aria }: { aria?: boolean }) {
  return (
    <>
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #0f2e2b 0%, #061917 40%, #020f0d 100%)",
        }}
      />
      {/* Large initials watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="select-none font-extrabold tracking-[-0.04em] text-white/10"
          style={{ fontSize: "clamp(5rem,15vw,12rem)" }}
          aria-hidden="true"
        >
          AK
        </span>
      </div>
      {/* Noise texture */}
      {!aria && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            opacity: 0.04,
          }}
        />
      )}
    </>
  );
}

/* ── Founder Portrait ──────────────────────────────────────────── */
function FounderPortrait({ reducedMotion }: { reducedMotion: boolean }) {
  const containerRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);

  /* CSS custom-property spotlight — zero React re-renders on move */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      containerRef.current.style.setProperty("--mouse-x", `${x}%`);
      containerRef.current.style.setProperty("--mouse-y", `${y}%`);
    },
    [reducedMotion]
  );

  return (
    /* figure + figcaption: correct semantic pattern for a portrait.
       Screen readers announce the caption, not the decorative bg.  */
    <figure
      ref={containerRef}
      /* aspect-[4/3] on mobile (short, not a tall column),
         aspect-[3/4] on md+ (editorial portrait orientation).     */
      className="relative overflow-hidden aspect-[4/3] md:aspect-[3/4]"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
        } as React.CSSProperties
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Color base layer (always visible, bottom of stack) ── */}
      <div className="absolute inset-0">
        <PortraitContent />
      </div>

      {/* ── Grayscale overlay layer ───────────────────────────── */}
      {/* Static filter (never animated) + animated opacity only. */}
      {/* Opacity is always GPU-composited — no paint, no jank.   */}
      <motion.div
        className="absolute inset-0"
        style={{
          filter: "grayscale(100%) contrast(1.15) brightness(0.8)",
        }}
        animate={{ opacity: reducedMotion ? 0 : hovered ? 0 : 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        aria-hidden="true"
      >
        <PortraitContent aria />
      </motion.div>

      {/* ── Spotlight glow (cursor-tracked radial) ────────────── */}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background:
              "radial-gradient(circle 150px at var(--mouse-x) var(--mouse-y), rgba(156,223,59,0.07) 0%, transparent 70%)",
          }}
        />
      )}

      {/* ── Hover border accent ───────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border"
        animate={{
          borderColor:
            hovered && !reducedMotion
              ? "rgba(156,223,59,0.3)"
              : "rgba(255,255,255,0.05)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* ── Glass Information Drawer ─────────────────────────── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/5 px-6 py-5"
        style={{
          background: "rgba(8,34,32,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        initial={{ y: "100%", opacity: 0 }}
        animate={
          hovered && !reducedMotion
            ? { y: "0%", opacity: 1 }
            : { y: "100%", opacity: 0 }
        }
        transition={{ duration: 0.5, ease: EASE }}
        aria-hidden="true"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#9CDF3B]/60">
              Status
            </p>
            <p className="mt-1 text-[11px] font-medium text-white/80">
              {FOUNDER.status}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#9CDF3B]/60">
              Focus
            </p>
            <p className="mt-1 text-[11px] font-medium text-white/80">
              {FOUNDER.focus}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Accessible caption — screen readers read this instead of */}
      {/* attempting to interpret the decorative gradient layers.  */}
      <figcaption className="sr-only">
        Portrait of {FOUNDER.name}, {FOUNDER.title} at Click Aarambh
      </figcaption>
    </figure>
  );
}

/* ── Typographic data blocks ─────────────────────────────────── */
function FounderData({ reducedMotion }: { reducedMotion: boolean }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.12,
        delayChildren: reducedMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE },
    },
  };

  return (
    <motion.div
      className="flex h-full flex-col justify-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Section eyebrow */}
      <motion.div
        className="mb-10 flex items-center gap-3"
        variants={itemVariants}
      >
        <div className="h-px w-6 bg-[#9CDF3B] opacity-50" />
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#9CDF3B]/60">
          [ Meet The Team ]
        </span>
      </motion.div>

      {/* Name */}
      <motion.h2
        className="mb-2 font-extrabold leading-[1] tracking-[-0.04em] text-white"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        variants={itemVariants}
      >
        {FOUNDER.name}
      </motion.h2>

      {/* Title */}
      <motion.p
        className="mb-10 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#9CDF3B]"
        variants={itemVariants}
      >
        {FOUNDER.title}
      </motion.p>

      {/* Background */}
      <motion.div
        className="mb-12 border-t border-white/5 pt-8"
        variants={itemVariants}
      >
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
          Background
        </p>
        <p className="text-[clamp(1rem,1.3vw,1.1rem)] leading-[1.7] text-white/60">
          {FOUNDER.shortStory}
        </p>
      </motion.div>

      {/* Expertise */}
      <motion.div
        className="mb-12 border-t border-white/5 pt-8"
        variants={itemVariants}
      >
        <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
          Expertise
        </p>
        <ul className="space-y-2">
          {FOUNDER.experience.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span
                className="h-px w-4 flex-shrink-0"
                style={{ background: "rgba(156,223,59,0.5)" }}
              />
              <span className="text-[0.95rem] text-white/70">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Vision */}
      <motion.div
        className="border-t border-white/5 pt-8"
        variants={itemVariants}
      >
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
          Vision
        </p>
        <p className="text-[clamp(0.95rem,1.2vw,1.05rem)] leading-[1.7] italic text-white/50">
          &ldquo;{FOUNDER.vision}&rdquo;
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Founders component ─────────────────────────────────── */
export default function Founders() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      className="relative w-full py-[20vh]"
      aria-label="Meet The Team"
    >
      {/* ── Ambient glow — clipped by own wrapper ─────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute right-[-5%] top-[10%] h-[70vh] w-[50vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(156,223,59,0.05) 0%, transparent 65%)",
            filter: "blur(80px)",
            animation: reducedMotion
              ? "none"
              : "glow-breath 10s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Main layout grid ─────────────────────────────────── */}
      {/* Portrait is order-2 on mobile (below data), order-1 on  */}
      {/* desktop (left column). DOM order: Data first, Portrait  */}
      {/* second. CSS order flips them on md+.                    */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:gap-12 md:px-12 lg:gap-24 lg:px-24">

        {/* DATA — order-1 on all breakpoints (shown first on mobile) */}
        <div className="w-full order-1">
          <FounderData reducedMotion={reducedMotion} />
        </div>

        {/* PORTRAIT — order-2 on mobile, order-first on md+ */}
        <motion.div
          className="w-full order-2 md:order-first"
          initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
          whileInView={{
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
          }}
          viewport={{ once: true, amount: 0.15 }}
          transition={
            reducedMotion ? { duration: 0 } : { duration: 1.1, ease: EASE }
          }
        >
          <FounderPortrait reducedMotion={reducedMotion} />
        </motion.div>
      </div>
    </section>
  );
}
