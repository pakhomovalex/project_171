import { authors } from "@/app/page";
import { AuthorCard } from "@/components/AuthorCard/AuthorCard";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Image from "next/image";
import Link from "next/link";
import styles from './AuthorPage.module.scss';
import { projects as serverProjects } from "@/app/page";
import ProjectCard from "@/components/ProjectCard/ProjectCard";

export default function AuthorDetails({ params: {
  authorId
} }: {
  params: {
    authorId: string;
  }
}) {
  const author = authors.find(author => author.id === +authorId) || authors[0];

  const { projects, username, first_name, last_name } = author;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.main__categories}>
          <Link href={"/"} className={styles.main__categoryLink}>
            Головна
          </Link>
          <Image
            src={"/arrow-right-gray-icon.svg"}
            width={16}
            height={16}
            alt={"arrow"}
          />
          <Link href={"/authors"} className={styles.main__categoryLink}>
            Автори
          </Link>
          <Image
            src={"/arrow-right-gray-icon.svg"}
            width={16}
            height={16}
            alt={"arrow"}
          />
          <p className={styles.main__categoryTitle}>
            {username ? username : `${first_name} ${last_name}`}
          </p>
        </div>
        <div className={styles.main__author}>
          <AuthorCard id={+authorId} full />
        </div>
        <section className={styles.projects}>
          <h2 className={styles.projects__title}>
            Проетки автора
          </h2>
          {projects.map(projectId => {
            const project = serverProjects.find(project => project.id === projectId) || serverProjects[0];

            return (
              <ProjectCard
                key={projectId}
                project={project}
              />
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}