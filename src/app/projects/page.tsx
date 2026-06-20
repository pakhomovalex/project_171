'use client'

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from './projects.module.scss';
import Image from "next/image";
import ProjectsCategoryPagination from "../../components/ProjectsPagination/ProjectsCategoryPagination";
import { Suspense, useEffect, useState } from "react";
import { projectsService } from "../../lib/services/projectsService";
import { ProjectBrief } from "../../utils/types/user";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectBrief[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    projectsService.getProjects()
      .then((res) => {
        setProjects(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className={styles.projectsSection}>
          <h1 className={styles.projectsSection__title}>
            Креативні проєкти для донатів на ЗСУ
          </h1>
          <p className={styles.projectsSection__description}>
            Обирай серед авторських проєктів митців, які хочуть допомогти ЗСУ
          </p>
          {loading ?
            <div className={styles.projectsSection__description}>
              Завантаження...
            </div> : <Suspense>
              <ProjectsCategoryPagination projects={projects} />
            </Suspense>}
        </section>
        <section className={styles.supportSection}>
          <Image
            src={"/projects-image.png"}
            alt={"image"}
            fill
          />
          <h2 className={styles.supportSection__title}>
            Твоя творчість — твій внесок у перемогу
          </h2>
          <p className={styles.supportSection__description}>
            Підтримай ЗСУ донатом або власним талантом.
            <br />
            Разом сильніші. Разом переможемо.
          </p>
          <button className={styles.supportSection__button}>
            Стати автором
          </button>
        </section>
      </main>
      <Footer />
    </>
  )
};