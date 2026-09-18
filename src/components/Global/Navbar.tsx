"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  // TODO: Re-enable Work page in the future
  // { label: "Work", href: "/work" },
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
            ? "bg-white/80 backdrop-blur-md border-b border-[#0D2E26]/8 shadow-none"
            : "bg-transparent border-b border-transparent shadow-none"
        }`}
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 md:px-12 lg:px-24">
          
          {/* Left: Logo / Wordmark */}
          <Link 
            href="/" 
            className="group relative flex items-center outline-none"
            aria-label="Click Aarambh Ventures Home"
          >
            <Image 
              src="/images/click-aarambh-logo.png" 
              alt="Click Aarambh Ventures Logo" 
              width={240} 
              height={80} 
              className="h-10 md:h-12 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90" 
              priority 
              unoptimized
            />
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
                      isActive ? "text-[#0D2E26]" : "text-[#4B635D] group-hover:text-[#0D2E26]"
                    }`}
                  >
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#70BA28]"
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
              className="hidden md:inline-flex group relative items-center justify-center overflow-hidden rounded-xl bg-[#70BA28] px-8 py-3 transition-all duration-300 hover:bg-[#62A422] shadow-sm hover:shadow-md outline-none focus-visible:ring-2 focus-visible:ring-[#70BA28]"
            >
              <span className="relative z-10 font-mono text-[11px] font-bold uppercase tracking-widest text-[#0D2E26] transition-colors">
                Start Your Growth Journey
              </span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-full bg-[#0D2E26]/5 border border-[#0D2E26]/10 outline-none hover:bg-[#0D2E26]/10 transition-colors"
              aria-label="Toggle Menu"
            >
              <motion.div 
                className="h-[2px] w-4 bg-[#0D2E26]"
                animate={mobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
              <motion.div 
                className="h-[2px] w-4 bg-[#0D2E26]"
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
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#F4F7F5] px-6 pt-20 pb-12"
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
                      className="group flex items-center justify-between border-b border-[#0D2E26]/10 pb-4 outline-none"
                    >
                      <span 
                        className={`text-4xl font-extrabold tracking-[-0.03em] transition-colors ${
                          isActive ? "text-[#0D2E26]" : "text-[#4B635D]"
                        }`}
                      >
                        {link.label}
                      </span>
                      {isActive && (
                        <div className="h-3 w-3 rounded-full bg-[#70BA28] shadow-[0_0_10px_rgba(112,186,40,0.5)]" />
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
                  className="flex w-full items-center justify-center border border-[#70BA28]/30 bg-[#70BA28]/5 py-4 transition-colors hover:bg-[#70BA28]/10"
                >
                  <span className="font-mono text-[12px] font-bold uppercase tracking-[0.15em] text-[#70BA28]">
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
