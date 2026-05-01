'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, UserProfileUpdate } from '@/types/user';
import { profileApi } from '@/lib/api/http';
import styles from './ProfileForm.module.scss';

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(user.avatar);
  
  const [formData, setFormData] = useState<UserProfileUpdate>({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    bio: user.bio || '',
    city: user.city || '',
    specialization: user.specialization?.id || null,
    phone_number: user.phone_number || '',
    telegram_url: user.telegram_url || '',
    instagram_url: user.instagram_url || '',
    facebook_url: user.facebook_url || '',
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'specialization' ? (value ? Number(value) : null) : value 
    }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    if (avatarFile) {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formDataToSend.append(key, String(value));
        }
      });
      formDataToSend.append('avatar', avatarFile);
      await profileApi.updateProfile(formDataToSend);
    } else {
      const jsonData: Record<string, string | number> = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          jsonData[key] = value;
        }
      });
      await profileApi.updateProfile(jsonData);
    }

    router.push('/profile');
    router.refresh();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    setError(err.response?.data?.detail || 'Помилка оновлення профілю');
  } finally {
    setIsLoading(false);
  }
};

  const getInitials = () => {
    return `${formData.first_name?.[0] || ''}${formData.last_name?.[0] || ''}`.toUpperCase() 
      || user.username[0].toUpperCase();
  };

  const specializations = [
    { id: 1, name: 'Волонтер' },
    { id: 2, name: 'Організатор' },
    { id: 3, name: 'Донор' },
    { id: 4, name: 'Ветеран' },
  ];

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Редагування профілю</h1>
      
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <div className={styles.avatarSection}>
        <div 
          className={styles.avatarPreview}
          onClick={() => fileInputRef.current?.click()}
        >
          {previewAvatar ? (
            <Image
              src={previewAvatar}
              alt="Avatar preview"
              width={128}
              height={128}
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {getInitials()}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={styles.avatarChangeBtn}
        >
          Змінити фото
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className={styles.hiddenInput}
        />
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Ім&apos;я</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Прізвище</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Спеціалізація</label>
        <select
          name="specialization"
          value={formData.specialization || ''}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Оберіть спеціалізацію</option>
          {specializations.map(spec => (
            <option key={spec.id} value={spec.id}>{spec.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Місто</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={styles.input}
          placeholder="Київ"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Біографія</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          className={styles.textarea}
          placeholder="Розкажіть про себе..."
        />
      </div>

      <h2 className={styles.sectionTitle}>Контакти</h2>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>Телефон</label>
        <input
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          className={styles.input}
          placeholder="+380 99 999 9999"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Telegram</label>
        <input
          type="url"
          name="telegram_url"
          value={formData.telegram_url}
          onChange={handleChange}
          className={styles.input}
          placeholder="https://t.me/username"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Instagram</label>
        <input
          type="url"
          name="instagram_url"
          value={formData.instagram_url}
          onChange={handleChange}
          className={styles.input}
          placeholder="https://instagram.com/username"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Facebook</label>
        <input
          type="url"
          name="facebook_url"
          value={formData.facebook_url}
          onChange={handleChange}
          className={styles.input}
          placeholder="https://facebook.com/username"
        />
      </div>

      <div className={styles.buttons}>
        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitBtn}
        >
          {isLoading ? 'Збереження...' : 'Зберегти зміни'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/profile')}
          className={styles.cancelBtn}
        >
          Скасувати
        </button>
      </div>
    </form>
  );
}