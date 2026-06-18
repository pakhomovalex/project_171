'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileForm from '../../../../components/ProfileForm/ProfileForm';
import { userService } from '../../../../lib/services/userService';
import { accessTokenService } from '../../../../lib/services/accessTokenService';
import { User } from '../../../../utils/types/user/index';
import styles from './page.module.scss';

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const token = accessTokenService.get();
      
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const userData = await userService.getProfile();
        setUser(userData);
      } catch {
        // 401 обработает interceptor
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

  if (!user) {
    return null;
  }

  return (
    <div className={styles.page}>
      <ProfileForm user={user} />
    </div>
  );
}