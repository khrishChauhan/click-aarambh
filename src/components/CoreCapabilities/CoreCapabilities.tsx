"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const CAPABILITIES = [
  {
    id: "01",
    tag: "Infrastructure",
    title: "Software\nSystems.",
    desc: "Highly available, scalable platforms and bespoke applications engineered to handle aggressive scaling without fracturing under load.",
    metric: "99.99%",
    metricLabel: "Uptime SLA",
    accent: "#82C21C",
  },
  {
    id: "02",
    tag: "Acquisition",
    title: "Growth\nMarketing.",
    desc: "Algorithmic customer acquisition built on data architecture, not guesswork. Precision-targeted campaigns tied to revenue outcomes.",
    metric: "3–5×",
    metricLabel: "CAC Reduction",
    accent: "#82C21C",
  },
  {
    id: "03",
    tag: "Scale",
    title: "Business\nExpansion.",
    desc: "Strategic scaling blueprints. From penetrating new demographics to automating fulfillment — built as a connected system, not a project.",
    metric: "∞",
    metricLabel: "Compounding Loops",
    accent: "#82C21C",
  },
];

export const CoreCapabilities = () => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const scrollWidth = track.scrollWidth - window.innerWidth;

      // Single ScrollTrigger handles both the animation AND active index update.
      // Previously there were TWO pin:true triggers on the same element which
      // caused GSAP to inject two spacers → massive blank gap before footer.
      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          start: "top top",
          end: `+=${scrollWidth}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              CAPABILITIES.length - 1,
              Math.floor(self.progress * CAPABILITIES.length)
            );
            setActiveIdx(idx);
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative w-full bg-[#061917] overflow-hidden flex items-center md:h-screen min-h-screen noise"
      aria-label="Core Capabilities"
    >
      {/* Section label — fixed top-left */}
      <div className="absolute top-8 left-8 md:top-12 md:left-16 z-20 flex flex-col gap-4">
        <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] text-white/30">Core Capabilities</span>
        {/* Progress dots */}
        <div className="flex gap-2">
          {CAPABILITIES.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width:  i === activeIdx ? "24px" : "6px",
                height: "6px",
                background: i === activeIdx ? "#82C21C" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        style={{ willChange: "transform" }}
        className="flex flex-col md:flex-row gap-0 w-full md:w-[300vw]"
      >
        {CAPABILITIES.map((cap, i) => (
          <div
            key={cap.id}
            className="flex-shrink-0 w-full md:w-screen h-screen flex items-center justify-center relative overflow-hidden group"
          >
            {/* Panel background gradient per panel */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#061917] via-[#082220] to-[#061917] opacity-80" />
            {/* Ambient glow bottom-right */}
            <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-[#82C21C]/[0.03] blur-[120px] rounded-full pointer-events-none" />

            {/* Main content — cinematic, Apple-style */}
            <div className="relative z-10 max-w-5xl mx-auto px-10 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center w-full">
              {/* Left: Text */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-5 h-px bg-[#82C21C]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#82C21C]/70">{cap.tag}</span>
                </div>
                <h2
                  className="text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.03em] text-white mb-8 whitespace-pre-line"
                >
                  {cap.title}
                </h2>
                <p className="text-[clamp(1rem,1.5vw,1.15rem)] text-white/50 leading-relaxed max-w-md">
                  {cap.desc}
                </p>
              </div>

              {/* Right: Metric card */}
              <div className="flex flex-col items-start md:items-end">
                <div className="glass rounded-3xl border border-white/5 p-10 md:p-12 shadow-[0_32px_80px_rgba(0,0,0,0.5)] noise relative overflow-hidden w-full max-w-xs">
                  {/* Noise texture rendered via CSS .noise::after */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#82C21C]/5 via-transparent to-transparent pointer-events-none rounded-3xl" />
                  <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 mb-4">{cap.tag} · {cap.id}</span>
                  <div className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-[-0.04em] text-[#82C21C] leading-none mb-2">
                    {cap.metric}
                  </div>
                  <div className="text-sm text-white/40 font-medium">{cap.metricLabel}</div>

                  {/* Subtle bottom border glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#82C21C]/30 to-transparent" />
                </div>
              </div>
            </div>

            {/* Panel number — giant watermark */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-16 text-[8rem] md:text-[12rem] font-bold text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">
              {cap.id}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
