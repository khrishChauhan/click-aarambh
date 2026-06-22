"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const TRAD_TEAMS = ["Marketing Team", "Development Team", "Operations Team"];
const ENGINE_NODES = ["Software", "Marketing", "Automation", "Business Expansion"];

export const ParadigmShift = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Chapter 1 refs
  const ch1Ref = useRef<HTMLDivElement>(null);
  const ch1TitleRef = useRef<HTMLHeadingElement>(null);
  const ch1ItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ch1LineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ch1ResultRef = useRef<HTMLDivElement>(null);
  const ch1BrokenLineRef = useRef<HTMLDivElement>(null);

  // Morph line ref
  const morphLineRef = useRef<HTMLDivElement>(null);

  // Chapter 2 refs
  const ch2Ref = useRef<HTMLDivElement>(null);
  const ch2TitleRef = useRef<HTMLHeadingElement>(null);
  const ch2NodesRef = useRef<HTMLDivElement>(null);
  const ch2ConvergeLineRef = useRef<HTMLDivElement>(null);
  const ch2ConnectedRef = useRef<HTMLDivElement>(null);
  const ch2FinalLineRef = useRef<HTMLDivElement>(null);
  const ch2GrowthRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) {
      // Static fallback: show chapter 2 directly
      if (ch1Ref.current) gsap.set(ch1Ref.current, { opacity: 0 });
      if (ch2Ref.current) gsap.set(ch2Ref.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.5,
          start: "top top",
          end: "+=400%",
          anticipatePin: 1,
        },
      });

      // ─── Set initial states ─────────────────────────────────
      gsap.set([ch1ItemRefs.current, ch1LineRefs.current, ch1ResultRef.current, ch1BrokenLineRef.current], { opacity: 0, y: 12 });
      gsap.set(ch1TitleRef.current, { opacity: 0, y: 16 });
      gsap.set(ch2Ref.current, { opacity: 0, y: 40 });
      gsap.set(morphLineRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set([ch2TitleRef.current, ch2NodesRef.current, ch2ConvergeLineRef.current, ch2ConnectedRef.current, ch2FinalLineRef.current, ch2GrowthRef.current], { opacity: 0, y: 16 });

      // ─── CHAPTER 1: Traditional Agency ──────────────────────

      // Title in
      tl.to(ch1TitleRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });

      // Draw teams in sequence with lines
      TRAD_TEAMS.forEach((_, i) => {
        tl.to(ch1LineRefs.current[i], { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, ">");
        tl.to(ch1ItemRefs.current[i], { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "<0.2");
      });

      // The broken line — appears but never completes (uses dashes via CSS)
      tl.to(ch1BrokenLineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, ">0.2");

      // Disconnected results — dim, defeated
      tl.to(ch1ResultRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, ">0.2");

      // Hold the pain
      tl.to({}, { duration: 1.5 });

      // ─── MORPH TRANSITION ────────────────────────────────────

      // Fade out chapter 1 while sweep line comes in
      tl.to(ch1Ref.current, { opacity: 0, scale: 0.94, duration: 1.2, ease: "power2.in" }, ">");
      tl.to(morphLineRef.current, { scaleX: 1, opacity: 1, duration: 1.2, ease: "expo.out" }, "<0.2");

      // Brief hold at the line
      tl.to({}, { duration: 0.4 });

      // Fade out sweep line
      tl.to(morphLineRef.current, { opacity: 0, duration: 0.6, ease: "power2.in" });

      // ─── CHAPTER 2: Click Aarambh Engine ────────────────────

      // Warm the background
      tl.to(bgGlowRef.current, { opacity: 0.1, duration: 1.5, ease: "power2.out" }, "<");

      // Chapter 2 container rises
      tl.to(ch2Ref.current, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "<0.2");

      // Title
      tl.to(ch2TitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "<0.3");

      // Engine nodes — stagger in
      tl.to(ch2NodesRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, ">0.2");

      // Convergence line
      tl.to(ch2ConvergeLineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, ">0.1");

      // Connected systems
      tl.to(ch2ConnectedRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, ">0.2");

      // Final line
      tl.to(ch2FinalLineRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, ">0.1");

      // Measurable Growth — the emotional peak
      tl.to(ch2GrowthRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.75)",
      }, ">0.1");

      // Pulse once — heartbeat
      tl.to(ch2GrowthRef.current, { scale: 1.03, duration: 0.3, ease: "power1.out" }, ">0.1");
      tl.to(ch2GrowthRef.current, { scale: 1, duration: 0.4, ease: "power1.inOut" });

      // Final hold
      tl.to({}, { duration: 2.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-[#061917] flex items-center justify-center overflow-hidden"
      aria-label="The Paradigm Shift"
    >
      {/* Green radial that warms in on chapter 2 */}
      <div
        ref={bgGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#82C21C] blur-[180px] rounded-full pointer-events-none opacity-0"
        aria-hidden="true"
      />

      {/* ── CHAPTER 1: Traditional Agency ── */}
      <div
        ref={ch1Ref}
        className="absolute inset-0 flex flex-col items-center justify-center"
        aria-hidden="false"
      >
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/25 mb-6">
          The Old Way
        </p>
        <h2
          ref={ch1TitleRef}
          className="text-4xl md:text-6xl font-bold tracking-tighter text-white/70 mb-10"
        >
          Traditional Agency.
        </h2>

        <div className="flex flex-col items-center">
          {TRAD_TEAMS.map((team, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Connector line */}
              <div
                ref={(el) => { ch1LineRefs.current[i] = el; }}
                className="w-px h-10 bg-gradient-to-b from-white/5 to-white/20"
              />
              {/* Team label */}
              <div
                ref={(el) => { ch1ItemRefs.current[i] = el; }}
                className="px-6 py-2.5 rounded-full bg-white/5 border border-white/8 text-white/50 text-sm font-medium tracking-wide whitespace-nowrap"
              >
                {team}
              </div>
            </div>
          ))}

          {/* Broken line — dashes that fade out (never complete) */}
          <div
            ref={ch1BrokenLineRef}
            className="w-px h-12 mt-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 4px, transparent 4px, transparent 10px)",
            }}
          />

          {/* Disconnected results */}
          <div ref={ch1ResultRef} className="text-center mt-2">
            <p className="text-xl md:text-2xl font-bold text-white/25">
              Disconnected Systems.
            </p>
            <p className="text-lg md:text-xl font-medium text-white/18 mt-1">
              Disconnected Results.
            </p>
          </div>
        </div>
      </div>

      {/* ── MORPH SWEEP LINE ── */}
      <div
        ref={morphLineRef}
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#82C21C] to-transparent opacity-0 pointer-events-none z-20"
        aria-hidden="true"
      />

      {/* ── CHAPTER 2: Click Aarambh Growth Engine ── */}
      <div
        ref={ch2Ref}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#82C21C]/50 mb-6">
          The Growth Engine
        </p>
        <h2
          ref={ch2TitleRef}
          className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-10"
        >
          Click <span className="text-[#82C21C]">Aarambh</span> Engine.
        </h2>

        {/* Engine nodes — horizontal row with sparks */}
        <div
          ref={ch2NodesRef}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-0 mb-0"
        >
          {ENGINE_NODES.map((node, i) => (
            <div key={i} className="flex items-center">
              <span className="px-4 py-2 rounded-full bg-[#82C21C]/10 border border-[#82C21C]/25 text-[#82C21C] text-sm font-semibold tracking-wide whitespace-nowrap shadow-[0_0_16px_rgba(130,194,28,0.08)]">
                {node}
              </span>
              {i < ENGINE_NODES.length - 1 && (
                <span className="mx-2 md:mx-3 text-[#82C21C]/40 text-lg font-bold select-none">✦</span>
              )}
            </div>
          ))}
        </div>

        {/* Converging line — the unification beam */}
        <div
          ref={ch2ConvergeLineRef}
          className="w-px h-12 mt-2 bg-gradient-to-b from-[#82C21C]/30 to-[#82C21C] shadow-[0_0_12px_#82C21C]"
        />

        {/* Connected Systems */}
        <div ref={ch2ConnectedRef} className="text-center">
          <p className="text-xl md:text-2xl font-bold text-white">
            Connected Systems.
          </p>
        </div>

        {/* Final line — bold, glowing */}
        <div
          ref={ch2FinalLineRef}
          className="w-px h-10 bg-gradient-to-b from-[#82C21C] to-[#82C21C]/60 shadow-[0_0_20px_#82C21C]"
        />

        {/* Measurable Growth — emotional peak */}
        <div ref={ch2GrowthRef} className="text-center">
          <p className="text-3xl md:text-5xl font-extrabold tracking-tighter text-[#82C21C] drop-shadow-[0_0_40px_rgba(130,194,28,0.5)]">
            Measurable Growth.
          </p>
        </div>
      </div>
    </section>
  );
};
