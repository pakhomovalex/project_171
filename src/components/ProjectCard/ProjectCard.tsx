import styles from './ProjectCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectBrief } from '../../utils/types/user';

export default function ProjectCard({
  project
}: { project: ProjectBrief }) {
  const {
    category,
    cover_image,
    title,
    subtitle,
    donation_type,
    end_date,
    id,
    donation_percentage,
    can_edit
  } = project;
  
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
          {category.name}
          <Image
            src={'/yellow-heart-icon.svg'}
            alt={'blue heart'}
            width={12}
            height={12}
          />
        </div>
          <Image
            src={cover_image}
            alt={'image'}
            fill
            className={styles.card__image}
            loading='eager'
          />
      </div>
      <h4 className={styles.card__title}>
        «{title.length >= 23 ? `${title.slice(0, 111)}...` : title}»
      </h4>
      <p className={styles.card__description}>
        {subtitle.length >= 112 ? `${subtitle.slice(0, 111)}...` : subtitle}
      </p>
      <p className={styles.card__type}>
        Тип збору:
      </p>
      <p className={styles.card__percent}>
        {donation_type === 'full_price' ? '100% автору': `${donation_percentage}% з продажу на ЗСУ` }
      </p>
      <p className={styles.card__termin}>
        Термін:
      </p>
      <p className={styles.card__lastDate}>
        До {end_date.toString().slice(0,10)}
      </p>
      <Link className={styles.card__button} href={`/projects/${id}`}>
        Підтримати
      </Link>
      {can_edit && (
          <Link 
            href={`/projects/${project.id}/edit`}
            className={styles.card__button__yellow}
          >
            Редагувати проект
          </Link>
        )}
    </article>
  );
}