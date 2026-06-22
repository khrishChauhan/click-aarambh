"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// Pentagon layout — each node positioned around the center
const NODES = [
  { id: "software",   label: "Software",    desc: "Scalable infrastructure",  x: 50,  y: 8  },
  { id: "marketing",  label: "Marketing",   desc: "Precision acquisition",     x: 90,  y: 40 },
  { id: "automation", label: "Automation",  desc: "Zero-friction workflows",   x: 74,  y: 88 },
  { id: "expansion",  label: "Expansion",   desc: "New market penetration",    x: 26,  y: 88 },
  { id: "strategy",   label: "Strategy",    desc: "Unified growth architecture",x: 10,  y: 40 },
];

// Straight SVG lines from node to center (50, 50)
const EDGES = NODES.map((n, i) => ({
  id: n.id,
  d: `M ${n.x} ${n.y} L 50 50`,
  delay: i * 0.5,
}));

export const GrowthCore = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(useTransform(mouseX, v => v * -15), { stiffness: 35, damping: 22 });
  const springY = useSpring(useTransform(mouseY, v => v * -15), { stiffness: 35, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative w-full h-[480px] md:h-[580px] select-none cursor-crosshair"
      aria-label="Growth Engine visualization"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-[20%] rounded-full bg-[#82C21C]/[0.03] blur-[80px] pointer-events-none"
           style={{ animation: "pulse-glow 6s ease-in-out infinite" }} />

      {/* Outer decorative ring — slow spin */}
      <div className="absolute inset-[2%] rounded-full border border-white/[0.03]"
           style={{ animation: "spin-slow 50s linear infinite" }} />
      {/* Inner decorative ring — reverse spin, dashed feel */}
      <div className="absolute inset-[18%] rounded-full border border-[#82C21C]/[0.06]"
           style={{ animation: "spin-slow-reverse 30s linear infinite" }} />

      {/* ─── SVG Edges ─────────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#82C21C" stopOpacity="0" />
            <stop offset="50%" stopColor="#82C21C" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#82C21C" stopOpacity="0.1" />
          </linearGradient>
          <filter id="edgeGlow">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {EDGES.map((edge, i) => {
          const isActive = activeNode === edge.id;
          return (
            <g key={edge.id}>
              {/* Base dim line */}
              <path
                d={edge.d}
                stroke={isActive ? "rgba(130,194,28,0.3)" : "rgba(130,194,28,0.05)"}
                strokeWidth={isActive ? "0.5" : "0.25"}
                fill="none"
                strokeLinecap="round"
                style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
              />
              {/* Animated data-flow particle */}
              <path
                d={edge.d}
                stroke="#82C21C"
                strokeWidth={isActive ? "0.6" : "0.35"}
                fill="none"
                strokeLinecap="round"
                strokeDasharray="3 18"
                opacity={isActive ? 0.9 : 0.4}
                filter={isActive ? "url(#edgeGlow)" : undefined}
                style={{
                  animation: `dash-flow ${2.2 + i * 0.35}s linear infinite`,
                  transition: "opacity 0.3s ease, stroke-width 0.3s ease",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* ─── Center Orb ────────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outermost atmospheric glow */}
        <div className="absolute w-48 h-48 bg-[#82C21C]/[0.04] rounded-full blur-[50px]"
             style={{ animation: "pulse-glow 5s ease-in-out infinite" }} />
        {/* Mid glow */}
        <div className="absolute w-24 h-24 bg-[#82C21C]/10 rounded-full blur-[25px]"
             style={{ animation: "pulse-glow 3.5s ease-in-out infinite 0.8s" }} />
        {/* Core orb */}
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#A8F23A] to-[#5a8c0a] shadow-[0_0_0_1px_rgba(130,194,28,0.3),0_0_40px_rgba(130,194,28,0.5),0_0_100px_rgba(130,194,28,0.2)]">
          {/* Inner highlight */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
          {/* Center dot */}
          <div className="w-3 h-3 rounded-full bg-white/90 shadow-[0_0_8px_white]" />
        </div>
      </div>

      {/* ─── Node Labels ───────────────────────────────────────── */}
      {NODES.map((node, i) => (
        <motion.button
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          onMouseEnter={() => setActiveNode(node.id)}
          onMouseLeave={() => setActiveNode(null)}
          onFocus={() => setActiveNode(node.id)}
          onBlur={() => setActiveNode(null)}
          aria-label={`${node.label}: ${node.desc}`}
        >
          <div className="flex flex-col items-center gap-1.5">
            {/* Pulsing dot */}
            <div className="relative">
              <div className={`w-2.5 h-2.5 rounded-full bg-[#82C21C] transition-all duration-300 ${activeNode === node.id ? "scale-150 shadow-[0_0_16px_#82C21C]" : "shadow-[0_0_8px_rgba(130,194,28,0.6)]"}`} />
              {activeNode === node.id && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#82C21C]"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </div>

            {/* Label pill */}
            <div className={`px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-wider whitespace-nowrap border transition-all duration-300 ${
              activeNode === node.id
                ? "bg-[#82C21C]/20 border-[#82C21C]/50 text-white shadow-[0_0_20px_rgba(130,194,28,0.2),inset_0_0_20px_rgba(130,194,28,0.05)]"
                : "glass border-white/8 text-white/70"
            }`}>
              {node.label}
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {activeNode === node.id && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 px-3 py-1.5 rounded-lg glass border border-white/10 text-[10px] text-white/60 whitespace-nowrap shadow-xl z-10"
                >
                  {node.desc}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};
