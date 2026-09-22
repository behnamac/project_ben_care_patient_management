"use client";

import { RefObject } from "react";

import {
  DURATION,
  EASE,
  FULL_MOTION,
  REDUCED,
  STAGGER,
  gsap,
  useGSAP,
} from "@/lib/gsap";

type StaggerOptions = {
  stagger?: number;
  y?: number;
  duration?: number;
  /** Re-runs the animation whenever one of these changes. */
  dependencies?: unknown[];
  /** Defaults to the element's direct children. */
  selector?: string;
};

/**
 * Cascades an element's children in on mount — used by the components that are
 * already client components and so don't need the `Reveal` wrapper.
 */
export const useStaggerChildren = <T extends HTMLElement>(
  ref: RefObject<T>,
  {
    stagger = STAGGER,
    y = 16,
    duration = DURATION,
    dependencies = [],
    selector,
  }: StaggerOptions = {}
) => {
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const targets = selector
        ? Array.from(root.querySelectorAll(selector))
        : Array.from(root.children);
      if (targets.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(REDUCED, () => {
        gsap.set(targets, { clearProps: "all", autoAlpha: 1 });
      });

      mm.add(FULL_MOTION, () => {
        gsap.fromTo(
          targets,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration,
            stagger,
            ease: EASE,
            clearProps: "transform",
          }
        );
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies, revertOnUpdate: true }
  );
};
