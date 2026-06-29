"use client";

import { motion } from "framer-motion";
import { User, Twitter, Linkedin, Instagram, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#061917] overflow-hidden px-4">
      {/* Background Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#82C21C]/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid overlay for texture */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg p-10 md:p-12 rounded-3xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col items-center text-center"
      >
        <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
          Thank You for Getting in Touch
        </h1>
        <p className="text-white/70 text-sm md:text-base mb-10">
          Our experts will reach out to you soon to discuss your architecture.
        </p>

        {/* Testimonial Block */}
        <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 mb-10 relative">
          <div className="flex justify-center -space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1A2E2A] border-2 border-[#061917] flex items-center justify-center text-[#82C21C]">
              <User size={20} />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#13221F] border-2 border-[#061917] flex items-center justify-center text-[#82C21C]/80">
              <User size={20} />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#0D1815] border-2 border-[#061917] flex items-center justify-center text-[#82C21C]/60">
              <User size={20} />
            </div>
          </div>
          
          <p className="italic text-white/80 text-sm mb-4">
            "Click Aarambh completely transformed our growth infrastructure. The depth of their technical expertise is unmatched."
          </p>
          
          <div className="flex flex-col items-center">
            <span className="text-white font-medium text-sm">Sarah Jenkins</span>
            <span className="text-white/50 text-xs">Founder at GrowthLabs</span>
          </div>
        </div>

        {/* Action & Socials */}
        <div className="flex flex-col items-center gap-8 w-full">
          <Link href="/" className="group flex items-center gap-2 text-sm text-[#82C21C] hover:text-white transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Return to Homepage
          </Link>

          <div className="flex items-center gap-6 pt-6 border-t border-white/10 w-full justify-center">
            <a href="#" className="text-white/40 hover:text-[#82C21C] transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-white/40 hover:text-[#82C21C] transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-white/40 hover:text-[#82C21C] transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
