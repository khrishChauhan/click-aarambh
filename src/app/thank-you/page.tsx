"use client";

import { motion } from "framer-motion";
import { User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden px-4">
      {/* Background Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#70BA28]/20 rounded-full blur-[120px] pointer-events-none" />

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
        className="relative z-10 w-full max-w-lg p-10 md:p-12 rounded-3xl bg-white backdrop-blur-xl border border-[#0D2E26]/10 shadow-2xl flex flex-col items-center text-center"
      >
        <h1 className="text-3xl md:text-4xl font-semibold text-[#0D2E26] tracking-tight mb-3">
          Thank You for Getting in Touch
        </h1>
        <p className="text-[#0D2E26]/70 text-sm md:text-base mb-10">
          Our experts will reach out to you soon to discuss your architecture.
        </p>

        {/* Testimonial Block */}
        <div className="w-full bg-[#0D2E26]/5 border border-[#0D2E26]/10 rounded-2xl p-6 mb-10 relative">
          <div className="flex justify-center -space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1A2E2A] border-2 border-[#061917] flex items-center justify-center text-[#70BA28]">
              <User size={20} />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#13221F] border-2 border-[#061917] flex items-center justify-center text-[#70BA28]/80">
              <User size={20} />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#0D1815] border-2 border-[#061917] flex items-center justify-center text-[#2E4D45]">
              <User size={20} />
            </div>
          </div>
          
          <p className="italic text-[#0D2E26]/80 text-sm mb-4">
            "Click Aarambh Ventures completely transformed our growth infrastructure. The depth of their technical expertise is unmatched."
          </p>
          
          <div className="flex flex-col items-center">
            <span className="text-[#0D2E26] font-medium text-sm">Sarah Jenkins</span>
            <span className="text-[#4B635D] text-xs">Founder at GrowthLabs</span>
          </div>
        </div>

        {/* Action & Socials */}
        <div className="flex flex-col items-center gap-8 w-full">
          <Link href="/" className="group flex items-center gap-2 text-sm text-[#70BA28] hover:text-[#0D2E26] transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Return to Homepage
          </Link>

          <div className="flex items-center gap-6 pt-6 border-t border-[#0D2E26]/10 w-full justify-center">
            <a href="#" className="text-[#4B635D] hover:text-[#70BA28] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="text-[#4B635D] hover:text-[#70BA28] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="text-[#4B635D] hover:text-[#70BA28] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
