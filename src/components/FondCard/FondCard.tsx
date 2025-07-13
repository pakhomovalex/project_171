import styles from './FondCard.module.scss';

type Props = {
  title: string,
  money: string,
  achivements: string[],
}

export default function FondCard({
  title,
  money,
  achivements,
}: Props) {
  return (
    <article className={styles.card}>
      <h4 className={styles.card__title}>
        {title}
      </h4>
      <p className={styles.card__moneyDesc}>
        Зібрано за весь час:
      </p>
      <h2 className={styles.card__money}>
        {money}
      </h2>
      <div className={styles.card__line} />
      <p className={styles.card__listDesc}>
        Ключові досягнення: 
      </p>
      <ul className={styles.card__list}>
        {achivements.map(award => (
          <li className={styles.card__item} key={award}>{award}</li>
        ))}
      </ul>
    </article>
  );
}