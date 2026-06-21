'use client'

import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import styles from './ProjectPage.module.scss';
import Link from "next/link";
import Image from "next/image";
import { Slider } from "../../../components/Slider/Slider";
import { projectsService } from "../../../lib/services/projectsService";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DonationModal from "../../../components/DonationModal/DonationModal";
import { ProjectType } from "@/utils/types/ProjectType";
import { accessTokenService } from "@/lib/services/accessTokenService";

export default function ProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      const token = accessTokenService.getAccess();
      if (!token) {
        // Редирект на логин
        router.push('/auth/log-in');
        return;
      }

      try {
        const id = params.projectId ? +params.projectId : 0;
        if (!id) throw new Error('Invalid project ID');

        const data = await projectsService.getProject(id);
        setProject(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [params.projectId, router]);

  if (!project) return <div>Завантаження...</div>;

  const {
    title,
    subtitle,
    images,
    description,
    fundraising_goal,
    donation_percentage,
    price,
    end_date,
    author
  } = project;

  const {
    username,
    full_name,
    id,
    avatar,
    bio,
    telegram_url,
    instagram_url,
    facebook_url,
  } = author;

  return (
    <>
      <Header />
      {loading ?
        <div>Завантаження...</div>
        :
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
          <section className={styles.mainSection}>
            <h1 className={styles.mainSection__title}>
              {title}
            </h1>
            <p className={styles.mainSection__subtitle}>
              {subtitle}
            </p>
            <div className={styles.mainSection__swiperBox}>
              <Slider images={images} />
            </div>
          </section>
          <section className={styles.infoSection}>
            <div className={styles.infoSection__text}>
              <h2 className={styles.infoSection__title}>
                Про проект
              </h2>
              <p className={styles.infoSection__description}>
                {description}
              </p>
              <h2 className={styles.infoSection__title}>
                Мета збору
              </h2>
              <p className={styles.infoSection__fundraising_goal}>
                {fundraising_goal}
              </p>
            </div>

            <article className={styles.infoSection__article}>
              <h4 className={styles.infoSection__article__title}>
                Підтримай цей проект!
                <Image src={"/ukraine-flag.svg"} alt={"flag"} width={22} height={22} />
              </h4>
              <p className={styles.infoSection__article__text}>
                Твій донат допоможе втілити творчість, яка працює на перемогу
              </p>
              <div className={styles.infoSection__articleBox}>
                <div className={styles.infoSection__articleElem}>
                  <Image
                    src={"/article-icon-1.svg"}
                    alt={"icon"}
                    width={32}
                    height={32}
                    className={styles.infoSection__articleElem__icon}
                  />
                  <p className={styles.infoSection__articleElem__text}>
                    Ціль:
                  </p>
                  <h4 className={styles.infoSection__articleElem__value}>
                    {price} грн
                  </h4>
                </div>
                <div className={styles.infoSection__articleElem}>
                  <Image
                    src={"/article-icon-2.svg"}
                    alt={"icon"}
                    width={32}
                    height={32}
                    className={styles.infoSection__articleElem__icon}
                  />
                  <p className={styles.infoSection__articleElem__text}>
                    Тип:
                  </p>
                  <h4 className={styles.infoSection__articleElem__value}>
                    {donation_percentage ? `${donation_percentage}% від продажу на ЗСУ` : '100% автору'}
                  </h4>
                </div>
                <div className={styles.infoSection__articleElem}>
                  <Image
                    src={"/article-icon-3.svg"}
                    alt={"icon"}
                    width={32}
                    height={32}
                    className={styles.infoSection__articleElem__icon}
                  />
                  <p className={styles.infoSection__articleElem__text}>
                    Термін:
                  </p>
                  <h4 className={styles.infoSection__articleElem__value}>
                    {end_date.toString().slice(0, 10)}
                  </h4>
                </div>
              </div>
              <button
                className={styles.infoSection__article__button}
                onClick={() => setIsModalOpen(true)}
              >
                Підтримати проект
              </button>
              <DonationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={project}
              />
            </article>

            <article className={styles.authorArticle}>
              <h2 className={styles.authorArticle__title}>
                Про автора
              </h2>
              <div className={styles.authorArticle__box}>
                <Image
                  src={avatar}
                  alt={"avatar"}
                  width={140}
                  height={140}
                  className={styles.authorArticle__avatar}
                />
                <div className={styles.authorArticle__info}>
                  <h4 className={styles.authorArticle__name}>
                    {username ?
                      username : full_name
                    }
                  </h4>
                  <p className={styles.authorArticle__bio}>
                    {bio}
                  </p>
                  <div className={styles.authorArticle__line} />
                  {(facebook_url || telegram_url || instagram_url)
                    && <>
                      <h4 className={styles.authorArticle__socials}>
                        Соціальні мережі:
                      </h4>
                      <div className={styles.authorArticle__socialsBox}>
                        {telegram_url && <Link
                          href={telegram_url}
                          className={styles.authorArticle__icon}
                        >
                          <Image
                            src={'/telegram-icon.svg'}
                            alt="icon"
                            fill
                          />
                        </Link>}
                        {facebook_url && <Link
                          href={facebook_url}
                          className={styles.authorArticle__icon}
                        >
                          <Image
                            src={'/facebook-icon.svg'}
                            alt="icon"
                            fill
                          />
                        </Link>}
                        {instagram_url && <Link
                          href={instagram_url}
                          className={styles.authorArticle__icon}
                        >
                          <Image
                            src={'/instagram-icon.svg'}
                            alt="icon"
                            fill
                          />
                        </Link>}
                      </div>
                    </>}
                  <Link className={styles.authorArticle__button} href={`/authors/${id}`}>
                    Інші роботи автора
                  </Link>
                </div>
              </div>
            </article>
          </section>
        </main>}
      <Footer />
    </>
  );
}