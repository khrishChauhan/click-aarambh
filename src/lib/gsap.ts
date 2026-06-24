/**
 * Centralized GSAP registration — call ensureGSAP() once per component
 * instead of calling gsap.registerPlugin() in every useEffect.
 * Safe to call multiple times (idempotent).
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

let registered = false;

export function ensureGSAP(): void {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };
