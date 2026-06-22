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
    title: "Business Expansion",
    desc: "Strategic scaling blueprints for new market penetration and revenue infrastructure.",
    tag: "04",
  },
];

export const BentoGrid = () => {
  return (
    <section id="approach" className="py-32 bg-[#061917] noise" aria-label="Ecosystem Services">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px bg-[#82C21C]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#82C21C]/70">The Ecosystem</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-white leading-[0.9]">
            One Engine.<br />
            <span className="text-white/30">Four Disciplines.</span>
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
      className="group relative flex flex-col p-8 md:p-10 bg-[#082220] rounded-2xl border border-white/[0.05] overflow-hidden cursor-default noise"
      style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(130,194,28,0.12)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(130,194,28,0.08), 0 32px 64px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Mouse-tracking radial gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(130,194,28,0.08), transparent 70%)`,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Bottom border glow on hover */}
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#82C21C]/0 to-transparent group-hover:via-[#82C21C]/20 pointer-events-none"
           style={{ transition: "opacity 0.4s ease" }} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Tag + title row */}
        <div className="flex items-start justify-between mb-5">
          <span className="text-[10px] font-mono text-white/20 tracking-widest">{tag}</span>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 tracking-tight leading-snug group-hover:text-white transition-colors duration-200">
          {title}
        </h3>
        <p className="text-white/50 leading-relaxed text-sm flex-grow">{desc}</p>

        {/* CTA arrow */}
        <div className="mt-8 flex items-center gap-2">
          <div className="w-6 h-px bg-[#82C21C]/40 group-hover:w-10 group-hover:bg-[#82C21C]"
               style={{ transition: "all 0.3s ease" }} />
          <a
            href="#contact"
            className="text-xs font-semibold text-[#82C21C]/60 group-hover:text-[#82C21C] tracking-wider uppercase focus:outline-none focus-visible:underline"
            style={{ transition: "color 0.2s ease" }}
          >
            Explore
          </a>
        </div>
      </div>
    </motion.div>
  );
};
