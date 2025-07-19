import Header from "@/components/Header/Header";
import styles from "./home.module.scss";
import FondCard from "@/components/FondCard/FondCard";
import Image from "next/image";
import Link from "next/link";
import { ProjectCardType } from "@/types/ProjectCard";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import ForWhoCard from "@/components/ForWhoCard/ForWhoCard";
import Footer from "@/components/Footer/Footer";

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

export const projects: ProjectCardType[] = [{
  id: 1,
  title: 'Світло крізь тріщини1',
  category: 'Мистецтво',
  description: `“Світло крізь тріщини” — це авторська картина,
   народжена в часи війни, коли кожен новий день — це боротьба
    за життя, гідність і свободу. Вона символізує внутрішнє світло
     українців, яке проривається крізь тріщини втрат, болю й темряви.`,
  image: ['/project-image.png'],
  percent: 100,
  lastDate: '02.08.2025',
},
{
  id: 2,
  title: 'Світло крізь тріщини2',
  category: 'Прикраси та аксесуари',
  description: `“Світло крізь тріщини” — це авторська картина,
   народжена в часи війни, коли кожен новий день — це боротьба
    за життя, гідність і свободу. Вона символізує внутрішнє світло
     українців, яке проривається крізь тріщини втрат, болю й темряви.`,
  image: ['/project-image.png'],
  percent: 100,
  lastDate: '02.08.2025',
},
{
  id: 3,
  title: 'Світло крізь тріщини3',
  category: 'Дім та декор',
  description: `“Світло крізь тріщини” — це авторська картина,
   народжена в часи війни, коли кожен новий день — це боротьба
    за життя, гідність і свободу. Вона символізує внутрішнє світло
     українців, яке проривається крізь тріщини втрат, болю й темряви.`,
  image: ['/project-image.png'],
  percent: 100,
  lastDate: '02.08.2025',
},
{
  id: 4,
  title: 'Світло крізь тріщини4',
  category: 'Одяг',
  description: `“Світло крізь тріщини” — це авторська картина,
   народжена в часи війни, коли кожен новий день — це боротьба
    за життя, гідність і свободу. Вона символізує внутрішнє світло
     українців, яке проривається крізь тріщини втрат, болю й темряви.`,
  image: ['/project-image.png'],
  percent: 100,
  lastDate: '02.08.2025',
},
{
  id: 5,
  title: 'Світло крізь тріщини5',
  category: 'Настільні ігри та іграшки',
  description: `“Світло крізь тріщини” — це авторська картина,
   народжена в часи війни, коли кожен новий день — це боротьба
    за життя, гідність і свободу. Вона символізує внутрішнє світло
     українців, яке проривається крізь тріщини втрат, болю й темряви.`,
  image: ['/project-image.png'],
  percent: 100,
  lastDate: '02.08.2025',
},
{
  id: 6,
  title: 'Світло крізь тріщини6',
  category: 'Діджитал арт',
  description: `“Світло крізь тріщини” — це авторська картина,
   народжена в часи війни, коли кожен новий день — це боротьба
    за життя, гідність і свободу. Вона символізує внутрішнє світло
     українців, яке проривається крізь тріщини втрат, болю й темряви.`,
  image: ['/project-image.png'],
  percent: 100,
  lastDate: '02.08.2025',
},
{
  id: 7,
  title: 'Світло крізь тріщини7',
  category: 'Мистецтво',
  description: `“Світло крізь тріщини” — це авторська картина,
   народжена в часи війни, коли кожен новий день — це боротьба
    за життя, гідність і свободу. Вона символізує внутрішнє світло
     українців, яке проривається крізь тріщини втрат, болю й темряви.`,
  image: ['/project-image.png'],
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
                id,
                title,
                percent,
                description,
                image,
                lastDate,
                category,
              } = project;

              return <ProjectCard
                key={id}
                id={id}
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
        <section className={`${styles.section} ${styles.forWhoSection}`}>
          <h2 className={styles.secondTitle}>
            Для кого ця платформа?
          </h2>
          <div className={styles.forWhoSection__cardBox}>
            <ForWhoCard
              icon="/painters-icon.svg"
              title="Художники"
              description="Для митців, які прагнуть підтримати армію своїми картинами,
               ілюстраціями чи постерами"
            />
            <ForWhoCard
              icon="/clothes-icon.svg"
              title="Дизайнери одягу"
              description="Для виконавців і композиторів, які
               хочуть донатити через авторську музику або треки"
            />
            <ForWhoCard
              icon="/plants-icon.svg"
              title="Флористи та декоратори"
              description="Для тих, хто перетворює простір,
               створюючи красу та незабутню атмосферу через квіти і дизайн"
            />
            <ForWhoCard
              icon="/graphics-icon.svg"
              title="Фотографи"
              description="Для тих, хто бачить історію
               через об'єктив і хоче допомагати через свої фотопроєкти"
            />
            <ForWhoCard
              icon="/masters-icon.svg"
              title="Майстри та ремісники"
              description="Для творців унікальних речей,
               які перетворюють ручну роботу на підтримку ЗСУ"
            />
            <ForWhoCard
              icon="/digital-icon.svg"
              title="Digital-артисти"
              description="Для тих, хто створює графіку,
               шаблони, іконки чи інші цифрові продукти"
            />
          </div>
        </section>
        <section className={`${styles.section} ${styles.aboutUsSection}`}>
          <h2 className={styles.secondTitle}>Хто ми?</h2>
          <div className={styles.aboutUsSection__imageBox}>
            <Image
              src={"/about-us.png"}
              alt={"about us photo"}
              fill
              className={styles.aboutUsSection__image}
            />
          </div>
          <h3 className={styles.aboutUsSection__subtitle}>
            Ми — ті, хто не міг залишитись осторонь
          </h3>
          <p className={styles.aboutUsSection__description}>
            Ми — незалежна команда з ІТ та креативної
            сфери, яку об’єднує спільна цінність: підтримати
            ЗСУ через силу української творчості.
          </p>
          <p className={styles.aboutUsSection__description}>
            Цей проєкт народився з віри в те, що креатив
            може бути не лише красивим, а й корисним. Ми
            створили платформу, яка поєднує митців і людей
            доброї волі — тих, хто хоче допомагати армії через
            мистецтво, дизайн, музику чи тексти.
          </p>
          <p className={styles.aboutUsSection__description}>
            Це наш спосіб сказати: ми теж у
            строю — своїми вміннями, діями та небайдужістю.
          </p>
          <Link className={styles.aboutUsSection__link} href={"/about-us"}>
            Дізнатись більше
            <Image
              src={"/right-arrow-icon.svg"}
              alt={"arrow"}
              width={18}
              height={18}
            />
          </Link>
        </section>
        <section className={styles.supportSection}>
          <Image
            src={"/support-image.png"}
            alt={"background image"}
            fill
            className={styles.supportSection__image}
          />
          <h2 className={styles.supportSection__title}>
            Твоя творчість — твій внесок у перемогу
          </h2>
          <p className={styles.supportSection__description}>
            Підтримай ЗСУ донатом або власним талантом.
            <br />
            Разом сильніші. Разом переможемо.
          </p>
          <div className={styles.supportSection__buttonBox}>
            <button className={styles.supportSection__blueButton}>
              Підртримати проекти
            </button>
            <button className={styles.supportSection__yellowButton}>
              Стати автором
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
