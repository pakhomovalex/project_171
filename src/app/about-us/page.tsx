import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import styles from './AboutUs.module.scss';
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.info}>
          <h1 className={styles.info__title}>
            Коли мистецтво стає зброєю
          </h1>
          <p className={styles.info__description}>
            Кожна ідея, дизайн чи картина на нашій платформі допомагає ЗСУ
          </p>
          <div className={styles.info__content}>
            <h2 className={styles.info__subtitle}>
              Хто ми і навіщо це робимо
            </h2>
            <p className={styles.info__text}>
              Ми — команда однодумців,
              об`єднаних спільним бажанням
              допомогти Україні в непростий час.
              Використовуючи наші навички в дизайні,
              розробці та креативі, ми створили платформу,
              яка перетворює творчість на реальну підтримку
              для Збройних Сил України.
            </p>
            <p className={styles.info__text}>
              Ми віримо, що кожен може долучитися
              до спільної справи — і не обов’язково
              грошима. Саме тому ми створили простір,
              де митці можуть ділитися своїми роботами,
              а небайдужі — підтримувати їх, роблячи
              донати на користь наших захисників.
            </p>
          </div>
          <div className={styles.info__image}>
            <Image src={"/about-us-info-image.png"} alt={"image"} fill />
          </div>
        </section>
        <section className={styles.mission}>
          <Image src={"/about-us-mission-bg.png"} alt={"background image"} fill />
          <h2 className={styles.mission__title}>
            Наша місія
          </h2>
          <p className={styles.mission__description}>
            Ми віримо, що творчість має силу змінювати.

            Наша мета — дати кожному можливість
            <br />
            підтримати ЗСУ через свій талант
          </p>
          <div className={styles.mission__mission}>
            <Image src={'/blue-heart-icon.svg'} alt={"blue heart"} width={18} height={18} />
            Кожне творіння рятує життя
            <Image src={'/yellow-heart-icon.svg'} alt={"blue heart"} width={18} height={18} />
          </div>
        </section>
        <section className={styles.goals}>
          <h2 className={styles.goals__title}>
            Наші цінності
          </h2>
          <p className={styles.goals__description}>
            Ми підтримуємо і надихаємо митців
            ділитися своїм даром, перетворюючи
            креатив
            <br />
            на конкретну допомогу тим,
            хто боронить нашу свободу
          </p>
          <article className={styles.goals__article}>
            <Image src={"/article-icon-2.svg"} alt={"article icon"} width={32} height={32} />
            <h4 className={styles.goals__articleTitle}>
              Підтримка України через творчість
            </h4>
            <p className={styles.goals__articleText}>
              Кожен твій креативний внесок — це реальна допомога
              ЗСУ. Ми об’єднуємо таланти для спільної перемоги
            </p>
          </article>
          <article className={styles.goals__article}>
            <Image src={"/community-icon.svg"} alt={"article icon"} width={32} height={32} />
            <h4 className={styles.goals__articleTitle}>
              Спільнота творчих сердець
            </h4>
            <p className={styles.goals__articleText}>
              Ми створюємо простір, де кожен автор
              і покупець — частина великої команди, що допомагає країні
            </p>
          </article>
          <article className={styles.goals__article}>
            <Image src={"/lamp-icon.svg"} alt={"article icon"} width={32} height={32} />
            <h4 className={styles.goals__articleTitle}>
              Натхнення і розвиток
            </h4>
            <p className={styles.goals__articleText}>
              Платформа мотивує творчих людей ділитися своїм
              талантом, розвиватися і водночас допомагати важливій справі
            </p>
          </article>
          <article className={styles.goals__article}>
            <Image src={"/handshake-icon.svg"} alt={"article icon"} width={32} height={32} />
            <h4 className={styles.goals__articleTitle}>
              Взаємоповага і підтримка
            </h4>
            <p className={styles.goals__articleText}>
              Цінуємо кожен внесок — від ідеї до готової роботи — і підтримуємо один одного на цьому шляху
            </p>
          </article>
        </section>
        <section className={styles.support}>
          <Image src={"/about-us-support-bg.png"} alt={"background image"} fill />
          <h2 className={styles.support__title}>
            Обирай шлях підтримки
          </h2>
          <p className={styles.support__description}>
            Стань частиною спільноти, що допомагає Україні
            <br />
            через творчість — твій талант або підтримка можуть змінити життя
            підтримати ЗСУ через свій талант
          </p>
          <div className={styles.support__buttonBox}>
            <Link className={styles.support__buttonBlue} href={""}>
              Підтримати проекти
            </Link>
            <Link className={styles.support__buttonYellow} href={""}>
              Стати автором
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
};