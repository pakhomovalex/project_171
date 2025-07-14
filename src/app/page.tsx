import Header from "@/components/Header/Header";
import styles from "./home.module.scss";
import FondCard from "@/components/FondCard/FondCard";
import Image from "next/image";
import Link from "next/link";
import { ProjectCardType } from "@/types/ProjectCard";
import ProjectCard from "@/components/ProjectCard/ProjectCard";

const FONDS = [
  {
    title: 'Фонд «Повернись живим»',
    wallet: '9,1 млрд грн',
    achivements: [
      '10 000 бронежилетів',
      '7 633 тепловізори',
      '1 866 дронів',
    ]
  },
  {
    title: 'UNITED24',
    wallet: '1,4 млрд дол.США',
    achivements: [
      '29 відновлених мостів',
      '11 відновлених медичних установ',
      '3 відновлені школи',
    ]
  },
  {
    title: 'Razom for Ukraine',
    wallet: '139 млн дол. США',
    achivements: [
      '500 т життєво важливих постачань',
      '90 000 наборів першої допомоги',
      '69 автомобілів для медиків',
    ]
  }
];

const projects: ProjectCardType[] = [{
  title: 'Світло крізь тріщини1',
  category: 'Мистецтво',
  description: `“Світло крізь тріщини” — це авторська картина,
   народжена в часи війни, коли кожен новий день — це боротьба
    за життя, гідність і свободу. Вона символізує внутрішнє світло
     українців, яке проривається крізь тріщини втрат, болю й темряви.`,
  image: '/project-image.png',
  percent: 100,
  lastDate: '02.08.2025',
},
{
  title: 'Світло крізь тріщини2',
  category: 'Мистецтво',
  description: `“Світло крізь тріщини” — це авторська картина,
   народжена в часи війни, коли кожен новий день — це боротьба
    за життя, гідність і свободу. Вона символізує внутрішнє світло
     українців, яке проривається крізь тріщини втрат, болю й темряви.`,
  image: '/project-image.png',
  percent: 100,
  lastDate: '02.08.2025',
},
{
  title: 'Світло крізь тріщини3',
  category: 'Мистецтво',
  description: `“Світло крізь тріщини” — це авторська картина,
   народжена в часи війни, коли кожен новий день — це боротьба
    за життя, гідність і свободу. Вона символізує внутрішнє світло
     українців, яке проривається крізь тріщини втрат, болю й темряви.`,
  image: '/project-image.png',
  percent: 100,
  lastDate: '02.08.2025',
},
{
  title: 'Світло крізь тріщини4',
  category: 'Мистецтво',
  description: `“Світло крізь тріщини” — це авторська картина,
   народжена в часи війни, коли кожен новий день — це боротьба
    за життя, гідність і свободу. Вона символізує внутрішнє світло
     українців, яке проривається крізь тріщини втрат, болю й темряви.`,
  image: '/project-image.png',
  percent: 100,
  lastDate: '02.08.2025',
},
{
  title: 'Світло крізь тріщини5',
  category: 'Мистецтво',
  description: `“Світло крізь тріщини” — це авторська картина,
   народжена в часи війни, коли кожен новий день — це боротьба
    за життя, гідність і свободу. Вона символізує внутрішнє світло
     українців, яке проривається крізь тріщини втрат, болю й темряви.`,
  image: '/project-image.png',
  percent: 100,
  lastDate: '02.08.2025',
},
{
  title: 'Світло крізь тріщини6',
  category: 'Мистецтво',
  description: `“Світло крізь тріщини” — це авторська картина,
   народжена в часи війни, коли кожен новий день — це боротьба
    за життя, гідність і свободу. Вона символізує внутрішнє світло
     українців, яке проривається крізь тріщини втрат, болю й темряви.`,
  image: '/project-image.png',
  percent: 100,
  lastDate: '02.08.2025',
}
];

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.homeSection}>
          <h1 className={styles.homeSection__title}>
            Твоя підтримка — це арт, що рятує життя
          </h1>
          <h4 className={styles.homeSection__subtitle}>
            Купуй роботи українських митців — і допомагай ЗСУ через творчість
          </h4>
          <button className={styles.homeSection__button}>
            Підтримати проєкти
          </button>
        </section>
        <section className={`${styles.section} ${styles.fondsSection}`}>
          <h2 className={`${styles.secondTitle}`}>
            Допомога ЗСУ в цифрах: внесок провідних благодійників
          </h2>
          <p className={styles.fondsSection__desc}>
            За час повномасштабної війни українці показали неймовірну єдність і щедрість.
            Ми створили платформу, яка дозволяє підтримувати ЗСУ через креатив.
            Нижче — приклади того, як масштабно українці вже допомагають армії.
          </p>
          <Image
            src={'/blue-line.png'}
            alt={'blue line'}
            width={1043}
            height={203}
            className={styles.fondsSection__blueLine}
          />
          <Image
            src={'/yellow-line.png'}
            alt={'yellow line'}
            width={975}
            height={225}
            className={styles.fondsSection__yellowLine}
          />
          <div className={styles.fondsSection__fondsBox}>
            {FONDS.map(card => (
              <FondCard
                key={card.title}
                title={card.title}
                money={card.wallet}
                achivements={card.achivements}
              />
            ))}
          </div>
        </section>
        <section className={`${styles.section} ${styles.projectsSection}`}>
          <h2 className={`${styles.secondTitle}`}>
            Наші проекти
          </h2>
          <div className={styles.projectsSection__projectsBox}>
            {projects.map(project => {
              const {
                title,
                percent,
                description,
                image,
                lastDate,
                category,
              } = project;

              return <ProjectCard
                key={title}
                title={title}
                percent={percent}
                description={description}
                image={image}
                lastDate={lastDate}
                category={category}
              />
            })}
          </div>
          <Link href={"/projects"} className={styles.projectsSection__link}>
            Усі проекти
            <Image 
            src={"/right-arrow-icon.svg"}
             alt={"arrow"}
             width={18}
             height={18}
              />
          </Link>
        </section>
        <section></section>
      </main>
      <footer></footer>
    </>
  );
}
