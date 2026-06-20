'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser } from '../../lib/store/store';
import styles from './ProfileDropdown.module.scss';

export const ProfileDropdown = ({ up }: { up: boolean}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const user = useUser((state) => state.user);
  const logout = useUser((state) => state.logout);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push('/auth/log-in');
  };

  if (!user) return null;

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.avatarButton}
        aria-expanded={isOpen}
      >
        <div className={styles.avatarWrapper}>
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.username}
              fill
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarFallback}>
              {(user.username || 'U').charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </button>

      {isOpen && (
        <div className={up ? `${styles.menu} ${styles.menu__up}` : styles.menu}>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user.username}</p>
            <p className={styles.userEmail}>{user.email}</p>
          </div>

          <Link
            href={`/authors/${user.id}`}
            onClick={() => setIsOpen(false)}
            className={styles.menuItem}
          >
            Профіль
          </Link>

          <Link
            href={`/authors/${user.id}/edit`}
            onClick={() => setIsOpen(false)}
            className={styles.menuItem}
          >
            Редагувати профіль
          </Link>

          <Link
            href={`/authors/${user.id}/create-project`}
            onClick={() => setIsOpen(false)}
            className={styles.menuItem}
          >
            Створити проект
          </Link>

          {user.is_superuser && (
            <Link
              href='https://charity-platform-backend-va70.onrender.com/admin/'
              onClick={() => setIsOpen(false)}
              target="_blank"
              className={`${styles.menuItem} ${styles.adminItem}`}
            >
              Адмін панель
            </Link>
          )}

          <div className={styles.divider} />

          <button onClick={handleLogout} className={`${styles.menuItem} ${styles.logoutItem}`}>
            Вийти з аккаунту
          </button>
        </div>
      )}
    </div>
  );
};