"use client";

import { useRef } from "react";

import {
  DURATION,
  EASE,
  FULL_MOTION,
  REDUCED,
  gsap,
  useGSAP,
} from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  /** Element to render. Defaults to a div. */
  as?: React.ElementType;
  className?: string;
  /** Vertical offset to travel from, in px. */
  y?: number;
  /** Horizontal offset to travel from, in px. */
  x?: number;
  /** Scale to start from, e.g. 0.96 for a subtle pop. */
  scale?: number;
  delay?: number;
  duration?: number;
  /**
   * When set, the direct children animate one after another instead of the
   * container animating as a single block.
   */
  stagger?: number;
};

/**
 * Wraps server-rendered markup in a client-side entrance animation.
 *
 * The element (or its children) ships pre-hidden via `.gsap-hidden` /
 * `.gsap-hidden-children` so the server paint never flashes the content before
 * hydration takes over. See the reduced-motion + noscript fallbacks in
 * app/globals.css and app/layout.tsx.
 */
export const Reveal = ({
  children,
  as: Tag = "div",
  className,
  y = 16,
  x = 0,
  scale = 1,
  delay = 0,
  duration = DURATION,
  stagger,
}: RevealProps) => {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const targets = stagger
        ? Array.from(container.current?.children ?? [])
        : container.current;

      if (!targets || (Array.isArray(targets) && targets.length === 0)) return;

      const mm = gsap.matchMedia();

      mm.add(REDUCED, () => {
        gsap.set(targets, { clearProps: "all", autoAlpha: 1 });
      });

      mm.add(FULL_MOTION, () => {
        gsap.fromTo(
          targets,
          { autoAlpha: 0, y, x, scale },
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration,
            delay,
            stagger,
            ease: EASE,
            clearProps: "transform",
          }
        );
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <Tag
      ref={container}
      className={cn(
        stagger ? "gsap-hidden-children" : "gsap-hidden",
        className,
      )}
    >
      {children}
    </Tag>
  );
};
