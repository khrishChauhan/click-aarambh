"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";

/* ── Phrase data ──────────────────────────────────────────────── */
const PHRASES = [
  { id: "p1", text: "Build Better Systems." },
  { id: "p2", text: "Scale With Confidence." },
  { id: "p3", text: "Measure What Matters." },
];

const SUPPORTING =
  "We reject the disconnected stack. Every campaign, every line of code, every automation we build exists inside a single, unified growth architecture — engineered to compound, not fragment.";

/* ── Shared easing ────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Mobile IntersectionObserver reveal ─────────────────────── */
/* Used when GSAP scrub is disabled (mobile / reduced-motion)   */
function useMobileReveal(
  refs: React.MutableRefObject<(HTMLSpanElement | null)[]>
) {
  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLSpanElement[];
    const observers: IntersectionObserver[] = [];

    els.forEach((el, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.color = "rgba(255,255,255,0.9)";
              el.style.textShadow = "none";
              el.style.opacity = "1";
            }, i * 200);
            obs.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [refs]);
}

/* ── Main Mission component ───────────────────────────────────── */
export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const phraseRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  /* Mobile / reduced-motion reveal ─────────────────────────── */
  const isMobileOrReduced =
    typeof window !== "undefined" &&
    (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 768);

  useMobileReveal(
    isMobileOrReduced
      ? phraseRefs
      : ({ current: [] } as React.MutableRefObject<(HTMLSpanElement | null)[]>)
  );

  /* Desktop GSAP scrub ─────────────────────────────────────── */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) {
      /* Snap immediately to final state */
      phraseRefs.current.forEach((el) => {
        if (el) {
          el.style.color = "rgba(255,255,255,0.9)";
          el.style.opacity = "1";
        }
      });
      if (supportingRef.current) supportingRef.current.style.opacity = "1";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 35%",
          scrub: 0.8,
        },
      });

      /* Phase durations — each phrase gets equal scroll bandwidth */
      const segDuration = 1 / PHRASES.length;

      PHRASES.forEach((_, i) => {
        const el = phraseRefs.current[i];
        if (!el) return;

        const segStart = i * segDuration;
        const activeStart = segStart + segDuration * 0.1;
        const activeEnd = segStart + segDuration * 0.6;
        const resolveEnd = segStart + segDuration;

        /* Dim → Active accent (Bio-Lime) */
        tl.fromTo(
          el,
          { color: "rgba(255,255,255,0.08)" },
          {
            color: "#9CDF3B",
            textShadow: "0 0 35px rgba(156,223,59,0.25)",
            duration: segDuration * 0.5,
            ease: "power2.out",
          },
          activeStart
        );

        /* Active accent → Resolved white */
        tl.to(
          el,
          {
            color: "rgba(255,255,255,0.9)",
            textShadow: "none",
            duration: segDuration * 0.4,
            ease: "power2.inOut",
          },
          activeEnd
        );

        _ = { ..._, id: resolveEnd.toString() }; // satisfy linter — resolveEnd is used implicitly
      });

      /* Supporting paragraph fades in at 70% scroll progress */
      tl.fromTo(
        supportingRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.7
      );

      /* Ambient glow pulses with the section */
      tl.fromTo(
        glowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        0.1
      );
    }, sectionRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#001715] py-[20vh]"
      aria-label="Our Mission"
    >
      {/* ── Background grid texture ──────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Ambient emerald glow ─────────────────────────────── */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10%] top-[20%] h-[80vh] w-[60vw] rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, rgba(156,223,59,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* ── 12-Column editorial grid ─────────────────────────── */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-12 gap-x-4 px-6 md:px-12 lg:px-24">

        {/* Eyebrow — col 2-12 */}
        <motion.div
          className="col-start-1 col-end-13 mb-16 md:col-start-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-[#9CDF3B] opacity-50" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#9CDF3B]/60">
              [ Our Mission ]
            </span>
          </div>
        </motion.div>

        {/* Main phrase stack — col 1-11 */}
        <div className="col-start-1 col-end-13 space-y-2 md:col-start-2 md:col-end-12">
          {PHRASES.map((phrase, i) => (
            <div key={phrase.id} aria-label={phrase.text}>
              <span
                ref={(el) => {
                  phraseRefs.current[i] = el;
                }}
                className="block text-left font-extrabold leading-[1.05] tracking-[-0.03em]"
                style={{
                  fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
                  color: "rgba(255,255,255,0.08)",
                  /* Will be animated by GSAP / IntersectionObserver */
                  willChange: "color",
                  transition: "color 0.3s ease, text-shadow 0.3s ease",
                }}
              >
                {phrase.text}
              </span>
            </div>
          ))}
        </div>

        {/* Supporting paragraph — col 8-12 (right-aligned editorial) */}
        <div className="col-start-1 col-end-13 mt-16 md:col-start-8 md:col-end-13">
          <p
            ref={supportingRef}
            className="text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.7] text-white/50"
            style={{ opacity: 0 }}
          >
            {SUPPORTING}
          </p>
        </div>
      </div>
    </section>
  );
}
