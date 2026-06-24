"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGSAP, gsap } from "@/lib/gsap";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

const PHASES = [
  {
    id: "phase-1",
    label: "CHALLENGE",
    title: "Fragmented Data Silos",
    body: "The client was scaling aggressively, but their acquisition, retention, and product telemetry data existed in disconnected silos, making systemic optimization impossible.",
  },
  {
    id: "phase-2",
    label: "ARCHITECTURE",
    title: "Unified Growth Engine",
    body: "We architected a centralized data pipeline connecting marketing touchpoints directly to product usage metrics, creating a single source of truth for the entire executive team.",
  },
  {
    id: "phase-3",
    label: "EXECUTION",
    title: "Phased Deployment",
    body: "Deployed across 12 weeks with zero downtime. We replaced 4 legacy tools with a custom, high-performance tracking infrastructure built on modern enterprise stacks.",
  },
  {
    id: "phase-4",
    label: "OUTCOME",
    title: "Predictable Scale",
    body: "Customer acquisition cost dropped by 35% within the first quarter, while long-term retention modeling improved accuracy by over 80%.",
  },
];

export default function FeaturedCaseStudy() {
  const reducedMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const innerImageRef = useRef<HTMLDivElement>(null);
  
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    if (reducedMotion || window.innerWidth < 1024) return;
    ensureGSAP();

    const ctx = gsap.context(() => {
      // Scale-and-snap intro for the massive image container
      gsap.fromTo(
        innerImageRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // Detect active phase based on scroll position of the left column items
      phaseRefs.current.forEach((el, index) => {
        if (!el) return;
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "bottom 60%",
            onEnter: () => setActivePhase(index),
            onEnterBack: () => setActivePhase(index),
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#04110F] pb-[10vh]">
      
      {/* Structural divider */}
      <div className="w-full border-t border-white/5" />

      {/* Intro Header */}
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9CDF3B]">
            Featured Architecture
          </p>
          <h2 className="max-w-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Project Nexus: Systemic Scale for Enterprise Fintech.
          </h2>
        </motion.div>
      </div>

      {/* Main 4/8 Split Container */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <div className="relative flex flex-col gap-12 lg:flex-row lg:gap-8">
          
          {/* Left Column (4 Cols): CSS Sticky Context */}
          <div ref={leftColRef} className="lg:w-4/12">
            <div className="lg:sticky lg:top-[20vh] space-y-16 pb-[30vh]">
              {PHASES.map((phase, index) => {
                const isActive = activePhase === index || reducedMotion;
                return (
                  <div 
                    key={phase.id} 
                    ref={(el) => { phaseRefs.current[index] = el; }}
                    className="transition-opacity duration-500"
                    style={{ opacity: isActive ? 1 : 0.2 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-[14px] font-bold text-white/50">0{index + 1}</span>
                      <span className={`font-mono text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${isActive ? "text-[#9CDF3B]" : "text-white/30"}`}>
                        {phase.label}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-[-0.02em]">{phase.title}</h3>
                    <p className="text-[0.95rem] leading-[1.6] text-white/60">{phase.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (8 Cols): Visual Dominance */}
          <div className="lg:w-8/12">
            {/* The structural border wrapper simulating a dense UI environment */}
            <div 
              ref={imageContainerRef}
              className="sticky top-[10vh] overflow-hidden rounded-xl bg-black brutal-glass aspect-[4/3] lg:aspect-auto lg:h-[80vh] group cursor-crosshair"
            >
              {/* Scale-and-snap inner image container */}
              <div ref={innerImageRef} className="absolute inset-0 w-full h-full">
                
                {/* Simulated Mockups based on active phase (In real life, these would be precise WebM loops or high-res imgs) */}
                {PHASES.map((phase, index) => (
                  <div 
                    key={`visual-${phase.id}`}
                    className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-apple"
                    style={{ 
                      opacity: activePhase === index ? 1 : 0,
                      // Deep gradients to simulate dark analytics dashboards
                      background: index === 0 ? "radial-gradient(circle at 20% 30%, #082220 0%, #000 80%)" :
                                  index === 1 ? "radial-gradient(circle at 80% 20%, #061917 0%, #000 80%)" :
                                  index === 2 ? "linear-gradient(135deg, #020f0d 0%, #000 100%)" :
                                  "radial-gradient(circle at 50% 50%, rgba(156,223,59,0.05) 0%, #000 70%)"
                    }}
                  >
                    {/* Placeholder structural elements simulating UI density */}
                    <div className="absolute inset-4 border border-white/5 rounded-lg">
                      <div className="h-8 border-b border-white/5 flex items-center px-4 gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                      </div>
                      {/* Slow pan effect on hover */}
                      <div className="absolute inset-0 top-8 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] transition-transform duration-[10s] ease-linear group-hover:scale-110 group-hover:translate-x-4" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 font-mono text-xs tracking-widest uppercase">
                        [ VISUAL: {phase.label} ARCHITECTURE ]
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
