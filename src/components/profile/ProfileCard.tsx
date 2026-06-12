import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/utils/types/user';
import styles from './ProfileCard.module.scss';

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const getInitials = () => {
    return `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() 
      || user.username[0].toUpperCase();
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.profileCard}>
      <div className={styles.header}>
        {user.is_staff && !user.is_superuser && (
          <span className={styles.badge}>Організатор</span>
        )}
        {user.is_superuser && (
          <span className={`${styles.badge} ${styles.badgeAdmin}`}>Адміністратор</span>
        )}
      </div>
      
      <div className={styles.body}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.full_name}
                width={160}
                height={160}
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {getInitials()}
              </div>
            )}
          </div>
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>
            {user.full_name || user.username}
          </h1>
          <p className={styles.username}>@{user.username}</p>
          <p className={styles.email}>{user.email}</p>
          
          {user.specialization && (
            <span className={styles.specialization}>
              {user.specialization.name}
            </span>
          )}
          
          {user.project_count !== undefined && (
            <p className={styles.projectCount}>
              {user.project_count} {user.project_count === 1 ? 'проєкт' : user.project_count < 5 ? 'проєкти' : 'проєктів'}
            </p>
          )}
        </div>

        {user.bio && (
          <div className={styles.bioSection}>
            <h2 className={styles.sectionTitle}>Про мене</h2>
            <p className={styles.bioText}>{user.bio}</p>
          </div>
        )}

        <div className={styles.detailsGrid}>
          {user.city && (
            <div className={styles.detailItem}>
              <span className={styles.detailIcon}>📍</span>
              <span className={styles.detailText}>{user.city}</span>
            </div>
          )}
          
          {user.phone_number && (
            <div className={styles.detailItem}>
              <span className={styles.detailIcon}>📞</span>
              <span className={styles.detailText}>{user.phone_number}</span>
            </div>
          )}
        </div>

        {(user.telegram_url || user.instagram_url || user.facebook_url) && (
          <div className={styles.socialsSection}>
            <h2 className={styles.sectionTitle}>Контакти</h2>
            <div className={styles.socialsList}>
              {user.telegram_url && (
                <a href={user.telegram_url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  Telegram
                </a>
              )}
              {user.instagram_url && (
                <a href={user.instagram_url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  Instagram
                </a>
              )}
              {user.facebook_url && (
                <a href={user.facebook_url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  Facebook
                </a>
              )}
            </div>
          </div>
        )}

        <div className={styles.footer}>
          <p className={styles.joinDate}>
            На платформі з {formatDate(user.date_joined)}
          </p>
          
          <Link href="/profile/edit" className={styles.editButton}>
            Редагувати профіль
          </Link>
        </div>
      </div>
    </div>
  );
}