/**
 * Shared motion constants — single source of truth for the
 * Click Aarambh design system. Import from here in all components.
 */

/** Premium cubic-bezier — Apple/Linear/Framer feel */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Standard duration scale (seconds) */
export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 0.9,
  cinematic: 1.1,
} as const;
