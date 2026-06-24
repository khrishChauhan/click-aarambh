"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGSAP, gsap } from "@/lib/gsap";
import { useReducedMotion } from "framer-motion";

const METRICS = [
  {
    id: "m-hero",
    value: "+315",
    suffix: "%",
    label: "Retention Increase",
    context: "E-COMMERCE | 12 MONTHS",
    isHero: true,
  },
  {
    id: "m-sub1",
    value: "-40",
    suffix: "%",
    label: "Acquisition Cost",
    context: "FINTECH | 6 MONTHS",
    isHero: false,
  },
  {
    id: "m-sub2",
    value: "1.2",
    suffix: "M",
    label: "MRR Added",
    context: "SAAS | 18 MONTHS",
    isHero: false,
  },
];

export default function ImpactMetrics() {
  const reducedMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    ensureGSAP();

    const ctx = gsap.context(() => {
      // Mechanical Odometer Roll-up
      numberRefs.current.forEach((el, index) => {
        if (!el) return;
        const targetValue = parseFloat(METRICS[index].value);
        
        // Use an object to tween the value
        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: targetValue,
          duration: 2 + index * 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          onUpdate: () => {
            // Keep the + or - sign if it exists
            const prefix = METRICS[index].value.startsWith("+") ? "+" : 
                           METRICS[index].value.startsWith("-") ? "-" : "";
            
            // Format to 1 decimal place if the original has one, else integer
            const isFloat = METRICS[index].value.includes(".");
            const formatted = isFloat ? Math.abs(obj.val).toFixed(1) : Math.floor(Math.abs(obj.val)).toString();
            
            el.innerText = `${prefix}${formatted}`;
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="w-full bg-[#04110F] py-[10vh] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        
        {/* The Brutalist 6/3/3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 lg:gap-8 border border-white/5 brutal-glass rounded-3xl p-8 lg:p-12">
          
          {METRICS.map((metric, index) => {
            const isHovered = hoveredId === metric.id;
            const isOtherHovered = hoveredId !== null && hoveredId !== metric.id;

            return (
              <div 
                key={metric.id}
                className={`relative flex flex-col justify-end transition-opacity duration-300 ease-apple ${
                  metric.isHero ? "md:col-span-6 border-b md:border-b-0 md:border-r border-white/5 pb-8 md:pb-0 md:pr-8" : "md:col-span-3"
                }`}
                style={{ opacity: isOtherHovered ? 0.3 : 1 }}
                onMouseEnter={() => setHoveredId(metric.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Metric Value */}
                <div className="flex items-baseline font-extrabold leading-none tracking-[-0.04em] text-white">
                  <span 
                    ref={(el) => { numberRefs.current[index] = el; }}
                    style={{ fontSize: metric.isHero ? "clamp(5rem, 10vw, 9rem)" : "clamp(3.5rem, 6vw, 5rem)" }}
                  >
                    {reducedMotion ? metric.value : "0"}
                  </span>
                  <span 
                    className="text-[#9CDF3B]"
                    style={{ fontSize: metric.isHero ? "clamp(2rem, 5vw, 4rem)" : "clamp(1.5rem, 3vw, 2.5rem)" }}
                  >
                    {metric.suffix}
                  </span>
                </div>

                {/* Context Tag (Pill) */}
                <div className="mt-6 mb-4 self-start rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors duration-300"
                     style={{ 
                       borderColor: isHovered ? "rgba(156,223,59,0.5)" : "rgba(255,255,255,0.1)",
                       color: isHovered ? "#9CDF3B" : "rgba(255,255,255,0.5)",
                     }}
                >
                  {metric.context}
                </div>

                {/* Label */}
                <p className="text-[1rem] leading-snug text-white/70 font-semibold tracking-tight">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
