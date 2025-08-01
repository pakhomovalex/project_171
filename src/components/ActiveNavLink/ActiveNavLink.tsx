'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import styles from './ActiveNavLink.module.scss';

type Props = {
  href: string;
  children: React.ReactNode;
  activeClassName?: string;
  className?: string;
};

export default function ActiveLink({
  href,
  children,
}: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={classNames(styles.navLink, { [styles['navLink--active']]: isActive })}
    >
      {children}
    </Link>
  );
}