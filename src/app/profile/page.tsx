'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { profileApi } from '@/lib/api/http';
import { accessTokenService } from '@/lib/services/accessTokenService';
import { UserWithProjects } from '@/types/user';
import styles from './page.module.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { AuthorCard } from '@/components/AuthorCard/AuthorCard';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserWithProjects | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const token = accessTokenService.get();

      if (!token) {
        router.push('/auth/log-in');
        return;
      }

      try {
        const response = await profileApi.getProfile();

        setUser(response as unknown as UserWithProjects);

        if (response) {
          localStorage.setItem('userId', (response as unknown as UserWithProjects).id.toString())
        }

      } catch {
        setError('Не вдалося завантажити профіль');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>{error}</p>
        <button onClick={() => window.location.reload()} className={styles.retryBtn}>
          Спробувати знову
        </button>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <main>
        <AuthorCard author={user} full />
      </main>
      <Footer />
    </>
  );
}