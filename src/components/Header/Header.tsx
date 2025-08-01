import Link from "next/link";
import Image from "next/image";
import styles from './Header.module.scss';
import ActiveLink from "../ActiveNavLink/ActiveNavLink";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link href="/" className={styles.header__link}>
          <Image src="/Logo-mini.svg" fill alt="Logo image" className={styles.header__logo} />
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__elem}>
              <ActiveLink href="/projects">Проекти</ActiveLink>
            </li>
            <li className={styles.nav__elem}>
              <ActiveLink href="/authors">Автори</ActiveLink>
            </li>
            <li className={styles.nav__elem}>
              <ActiveLink href="/become-an-author">Стати атором</ActiveLink>
            </li>
            <li className={styles.nav__elem}>
              <ActiveLink href="/about-us">Про нас</ActiveLink>
            </li>
          </ul>
        </nav>
        <div className={styles.header__login}>
          <Link href={"/auth/log-in"} className={styles.header__login__link}>
            <div>
              <Image src={"/user-icon.svg"} fill alt={"user icon"} />
            </div>
            <p>Увійти</p>
          </Link>
          <Link className={styles.header__login__button} href={"/auth/sign-up"}>
            Зареєструватись
          </Link>
        </div>
      </div>
    </header>
  );
}