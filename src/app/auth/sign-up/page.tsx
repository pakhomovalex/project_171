'use client';

import Image from "next/image";
import styles from './SingUp.module.scss';
import { SignUpAnimationIn, SignUpAnimationOut } from "@/utils/animation";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const imageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => { SignUpAnimationIn(imageRef) })

  return (
    <>
      <section className={styles.signUp__section}>
        <button
          onClick={() => SignUpAnimationOut(
            imageRef,
            '/auth/log-in',
            router
          )}
        >
          Увійти
        </button>
      </section>
      <div className={styles.signUp__imageBox}>
        <div ref={imageRef} className={styles.signUp__image}>
          <Image src={"/log-in-sign-up-image.jpg"} alt={""} fill />
        </div>
      </div>
    </>
  )
}