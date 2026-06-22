"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

/* ─── Data ──────────────────────────────────────────────────────── */

const NODES = [
  { id: "software",  label: "Software",     desc: "Scalable infrastructure",    x: 50, y: 8  },
  { id: "marketing", label: "Marketing",    desc: "Precision acquisition",       x: 90, y: 40 },
  { id: "automation",label: "Automation",   desc: "Zero-friction workflows",     x: 74, y: 88 },
  { id: "expansion", label: "Expansion",    desc: "New market penetration",      x: 26, y: 88 },
  { id: "bizdev",    label: "Business Dev", desc: "Unified growth architecture", x: 10, y: 40 },
];

const METRICS = [
  { id: "revenue",  value: "+312%", label: "Revenue Growth",    left: "4%",  top: "18%", dur: 4.2, delay: 2.1 },
  { id: "uptime",   value: "99.99%",label: "Uptime SLA",        left: "66%", top: "6%",  dur: 5.1, delay: 2.35 },
  { id: "ops",      value: "4×",    label: "Faster Operations", left: "66%", top: "78%", dur: 4.8, delay: 2.55 },
  { id: "auto",     value: "24/7",  label: "Automation Active", left: "2%",  top: "64%", dur: 5.6, delay: 2.75 },
];

/* Particle configs per edge — two going node→core, one going core→node */
const PARTICLES = [
  { kp: "0;1", dur: "2.2s", begin: "0s"   },
  { kp: "1;0", dur: "3.0s", begin: "0.9s" },
  { kp: "0;1", dur: "3.8s", begin: "1.8s" },
];

/* ─── Component ─────────────────────────────────────────────────── */

