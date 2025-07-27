import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Link from "next/link";
import Image from "next/image";

import styles from './BecomeAnAuthor.module.scss';
import { FAQArticle } from "@/components/FAQArticle/FAQArticle";

const FAQ = [
  {
    question: '1. Як стати автором на платформі?',
    answer: 'Зареєструйтесь, заповніть профіль автора, створіть і опублікуйте свій проєкт.',
  },
  {
    question: '2. Які види творчості можна публікувати?',
    answer: `Можна розміщувати: мистецтво, прикраси та аксесуари, 
    дім і декор, одяг, настільні іграшки, діджитал арт. Категорії поступово розширюються.`,
  },
  {
    question: '3. Як використовуються кошти зібрані на проєкт?',
    answer: 'Відповідальність за використання коштів несе автор проєкту. Ви можете попросити автора надати підтвердження донатів.',
  },
  {
    question: '4. Чи збирає платформа кошти?',
    answer: 'Платформа не приймає оплату і не керує транзакціями. Усі фінансові операції відбуваються напряму між користувачем і автором.',
  },
  {
    question: '5. Чи є обмеження по тривалості збору?',
    answer: 'Проєкт активний 30 днів з можливістю продовження без створення нового проєкту.',
  },
  {
    question: '6. Чи є можливість внести зміни в проєкт після публікації?',
    answer: 'Так, ви можете оновлювати проєкт через свою адміністративну панель.',
  },
  {
    question: '7. Як приєднатися до команди платформи?',
    answer: 'Напишіть нам на електронну пошту, вказану у розділі контактів на сайті (внизу сайту).',
  }
]

