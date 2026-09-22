"use client";

import { useRef } from "react";

import { EASE, REDUCED, gsap, useGSAP } from "@/lib/gsap";

type CountUpProps = {
  value: number;
  duration?: number;
  className?: string;
};

/**
 * Counts from 0 up to `value` on mount. The real value is server-rendered, so
 * it stays correct without JS and under reduced motion.
 */
export const CountUp = ({ value, duration = 1.2, className }: CountUpProps) => {
  const el = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!el.current || value === 0) return;
      if (window.matchMedia(REDUCED).matches) return;

      const counter = { value: 0 };
      el.current.textContent = "0";

      gsap.to(counter, {
        value,
        duration,
        ease: EASE,
        snap: { value: 1 },
        onUpdate: () => {
          if (el.current) el.current.textContent = String(counter.value);
        },
      });
    },
    { dependencies: [value, duration], revertOnUpdate: true }
  );

  return (
    <span ref={el} className={className}>
      {value}
    </span>
  );
};
