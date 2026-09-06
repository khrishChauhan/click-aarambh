"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

const BENTO_ITEMS = [
  {
    title: "Software Development",
    desc: "Bespoke platforms and scalable infrastructure built for high-load environments.",
    tag: "01",
  },
  {
    title: "Digital Marketing",
    desc: "Precision-targeted campaigns driven by data architecture, not guesswork.",
    tag: "02",
  },
  {
    title: "Automation Systems",
    desc: "Eradicating manual friction with seamless integrations and workflow engines.",
    tag: "03",
  },
  {
    title: "Business Growth Expansion",
    desc: "Strategic scaling blueprints for new market penetration and revenue infrastructure.",
    tag: "04",
  },
];

export const BentoGrid = () => {
  return (
    <section id="approach" className="py-32 bg-white noise" aria-label="Ecosystem Services">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px bg-[#70BA28]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#70BA28]/70">The Ecosystem</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-[#0D2E26] leading-[0.9]">
            One Engine.<br />
            <span className="text-[#0D2E26]/30">Four Disciplines.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BENTO_ITEMS.map((item, i) => (
            <BentoCard key={i} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BentoCard = ({
  title,
  desc,
  tag,
  index,
}: {
  title: string;
  desc: string;
  tag: string;
  index: number;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="group relative flex flex-col p-8 md:p-10 bg-white rounded-2xl border border-[#0D2E26]/5 overflow-hidden cursor-default noise shadow-sm"
      style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(112,186,40,0.3)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(112,186,40,0.2), 0 12px 32px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(13,46,38,0.05)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
      }}
    >
      {/* Mouse-tracking radial gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(112,186,40,0.06), transparent 70%)`,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Bottom border glow on hover */}
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#82C21C]/0 to-transparent group-hover:via-[#82C21C]/20 pointer-events-none"
           style={{ transition: "opacity 0.4s ease" }} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Tag + title row */}
        <div className="flex items-start justify-between mb-5">
          <span className="text-[10px] font-mono text-[#0D2E26]/20 tracking-widest">{tag}</span>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold text-[#0D2E26] mb-4 tracking-tight leading-snug group-hover:text-[#0D2E26] transition-colors duration-200">
          {title}
        </h3>
        <p className="text-[#4B635D] leading-relaxed text-sm flex-grow">{desc}</p>

        {/* CTA arrow */}
        <div className="mt-8 flex items-center gap-2">
          <div className="w-6 h-px bg-[#70BA28]/40 group-hover:w-10 group-hover:bg-[#70BA28]"
               style={{ transition: "all 0.3s ease" }} />
          <a
            href="#contact"
            className="text-xs font-semibold text-[#70BA28]/60 group-hover:text-[#70BA28] tracking-wider uppercase focus:outline-none focus-visible:underline"
            style={{ transition: "color 0.2s ease" }}
          >
            Explore
          </a>
        </div>
      </div>
    </motion.div>
  );
};
