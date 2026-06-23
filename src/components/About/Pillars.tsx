"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ── Pillar data ───────────────────────────────────────────────── */
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

/* ── Shared easing ─────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Desktop Stacking Cards (GSAP) ─────────────────────────────── */
function PillarStack({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reducedMotion || window.innerWidth < 1024) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        /* Each card locks in at a staggered top offset */
        const stickyTop = 80 + i * 24;

        ScrollTrigger.create({
          trigger: card,
          start: `top ${stickyTop}px`,
          endTrigger: stackRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        });

        /* Dim previously visible cards when a new one enters */
        if (i < PILLARS.length - 1) {
          const nextCard = cardRefs.current[i + 1];
          if (!nextCard) return;

          gsap.timeline({
            scrollTrigger: {
              trigger: nextCard,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          })
            .to(card, {
              scale: 0.96,
              opacity: 0.35,
              filter: "blur(2px)",
              duration: 0.5,
              ease: "power2.out",
            });
        }
      });
    }, stackRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <div ref={stackRef} className="relative lg:pl-12">
      {PILLARS.map((pillar, i) => (
        <motion.div
          key={pillar.id}
          ref={(el) => { cardRefs.current[i] = el; }}
          className="mb-6 rounded-3xl border border-white/5 p-8 lg:p-10"
          style={{
            background: "rgba(8,34,32,0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.05), 0 32px 80px rgba(0,0,0,0.35)",
            willChange: "transform, opacity, filter",
          }}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            delay: reducedMotion ? 0 : i * 0.1,
            ease: EASE,
          }}
          /* Hover: restore full active state even when GSAP dims */
          whileHover={
            reducedMotion
              ? {}
              : {
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: { duration: 0.3 },
                }
          }
        >
          {/* Numeral watermark */}
          <div
            className="absolute right-8 top-6 select-none font-mono font-black text-white/5"
            style={{ fontSize: "clamp(4rem, 8vw, 7rem)", lineHeight: 1 }}
            aria-hidden="true"
          >
            {pillar.numeral}
          </div>

          {/* Active top border glow */}
          <div
            className="absolute left-0 right-0 top-0 h-px rounded-t-3xl"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(156,223,59,0.25) 50%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Card content */}
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
            {/* Accordion header */}
            <button
              type="button"
              onClick={() => setActiveId(isOpen ? null : pillar.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-body-${pillar.id}`}
              className="flex w-full items-center justify-between px-6 py-5 text-left"
              style={{ cursor: "pointer" }}
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
              {/* Chevron indicator */}
              <motion.div
                className="ml-4 flex-shrink-0"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <line
                    x1="8"
                    y1="2"
                    x2="8"
                    y2="14"
                    stroke="rgba(156,223,59,0.7)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="2"
                    y1="8"
                    x2="14"
                    y2="8"
                    stroke="rgba(156,223,59,0.7)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            </button>

            {/* Accordion body */}
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

  /* Determine layout mode via CSS — no JS media query needed   */
  /* Desktop stacking handled by GSAP; tablet/mobile = accordion */

  return (
    <section
      className="relative w-full overflow-hidden bg-[#001715] py-[18vh]"
      aria-label="Why Businesses Choose Click Aarambh"
    >
      {/* ── Subtle ambient glow ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(156,223,59,0.04) 0%, transparent 65%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-24">

        {/* ── Desktop layout: sticky left + scrolling right ─── */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-16">

          {/* Left: Sticky anchor */}
          <div className="col-span-4">
            <div className="sticky top-[80px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <div className="mb-8 flex items-center gap-3">
                  <div className="h-px w-6 bg-[#9CDF3B] opacity-50" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#9CDF3B]/60">
                    [ Why Choose Us ]
                  </span>
                </div>

                <h2
                  className="mb-6 font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
                >
                  Why Businesses Choose{" "}
                  <span className="text-[#9CDF3B]">Click Aarambh</span>
                </h2>

                <p className="text-[clamp(0.95rem,1.2vw,1.05rem)] leading-[1.7] text-white/50">
                  Four principles that differentiate an interconnected growth
                  system from a collection of disconnected services.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right: Stacking cards */}
          <div className="col-span-8">
            <PillarStack reducedMotion={reducedMotion} />
          </div>
        </div>

        {/* ── Mobile / Tablet layout: accordion ──────────────── */}
        <div className="lg:hidden">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-6 bg-[#9CDF3B] opacity-50" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#9CDF3B]/60">
                [ Why Choose Us ]
              </span>
            </div>
            <h2
              className="mb-4 font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(1.8rem, 6vw, 2.6rem)" }}
            >
              Why Businesses Choose{" "}
              <span className="text-[#9CDF3B]">Click Aarambh</span>
            </h2>
            <p className="text-[clamp(0.95rem,3vw,1.1rem)] leading-[1.7] text-white/50">
              Four principles that differentiate an interconnected growth system
              from disconnected services.
            </p>
          </motion.div>

          <PillarAccordion />
        </div>
      </div>
    </section>
  );
}
