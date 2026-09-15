"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

export default function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 600);
  };

  return (
    <section className="relative bg-[#F8FAF8] pb-24 pt-8">
      <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <div className="relative overflow-hidden rounded-3xl bg-[#0D2E26] px-8 py-14 md:px-16 md:py-20 text-white shadow-2xl border border-[#70BA28]/20">
          {/* Subtle architectural background texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Emerald accent radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#70BA28] opacity-15 blur-[100px]"
          />

          <div className="relative z-10 max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-[#70BA28]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#70BA28]">
                The Click Aarambh Dispatch
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Engineering insights and growth telemetry, direct to your inbox.
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base text-white/75 leading-relaxed mb-8 max-w-xl">
              Deep dives into fullstack systems, data pipelines, and verified venture scaling
              frameworks delivered every Tuesday. Zero marketing fluff.
            </p>

            {/* Form */}
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 rounded-2xl bg-[#70BA28]/15 border border-[#70BA28]/40 px-6 py-4 text-[#70BA28]"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Telemetry verified: Welcome to the weekly briefing.
                </span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <input
                  type="email"
                  required
                  placeholder="Enter your enterprise email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl border border-white/15 bg-white/10 px-5 py-3.5 font-mono text-xs text-white placeholder-white/50 outline-none transition-all focus:border-[#70BA28] focus:bg-white/15 focus:ring-2 focus:ring-[#70BA28]/30"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center rounded-xl bg-[#70BA28] px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0D2E26] hover:bg-[#62A422] transition-colors shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[#70BA28] disabled:opacity-50"
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}

            {/* Trust line */}
            <div className="mt-6 flex items-center gap-4 text-xs font-mono text-white/50">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#70BA28]" />
                Join 1,200+ founders &amp; tech leads
              </span>
              <span>•</span>
              <span>No spam guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
