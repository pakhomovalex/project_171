'use client';

import { useState } from 'react';
import styles from './FAQArticle.module.scss';
import classNames from 'classnames';
import Image from 'next/image';

export const FAQArticle = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article
      className={classNames(styles.article, { [styles['article--open']]: isOpen })}
      onClick={() => setIsOpen(prev => !prev)}
    >
      <div className={styles.article__content}>
        <div className={styles.article__titleBox}>
          <h4 className={styles.article__title}>
            {question}
          </h4>
          <button
            className={styles.article__button}
          >
            <Image src={'/arrow-bottom-blue.svg'} alt={'arrow'} width={30} height={30} />
          </button>
        </div>
        <p className={styles.article__description}>
          {answer}
        </p>
      </div>
    </article>
  );

};