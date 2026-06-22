"use client";

import { motion } from "framer-motion";

const STORIES = [
  {
    sector: "Logistics & Supply Chain",
    system: "Unified order management + real-time inventory sync + automated dispatch routing",
    before: "4 disconnected vendor tools",
    after: "1 unified operational system. Manual dispatch reduced to zero. Cycle time: 48h → 4h.",
    flowSteps: ["Vendor ERP", "Manual Dispatch", "Inventory Sheet", "→", "Unified Platform"],
  },
  {
    sector: "Direct-to-Consumer E-Commerce",
    system: "Headless storefront + automated CRM lifecycle + performance marketing stack",
    before: "Brand growth tied entirely to ad spend",
    after: "Owned-channel infrastructure built to compound. Growth decoupled from burn rate.",
    flowSteps: ["Ad Spend", "One-time Orders", "No Retention", "→", "Compounding Engine"],
  },
];

export const ImpactStories = () => {
  return (
    <section className="py-32 bg-[#061917]" aria-label="Architecture Outcomes">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-20">
          <p className="text-[#82C21C] uppercase tracking-[0.2em] text-xs font-bold mb-4">
            Proof of Architecture
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            We don't build features.
            <br />
            <span className="text-white/50">We build revenue infrastructure.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {STORIES.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative bg-[#082220] border border-white/5 rounded-3xl p-10 md:p-14 overflow-hidden group focus-within:ring-2 focus-within:ring-[#82C21C] focus-within:ring-offset-2 focus-within:ring-offset-[#061917]"
            >
              {/* Blueprint grid background */}
              <div
                className="absolute inset-0 opacity-[0.025] group-hover:opacity-[0.06] pointer-events-none"
                style={{
                  transition: "opacity 0.5s ease",
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Sector label */}
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40 block mb-8">
                  {story.sector}
                </span>

                {/* System description */}
                <p className="text-sm text-[#82C21C]/80 font-medium mb-6 leading-relaxed">
                  System: {story.system}
                </p>

                {/* Before → After flow */}
                <div className="flex-grow space-y-3 mb-10">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0" />
                    <span className="text-white/40 text-sm line-through">{story.before}</span>
                  </div>
                  <div className="w-px h-6 bg-gradient-to-b from-white/10 to-[#82C21C]/40 ml-[2px]" />
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#82C21C] flex-shrink-0 mt-1.5" />
                    <span className="text-white text-base leading-relaxed font-medium">{story.after}</span>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="inline-flex items-center text-sm font-semibold text-[#82C21C] hover:text-[#A8F23A] focus:outline-none focus:underline"
                  style={{ transition: "color 0.2s ease" }}
                >
                  Discuss Your Architecture
                  <span
                    className="ml-2 inline-block group-hover:translate-x-1"
                    style={{ transition: "transform 0.2s ease" }}
                  >
                    &rarr;
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
