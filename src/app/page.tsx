import Header from "@/components/Header/Header";
import styles from "./home.module.scss";
import FondCard from "@/components/FondCard/FondCard";
import Image from "next/image";
import Link from "next/link";

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
]

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
        <section className={`${styles.section} ${styles.projectsSection}`}>
          <h2 className={`${styles.secondTitle}`}>
            Допомога ЗСУ в цифрах: внесок провідних благодійників
          </h2>
          <p className={styles.projectsSection__desc}>
            За час повномасштабної війни українці показали неймовірну єдність і щедрість.
            Ми створили платформу, яка дозволяє підтримувати ЗСУ через креатив.
            Нижче — приклади того, як масштабно українці вже допомагають армії.
          </p>
          <Image
            src={'/blue-line.png'}
            alt={'blue line'}
            width={1043}
            height={203}
            className={styles.projectsSection__blueLine}
          />
          <Image
            src={'/yellow-line.png'}
            alt={'yellow line'}
            width={975}
            height={225}
            className={styles.projectsSection__yellowLine}
          />
          <div className={styles.projectsSection__fondsBox}>
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
        <section>
          <h2 className={`${styles.secondTitle}`}>
            Наші проекти
          </h2>
          <Link href={"/projects"}>
            Усі проекти
          </Link>
        </section>
      </main>
      <footer></footer>
    </>
  );
}
