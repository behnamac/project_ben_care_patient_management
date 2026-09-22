"use client";

import { RefObject } from "react";

import { useGSAP } from "@/lib/gsap";

import { revealTween, RevealTweenOptions } from "./revealTween";

/** Animates the referenced element itself on mount. */
export const useReveal = <T extends HTMLElement>(
  ref: RefObject<T>,
  options: RevealTweenOptions = {},
) => {
  useGSAP(
    () => {
      if (!ref.current) return;
      const mm = revealTween(ref.current, options);
      return () => mm.revert();
    },
    { scope: ref }
  );
};
