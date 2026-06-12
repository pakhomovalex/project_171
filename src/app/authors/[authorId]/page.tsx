
import { AuthorCard } from "@/components/AuthorCard/AuthorCard";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Image from "next/image";
import Link from "next/link";
import styles from './AuthorPage.module.scss';
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { authorsService } from "@/lib/services/authorsService";
import { UserWithProjects } from "@/utils/types/user";

export default async function AuthorDetails({ params }: { params: Promise<{ authorId: string }> }) {
  const { authorId } = await params;

  const author = await authorsService.getAuthor(+authorId);

  const { projects, username, full_name } = author as UserWithProjects;

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
            {username ? username : full_name}
          </p>
        </div>
        <div className={styles.main__author}>
          <AuthorCard author={author} full={false} />
        </div>
        <section className={styles.projects}>
          <h2 className={styles.projects__title}>
            Проекти автора
          </h2>
          {projects.map(project => {
            return (
              <ProjectCard
                key={project.id}
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