'use client';

import { forgotPasswordAnimationIn, forgotPasswordAnimationOut } from "@/utils/authAnimation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from './ForgotPassword.module.scss';
import classNames from "classnames";

export default function ForgotPassword() {
  const imageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => { forgotPasswordAnimationIn(imageRef) }, [])

  return (
    <>
      <section className={styles.auth__sectionCenter}>
        <h2 className={styles.auth__title}>
          Забули пароль?
        </h2>
        <p className={styles.auth__description}>
          Введіть email, пов’язаний з вашим акаунтом,
          <br />
          і ми надішлемо посилання для скидання
          <br />
          паролю
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
          <button
            type="submit"
            className={classNames(
              styles.auth__form__submitButton,
              {
                [styles['auth__form__submitButton--disabled']]: email.length === 0
              }
            )}>
            Відправити посилання на пошту
          </button>
        </form>
        <button
          className={`${styles.auth__form__link} ${styles['auth__form__link--margin-top']}`}
          onClick={() => forgotPasswordAnimationOut(imageRef, '/auth/log-in', router)}
        >
          Повернутися до входу
        </button>
      </section>
      <div className={styles.auth__imageBox}>
        <div ref={imageRef} className={styles.auth__image}>
          <Image src={"/log-in-sign-up-image.jpg"} alt={""} fill />
        </div>
      </div>
    </>
  );
}