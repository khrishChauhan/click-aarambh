"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ── Founder data ─────────────────────────────────────────────── */
const FOUNDER = {
  name: "Khrish Chauhan",
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
  location: "India",
  focus: "Growth Systems Architecture",
};

/* ── Framer Motion shared easing ─────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Spotlight Effect logic ─────────────────────────────────────
   Uses CSS custom properties updated via onMouseMove to drive a
   radial glow at the cursor position — zero React re-renders.    */
function FounderPortrait({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ aspectRatio: "3/4", "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Spotlight glow layer ──────────────────────────────── */}
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

      {/* ── Portrait image: grayscale → color on hover ──────── */}
      {/*   Using a styled placeholder — replace src with real   */}
      {/*   founder photo when available.                        */}
      <motion.div
        className="relative h-full w-full overflow-hidden"
        animate={{
          filter: reducedMotion
            ? "none"
            : hovered
            ? "grayscale(0%) contrast(1)"
            : "grayscale(100%) contrast(1.15) brightness(0.85)",
        }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {/* Portrait placeholder — dark gradient with noise texture */}
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(160deg, #0f2e2b 0%, #061917 40%, #020f0d 100%)",
          }}
          aria-label="Founder portrait placeholder"
        />

        {/* Initials overlay on the placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-extrabold tracking-[-0.04em] text-white/10 select-none"
            style={{ fontSize: "clamp(5rem,15vw,12rem)" }}
            aria-hidden="true"
          >
            KC
          </span>
        </div>

        {/* Subtle noise texture on top */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            opacity: 0.04,
          }}
        />
      </motion.div>

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

      {/* ── Hover border accent ───────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border"
        animate={{
          borderColor: hovered && !reducedMotion
            ? "rgba(156,223,59,0.3)"
            : "rgba(255,255,255,0.05)",
        }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

/* ── Typographic data blocks ─────────────────────────────────── */
function FounderData({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
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
      <motion.div className="mb-10 flex items-center gap-3" variants={itemVariants}>
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

      {/* Short Story */}
      <motion.div
        className="mb-12 border-t border-white/5 pt-8"
        variants={itemVariants}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 mb-3">
          Background
        </p>
        <p className="text-[clamp(1rem,1.3vw,1.1rem)] leading-[1.7] text-white/60">
          {FOUNDER.shortStory}
        </p>
      </motion.div>

      {/* Experience */}
      <motion.div
        className="mb-12 border-t border-white/5 pt-8"
        variants={itemVariants}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 mb-4">
          Expertise
        </p>
        <ul className="space-y-2">
          {FOUNDER.experience.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
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
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 mb-3">
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
      className="relative w-full overflow-hidden bg-[#001715] py-[20vh]"
      aria-label="Meet The Team"
    >
      {/* ── Ambient glow ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5%] top-[10%] h-[70vh] w-[50vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(156,223,59,0.05) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: reducedMotion
            ? "none"
            : "glow-breath 10s ease-in-out infinite",
        }}
      />

      {/* ── Main grid ────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:gap-12 md:px-12 lg:gap-24 lg:px-24">

        {/* LEFT: Portrait */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
          whileInView={{
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
          }}
          viewport={{ once: true, amount: 0.15 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 1.1, ease: EASE }
          }
        >
          <FounderPortrait reducedMotion={reducedMotion} />
        </motion.div>

        {/* RIGHT: Data */}
        <div className="w-full">
          <FounderData reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