export const GrowthCore = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  /* Raw normalised mouse position [-0.5 … +0.5] */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  /* ── 6 parallax layers, each with independent spring config ──── */

  /* Layer 1 — background grid (×10) */
  const l1x = useSpring(useTransform(rawX, v => v * 10), { stiffness: 20, damping: 40 });
  const l1y = useSpring(useTransform(rawY, v => v * 10), { stiffness: 20, damping: 40 });

  /* Layer 2 — orbital rings (×20) */
  const l2x = useSpring(useTransform(rawX, v => v * 20), { stiffness: 25, damping: 35 });
  const l2y = useSpring(useTransform(rawY, v => v * 20), { stiffness: 25, damping: 35 });

  /* Layer 3 — connection lines SVG (×35) */
  const l3x = useSpring(useTransform(rawX, v => v * 35), { stiffness: 30, damping: 28 });
  const l3y = useSpring(useTransform(rawY, v => v * 35), { stiffness: 30, damping: 28 });

  /* Layer 4 — nodes (×50) */
  const l4x = useSpring(useTransform(rawX, v => v * 50), { stiffness: 35, damping: 22 });
  const l4y = useSpring(useTransform(rawY, v => v * 50), { stiffness: 35, damping: 22 });

  /* Layer 5 — core orb (×65) */
  const l5x = useSpring(useTransform(rawX, v => v * 65), { stiffness: 40, damping: 18 });
  const l5y = useSpring(useTransform(rawY, v => v * 65), { stiffness: 40, damping: 18 });

  /* Layer 6 — metric chips (×25) */
  const l6x = useSpring(useTransform(rawX, v => v * 25), { stiffness: 28, damping: 32 });
  const l6y = useSpring(useTransform(rawY, v => v * 25), { stiffness: 28, damping: 32 });

  /* Mouse handlers — only normalise, never directly drive position */
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[500px] md:h-[600px] select-none cursor-crosshair"
      aria-label="Growth Engine visualization"
    >

      {/* ── LAYER 1 — Ambient background (depth 10) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: l1x, y: l1y }}
      >
        {/* Deep radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(130,194,28,0.04)_0%,transparent_70%)]" />
        {/* Corner depth glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#82C21C]/[0.015] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0d3b36]/40 rounded-full blur-[80px]" />
      </motion.div>

      {/* ── LAYER 2 — Orbital rings (depth 20) ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ x: l2x, y: l2y }}
      >
        {/* Outer ring — very slow clockwise */}
        <div
          className="absolute rounded-full border border-white/[0.025]"
          style={{
            width: "88%", aspectRatio: "1",
            animation: "spin-slow 60s linear infinite",
          }}
        />
        {/* Middle ring — counter-clockwise, brand colour */}
        <div
          className="absolute rounded-full border border-[#82C21C]/[0.05]"
          style={{
            width: "60%", aspectRatio: "1",
            animation: "spin-slow-reverse 35s linear infinite, ring-pulse 6s ease-in-out infinite",
          }}
        />
        {/* Inner ring — fast clockwise */}
        <div
          className="absolute rounded-full border border-[#82C21C]/[0.09]"
          style={{
            width: "34%", aspectRatio: "1",
            animation: "spin-slow 20s linear infinite, ring-pulse 4s ease-in-out infinite 1.5s",
          }}
        />
      </motion.div>

      {/* ── LAYER 3 — SVG connection lines + animateMotion particles (depth 35) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: l3x, y: l3y }}
      >
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Motion paths used by animateMotion — invisible in defs */}
            {NODES.map(n => (
              <path key={n.id} id={`mp-${n.id}`} d={`M ${n.x} ${n.y} L 50 50`} />
            ))}

            {/* Particle glow filter */}
            <filter id="particleGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Edge glow filter */}
            <filter id="edgeGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="0.3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {NODES.map((node, i) => {
            const isActive = activeNode === node.id;
            return (
              <g key={node.id}>
                {/* Base dim line */}
                <path
                  d={`M ${node.x} ${node.y} L 50 50`}
                  stroke="rgba(130,194,28,0.06)"
                  strokeWidth="0.18"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Active / hover line */}
                <path
                  d={`M ${node.x} ${node.y} L 50 50`}
                  stroke={isActive ? "rgba(130,194,28,0.45)" : "rgba(130,194,28,0.10)"}
                  strokeWidth={isActive ? "0.45" : "0.15"}
                  fill="none"
                  strokeLinecap="round"
                  filter={isActive ? "url(#edgeGlow)" : undefined}
                  style={{ transition: "stroke 0.35s ease, stroke-width 0.35s ease" }}
                />

                {/* animateMotion particles — travel along the motion path */}
                {PARTICLES.map((p, pi) => (
                  <circle
                    key={pi}
                    r="0.72"
                    fill="#82C21C"
                    opacity={isActive ? 1 : 0.45}
                    filter="url(#particleGlow)"
                    style={{ transition: "opacity 0.3s ease" }}
                  >
                    {/* @ts-ignore — animateMotion is valid SVG SMIL */}
                    <animateMotion
                      dur={p.dur}
                      repeatCount="indefinite"
                      begin={`${parseFloat(p.begin) + i * 0.28}s`}
                      keyPoints={p.kp}
                      keyTimes="0;1"
                      calcMode="linear"
                    >
                      {/* @ts-ignore — mpath href is standard SVG2 */}
                      <mpath href={`#mp-${node.id}`} />
                    </animateMotion>
                  </circle>
                ))}
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* ── LAYER 4 — Node labels (depth 50) ── */}
      <motion.div
        className="absolute inset-0"
        style={{ x: l4x, y: l4y }}
      >
        {NODES.map((node, i) => (
          <motion.button
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.65 + i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
            onFocus={() => setActiveNode(node.id)}
            onBlur={() => setActiveNode(null)}
            aria-label={`${node.label}: ${node.desc}`}
          >
            <div className="flex flex-col items-center gap-1.5">
              {/* Pulsing indicator dot */}
              <div className="relative">
                <div
                  className="w-2.5 h-2.5 rounded-full bg-[#82C21C] transition-all duration-300"
                  style={{
                    transform: activeNode === node.id ? "scale(1.6)" : "scale(1)",
                    boxShadow: activeNode === node.id
                      ? "0 0 20px #82C21C, 0 0 40px rgba(130,194,28,0.4)"
                      : "0 0 8px rgba(130,194,28,0.6)",
                  }}
                />
                {activeNode === node.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#82C21C]"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 3.5, opacity: 0 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </div>

              {/* Label pill */}
              <div
                className="px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-wider whitespace-nowrap border transition-all duration-300"
                style={{
                  background: activeNode === node.id ? "rgba(130,194,28,0.15)" : "rgba(8,34,32,0.6)",
                  borderColor: activeNode === node.id ? "rgba(130,194,28,0.45)" : "rgba(255,255,255,0.07)",
                  color: activeNode === node.id ? "#ffffff" : "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(12px)",
                  boxShadow: activeNode === node.id ? "0 0 24px rgba(130,194,28,0.18), inset 0 0 16px rgba(130,194,28,0.06)" : "none",
                }}
              >
                {node.label}
              </div>

              {/* Hover tooltip */}
              <AnimatePresence>
                {activeNode === node.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.92 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full mt-2 px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-white/55 whitespace-nowrap shadow-2xl z-10"
                    style={{ background: "rgba(6,25,23,0.85)", backdropFilter: "blur(16px)" }}
                  >
                    {node.desc}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* ── LAYER 5 — Growth Core orb (depth 65) ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ x: l5x, y: l5y }}
      >
        {/* Outermost atmospheric glow — reduced opacity vs original */}
        <div
          className="absolute w-40 h-40 bg-[#82C21C]/[0.02] rounded-full blur-[60px]"
          style={{ animation: "pulse-glow 7s ease-in-out infinite" }}
        />
        {/* Mid glow */}
        <div
          className="absolute w-20 h-20 bg-[#82C21C]/[0.06] rounded-full blur-[28px]"
          style={{ animation: "pulse-glow 4.5s ease-in-out infinite 1.5s" }}
        />
        {/* Core orb — reduced shadow vs original */}
        <motion.div
          className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#A8F23A] to-[#5a8c0a]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          style={{
            boxShadow: "0 0 0 1px rgba(130,194,28,0.22), 0 0 22px rgba(130,194,28,0.35), 0 0 55px rgba(130,194,28,0.10)",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/18 to-transparent" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/90" style={{ boxShadow: "0 0 6px rgba(255,255,255,0.9)" }} />
        </motion.div>
      </motion.div>

      {/* ── LAYER 6 — Floating metric chips (depth 25) — desktop only ── */}
      <motion.div
        className="absolute inset-0 hidden md:block pointer-events-none"
        style={{ x: l6x, y: l6y }}
      >
        {METRICS.map((m, i) => (
          <motion.div
            key={m.id}
            className="absolute"
            style={{ left: m.left, top: m.top }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: m.delay, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Inner div carries the float-y CSS animation — separate from FM entrance */}
            <div
              style={{
                animation: `float-y ${m.dur}s ease-in-out infinite ${i * 0.55}s`,
                background: "rgba(8,34,32,0.55)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "8px 12px",
                minWidth: "88px",
                textAlign: "center",
              }}
            >
              <div className="text-[#82C21C] font-bold text-sm tracking-tight leading-tight">
                {m.value}
              </div>
              <div className="text-white/40 text-[10px] tracking-wide mt-0.5 whitespace-nowrap">
                {m.label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};
