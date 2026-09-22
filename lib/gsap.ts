import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

/** Shared motion vocabulary — keep every entrance on the same timing curve. */
export const EASE = "power2.out";
export const DURATION = 0.5;
export const STAGGER = 0.06;

export const REDUCED = "(prefers-reduced-motion: reduce)";
export const FULL_MOTION = "(prefers-reduced-motion: no-preference)";

export { gsap, useGSAP };
