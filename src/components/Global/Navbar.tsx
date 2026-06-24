"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-apple ${
          scrolled
            ? "bg-[#061917]/70 backdrop-blur-[24px] border-b border-white/5 shadow-[0_1px_0_rgba(156,223,59,0.15)]"
            : "bg-transparent border-b border-transparent shadow-none"
        }`}
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 md:px-12 lg:px-24">
          
          {/* Left: Logo / Wordmark */}
          <Link 
            href="/" 
            className="group relative flex items-center outline-none"
            aria-label="Click Aarambh Home"
          >
            <span className="font-extrabold tracking-[-0.04em] text-white text-[22px] transition-colors group-hover:text-white/90">
              Click <span className="text-[#9CDF3B]">Aarambh.</span>
            </span>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-2 py-1 outline-none group"
                >
                  <span 
                    className={`font-mono text-[13px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/50 group-hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#9CDF3B]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Desktop CTA & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex group relative items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/5 px-8 py-3 transition-all duration-300 hover:border-[#9CDF3B]/50 hover:bg-[#9CDF3B]/10 hover:shadow-[0_0_20px_rgba(156,223,59,0.3)] outline-none focus-visible:ring-2 focus-visible:ring-[#9CDF3B]"
            >
              <span className="relative z-10 font-mono text-[11px] font-bold uppercase tracking-widest text-white transition-colors group-hover:text-[#9CDF3B]">
                Start Your Growth Journey
              </span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-full bg-white/5 border border-white/10 outline-none"
              aria-label="Toggle Menu"
            >
              <motion.div 
                className="h-[2px] w-4 bg-white"
                animate={mobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
              <motion.div 
                className="h-[2px] w-4 bg-white"
                animate={mobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#04110F] px-6 pt-20 pb-12"
          >
            {/* Architectural Grid Background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <nav className="relative z-10 flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between border-b border-white/10 pb-4 outline-none"
                    >
                      <span 
                        className={`text-4xl font-extrabold tracking-[-0.03em] transition-colors ${
                          isActive ? "text-white" : "text-white/50"
                        }`}
                      >
                        {link.label}
                      </span>
                      {isActive && (
                        <div className="h-3 w-3 rounded-full bg-[#9CDF3B] shadow-[0_0_10px_rgba(156,223,59,0.5)]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center border border-[#9CDF3B]/30 bg-[#9CDF3B]/5 py-4 transition-colors hover:bg-[#9CDF3B]/10"
                >
                  <span className="font-mono text-[12px] font-bold uppercase tracking-[0.15em] text-[#9CDF3B]">
                    Start Your Growth Journey
                  </span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
