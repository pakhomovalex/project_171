import gsap from "gsap";
import { RefObject } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logInAnimationOut = (
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
        duration: .15,
        onComplete: () => {
          router.push(href)
        }
      }, 0)
};

export const signUpAnimationOut = (
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
        duration: .15,
        onComplete: () => {
          router.push(href)
        }
      }, 0)
};

export const logInAnimationIn = (
  ref: RefObject<HTMLDivElement | null>,
) => {
  if (!ref.current) return;

  const image = ref.current;
  const tl = gsap.timeline();

  tl.to(image, {
    delay: .2,
    clipPath: 'inset(0 0 0 25%)',
    left: '25%',
    duration: .2
  }, 0)
};

export const signUpAnimationIn = (
  ref: RefObject<HTMLDivElement | null>,
) => {
  if (!ref.current) return;

  const image = ref.current;
  const tl = gsap.timeline();

  tl.to(image, {
    delay: .2,
    clipPath: 'inset(0 25% 0 0)',
    left: '-25%',
    duration: .2,
  }, 0)
};

export const forgotPasswordAnimationOut = (
  ref: RefObject<HTMLDivElement | null>,
  href: string,
  router: AppRouterInstance
) => {
  if (!ref.current) return;

  const image = ref.current;


  gsap.fromTo(image, {
    top: '-100%',
  }, {
    top: '0%',
    duration: .5,
    onComplete: () => {
      router.push(href)
    }
  })
};

export const forgotPasswordAnimationIn = (
  ref: RefObject<HTMLDivElement | null>,
) => {
  if (!ref.current) return;

  const image = ref.current;


  gsap.fromTo(image, {
    top: '0%',
  }, {
    top: '-100%',
    duration: .5
  })
}