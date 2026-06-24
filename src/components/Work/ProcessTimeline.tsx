"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGSAP, gsap } from "@/lib/gsap";
import { motion, useReducedMotion } from "framer-motion";

const TIMELINE_STEPS = [
  {
    id: "step-1",
    title: "Diagnostic Mapping",
    body: "Before any code is written or campaigns launched, we map the entire existing infrastructure. We identify data leaks, integration gaps, and process bottlenecks.",
    meta: "WEEKS 01-02",
  },
  {
    id: "step-2",
    title: "System Architecture",
    body: "Designing the blueprint. We select the technology stack, define the data schemas, and design the automated workflows required to achieve the commercial objective.",
    meta: "WEEKS 03-04",
  },
  {
    id: "step-3",
    title: "Engineering & Integration",
    body: "Building the engine. We deploy the infrastructure, connect the APIs, and ensure data flows seamlessly from acquisition channels through to retention platforms.",
    meta: "WEEKS 05-08",
  },
  {
    id: "step-4",
    title: "Deployment & Scaling",
    body: "The system goes live. We establish baselines, monitor telemetry, and begin the iterative process of optimization at scale.",
    meta: "WEEK 09+",
  },
];

export default function ProcessTimeline() {
  const reducedMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    ensureGSAP();

    const ctx = gsap.context(() => {
      // 1. Animate the vertical line height based on scroll depth through the section
      if (lineRef.current && lineProgressRef.current) {
        gsap.to(lineProgressRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
            end: "bottom 80%",
            scrub: 0,
          },
        });
      }

      // 2. Detect which card is currently active to illuminate its node
      cardRefs.current.forEach((el, index) => {
        if (!el) return;
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => setActiveStep(index),
            onEnterBack: () => setActiveStep(index),
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#04110F] py-[15vh]">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <div className="mb-24">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9CDF3B]">
            Systemic Methodology
          </p>
          <h2 className="text-3xl font-extrabold text-white tracking-[-0.03em] md:text-5xl max-w-2xl">
            Engineering Growth.
          </h2>
        </div>

        <div className="relative flex">
          
          {/* Tracking Line (Left) */}
          <div className="relative w-12 md:w-24 shrink-0">
            {/* The base dimmed line */}
            <div 
              ref={lineRef}
              className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"
            >
              {/* The bright green progress line that grows down */}
              <div 
                ref={lineProgressRef}
                className="absolute top-0 left-0 w-full h-full bg-[#9CDF3B] origin-top scale-y-0 shadow-[0_0_15px_rgba(156,223,59,0.5)]"
              />
            </div>

            {/* Nodes */}
            {TIMELINE_STEPS.map((_, index) => {
              const isActive = activeStep >= index;
              return (
                <div 
                  key={`node-${index}`}
                  className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border bg-[#04110F] transition-colors duration-300 z-10"
                  style={{
                    top: `${(index / (TIMELINE_STEPS.length - 1)) * 100}%`,
                    // Move the nodes slightly down so they align with the top of the cards
                    marginTop: index === 0 ? "2rem" : index === TIMELINE_STEPS.length - 1 ? "-2rem" : "0",
                    borderColor: isActive ? "#9CDF3B" : "rgba(255,255,255,0.2)",
                    boxShadow: isActive ? "0 0 10px rgba(156,223,59,0.6)" : "none",
                  }}
                />
              );
            })}
          </div>

          {/* Content Cards (Right) */}
          <div className="flex-1 space-y-[20vh] pb-[10vh]">
            {TIMELINE_STEPS.map((step, index) => {
              const isPast = activeStep > index;
              const isCurrent = activeStep === index;
              
              return (
                <div 
                  key={step.id} 
                  ref={(el) => { cardRefs.current[index] = el; }}
                  className="group relative transition-all duration-500 ease-apple"
                  style={{
                    opacity: isCurrent || reducedMotion ? 1 : isPast ? 0.3 : 0.1,
                  }}
                >
                  {/* Subtle hover state to peek at past cards */}
                  <div className="absolute -inset-4 z-0 rounded-2xl transition-colors duration-300 group-hover:bg-white/[0.02]" />
                  
                  <div className="relative z-10 max-w-2xl pl-4 md:pl-0 pt-6 md:pt-8">
                    <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#9CDF3B]/70">
                      {step.meta}
                    </p>
                    <h3 className="mb-4 text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
                      {step.title}
                    </h3>
                    <p className="text-[1rem] leading-[1.7] text-white/60">
                      {step.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
