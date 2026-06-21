'use client';

import Image from "next/image";
import styles from './LogIn.module.scss';
import { logInAnimationIn, logInAnimationOut } from "../../../utils/authAnimation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { authService } from "../../../lib/services/authService";
import 'dotenv/config';
import { accessTokenService } from "../../../lib/services/accessTokenService";
import { useUser } from "../../../lib/store/store";

export default function LogIn() {
  const imageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { logInAnimationIn(imageRef) })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    try {
      const res = await authService.login(userEmail, password)
      const { id, username, avatar, email, is_superuser } = res.user; 

       accessTokenService.saveTokens(res.access, res.refresh);
       
      useUser.getState().updateUser({ id, username, avatar, email, is_superuser })

      router.push(`/authors/${res.user.id}`)
    } catch (error) {
      useUser.getState().updateUser(null)
      setError('Невірний логін або пароль');
      throw error
    }
  }


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
        <form className={styles.auth__form} onSubmit={handleSubmit}>
          {error && (
            <p className={styles.auth__error}>{error}</p>
          )}
          <label htmlFor="email" className={styles.auth__form__label}>
            Електронна пошта
            <input
              type="email"
              name="email"
              id="email"
              className={styles.auth__form__input}
              placeholder="Example@gmail.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
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
              onClick={() => {
                setIsVisiblePassword(prev => !prev)
              }} className={styles.auth__form__changeVisibility}>
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
            className={`
              ${styles.auth__form__submitButton}
              ${(password.length < 8
                || password.length > 20
                || userEmail.length === 0) ? styles['auth__form__submitButton--disabled'] : ''
              }
            `}>
            Увійти
          </button>
        </form>
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

      </section >
      <div className={styles.auth__imageBox}>
        <div ref={imageRef} className={styles.auth__image}>
          <Image src={"/log-in-sign-up-image.jpg"} alt={""} fill />
        </div>
      </div>
    </>
  )
}