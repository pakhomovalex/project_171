'use client'

import Image from "next/image";
import styles from './AuthorCard.module.scss';
import Link from "next/link";
import { UserWithProjects } from "../../utils/types/user";
import { useUser } from "../../lib/store/store";
import { useParams } from "next/navigation";

export const AuthorCard = ({
  author,
  full,
}: {
  author: UserWithProjects,
  full: boolean,
}) => {
  const currentUser = useUser((state) => state.user);
  const params = useParams();

  // Проверяем, является ли текущий пользователь владельцем профиля
  const isOwner = currentUser?.id === +params.authorId;
  const isAdmin = currentUser?.is_superuser;

  // Может редактировать: владелец или админ
  const canEdit = isOwner;


  const {
    username,
    full_name,
    first_name,
    last_name,
    avatar,
    city,
    telegram_url,
    instagram_url,
    facebook_url,
    project_count,
    specialization,
    bio,
    date_joined
  } = author;

  return (
    <article className={styles.card}>
      <div className={styles.card__avatarBox}>
        {avatar ? (
          <Image
            src={avatar}
            alt={"avatar"}
            fill
          />
        ) : (
          <Image
            src={'/default-user-icon.jpg'}
            alt={"avatar"}
            fill
          />
        )}

      </div>
      <div className={styles.card__info}>
        <h3 className={styles.card__title}>
          {username ?
            username : full_name || `${first_name} ${last_name}`
          }
          {/* {full_name} */}
        </h3>
        <p className={styles.card__spezialization}>
          {specialization.name || ''}
        </p>
        <p className={styles.card__slogan}>
          {bio}
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
              На платформі з {date_joined.slice(0, 10).split('-').join('.')}
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
              Кількість проектів: {project_count}
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
              </Link>
              }
              {instagram_url && <Link
                href={instagram_url}
                className={styles.card__icon}
              >
                <Image
                  src={'/instagram-icon.svg'}
                  alt="icon"
                  fill
                />
              </Link>
              }
            </div>
          </>
        }
        {full && <Link className={styles.card__button} href={`/authors/${author.id}`}>
          Детальніше про автора
        </Link>
        }
        <div className={styles.card__buttonBox}>
          {canEdit && (
            <>
              <Link href={`/authors/${currentUser.id}/edit`} className={styles.card__editButton}>
                Редагувати профіль
              </Link>
              <Link
                href={`/authors/${currentUser.id}/create-project`}
                className={styles.card__editButton}
              >
                Створити проект
              </Link>
            </>
          )}
          {isAdmin && isOwner && (
            <a
              href="https://charity-platform-backend-va70.onrender.com/admin/"
              target="_blank"
              className={styles.card__adminButton}
            >
              Адмін-панель
            </a>
          )}
                </div>
        </div>
    </article>
  );
};