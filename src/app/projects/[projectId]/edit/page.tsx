'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { projectsService } from '../../../../lib/services/projectsService';
import { useUser } from '../../../../lib/store/store';
import ProjectCreateForm from '../../../../components/ProjectCreateForm/ProjectCreateForm';
import styles from './page.module.scss';
import { ProjectType } from '@/utils/types/ProjectType';

interface Category {
  id: number;
  name: string;
  slug: string;
}


export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const currentUser = useUser((state) => state.user);

  const [project, setProject] = useState<ProjectType | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const projectId = params.projectId ? +params.projectId : 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectData, categoriesData] = await Promise.all([
          projectsService.getProject(+projectId),
          projectsService.getCategories(),
        ]);

        setProject(projectData);
        setCategories(categoriesData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError('Не вдалося завантажити проект');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Завантаження...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Проект не знайдено</div>
      </div>
    );
  }

  // Проверяем, что текущий пользователь — автор проекта
  if (currentUser?.id !== project.author?.id) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>У вас немає прав для редагування цього проекту</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {error && <div className={styles.errorBanner}>{error}</div>}

      <ProjectCreateForm
        categories={categories}
        initialData={project}
        isEditing={true}
        projectId={+projectId}
        onSuccess={() => router.push(`/projects/${projectId}`)}
      />
    </div>
  );
}