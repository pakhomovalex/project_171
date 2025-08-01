'use client';

import Image from "next/image";
import styles from './LogIn.module.scss';
import { LogInAnimationIn, LogInAnimationOut } from "@/utils/animation";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function LogIn() {
  const imageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => { LogInAnimationIn(imageRef) })

  return (
    <>
      <section className={styles.logIn__section}>
        <button onClick={() => LogInAnimationOut(
          imageRef,
          '/auth/sign-up',
          router
        )}>
          Зареєструватись
        </button>
      </section>
      <div className={styles.logIn__imageBox}>
        <div ref={imageRef} className={styles.logIn__image}>
          <Image src={"/log-in-sign-up-image.jpg"} alt={""} fill />
        </div>

      </div>
    </>
  )
}