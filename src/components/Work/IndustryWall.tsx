"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

const INDUSTRIES = [
  {
    id: "ind-1",
    name: "FINTECH",
    capabilities: [
      "Payment Infrastructure",
      "Customer Acquisition",
      "Automation Systems",
    ],
  },
  {
    id: "ind-2",
    name: "SAAS",
    capabilities: [
      "Product Growth",
      "Revenue Operations",
      "Analytics",
    ],
  },
  {
    id: "ind-3",
    name: "HEALTHCARE",
    capabilities: [
      "Patient Systems",
      "Workflow Automation",
      "Internal Platforms",
    ],
  },
  {
    id: "ind-4",
    name: "E-COMMERCE",
    capabilities: [
      "Conversion Optimization",
      "Supply Chain Telemetry",
      "Retention Engines",
    ],
  },
];

export default function IndustryWall() {
  const reducedMotion = useReducedMotion() ?? false;
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="w-full bg-[#04110F] py-[15vh]">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        
        {/* Massive Typographic Grid */}
        <div className="flex flex-col border-y border-white/5">
          {INDUSTRIES.map((industry) => {
            const isHovered = hoveredId === industry.id;
            const isOtherHovered = hoveredId !== null && hoveredId !== industry.id;

            return (
              <div 
                key={industry.id}
                className="group relative cursor-pointer border-b border-white/5 last:border-b-0 py-8 transition-opacity duration-300"
                style={{ opacity: isOtherHovered ? 0.15 : 1 }}
                onMouseEnter={() => setHoveredId(industry.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="flex items-center justify-between">
                  <h3 
                    className="font-extrabold tracking-[-0.04em] transition-all duration-300 ease-apple"
                    style={{ 
                      fontSize: "clamp(3rem, 8vw, 7rem)",
                      lineHeight: 1,
                      color: isHovered ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                      textShadow: isHovered ? "0 0 40px rgba(255,255,255,0.2)" : "none",
                    }}
                  >
                    {industry.name}
                  </h3>
                  
                  {/* Subtle indicator */}
                  <div 
                    className="hidden md:block w-4 h-4 rounded-full border transition-all duration-300"
                    style={{
                      borderColor: isHovered ? "#9CDF3B" : "transparent",
                      backgroundColor: isHovered ? "#9CDF3B" : "rgba(255,255,255,0.05)",
                      boxShadow: isHovered ? "0 0 15px rgba(156,223,59,0.5)" : "none",
                    }}
                  />
                </div>

                {/* Capability Stack Accordion */}
                <AnimatePresence initial={false}>
                  {(isHovered || reducedMotion) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 pb-4 flex flex-wrap gap-x-12 gap-y-4">
                        {industry.capabilities.map((cap, i) => (
                          <motion.div 
                            key={i}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -10, opacity: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05, ease: EASE }}
                            className="flex items-center gap-3"
                          >
                            <span className="text-[#9CDF3B]">→</span>
                            <span className="font-mono text-[11px] md:text-[13px] uppercase tracking-[0.2em] text-[#9CDF3B]">
                              {cap}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
