import { ForWhoCardType } from "@/types/ForWhoCard";
import styles from './ForWhoCard.module.scss';
import Image from "next/image";

export default function ForWhoCard({
  icon,
  title,
  description
}: ForWhoCardType) {
  return (
    <article className={styles.card}>
      <Image
        src={icon}
        className={styles.card__icon}
        alt={"icon"}
        width={30}
        height={30}
      />
      <h4 className={styles.card__title}>
        {title}
      </h4>
      <p className={styles.description}>
        {description}
      </p>
    </article>
  );
}