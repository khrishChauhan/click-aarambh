"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useState } from "react";



export default function ContactForm() {
  const reducedMotion = useReducedMotion() ?? false;
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Mock submission
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  return (
    <section className="relative w-full bg-[#04110F] py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        
        <div className="mx-auto max-w-2xl">
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-white md:text-4xl mb-4">
                Initiate Discovery.
              </h2>
              <p className="text-white/60 leading-relaxed max-w-lg">
                Provide us with the context of your current bottleneck. We will review your infrastructure and reach out to schedule a technical assessment.
              </p>
            </div>

            {formState === "success" ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-[#82C21C]/30 bg-[#82C21C]/5 p-8 backdrop-blur-md"
              >
                <h3 className="text-xl font-bold text-[#82C21C] mb-2">Transmission Successful.</h3>
                <p className="text-white/70">Our architects are reviewing your data. Expect a response within 24 hours to schedule the technical discovery.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Name Field */}
                  <div className="group relative">
                    <label htmlFor="name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors group-focus-within:text-[#82C21C]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full rounded-lg border border-white/10 bg-black/20 p-4 text-white placeholder-white/20 backdrop-blur-md transition-all duration-300 focus:border-[#82C21C] focus:bg-[#82C21C]/5 focus:outline-none focus:ring-1 focus:ring-[#82C21C]/50"
                      placeholder="Jane Doe"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="group relative">
                    <label htmlFor="email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors group-focus-within:text-[#82C21C]">
                      Work Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full rounded-lg border border-white/10 bg-black/20 p-4 text-white placeholder-white/20 backdrop-blur-md transition-all duration-300 focus:border-[#82C21C] focus:bg-[#82C21C]/5 focus:outline-none focus:ring-1 focus:ring-[#82C21C]/50"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                {/* Scope Field */}
                <div className="group relative">
                  <label htmlFor="scope" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors group-focus-within:text-[#82C21C]">
                    Project Scope / Bottleneck
                  </label>
                  <textarea
                    id="scope"
                    required
                    rows={4}
                    className="w-full resize-none rounded-lg border border-white/10 bg-black/20 p-4 text-white placeholder-white/20 backdrop-blur-md transition-all duration-300 focus:border-[#82C21C] focus:bg-[#82C21C]/5 focus:outline-none focus:ring-1 focus:ring-[#82C21C]/50"
                    placeholder="Describe the current architecture and where the friction lies..."
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/5 px-8 py-4 transition-all duration-300 hover:border-[#82C21C]/50 hover:bg-[#82C21C]/10 hover:shadow-[0_0_20px_rgba(130,194,28,0.2)] outline-none focus-visible:ring-2 focus-visible:ring-[#82C21C] disabled:opacity-50 md:w-auto"
                  >
                    <span className="relative z-10 font-mono text-[11px] font-bold uppercase tracking-widest text-white transition-colors group-hover:text-[#82C21C]">
                      {formState === "submitting" ? "Transmitting..." : "Submit Discovery Request"}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
