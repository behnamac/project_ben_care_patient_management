"use client";

import Image, { ImageProps } from "next/image";
import { useRef } from "react";

import { cn } from "@/lib/utils";

import { RevealTweenOptions } from "./revealTween";
import { useReveal } from "./useReveal";

type RevealImageProps = ImageProps & RevealTweenOptions;

/**
 * An entrance-animated `next/image`. Unlike `Reveal` it adds no wrapper
 * element, so images that rely on their own layout classes (`.side-img`,
 * `h-10 w-fit` logos) keep rendering exactly as before.
 */
export const RevealImage = ({
  className,
  y,
  x,
  scale,
  delay,
  duration,
  ...imageProps
}: RevealImageProps) => {
  const ref = useRef<HTMLImageElement>(null);

  useReveal(ref, { y, x, scale, delay, duration });

  return (
    // `alt` is required by ImageProps and arrives through the spread below.
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image ref={ref} className={cn("gsap-hidden", className)} {...imageProps} />
  );
};
