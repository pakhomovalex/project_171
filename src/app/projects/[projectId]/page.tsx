import { projects } from "@/app/page";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { ProjectCardType } from "@/types/ProjectCard";
import styles from './ProjectPage.module.scss';
import Link from "next/link";
import Image from "next/image";
import { Slider } from "@/components/Slider/Slider";
import { author } from "@/app/page";

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const project: ProjectCardType = projects.find(p => p.id === +params.projectId) || projects[0];

  const {
    title,
    subtitle,
    images,
    description,
    fundraising_goal,
    percent,
    price,
    lastDate
  } = project;

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
                  {percent}% від продажу на ЗСУ
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
                  {lastDate}
                </h4>
              </div>
            </div>
            <button className={styles.infoSection__article__button}>
              Підтримати проект
            </button>
          </article>

          <article className={styles.authroArticle}>
            <h2 className={styles.authroArticle__title}>
              Про автора
            </h2>
            <div className={styles.authroArticle__box}>
              <Image
                src={author.avatar}
                alt={"avatar"}
                width={160}
                height={160}
                className={styles.authroArticle__avatar}
              />
              <div className={styles.authroArticle__info}>
                <h4 className={styles.authroArticle__name}>
                  {`${author.first_name} ${author.last_name}`}
                </h4>
                <p className={styles.authroArticle__bio}>
                  {author.bio}
                </p>
                <div className={styles.authroArticle__line} />
                <h4 className={styles.authroArticle__socials}>
                  Соціальні мережі:
                </h4>
                <div className={styles.authroArticle__socialsBox}>
                  {[
                    '/telegram-icon.svg',
                    '/facebook-icon.svg',
                    '/instagram-icon.svg'
                  ].map(icon => (
                    <Link
                      href={icon}
                      key={icon}
                      className={styles.authroArticle__icon}
                    >
                      <Image
                        src={icon}
                        alt="icon"
                        fill
                      />
                    </Link>
                  ))}
                </div>
                <Link className={styles.authroArticle__button} href={""}>
                  Інші роботи автора
                </Link>
              </div>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}