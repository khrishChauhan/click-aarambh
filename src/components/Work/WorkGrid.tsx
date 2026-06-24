"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { EASE } from "@/lib/motion";

const GRID_ITEMS = [
  {
    id: "g1",
    outcome: "Reduced Churn by 40%",
    client: "Global SaaS Provider",
    tech: "Next.js / Node / Stripe",
    span: "md:col-span-8",
  },
  {
    id: "g2",
    outcome: "Tripled Lead Velocity",
    client: "B2B Enterprise",
    tech: "HubSpot / React / AWS",
    span: "md:col-span-4",
  },
  {
    id: "g3",
    outcome: "$2.4M ARR Unlocked",
    client: "Fintech Startup",
    tech: "Python / React / Plaid",
    span: "md:col-span-4",
  },
  {
    id: "g4",
    outcome: "Zero-Downtime Migration",
    client: "Healthcare Network",
    tech: "AWS / Docker / Go",
    span: "md:col-span-8",
  },
];

export default function WorkGrid() {
  const reducedMotion = useReducedMotion() ?? false;
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
    visible: { 
      opacity: 1, 
      clipPath: "inset(0% 0 0 0)",
      transition: { duration: 0.8, ease: EASE }
    },
  };

  return (
    <section className="w-full bg-[#04110F] py-[10vh] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9CDF3B]">
            Systemic Implementations
          </p>
          <h2 className="text-3xl font-extrabold text-white tracking-[-0.03em] md:text-5xl">
            Repeatable Outcomes.
          </h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
          variants={containerVariants}
          initial={reducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {GRID_ITEMS.map((item) => {
            const isHovered = hoveredId === item.id;
            const isOtherHovered = hoveredId !== null && hoveredId !== item.id;

            return (
              <motion.div
                key={item.id}
                variants={reducedMotion ? {} : itemVariants}
                className={`group relative overflow-hidden rounded-2xl bg-black brutal-glass min-h-[300px] transition-all duration-500 ease-apple cursor-pointer ${item.span}`}
                style={{
                  opacity: isOtherHovered ? 0.2 : 1,
                  boxShadow: isHovered 
                    ? "inset 0 0 0 1px rgba(156,223,59,0.3)" 
                    : "inset 0 0 0 1px rgba(255,255,255,0.06)",
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Default Background Layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#082220]/20 to-black/50" />

                {/* X-Ray Hover Layer (Wireframe / Code Snippet simulation) */}
                <div 
                  className="absolute inset-0 transition-opacity duration-500 ease-apple flex items-center justify-center overflow-hidden"
                  style={{ opacity: isHovered ? 1 : 0 }}
                >
                  <div className="absolute inset-0 bg-[#061917]/80" />
                  {/* Harsh Radial Spotlight */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(156,223,59,0.1)_0%,transparent_60%)]" />
                  {/* Fake Code / Wireframe Pattern */}
                  <div className="w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiM5Q0RGM0IiLz48L3N2Zz4=')] mix-blend-screen" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-[-0.03em] max-w-sm leading-[1.05]">
                    {item.outcome}
                  </h3>
                  
                  {/* X-Ray Metadata Reveal */}
                  <div 
                    className="mt-8 transition-all duration-500 ease-apple origin-bottom"
                    style={{
                      opacity: isHovered || reducedMotion ? 1 : 0.4,
                      transform: isHovered || reducedMotion ? "translateY(0)" : "translateY(10px)",
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <div className="h-px w-4 bg-[#9CDF3B]" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9CDF3B]">
                          {item.client}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 pl-7">
                        Stack: {item.tech}
                      </span>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
