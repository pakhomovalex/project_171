import { authors } from "@/app/page";
import Image from "next/image";
import styles from './AuthorCard.module.scss';
import Link from "next/link";

export const AuthorCard = ({ id }: { id: number }) => {
  const author = authors.find(author => author.id === id) || authors[0];

  const {
    username,
    first_name,
    last_name,
    avatar,
    specialization,
    city,
    createdAt,
    projects,
    telegram_url,
    instagram_url,
    facebook_url,
  } = author;

  return (
    <article className={styles.card}>
      <Image
        src={avatar}
        alt={"avatar"}
        width={160}
        height={160}
        className={styles.card__avatar}
      />
      <div className={styles.card__info}>
        <h3 className={styles.card__title}>
          {username ?
            username : `${first_name} ${last_name}`
          }
        </h3>
        <p className={styles.card__spezialization}>
          {specialization[0].name}
        </p>
        <p className={styles.card__slogan}>
          {specialization[0].slug}
        </p>
        <div className={styles.card__localInfoBox}>
          <div className={styles.card__localInfoSubBox}>
            <Image
              src={"/location-icon.svg"}
              alt={"icon"}
              width={18}
              height={18}
            />
            <p className={styles.card__localInfoText}>
              {city}
            </p>
          </div>
          <div className={styles.card__localInfoSubBox}>
            <Image
              src={"/sqedule-icon.svg"}
              alt={"icon"}
              width={18}
              height={18}
            />
            <p className={styles.card__localInfoText}>
              На платформі з {createdAt}
            </p>
          </div>
          <div className={styles.card__localInfoSubBox}>
            <Image
              src={"/puzzle-icon.svg"}
              alt={"icon"}
              width={18}
              height={18}
            />
            <p className={styles.card__localInfoText}>
              Кількість проектів: {projects.length}
            </p>
          </div>
        </div>
        {(facebook_url || telegram_url || instagram_url)
          && <>
            <p className={styles.card__socials}>
              Соціальні мережі:
            </p>
            <div className={styles.card__socialsBox}>
              {telegram_url && <Link
                href={telegram_url}
                className={styles.card__icon}
              >
                <Image
                  src={'/telegram-icon.svg'}
                  alt="icon"
                  fill
                />
              </Link>}
              {facebook_url && <Link
                href={facebook_url}
                className={styles.card__icon}
              >
                <Image
                  src={'/facebook-icon.svg'}
                  alt="icon"
                  fill
                />
              </Link>}
              {instagram_url && <Link
                href={instagram_url}
                className={styles.card__icon}
              >
                <Image
                  src={'/instagram-icon.svg'}
                  alt="icon"
                  fill
                />
              </Link>}
            </div>
          </>}
        <Link className={styles.card__button} href={`/authors/${author.id}`}>
          Детальніше про автора
        </Link>
      </div>
    </article>
  );
};