import NavLink from "next/link";
import Link from "next/link";
import Image from "next/image";
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <NavLink href="/" className={styles.header__link}>
          <Image src="/Logo.svg" fill alt="Logo image" className={styles.header__logo} />
        </NavLink>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__elem}>
              <NavLink href="/projects" className={styles.nav__link}>Проекти</NavLink>
            </li>
            <li className={styles.nav__elem}>
              <NavLink href="/authors" className={styles.nav__link}>Автори</NavLink>
            </li>
            <li className={styles.nav__elem}>
              <NavLink href="/become-an-author" className={styles.nav__link}>Стати атором</NavLink>
            </li>
            <li className={styles.nav__elem}>
              <NavLink href="/about-us" className={styles.nav__link}>Про нас</NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.header__login}>
          <Link href={""} className={styles.header__login__link}>
            <div>
              <Image src={"/user-icon.svg"} fill alt={"user icon"} />
            </div>
            <p>Увійти</p>
          </Link>
          <button className={styles.header__login__button}>
            Зареєструватись
          </button>
        </div>
      </div>
    </header>
  );
}