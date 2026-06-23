"use client";

import { useState, useEffect, useRef } from "react";

// Characters used in the scramble cycle — hex digits + symbols for a "terminal boot" feel
const CHARSET = "0123456789ABCDEF#%$@!&*?^~";

interface UseDecryptTextOptions {
  word: string;
  /** Time (ms) to spend scrambling before resolving. Default: 600 */
  duration?: number;
  /** How often (ms) to swap characters during scramble. Default: 40 */
  interval?: number;
  /** Delay before the effect starts (ms). Default: 0 */
  startDelay?: number;
}

/**
 * Returns the current display value of a word being "decrypted" from
 * random characters into the real string. Respects prefers-reduced-motion.
 */
export function useDecryptText({
  word,
  duration = 600,
  interval = 40,
  startDelay = 0,
}: UseDecryptTextOptions): string {
  const [display, setDisplay] = useState(word);
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Accessibility: skip scramble entirely for users who prefer reduced motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(word);
      return;
    }

    let startTime: number | null = null;
    let frameId: number;

    const scramble = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        // Generate a random string of the same length
        const scrambled = word
          .split("")
          .map(() => CHARSET[Math.floor(Math.random() * CHARSET.length)])
          .join("");
        setDisplay(scrambled);
        frameId = requestAnimationFrame(scramble);
      } else {
        setDisplay(word);
      }
    };

    const delayTimer = setTimeout(() => {
      frameId = requestAnimationFrame(scramble);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(frameId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word, duration, startDelay]);

  return display;
}
