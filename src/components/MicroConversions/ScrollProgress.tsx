"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [shouldRender, setShouldRender] = useState(true);
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) setShouldRender(false);
  }, []);

  if (!shouldRender) return null;
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-[#82C21C] origin-left z-[100] pointer-events-none"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};