export default function BecomeAnAuthor() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.firstSection}>
          <h1 className={styles.firstSection__title}>
            Твори — щоб допомагати
          </h1>
          <p className={styles.firstSection__description}>
            Поділись своїм мистецтвом і стань частиною спільноти, яка
            <br />перетворює креатив на силу для ЗСУ
          </p>
          <Link href={""} className={styles.firstSection__button}>
            Стати автором
          </Link>
          <article className={styles.firstSection__article}>
            <div className={styles.firstSection__articleImage}>
              <Image src={"/heart-icon.svg"} alt={"icon"} width={30} height={30} />
            </div>
            <h4 className={styles.firstSection__articleTitle}>
              Підтримка України
            </h4>
            <p className={styles.firstSection__articleDescription}>
              Кожен продаж безпосередньо сприяє підтримці Збройних Сил України
              в їхній боротьбі за свободу
            </p>
          </article>
          <article className={styles.firstSection__article}>
            <div className={styles.firstSection__articleImage}>
              <Image src={"/community-icon.svg"} alt={"icon"} width={30} height={30} />
            </div>
            <h4 className={styles.firstSection__articleTitle}>
              Поділіться своєю творчістю
            </h4>
            <p className={styles.firstSection__articleDescription}>
              Продемонструйте свої художні таланти глобальній аудиторії,
              яка прагне змінити ситуацію
            </p>
          </article>
          <article className={styles.firstSection__article}>
            <div className={styles.firstSection__articleImage}>
              <Image src={"/award-icon.svg"} alt={"icon"} width={30} height={30} />
            </div>
            <h4 className={styles.firstSection__articleTitle}>
              Твій талант має значення
            </h4>
            <p className={styles.firstSection__articleDescription}>
              Твій талант допомагає ЗСУ.
              Кожна робота — реальна підтримка
              на шляху до перемоги
            </p>
          </article>
        </section>
        <section className={styles.becomeAnAuthorSection}>
          <h2 className={styles.becomeAnAuthorSection__mainTitle}>
            Як стати автором?
          </h2>
          <article className={styles.becomeAnAuthorSection__article}>
            <div className={styles.becomeAnAuthorSection__image}>
              <Image src={"/becomeAnAuthor-image-1.png"} alt={"image"} fill />
            </div>
            <div className={styles.becomeAnAuthorSection__text}>
              <p className={styles.becomeAnAuthorSection__number}>01</p>
              <h4 className={styles.becomeAnAuthorSection__title}>
                Реєстрація на платформі
              </h4>
              <p className={styles.becomeAnAuthorSection__description}>
                Створіть обліковий запис за кілька хвилин та долучіться до спільноти авторів.
              </p>
            </div>
          </article>
          <article
            className={styles.becomeAnAuthorSection__article}>
            <div className={`${styles.becomeAnAuthorSection__text} ${styles['becomeAnAuthorSection__text--reversed']}`}>
              <p className={styles.becomeAnAuthorSection__number}>02</p>
              <h4 className={styles.becomeAnAuthorSection__title}>
                Заповнення профілю автора
              </h4>
              <p className={styles.becomeAnAuthorSection__description}>
                Додайте аватар, короткий опис і посилання на ваші соціальні мережі,
                щоб користувачі дізналися про вас більше.
              </p>
            </div>
            <div className={styles.becomeAnAuthorSection__image}>
              <Image src={"/becomeAnAuthor-image-2.png"} alt={"image"} fill />
            </div>
          </article>
          <article className={styles.becomeAnAuthorSection__article}>
            <div className={styles.becomeAnAuthorSection__image}>
              <Image src={"/becomeAnAuthor-image-3.png"} alt={"image"} fill />
            </div>
            <div className={styles.becomeAnAuthorSection__text}>
              <p className={styles.becomeAnAuthorSection__number}>03</p>
              <h4 className={styles.becomeAnAuthorSection__title}>
                Розміщення проєкту
              </h4>
              <p className={styles.becomeAnAuthorSection__description}>
                Заповніть сторінку проєкту: додайте фото, опишіть ідею,
                визначте мету та суму збору, оберіть дату завершення, вкажіть реквізити й тип збору.              </p>
            </div>
          </article>
          <article className={styles.becomeAnAuthorSection__article}>
            <div className={`${styles.becomeAnAuthorSection__text} ${styles['becomeAnAuthorSection__text--reversed']}`}>
              <p className={styles.becomeAnAuthorSection__number}>04</p>
              <h4 className={styles.becomeAnAuthorSection__title}>
                Вибір вашого проєкту користувачами
              </h4>
              <p className={styles.becomeAnAuthorSection__description}>
                Користувачі знайомляться з деталями, реквізитами та можуть зв’язатися з вами напряму.
              </p>
            </div>
            <div className={styles.becomeAnAuthorSection__image}>
              <Image src={"/becomeAnAuthor-image-4.png"} alt={"image"} fill />
            </div>
          </article>
          <article className={styles.becomeAnAuthorSection__article}>
            <div className={styles.becomeAnAuthorSection__image}>
              <Image src={"/becomeAnAuthor-image-5.png"} alt={"image"} fill />
            </div>
            <div className={styles.becomeAnAuthorSection__text}>
              <p className={styles.becomeAnAuthorSection__number}>05</p>
              <h4 className={styles.becomeAnAuthorSection__title}>
                Зв’язок після донату
              </h4>
              <p className={styles.becomeAnAuthorSection__description}>
                Після донату користувачі можуть зв’язатися з вами
                через соцмережі або за номером телефону для уточнення деталей.
              </p>
            </div>
          </article>
          <article className={styles.becomeAnAuthorSection__article}>
            <div className={`${styles.becomeAnAuthorSection__text} ${styles['becomeAnAuthorSection__text--reversed']}`}>
              <p className={styles.becomeAnAuthorSection__number}>06</p>
              <h4 className={styles.becomeAnAuthorSection__title}>
                Знайомство з автором
              </h4>
              <p className={styles.becomeAnAuthorSection__description}>
                Познайомтесь з автором та за бажанням підтримайте його творчість донатом
              </p>
            </div>
            <div className={styles.becomeAnAuthorSection__image}>
              <Image src={"/becomeAnAuthor-image-6.png"} alt={"image"} fill />
            </div>
          </article>
        </section>
        <section className={styles.faqSection}>
          <h2 className={styles.faqSection__title}>
            Часті запитання
          </h2>
          <div className={styles.faqSection__questions}>
            {FAQ.map(faq => (
              <FAQArticle key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
};