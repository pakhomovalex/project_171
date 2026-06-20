'use client';

import { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { projectsService } from '../../lib/services/projectsService';
import { DonationType } from '../../utils/types/user/index';
import styles from './ProjectCreateForm.module.scss';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface ProjectCreateFormProps {
  categories: Category[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any;      // ← для редактирования
  isEditing?: boolean;     // ← флаг редактирования
  projectId?: number;      // ← ID проекта для обновления
  onSuccess?: () => void;  // ← колбэк после успеха
}

export default function ProjectCreateForm({
  categories,
  initialData,
  isEditing,
  projectId,
  onSuccess
}: ProjectCreateFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    donation_type: 'full_price' as DonationType,
    price: '',
    target_amount: '',
    donation_percentage: '',
    fundraising_goal: '',
    end_date: '',
    monobank_jar_url: '',
    privatbank_konvert_url: '',
    paypal_me_url: '',
    other_payment_details: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        subtitle: initialData.subtitle || '',
        description: initialData.description || '',
        category: initialData.category?.id?.toString() || '',
        donation_type: initialData.donation_type || 'full_price',
        price: initialData.price?.toString() || '',
        target_amount: initialData.target_amount?.toString() || '',
        donation_percentage: initialData.donation_percentage?.toString() || '',
        fundraising_goal: initialData.fundraising_goal || '',
        end_date: initialData.end_date ? initialData.end_date.split('T')[0] : '',
        monobank_jar_url: initialData.monobank_jar_url || '',
        privatbank_konvert_url: initialData.privatbank_konvert_url || '',
        paypal_me_url: initialData.paypal_me_url || '',
        other_payment_details: initialData.other_payment_details || '',
      });

      // Если есть существующие изображения, показать их
      if (initialData.images) {
        console.log('images:', initialData.images);
        console.log('first image:', initialData.images?.[0]);

        setPreviewImages(initialData.images.map((img: {
          id: number,
          image: string,
          order: number
        }) => img.image));
      }
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);
    setImageFiles(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = new FormData();

      // Текстовые поля
      data.append('title', formData.title);
      data.append('subtitle', formData.subtitle);
      data.append('description', formData.description);
      data.append('category', formData.category);  // ID категории
      data.append('donation_type', formData.donation_type);
      data.append('fundraising_goal', formData.fundraising_goal);
      data.append('end_date', formData.end_date);
      data.append('status', 'active');

      // Числовые поля
      if (formData.donation_type === 'full_price') {
        data.append('price', formData.price);
      } else {
        data.append('target_amount', formData.target_amount);
        data.append('donation_percentage', formData.donation_percentage);
      }

      // URL поля
      if (formData.monobank_jar_url) data.append('monobank_jar_url', formData.monobank_jar_url);
      if (formData.privatbank_konvert_url) data.append('privatbank_konvert_url', formData.privatbank_konvert_url);
      if (formData.paypal_me_url) data.append('paypal_me_url', formData.paypal_me_url);
      if (formData.other_payment_details) data.append('other_payment_details', formData.other_payment_details);

      // Картинки — важно: имя поля должно совпадать с ожиданиями бэкенда
      imageFiles.forEach((file) => {
        data.append('images', file);  // или 'image' если один файл
      });


      if (isEditing && projectId) {
        // Обновление существующего проекта
        await projectsService.updateProject(projectId, data);
        onSuccess?.();
      } else {
        // Создание нового проекта
        await projectsService.createProject(data);
        router.push('/projects');
        router.refresh();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Помилка створення проєкту');
      console.error('Create project error:', err.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {isEditing ?
        <h1 className={styles.title}>Редагування проекту</h1>
        :
        <h1 className={styles.title}>Створення проєкту</h1>
      }

      {error && (
        <div className={styles.error}>{error}</div>
      )}

      {/* Название */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Назва проєкту *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
          placeholder="Наприклад: Збір на дрони для 93 бригади"
          required
        />
      </div>

      {/* Подзаголовок */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Короткий опис *</label>
        <input
          type="text"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          className={styles.input}
          placeholder="Коротко про мету збору"
          required
        />
      </div>

      {/* Категория */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Категорія *</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="">Оберіть категорію</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Тип збору */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Тип збору *</label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="donation_type"
              value="full_price"
              checked={formData.donation_type === 'full_price'}
              onChange={handleChange}
              className={styles.radio}
            />
            Фіксована ціна (100% автору)
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="donation_type"
              value="percentage"
              checked={formData.donation_type === 'percentage'}
              onChange={handleChange}
              className={styles.radio}
            />
            Відсоток з продажу на ЗСУ
          </label>
        </div>
      </div>

      {/* Цена или целевая сумма */}
      <div className={styles.formGrid}>
        {formData.donation_type === 'full_price' ? (
          <div className={styles.formGroup}>
            <label className={styles.label}>Ціна (грн) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={styles.input}
              placeholder="1000"
              required
            />
          </div>
        ) : (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>Цільова сума (грн) *</label>
              <input
                type="number"
                name="target_amount"
                value={formData.target_amount}
                onChange={handleChange}
                className={styles.input}
                placeholder="50000"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Відсоток на ЗСУ (%) *</label>
              <input
                type="number"
                name="donation_percentage"
                value={formData.donation_percentage}
                onChange={handleChange}
                className={styles.input}
                placeholder="10"
                min="1"
                max="100"
                required
              />
            </div>
          </>
        )}
      </div>

      {/* Цель сбора */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Мета збору *</label>
        <textarea
          name="fundraising_goal"
          value={formData.fundraising_goal}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="Детально опишіть, на що підуть кошти"
          rows={3}
          required
        />
      </div>

      {/* Описание */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Повний опис *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="Розкажіть детальніше про проєкт, його мету та результати"
          rows={6}
          required
        />
      </div>

      {/* Дата окончания */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Дата завершення *</label>
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      {/* Реквизиты */}
      <h2 className={styles.sectionTitle}>Реквізити для оплати</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>Monobank банка</label>
        <input
          type="url"
          name="monobank_jar_url"
          value={formData.monobank_jar_url}
          onChange={handleChange}
          className={styles.input}
          placeholder="https://send.monobank.ua/jar/..."
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Privat24 конверт</label>
        <input
          type="url"
          name="privatbank_konvert_url"
          value={formData.privatbank_konvert_url}
          onChange={handleChange}
          className={styles.input}
          placeholder="https://privatbank.ua/..."
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>PayPal</label>
        <input
          type="url"
          name="paypal_me_url"
          value={formData.paypal_me_url}
          onChange={handleChange}
          className={styles.input}
          placeholder="https://paypal.me/..."
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Інші реквізити</label>
        <textarea
          name="other_payment_details"
          value={formData.other_payment_details}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="Картка, IBAN, криптогаманець тощо"
          rows={3}
        />
      </div>

      {/* Изображения */}
      {!isEditing &&
        <>
          <h2 className={styles.sectionTitle}>Фото проєкту</h2>

          <div className={styles.imagesSection}>
            <div className={styles.imageUpload} onClick={() => fileInputRef.current?.click()}>
              <span className={styles.uploadIcon}>+</span>
              <span className={styles.uploadText}>Додати фото</span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className={styles.hiddenInput}
            />

            {previewImages.map((src, index) => {
              console.log('Type:', typeof src);
              console.log('Value:', src);


              return (

                <div key={src} className={styles.imagePreview}>
                  <Image
                    src={src}
                    alt={`Preview ${index + 1}`}
                    width={120}
                    height={120}
                    className={styles.previewImg}
                    onError={(e) => {
                      console.error('Image failed:', src);
                      (e.target as HTMLImageElement).style.border = '2px solid red';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className={styles.removeBtn}
                  >
                    ×
                  </button>
                </div>
              )
            })}
          </div>
        </>}

      {/* Кнопки */}
      <div className={styles.buttons}>
        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitBtn}
        >
          {!isEditing && (isLoading ? 'Створення...' : 'Створити проект')}
          {isEditing && (isLoading ? 'Змінення...' : 'Змінити проект')}
        </button>
        <button
          type="button"
          onClick={() => router.push('/projects')}
          className={styles.cancelBtn}
        >
          Скасувати
        </button>
      </div>
    </form>
  );
}