import Link from "next/link";
import classNames from "classnames";
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
      <li className={classNames(`${styles.pagination__item}`, { disabled: currentPage === 1 })}>
        <Link
          data-cy="prevLink"
          className={classNames(styles.pagination__link, {
            [styles.pagination__linkDisabled]: currentPage === 1
          })}
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
            className={classNames(`${styles.pagination__link}`,
            { [styles.pagination__linkActive]: currentPage === count })}
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
          className={classNames(styles.pagination__link, {
            [styles.pagination__linkDisabled]: currentPage === paginationCount.length
          })}
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
