import gsap from "gsap";
import { RefObject } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const LogInAnimationOut = (
  ref: RefObject<HTMLDivElement | null>,
  href: string,
  router: AppRouterInstance
) => {
  if (!ref.current) return;

  const image = ref.current;
  const tl = gsap.timeline();

  tl
    .to(image,
      {
        clipPath: 'inset(0 0 0 0)',
        left: '0',
        duration: .25,
        onComplete: () => {
          router.push(href)
        }
      }, 0)
};

export const SignUpAnimationOut = (
  ref: RefObject<HTMLDivElement | null>,
  href: string,
  router: AppRouterInstance
) => {
  if (!ref.current) return;

  const image = ref.current;
  const tl = gsap.timeline();

  tl
    .to(image,
      {
        clipPath: 'inset(0 0 0 0)',
        left: '0',
        duration: .25,
        onComplete: () => {
          router.push(href)
        }
      }, 0)
};

export const LogInAnimationIn = (
  ref: RefObject<HTMLDivElement | null>,
) => {
  if (!ref.current) return;

  const image = ref.current;
  const tl = gsap.timeline();

  tl.to(image, {
    delay: .1,
    clipPath: 'inset(0 0 0 25%)',
    left: '25%',
    duration: .3
  }, 0)
};

export const SignUpAnimationIn = (
  ref: RefObject<HTMLDivElement | null>,
) => {
  if (!ref.current) return;

  const image = ref.current;
  const tl = gsap.timeline();

  tl.to(image, {
    delay: .1,
    clipPath: 'inset(0 25% 0 0)',
    left: '-25%',
    duration: .3,
  }, 0)
};