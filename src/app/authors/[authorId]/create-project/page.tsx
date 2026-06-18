'use client';

import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import ProjectCreateForm from '../../../../components/ProjectCreateForm/ProjectCreateForm';
import { projectsService } from '../../../../lib/services/projectsService';
import styles from './page.module.scss';

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function CreateProjectPage() {
  // const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await projectsService.getCategories();
        setCategories(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error('Categories error:', err);
        setError('Не вдалося завантажити категорії');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {error && <div className={styles.errorBanner}>{error}</div>}
      <ProjectCreateForm categories={categories} />
    </div>
  );
}