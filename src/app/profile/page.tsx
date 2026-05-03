'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileCard from '@/components/profile/ProfileCard';
import { profileApi } from '@/lib/api/http';
import { accessTokenService } from '@/lib/services/accessTokenService';
import { User } from '@/types/user';
import styles from './page.module.scss';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const token = accessTokenService.get();
      console.log(token);
      
      
      if (!token) {
        router.push('/auth/log-in');
        return;
      }

      try {
        const response = await profileApi.getProfile();
        console.log(response);
        
        setUser(response as unknown as User);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
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
    <div className={styles.page}>
      <ProfileCard user={user} />
    </div>
  );
}