'use client';

import Link from "next/link";
import Image from "next/image";
import styles from './Header.module.scss';
import ActiveLink from "../ActiveNavLink/ActiveNavLink";
import { useEffect, useState } from "react";
import { useUser } from "../../lib/store/store";
import { ProfileDropdown } from "../ProfileDropdown/ProfileDropdown";
// import { authStorage } from "@/utils/auth";

interface HeaderUser {
  id: number
  username: string
  avatar: string | null // URL аватарки
  email?: string
}

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<HeaderUser | null>(null);

  useEffect(() => {
    setUser(useUser.getState().user);

    const handleResize = () => {
      setIsTablet(window.innerWidth < 1040);
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [user]);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link href="/" className={styles.header__link}>
          <Image src="/Logo-mini.svg" fill alt="Logo image" className={styles.header__logo} />
        </Link>
        {!isTablet && <nav className={styles.nav}>
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
        </nav>}
        {!isTablet && (<div className={styles.header__login}>
          {!!user ? (
            <>
              <div></div>
              <ProfileDropdown up={false} />
            </>
          ) : (
            <>
              <Link href={"/auth/log-in"} className={styles.header__login__link}>
                <div>
                  <Image src={"/user-icon.svg"} fill alt={"user icon"} />
                </div>
                <p>Увійти</p>
              </Link>
              <Link className={styles.header__login__button} href={"/auth/sign-up"}>
                Зареєструватись
              </Link>
            </>)}
        </div>)}
        {isTablet
          && !isMobile
          &&  !!!user && <Link
            className={`
              ${styles.header__login__button}
              ${styles['header__login__button--tablet']}
              ${open ? styles['header__login__button--tablet--open'] : ''}
            `}
            href={"/auth/sign-up"}
          >
            Зареєструватись
          </Link>
        }
        {isTablet && <button className={styles.header__menu__button} onClick={() => setOpen(prev => !prev)}>
          <Image src={open ? "/close-icon.svg" : "/burger-menu.svg"} alt={"menu"} fill />
        </button>
        }
      </div>
      {isTablet && <aside className={`${styles.aside} ${open ? styles['aside--open'] : ""}`}>
        <nav className={`${styles.nav} ${styles['nav--vertical']}`}>
          <ul className={`${styles.nav__list} ${styles['nav__list--vertical']}`}>
            <li>
              <ActiveLink
                href="/projects"
                className={`${styles.nav__elem} ${styles['nav__elem--big']}`}
              >
                Проекти
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                href="/authors"
                className={`${styles.nav__elem} ${styles['nav__elem--big']}`}
              >
                Автори
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                href="/become-an-author"
                className={`${styles.nav__elem} ${styles['nav__elem--big']}`}
              >
                Стати атором
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                href="/about-us"
                className={`${styles.nav__elem} ${styles['nav__elem--big']}`}
              >
                Про нас
              </ActiveLink>
            </li>
          </ul>
        </nav>
        <div className={`${styles.header__login} ${styles['header__login--vertical']}`}>
          {!!user ? (
            <>
              <div></div>
              <ProfileDropdown up/>
            </>
          ) : (
            <>
              <Link href={"/auth/log-in"} className={styles.header__login__link}>
                <div>
                  <Image src={"/user-icon.svg"} fill alt={"user icon"} />
                </div>
                <p>Увійти</p>
              </Link>
              <Link
                className={`${styles.header__login__button} ${styles['header__login__button--full-width']}`}
                href={"/auth/sign-up"}
              >
                Зареєструватись
              </Link>
            </>)}
        </div>
      </aside>}
    </header>
  );
}