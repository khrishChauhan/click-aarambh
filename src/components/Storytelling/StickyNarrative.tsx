"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ACTS = [
  {
    text: "Most tools don't fail because of bad technology.",
    sub: null,
    color: "text-white",
    glowColor: null,
  },
  {
    text: "They fail because they were never connected.",
    sub: null,
    color: "text-white/80",
    glowColor: null,
  },
  {
    text: "Software. Marketing. Automation. Expansion.",
    sub: "Four disciplines. One engine.",
    color: "text-white",
    glowColor: null,
  },
  {
    text: "That's what a Growth System looks like.",
    sub: null,
    color: "text-[#82C21C]",
    glowColor: "drop-shadow-[0_0_40px_rgba(130,194,28,0.4)]",
  },
];

export const StickyNarrative = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const actRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Fallback: show final act immediately
      const lastAct = actRefs.current[ACTS.length - 1];
      if (lastAct) gsap.set(lastAct, { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.5,
          start: "top top",
          end: "+=350%",
          anticipatePin: 1,
        },
      });

      ACTS.forEach((act, i) => {
        const el = actRefs.current[i];
        if (!el) return;

        const isLast = i === ACTS.length - 1;

        // Fade in + drift up
        tl.fromTo(
          el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
        );

        // Shift background glow temperature toward green on act 3+
        if (i >= 2) {
          tl.to(
            bgGlowRef.current,
            { opacity: 0.12, duration: 1.5, ease: "power2.out" },
            "<"
          );
        }

        // Hold
        tl.to({}, { duration: isLast ? 2.5 : 0.8 });

        // Fade out (not the last act)
        if (!isLast) {
          tl.to(el, {
            opacity: 0,
            y: -30,
            duration: 1,
            ease: "power2.in",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-[#061917] flex items-center justify-center overflow-hidden"
      aria-label="Growth System Philosophy"
    >
      {/* Background glow that warms as we progress */}
      <div
        ref={bgGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#82C21C] blur-[160px] rounded-full pointer-events-none opacity-0"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        {ACTS.map((act, i) => (
          <div
            key={i}
            ref={(el) => { actRefs.current[i] = el; }}
            className="absolute inset-x-0 px-6 flex flex-col items-center justify-center text-center"
            style={{ opacity: 0 }}
          >
            <p
              className={`text-[clamp(2.2rem,7vw,6.5rem)] font-bold tracking-tighter leading-[1.05] ${act.color} ${act.glowColor ?? ""}`}
            >
              {act.text}
            </p>
            {act.sub && (
              <p className="mt-6 text-[clamp(1.1rem,3vw,2rem)] font-medium text-white/60 tracking-wide">
                {act.sub}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
