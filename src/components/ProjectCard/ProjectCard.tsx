import { ProjectCardType } from '@/types/ProjectCard';
import styles from './ProjectCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectCard({
  id,
  title,
  subtitle,
  images,
  category,
  percent,
  lastDate,
}: Omit<ProjectCardType, 'description' | 'fundraising_goal' | 'price'>) {
  return (
    <article className={styles.card}>
      <div className={styles.card__imageBox}>
        <div className={styles.card__category}>
          <Image
            src={'/blue-heart-icon.svg'}
            alt={'blue heart'}
            width={12}
            height={12}
          />
          {category}
          <Image
            src={'/yellow-heart-icon.svg'}
            alt={'blue heart'}
            width={12}
            height={12}
          />
        </div>
        <Image
          src={images[0]}
          alt={'image'}
          fill
          className={styles.card__image}
        />
      </div>
      <h4 className={styles.card__title}>
        «{title}»
      </h4>
      <p className={styles.card__description}>
        {subtitle.length >= 112 ? `${subtitle.slice(0, 111)}...` : subtitle}
      </p>
      <p className={styles.card__type}>
        Тип збору:
      </p>
      <p className={styles.card__percent}>
        {percent > 0 ? `${percent}% з продажу на ЗСУ` : '100% автору'}
      </p>
      <p className={styles.card__termin}>
        Термін:
      </p>
      <p className={styles.card__lastDate}>
        До {lastDate}
      </p>
      <Link className={styles.card__button} href={`/projects/${id}`}>
        Підтримати
      </Link>
    </article>
  );
}