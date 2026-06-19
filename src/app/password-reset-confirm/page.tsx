'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './ResetPassword.module.scss';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

   const searchParams = useSearchParams();
  
  const uid = searchParams.get('uid') || '';
  const token = searchParams.get('token') || '';
  
  console.log('UID:', uid);
  console.log('Token:', token);
  console.log('Token length:', token.length);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('Паролі не співпадають');
      return;
    }

    if (newPassword.length < 8) {
      setStatus('error');
      setMessage('Пароль має бути мінімум 8 символів');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/password/reset/confirm/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: uid,
          token: token,
          new_password: newPassword
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.detail || 'Пароль успішно змінено');
        setTimeout(() => router.push('/auth/log-in'), 3000);
      } else {
        setStatus('error');
        setMessage(data.detail || data.error || 'Помилка скидання пароля');
      }
    } catch {
      setStatus('error');
      setMessage('Щось пішло не так');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Новий пароль</h1>

      {status === 'success' ? (
        <div className={styles.success}>
          <p>{message}</p>
          <p>Перенаправляємо на вхід...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Новий пароль
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
            />
          </label>

          <label>
            Підтвердіть пароль
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Зберігаємо...' : 'Змінити пароль'}
          </button>

          {status === 'error' && <p className={styles.error}>{message}</p>}
        </form>
      )}
    </div>
  );
}