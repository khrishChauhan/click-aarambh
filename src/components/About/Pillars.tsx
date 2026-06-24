"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGSAP, gsap } from "@/lib/gsap";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

/* ── Pillar data ────────────────────────────────────────────────── */
const PILLARS = [
  {
    id: "pillar-1",
    numeral: "01",
    title: "Systemic Architecture",
    body: "We don't build disconnected tools or isolated campaigns. We engineer interconnected growth systems — where software, marketing, automation, and analytics work as a single, unified engine that compounds value over time.",
  },
  {
    id: "pillar-2",
    numeral: "02",
    title: "Engineering Rigor",
    body: "Enterprise-grade code quality, scalable infrastructure design, and long-term technical sustainability are non-negotiable. We build for what the business will become, not just what it is today.",
  },
  {
    id: "pillar-3",
    numeral: "03",
    title: "Quantifiable ROI",
    body: "Every decision is tied to measurable business outcomes, not vanity metrics. We define success criteria before we write a single line of code or launch a single campaign.",
  },
  {
    id: "pillar-4",
    numeral: "04",
    title: "Strategic Partnership",
    body: "We operate as an extension of the business — challenging assumptions, mitigating technical risk, and aligning every technology decision with long-term commercial growth goals.",
  },
];

/* ── Desktop Stacking Cards ─────────────────────────────────────
   CSS-native sticky positioning. Each card has the same `top`
   value and an increasing z-index, so each new card slides up
   and visually stacks on top of the previous one.

   GSAP is used ONLY for the dimming animation (opacity/scale/blur)
   on previously-seen cards — no GSAP pin, no pinSpacing issues,
   no grid layout collapse.                                         */
function PillarStack({ reducedMotion }: { reducedMotion: boolean }) {
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reducedMotion || window.innerWidth < 1024) return;

    ensureGSAP();

    const ctx = gsap.context(() => {
      /* Dim the previous card when the next card's top edge
         reaches 70% of the viewport. Use scrub so the transition
         feels tied to scroll, not a sudden pop.                   */
      PILLARS.forEach((_, i) => {
        if (i === 0) return; // No card before the first
        const prevCard = cardRefs.current[i - 1];
        const thisCard = cardRefs.current[i];
        if (!prevCard || !thisCard) return;

        gsap.to(prevCard, {
          scale: 0.95,
          opacity: 0.3,
          filter: "blur(2px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: thisCard,
            start: "top 70%",
            end: "top 20%",
            scrub: 0.6,
          },
          /* willChange is set dynamically here, only during        */
          /* animation — not baked into the element's static style. */
          onStart: () => {
            if (prevCard) prevCard.style.willChange = "transform, opacity, filter";
          },
          onComplete: () => {
            if (prevCard) prevCard.style.willChange = "auto";
          },
        });
      });
    }, stackRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <div ref={stackRef} className="relative">
      {PILLARS.map((pillar, i) => (
        <motion.div
          key={pillar.id}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="mb-6 rounded-3xl border border-white/5 p-8 lg:p-10"
          style={{
            /* CSS-native sticky stacking — no GSAP pin needed.
               All cards share the same `top` so each new card
               slides up and fully covers the previous one.
               z-index increases so later cards appear on top.     */
            position: "sticky",
            top: `${80 + i * 4}px`, /* Tiny offset per card for depth cue */
            zIndex: 10 + i,
            background: "rgba(8,34,32,0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.05), 0 32px 80px rgba(0,0,0,0.35)",
            /* No willChange here — set dynamically in GSAP onStart  */
          }}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            delay: reducedMotion ? 0 : i * 0.1,
            ease: EASE,
          }}
        >
          {/* Numeral watermark — constrained to prevent content overlap */}
          <div
            className="absolute right-6 top-4 select-none overflow-hidden font-mono font-black text-white/5"
            style={{
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              lineHeight: 1,
              /* maxWidth prevents the watermark expanding into the
                 text zone on mid-size viewports.                   */
              maxWidth: "30%",
            }}
            aria-hidden="true"
          >
            {pillar.numeral}
          </div>

          {/* Active top-edge accent line */}
          <div
            className="absolute left-0 right-0 top-0 h-px rounded-t-3xl"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(156,223,59,0.25) 50%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Card content — z-index above watermark */}
          <div className="relative z-10">
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#9CDF3B]/70">
              {pillar.numeral}
            </p>
            <h3
              className="mb-5 font-extrabold leading-[1.1] tracking-[-0.02em] text-white"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
            >
              {pillar.title}
            </h3>
            <p className="text-[clamp(0.95rem,1.2vw,1.05rem)] leading-[1.7] text-white/55">
              {pillar.body}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Mobile / Tablet Accordion ──────────────────────────────── */
