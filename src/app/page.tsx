import Header from "@/components/Header/Header";
import styles from "./home.module.scss";

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
        <section className={`${styles.section} ${styles.projectsSection}`}></section>
      </main>
      <footer></footer>
    </>
  );
}
