'use client';

import { forgotPasswordAnimationIn, forgotPasswordAnimationOut } from "../../../utils/authAnimation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from './ForgotPassword.module.scss';

export default function ForgotPassword() {
  const imageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState('');

  useEffect(() => { 
    forgotPasswordAnimationIn(imageRef) 
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/password/reset/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      console.log(res);
      

      // dj-rest-auth всегда возвращает 200, даже если email не найден (безопасность)
      setStatus('success');
    } catch {
      setStatus('success'); // Не раскрываем ошибку
    }
  };

  const isDisabled = email.length === 0 || status === 'loading';

  return (
    <>
      <section className={styles.auth__sectionCenter}>
        <h2 className={styles.auth__title}>
          Забули пароль?
        </h2>
        
        {status === 'success' ? (
          <>
            <p className={styles.auth__description}>
              Якщо цей email існує в нашій системі,
              <br />
              ми надіслали посилання для скидання паролю.
              <br />
              Перевірте свою пошту.
            </p>
            <button
              className={`${styles.auth__form__link} ${styles['auth__form__link--margin-top']}`}
              onClick={() => forgotPasswordAnimationOut(imageRef, '/auth/log-in', router)}
            >
              Повернутися до входу
            </button>
          </>
        ) : (
          <>
            <p className={styles.auth__description}>
              Введіть email, пов&apos;язаний з вашим акаунтом,
              <br />
              і ми надішлемо посилання для скидання
              <br />
              паролю
            </p>
            
            <form onSubmit={handleSubmit} className={styles.auth__form}>
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
                  disabled={status === 'loading'}
                />
              </label>
              
              {error && <p className={styles.auth__error}>{error}</p>}
              
              <button
                type="submit"
                disabled={isDisabled}
                className={`
                  ${styles.auth__form__submitButton}
                  ${isDisabled ? styles['auth__form__submitButton--disabled'] : ''}
                `}
              >
                {status === 'loading' ? 'Надсилаємо...' : 'Відправити посилання на пошту'}
              </button>
            </form>
            
            <button
              className={`${styles.auth__form__link} ${styles['auth__form__link--margin-top']}`}
              onClick={() => forgotPasswordAnimationOut(imageRef, '/auth/log-in', router)}
            >
              Повернутися до входу
            </button>
          </>
        )}
      </section>
      
      <div className={styles.auth__imageBox}>
        <div ref={imageRef} className={styles.auth__image}>
          <Image src={"/log-in-sign-up-image.jpg"} alt={""} fill />
        </div>
      </div>
    </>
  );
}