function PillarAccordion() {
  const [activeId, setActiveId] = useState<string | null>(PILLARS[0].id);

  return (
    <div className="space-y-2">
      {PILLARS.map((pillar) => {
        const isOpen = activeId === pillar.id;
        return (
          <div
            key={pillar.id}
            className="overflow-hidden rounded-2xl border transition-colors duration-300"
            style={{
              borderColor: isOpen
                ? "rgba(156,223,59,0.25)"
                : "rgba(255,255,255,0.06)",
              background: "rgba(8,34,32,0.6)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <button
              type="button"
              onClick={() => setActiveId(isOpen ? null : pillar.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-body-${pillar.id}`}
              className="flex w-full items-center justify-between px-6 py-5 text-left"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#9CDF3B]/70">
                  {pillar.numeral}
                </span>
                <span
                  className="font-bold leading-tight text-white"
                  style={{ fontSize: "clamp(1.1rem, 3vw, 1.35rem)" }}
                >
                  {pillar.title}
                </span>
              </div>
              <motion.div
                className="ml-4 flex-shrink-0"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="8" y1="2" x2="8" y2="14" stroke="rgba(156,223,59,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="2" y1="8" x2="14" y2="8" stroke="rgba(156,223,59,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-body-${pillar.id}`}
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="border-t border-white/5 px-6 pb-6 pt-4">
                    <p className="text-[clamp(0.95rem,2.5vw,1.05rem)] leading-[1.7] text-white/55">
                      {pillar.body}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ── Main Pillars component ─────────────────────────────────── */
export default function Pillars() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    /* aria-labelledby points to the single h2 rendered below.
       No duplicate headings in either the desktop or mobile branch. */
    <section
      className="relative w-full py-[18vh]"
      aria-labelledby="pillars-heading"
    >
      {/* ── Ambient glow — clipped by own wrapper ─────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(156,223,59,0.04) 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-24">

        {/* ── SINGLE section header — always in DOM, always visible ─
            id="pillars-heading" is the aria label target for the
            section. Neither the desktop nor mobile layout duplicates
            this heading.                                             */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-6 bg-[#9CDF3B] opacity-50" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#9CDF3B]/60">
              [ Why Choose Us ]
            </span>
          </div>
          <h2
            id="pillars-heading"
            className="mb-4 font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Why Businesses Choose{" "}
            <span className="text-[#9CDF3B]">Click Aarambh</span>
          </h2>
          <p
            className="max-w-lg text-[clamp(0.95rem,1.3vw,1.05rem)] leading-[1.7] text-white/50"
          >
            Four principles that differentiate an interconnected growth system
            from a collection of disconnected services.
          </p>
        </motion.div>

        {/* ── Desktop: sticky-left anchor + scrolling card stack ─ */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-16">

          {/* Left: decorative anchor (no h2 — heading is above) */}
          <div className="col-span-4">
            <div className="sticky top-[80px]">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">
                Built on four non-negotiable principles.
              </p>
              <div className="mt-8 space-y-3">
                {PILLARS.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="h-px w-4 bg-[#9CDF3B] opacity-30" />
                    <span className="font-mono text-[10px] text-white/30">
                      {p.numeral} — {p.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: CSS-sticky stacking cards */}
          <div className="col-span-8">
            <PillarStack reducedMotion={reducedMotion} />
          </div>
        </div>

        {/* ── Mobile / Tablet: accordion ──────────────────────── */}
        <div className="lg:hidden">
          <PillarAccordion />
        </div>
      </div>
    </section>
  );
}
