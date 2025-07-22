import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import styles from './Authors.module.scss';
import { authors } from "../page";
import { AuthorCard } from "@/components/AuthorCard/AuthorCard";
import { AuthorsPagination } from "@/components/AuthorsPagination/AuthorsPagination";
import Image from "next/image";
import Link from "next/link";

export default function Authors() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.authors__mainSection}>
          <h1 className={styles.authors__title}>Ті, хто творить заради перемоги</h1>
          <p className={styles.authors__description}>
            Познайомся з митцями, які перетворюють свої ідеї на допомогу ЗСУ.
            <br />
            Кожна робота тут — це крок до нашої спільної перемоги
          </p>
          <div className={styles.authors__authorsBox}>
            {authors.map(author => (
              <AuthorCard key={author.id} id={author.id} full={false} />
            ))}
          </div>
          <AuthorsPagination totalItems={authors.length} />
        </section>
        <section className={styles.authors__supportSection}>
          <Image src={"/authors-bg-image.png"} alt={"bg image"} fill/>
          <h2 className={styles.authors__secondTitle}>
            Стань автором, що допомагає
          </h2>
          <p className={styles.authors__secondDescription}>
            Завантаж свою рбооту і перетвори творчість на підтримку тих, хто боронить Україну
          </p>
          <Link className={styles.authors__button} href={`/become-an-author`}>
            Стати автором
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
};