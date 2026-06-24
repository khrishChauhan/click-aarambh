"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

const TRUST_POINTS = [
  {
    title: "Response Within 24 Hours",
    body: "We value momentum. Every inquiry is reviewed by a principal architect, not a sales representative, ensuring technical alignment from day one.",
  },
  {
    title: "Technical First Approach",
    body: "We skip the generic agency pitch. Our first conversation is a deep dive into your infrastructure, data silos, and exact business bottlenecks.",
  },
  {
    title: "No Sales Pressure",
    body: "If we aren't the right fit to scale your specific tech stack, we will tell you immediately and point you toward someone who is.",
  },
  {
    title: "Growth Focused Consultation",
    body: "You will leave our first meeting with an actionable blueprint for systemic improvement, regardless of whether we partner together.",
  },
];

export default function ContactTrust() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section className="w-full bg-[#04110F] py-[10vh] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_POINTS.map((point, i) => (
            <motion.div
              key={i}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              className="group relative flex flex-col justify-start overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-[24px] transition-all duration-300 hover:border-[#82C21C]/30 hover:bg-white/[0.04]"
            >
              {/* Subtle hover glow inside the card */}
              <div className="pointer-events-none absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_top_right,rgba(130,194,28,0.1),transparent_50%)] transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="mb-4 h-1 w-8 rounded-full bg-[#82C21C]/50 transition-all duration-300 group-hover:w-12 group-hover:bg-[#82C21C]" />
              
              <h3 className="mb-4 text-xl font-bold tracking-tight text-white">
                {point.title}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-white/50">
                {point.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
