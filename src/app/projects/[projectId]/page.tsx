import { projects } from "@/app/page";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { ProjectCardType } from "@/types/ProjectCard";
import styles from './ProjectPage.module.scss';
import Link from "next/link";
import Image from "next/image";

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const project: ProjectCardType = projects.find(p => p.id === +params.projectId) || projects[0];

  const { title } = project;

  return (
    <>
      <Header />
      <main className={styles.project}>
        <div className={styles.project__categories}>
          <Link href={"/"} className={styles.project__categoryLink}>
            Головна
          </Link>
          <Image
            src={"/arrow-right-gray-icon.svg"}
            width={16}
            height={16}
            alt={"arrow"}
          />
          <Link href={"/projects"} className={styles.project__categoryLink}>
            Проекти
          </Link>
          <Image
            src={"/arrow-right-gray-icon.svg"}
            width={16}
            height={16}
            alt={"arrow"}
          />
          <p className={styles.project__categoryTitle}>
            «{title}»
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}