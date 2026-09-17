"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface AdminPasswordGateProps {
  onUnlock: () => void;
}

export default function AdminPasswordGate({ onUnlock }: AdminPasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === "123") {
      setError(false);
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F8FAF8] px-4 py-12 grid-overlay">
      {/* Soft ambient emerald glow in background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-[#70BA28] opacity-[0.08] blur-[120px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-[#0D2E26]/10 bg-white p-8 md:p-10 shadow-[0_10px_35px_-8px_rgba(13,46,38,0.08),0_4px_12px_-2px_rgba(13,46,38,0.04)]"
      >
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="inline-block mb-6 outline-none group">
            <Image
              src="/logo.png"
              alt="Click Aarambh Ventures Logo"
              width={200}
              height={60}
              className="h-12 w-auto object-contain brightness-0 opacity-90 transition-opacity group-hover:opacity-100"
              priority
            />
          </Link>

          {/* Eyebrow & Title */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#70BA28]/15 border border-[#70BA28]/30 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#0D2E26] mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#70BA28]" />
            <span>Admin Studio · Phase 1</span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-[#0D2E26] mb-2">
            Unlock Editorial Portal
          </h1>
          <p className="text-xs text-[#2E4D45] leading-relaxed max-w-xs mb-8">
            Enter your administrative access key to compose, edit, and organize venture intelligence essays.
          </p>
        </div>

        {/* Lock Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="admin-password"
              className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#0D2E26] mb-2"
            >
              Access Key
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoFocus
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Enter password..."
                className={`w-full rounded-xl border bg-[#F8FAF8] px-4 py-3.5 pr-12 font-mono text-sm text-[#0D2E26] placeholder-[#4B635D]/50 outline-none transition-all duration-200 focus:bg-white focus:ring-2 ${
                  error
                    ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/20"
                    : "border-[#0D2E26]/15 focus:border-[#70BA28] focus:ring-[#70BA28]/25"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#4B635D] hover:text-[#0D2E26] transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1.5 mt-2 font-mono text-xs text-red-600"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Invalid access key. Please try again.</span>
              </motion.div>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#70BA28] py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0D2E26] shadow-sm transition-all duration-300 hover:bg-[#62A422] hover:shadow-md outline-none focus-visible:ring-2 focus-visible:ring-[#70BA28]"
          >
            Unlock Portal →
          </button>
        </form>

        {/* Phase 1 Helper Footer */}
        <div className="mt-8 pt-6 border-t border-[#0D2E26]/10 text-center">
          <div className="font-mono text-[11px] text-[#4B635D]">
            Phase 1 UI Testing Key: <code className="rounded bg-[#0D2E26]/5 px-2 py-0.5 font-bold text-[#0D2E26]">123</code>
          </div>
          <div className="mt-3">
            <Link
              href="/"
              className="font-mono text-[11px] text-[#2E4D45] hover:text-[#0D2E26] transition-colors underline underline-offset-4"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
