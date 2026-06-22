"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Approach",      href: "#approach" },
  { name: "Capabilities",  href: "#capabilities" },
  { name: "Impact",        href: "#impact" },
];

// Active section tracker
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [ids]);

  return active;
}

export const Navbar = () => {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();
  const activeSection = useActiveSection(["approach", "capabilities", "impact"]);

  // Transparent → glass transition
  useMotionValueEvent(scrollY, "change", (v) => setIsScrolled(v > 60));

  // Lock body scroll with mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Magnetic CTA effect
  const handleCtaMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ctaBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.4}px)`;
  };
  const handleCtaMouseLeave = () => {
    if (ctaBtnRef.current) ctaBtnRef.current.style.transform = "";
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        aria-label="Main Navigation"
      >
        <div className={`mx-4 mt-4 rounded-2xl px-6 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "py-3 glass shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)]"
            : "py-5 bg-transparent"
        }`}>
          <div className="flex items-center justify-between max-w-7xl mx-auto">

            {/* Logo */}
            <a href="#" className="text-lg font-bold tracking-tight text-white rounded focus-visible:ring-2 focus-visible:ring-[#82C21C]" aria-label="Click Aarambh Home">
              Click <span className="text-[#82C21C]">Aarambh</span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8" role="menubar">
              {NAV_LINKS.map(link => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    role="menuitem"
                    className="relative text-sm font-medium text-white/60 hover:text-white rounded px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-[#82C21C]"
                    style={{ transition: "color 0.2s ease" }}
                  >
                    {link.name}
                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-dot"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#82C21C]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Magnetic CTA */}
            <div className="hidden md:block">
              <button
                ref={ctaBtnRef}
                onMouseMove={handleCtaMouseMove}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 30px rgba(130,194,28,0.5)")}
                onMouseLeave={e => {
                  handleCtaMouseLeave();
                  e.currentTarget.style.boxShadow = "none";
                }}
                className="px-5 py-2.5 text-sm font-bold uppercase tracking-wider bg-[#82C21C] text-[#061917] rounded-lg focus-visible:ring-2 focus-visible:ring-[#82C21C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061917]"
                style={{ transition: "transform 0.15s ease, box-shadow 0.3s ease" }}
              >
                Start Growth
              </button>
            </div>


            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-white/70 hover:text-white rounded-lg focus-visible:ring-2 focus-visible:ring-[#82C21C]"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-[#061917]/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[320px] bg-[#082220] border-l border-white/5 p-8 flex flex-col shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="self-end mb-10 p-2 text-white/50 hover:text-white rounded-lg focus-visible:ring-2 focus-visible:ring-[#82C21C]"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-bold text-white/80 hover:text-[#82C21C] rounded focus-visible:ring-2 focus-visible:ring-[#82C21C]"
                    style={{ transition: "color 0.2s ease" }}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-white/5">
                <button className="w-full py-4 text-sm font-bold uppercase tracking-wider bg-[#82C21C] text-[#061917] rounded-lg focus-visible:ring-2 focus-visible:ring-[#82C21C]">
                  Start Growth
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
