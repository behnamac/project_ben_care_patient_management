"use client";

import { useRef } from "react";

import { useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

import { revealTween, RevealTweenOptions } from "./revealTween";

type RevealProps = RevealTweenOptions & {
  children: React.ReactNode;
  /** Element to render. Defaults to a div. */
  as?: React.ElementType;
  className?: string;
};

/**
 * Wraps server-rendered markup in a client-side entrance animation. Pass
 * `stagger` to cascade the direct children instead of animating the wrapper as
 * a single block.
 */
export const Reveal = ({
  children,
  as: Tag = "div",
  className,
  ...tween
}: RevealProps) => {
  const container = useRef<HTMLDivElement>(null);
  const isStaggered = Boolean(tween.stagger);

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      const targets = isStaggered ? Array.from(root.children) : root;
      if (Array.isArray(targets) && targets.length === 0) return;

      const mm = revealTween(targets, tween);
      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <Tag
      ref={container}
      className={cn(
        isStaggered ? "gsap-hidden-children" : "gsap-hidden",
        className,
      )}
    >
      {children}
    </Tag>
  );
};
