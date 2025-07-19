import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import styles from './projects.module.scss';
import Image from "next/image";
import ProjectsCategoryPagination from "@/components/ProjectsPagination/ProjectsCategoryPagination";

export default function Projects() {
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
          <ProjectsCategoryPagination />
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