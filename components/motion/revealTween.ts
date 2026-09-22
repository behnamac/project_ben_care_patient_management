import { DURATION, EASE, FULL_MOTION, REDUCED, gsap } from "@/lib/gsap";

export type RevealTweenOptions = {
  /** Vertical offset to travel from, in px. */
  y?: number;
  /** Horizontal offset to travel from, in px. */
  x?: number;
  /** Scale to start from, e.g. 0.96 for a subtle pop. */
  scale?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
};

/**
 * The one entrance tween every animated surface shares.
 *
 * Targets ship pre-hidden (see the `.gsap-hidden*` utilities in globals.css) so
 * the server paint never flashes before hydration; `autoAlpha` restores
 * visibility as it fades in. Returns the matchMedia instance so the caller can
 * revert it on cleanup.
 */
export const revealTween = (
  targets: gsap.TweenTarget,
  {
    y = 16,
    x = 0,
    scale = 1,
    delay = 0,
    duration = DURATION,
    stagger,
  }: RevealTweenOptions = {},
) => {
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

  return mm;
};
