"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

const CHANNELS = [
  {
    id: "location",
    title: "Headquarters",
    value: "San Francisco, CA",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "phone",
    title: "Direct Line",
    value: "+1 (800) 555-0199",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    id: "email",
    title: "General Inquiry",
    value: "hello@clickaarambh.com",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

function MagneticCard({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || reducedMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Magnetic Spotlight effect via CSS Variables
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);

    // Subtle 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;
    
    containerRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
  }, [reducedMotion]);

  const handleMouseLeave = () => {
    setHovered(false);
    if (containerRef.current && !reducedMotion) {
      containerRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    }
  };

  return (
    <div
      ref={containerRef}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-[24px] p-8 transition-all duration-300 ease-apple border border-white/5"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(130,194,28,0.5)" : "0 4px 6px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.05)",
      }}
    >
      {/* The Magnetic Spotlight (only visible on hover) */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(130,194,28,0.15), transparent 40%)`
        }}
      />
      {children}
    </div>
  );
}

export default function ContactChannels() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section className="relative z-20 w-full px-6 md:px-12 lg:px-24 -mt-8 mb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHANNELS.map((channel, i) => (
            <motion.div
              key={channel.id}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.1 }}
            >
              <MagneticCard>
                <div className="relative z-10 flex flex-col h-full gap-12">
                  <div className="text-white/40 transition-transform duration-500 ease-apple group-hover:scale-110 group-hover:text-[#82C21C] origin-left">
                    {channel.icon}
                  </div>
                  <div>
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#82C21C] mb-2">
                      {channel.title}
                    </h3>
                    <p className="text-lg font-bold text-white tracking-[-0.02em]">
                      {channel.value}
                    </p>
                  </div>
                </div>
              </MagneticCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
