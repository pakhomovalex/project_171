'use client';

import Image from "next/image";
import styles from './SingUp.module.scss';
import { signUpAnimationIn, signUpAnimationOut } from "@/utils/authAnimation";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames";

export default function SignUp() {
  const imageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  useEffect(() => { signUpAnimationIn(imageRef) })

  return (
    <>
      <section className={styles.auth__sectionRight}>
        <button
          className={styles.auth__backLink}
          onClick={() => signUpAnimationOut(
            imageRef,
            '/',
            router
          )}>
          <Image src={"/arrow-left-full.svg"} alt={"arrow back"} width={20} height={20} />
          На головну
        </button>
        <h2 className={styles.auth__title}>
          Спробуй себе!
        </h2>
        <form action="submit" className={`${styles.auth__form} ${styles['auth__form--margin-top']}`}>
          <label htmlFor="email" className={styles.auth__form__label}>
            Електронна пошта
            <input
              type="email"
              name="email"
              id="email"
              className={styles.auth__form__input}
              placeholder="Example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password" className={styles.auth__form__label}>
            Пароль
            <input
              type={'text'}
              name="password"
              id="password"
              placeholder="Від 8 до 20 символів"
              className={styles.auth__form__input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="repeatPassword" className={styles.auth__form__label}>
            Повторіть пароль
            <input
              type={'text'}
              name="repeatPassword"
              id="repeatPassword"
              placeholder="Від 8 до 20 символів"
              className={styles.auth__form__input}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className={classNames(
              styles.auth__form__submitButton,
              {
                [styles['auth__form__submitButton--disabled']]: password.length < 8
                  || password.length > 20
                  || email.length === 0
                  || repeatPassword !== password
              }
            )}>
            Зареєструватись
          </button>
        </form>
        <div className={styles.auth__or}>
          <div className={styles.auth__line} />
          <p className={styles.auth__orText}>
            Або
          </p>
          <div className={styles.auth__line} />
        </div>
        <button className={styles.auth__google}>
          <Image src={"/google-icon.svg"} alt={"google icon"} width={20} height={20} />
          Реєстрація через Google
        </button>
        <div className={styles.auth__signUp}>
          <p className={styles.auth__signUpText}>Вже маєте аккаунт?</p>
          <button
            onClick={() => signUpAnimationOut(
              imageRef,
              '/auth/log-in',
              router
            )}
            className={styles.auth__signUpButton}
          >
            Увійти
          </button>
        </div>

      </section>
      <div className={styles.auth__imageBox}>
        <div ref={imageRef} className={styles.auth__image}>
          <Image src={"/log-in-sign-up-image.jpg"} alt={""} fill />
        </div>

      </div>
    </>
  )
}