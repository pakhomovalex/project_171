'use client';

import Image from "next/image";
import styles from './LogIn.module.scss';
import { logInAnimationIn, logInAnimationOut } from "@/utils/animation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";


export default function LogIn() {
  const imageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => { logInAnimationIn(imageRef) })

  return (
    <>
      <section className={styles.auth__sectionLeft}>
        <button
          className={styles.auth__backLink}
          onClick={() => logInAnimationOut(
            imageRef,
            '/',
            router
          )}>
          <Image src={"/arrow-left-full.svg"} alt={"arrow back"} width={20} height={20} />
          На головну
        </button>
        <h2 className={styles.auth__title}>
          З поверненням!
        </h2>
        <p className={styles.auth__description}>
          Увійдіть до свого акаунту,
          <br />
          щоб підтримати ЗСУ креативом
        </p>
        <form action="submit" className={styles.auth__form}>
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
              type={isVisiblePassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Від 8 до 20 символів"
              className={styles.auth__form__input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type='button'
              onClick={() => setIsVisiblePassword(prev => !prev)} className={styles.auth__form__changeVisibility}>
              {isVisiblePassword ?
                <Image src={"/password-visible-icon.svg"} alt={"password defended"} fill />
                :
                <Image src={"/password-non-visible-icon.svg"} alt={"password visible"} fill />
              }
            </button>
          </label>
          <button
            type="button"
            onClick={() => logInAnimationOut(
              imageRef,
              '/auth/forgot-password',
              router
            )}
            className={styles.auth__form__link}
          >
            Забули пароль?
          </button>
          <button
            type="submit"
            className={classNames(
              styles.auth__form__submitButton,
              {
                [styles['auth__form__submitButton--disabled']]: password.length < 8
                  || password.length > 20
                  || email.length === 0
              }
            )}>
            Увійти
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
          Увійти через Google
        </button>
        <div className={styles.auth__signUp}>
          <p className={styles.auth__signUpText}>Ще не маєш аккаунту?</p>
          <button
            onClick={() => logInAnimationOut(
              imageRef,
              '/auth/sign-up',
              router
            )}
            className={styles.auth__signUpButton}
          >
            Зареєструватись
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