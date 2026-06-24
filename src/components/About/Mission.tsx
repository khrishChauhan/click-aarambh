"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGSAP, gsap } from "@/lib/gsap";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/* ── Phrase data ──────────────────────────────────────────────── */
const PHRASES = [
  { id: "p1", text: "Build Better Systems." },
  { id: "p2", text: "Scale With Confidence." },
  { id: "p3", text: "Measure What Matters." },
];

const SUPPORTING =
  "We reject the disconnected stack. Every campaign, every line of code, every automation we build exists inside a single, unified growth architecture — engineered to compound, not fragment.";

/* ── Mobile IntersectionObserver reveal ───────────────────────
   Accepts `enabled` flag so the hook is called unconditionally
   (no Rules-of-Hooks violation) but is a no-op when disabled.  */
function useMobileReveal(
  refs: React.MutableRefObject<(HTMLSpanElement | null)[]>,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) return;

    const els = refs.current.filter(Boolean) as HTMLSpanElement[];
    const observers: IntersectionObserver[] = [];

    els.forEach((el, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.color = "rgba(255,255,255,0.9)";
              el.style.textShadow = "none";
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
  // refs.current is stable (useRef), enabled is primitive — no stale closure risk
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
}

/* ── Main Mission component ───────────────────────────────────── */
export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const phraseRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  /* Safe client-side detection — never runs on the server.
     useState(false) default ensures SSR/hydration renders phrases
     visible (no-JS friendly: color starts at rgba(255,255,255,0.9))
     until the effect fires and GSAP takes over.                   */
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    setIsMobileOrReduced(reduced || mobile);
  }, []);

  /* Always-unconditional hook — enabled flag disables effect body */
  useMobileReveal(phraseRefs, isMobileOrReduced);

  /* Desktop GSAP scrub ─────────────────────────────────────────  */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) {
      /* Snap to final state immediately — no GSAP needed */
      phraseRefs.current.forEach((el) => {
        if (el) el.style.color = "rgba(255,255,255,0.9)";
      });
      if (supportingRef.current) supportingRef.current.style.opacity = "1";
      return;
    }

    ensureGSAP();

    const ctx = gsap.context(() => {
      /* Set initial states synchronously (before first paint on
         most browsers), minimising any flash of visible content  */
      gsap.set(phraseRefs.current.filter(Boolean), {
        color: "rgba(255,255,255,0.08)",
      });
      gsap.set(supportingRef.current, { opacity: 0 });
      gsap.set(glowRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          /* Extended scroll bandwidth — wider window gives the
             phrase illumination a cinematic, unhurried pace.     */
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1.0,
        },
      });

      /* Each phrase gets an equal share of the scroll timeline   */
      const seg = 1 / PHRASES.length;

      PHRASES.forEach((_, i) => {
        const el = phraseRefs.current[i];
        if (!el) return;

        const segStart = i * seg;
        const activeStart = segStart + seg * 0.1;
        const activeEnd = segStart + seg * 0.6;

        /* Resting → Active (Bio-Lime accent) */
        tl.fromTo(
          el,
          { color: "rgba(255,255,255,0.08)" },
          {
            color: "#9CDF3B",
            textShadow: "0 0 35px rgba(156,223,59,0.25)",
            duration: seg * 0.5,
            ease: "power2.out",
          },
          activeStart
        );

        /* Active → Resolved (near-white, full legibility) */
        tl.to(
          el,
          {
            color: "rgba(255,255,255,0.9)",
            textShadow: "none",
            duration: seg * 0.4,
            ease: "power2.inOut",
          },
          activeEnd
        );
      });

      /* Supporting paragraph fades in late in the scroll arc     */
      tl.fromTo(
        supportingRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.72
      );

      /* Ambient glow rises early — atmospheric backdrop          */
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
      className="relative w-full py-[20vh]"
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

      {/* ── Ambient glow — clipped by its own wrapper ────────── */}
      {/* overflow-hidden is on this inner wrapper, NOT on the    */}
      {/* section, so the page noise layer is never clipped.      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          ref={glowRef}
          className="absolute left-[-10%] top-[20%] h-[80vh] w-[60vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(156,223,59,0.06) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* ── 12-Column editorial grid ─────────────────────────── */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-12 gap-x-4 px-6 md:px-12 lg:px-24">

        {/* Eyebrow */}
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

        {/* Main phrase stack — col 2-12 on md+ */}
        <div className="col-start-1 col-end-13 space-y-2 md:col-start-2 md:col-end-12">
          {PHRASES.map((phrase, i) => (
            <div key={phrase.id}>
              <span
                ref={(el) => {
                  phraseRefs.current[i] = el;
                }}
                className="block text-left font-extrabold leading-[1.05] tracking-[-0.03em]"
                style={{
                  fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
                  /* No-JS friendly: phrases start fully visible.
                     GSAP's gsap.set() dims them before any scroll
                     event fires, so there is no perceptible flash. */
                  color: "rgba(255,255,255,0.9)",
                  willChange: "color",
                }}
              >
                {phrase.text}
              </span>
            </div>
          ))}
        </div>

        {/* Supporting paragraph — right-offset on md+ */}
        <div className="col-start-1 col-end-13 mt-16 md:col-start-8 md:col-end-13">
          <p
            ref={supportingRef}
            className="text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.7] text-white/50"
          >
            {SUPPORTING}
          </p>
        </div>
      </div>
    </section>
  );
}
