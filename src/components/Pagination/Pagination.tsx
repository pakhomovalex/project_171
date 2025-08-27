import Link from "next/link";
import styles from './Pagination.module.scss';

interface Props {
  total: number;
  currentPage: number;
  onPageChange: (arg: number) => void;
}

export const Pagination = ({
  total,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const paginationCount: number[] = [];

  for (let i = 1; i <= Math.ceil(total / 6); i++) {
    paginationCount.push(i);
  }

  return (
    <ul className={styles.pagination}>
      <li className={`${styles.pagination__item} ${ currentPage === 1 ? styles['disabled'] : ''}`}>
        <Link
          data-cy="prevLink"
          className={`${styles.pagination__link} ${
           currentPage === 1 ? [styles.pagination__linkDisabled] : ''
          }`}
          href={`?page=${currentPage - 1}`}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {`<`}
        </Link>
      </li>

      {paginationCount.map(count => (
        <li
          key={count.toString()}
          className={styles.pagination__item}
          onClick={() => onPageChange(count)}
        >
          <Link
            data-cy="pageLink"
            className={`${styles.pagination__link}
            ${ currentPage === count ? [styles.pagination__linkActive] : ''}`}
            href={`?page=${count}`}
          >
            {count}
          </Link>
        </li>
      ))}
      <li
        className={styles.pagination__item}
      >
        <Link
          data-cy="nextLink"
          className={`${styles.pagination__link} ${
           currentPage === paginationCount.length ? [styles.pagination__linkDisabled] : '' 
          }`}
          href={`?page=${currentPage + 1}`}
          aria-disabled="false"
          onClick={() => onPageChange(currentPage + 1)}
        >
          {`>`}
        </Link>
      </li>
    </ul>
  );
};
