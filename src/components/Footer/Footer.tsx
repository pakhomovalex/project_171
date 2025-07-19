import styles from './Footer.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__firstColumn}>
          <Image
            src={"/Logo-mini.svg"}
            alt={"logo image"}
            className={styles.footer__logo}
            width={205}
            height={72}
          />
          <p className={styles.footer__description}>
            Платформа, де творчість перетворюється на допомогу.
            Разом — до перемоги
          </p>
          <Link href={""} className={styles.footer__link}>
            Політика конфіденційності
          </Link>
        </div>
        <div className={styles.footer__secondColumn}>
          <h5 className={styles.footer__subtitle}>
            Навігація
          </h5>
          <nav className={styles.footer__nav}>
            <ul className={styles.footer__list}>
              <li className={styles.footer__item}>
                <Link href={""} className={styles.footer__navLink}>
                  Проекти
                </Link>
              </li>
              <li className={styles.footer__item}>
                <Link href={""} className={styles.footer__navLink}>
                  Автори
                </Link>
              </li>
              <li className={styles.footer__item}>
                <Link href={""} className={styles.footer__navLink}>
                  Стати автором
                </Link>
              </li>
              <li className={styles.footer__item}>
                <Link href={""} className={styles.footer__navLink}>
                  Про нас
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.footer__thirdColumn}>
          <h5 className={styles.footer__subtitle}>
            Контакти
          </h5>
          <Link
            href={`mailto:Pidtrymai.fond@gmail.com`}
            className={styles.footer__email}
          >
            Pidtrymai.fond@gmail.com
          </Link>
        </div>
        <div className={styles.footer__forthColumn}>
          <h4 className={styles.footer__support}>
            Допоможи ЗСУ вже зараз
          </h4>
          <button className={styles.footer__button}>
            Підтримати проекти
          </button>
        </div>
        <div className={styles.footer__line} />
        <div className={styles.footer__info}>
          <p className={styles.footer__copyright}>
            © 2025 Підтримай ЗСУ талантом. Усі права захищено.
          </p>
          <p className={styles.footer__madeBy}>
            Design & Development by Dobro.Studio
          </p>
        </div>
      </div>
    </footer>
  );
}