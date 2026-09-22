"use client";

import { RefObject } from "react";

import { STAGGER, useGSAP } from "@/lib/gsap";

import { revealTween, RevealTweenOptions } from "./revealTween";

type StaggerOptions = RevealTweenOptions & {
  /** Which descendants to animate. Defaults to the element's direct children. */
  selector?: string;
  /** Re-runs the animation whenever one of these changes. */
  dependencies?: unknown[];
};

/**
 * Cascades an element's children in on mount — used by the components that are
 * already client components and so don't need the `Reveal` wrapper.
 */
export const useStaggerChildren = <T extends HTMLElement>(
  ref: RefObject<T>,
  {
    selector,
    dependencies = [],
    stagger = STAGGER,
    ...tween
  }: StaggerOptions = {},
) => {
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const targets = selector
        ? Array.from(root.querySelectorAll(selector))
        : Array.from(root.children);
      if (targets.length === 0) return;

      const mm = revealTween(targets, { ...tween, stagger });
      return () => mm.revert();
    },
    { scope: ref, dependencies, revertOnUpdate: true }
  );
};
