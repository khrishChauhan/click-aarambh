import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()_+{}:<>?[]\\|/";

/**
 * High-performance hook for alphanumeric data scramble reveals.
 * @param finalString The resolved string to display.
 * @param durationMs Total duration of the animation.
 * @param delayMs Delay before starting the scramble.
 * @param enabled Set to false to immediately resolve (e.g. for reduced motion).
 */
export function useDataScramble(
  finalString: string,
  durationMs: number = 1000,
  delayMs: number = 0,
  enabled: boolean = true
) {
  const [displayText, setDisplayText] = useState(enabled ? "" : finalString);

  useEffect(() => {
    if (!enabled) {
      setDisplayText(finalString);
      return;
    }

    let frameId: number;
    let startTime: number | null = null;
    const length = finalString.length;
    let timeoutId: NodeJS.Timeout;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Number of characters to resolve to their final state
      const resolvedCount = Math.floor(progress * length);

      let currentText = "";
      for (let i = 0; i < length; i++) {
        if (i < resolvedCount) {
          // Resolved char
          currentText += finalString[i];
        } else if (finalString[i] === " ") {
          // Keep spaces as spaces
          currentText += " ";
        } else {
          // Random character
          currentText += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(currentText);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    timeoutId = setTimeout(() => {
      frameId = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [finalString, durationMs, delayMs, enabled]);

  return displayText;
}
