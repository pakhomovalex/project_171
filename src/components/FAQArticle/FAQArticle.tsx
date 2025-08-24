'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './FAQArticle.module.scss';
import classNames from 'classnames';
import Image from 'next/image';

export const FAQArticle = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      el.style.height = el.scrollHeight + "px";
    } else {
      el.style.height = "80px";
    }
  }, [isOpen]);

  return (
    <article
      className={classNames(styles.article, { [styles['article--open']]: isOpen })}
      onClick={() => setIsOpen(prev => !prev)}
      ref={contentRef}
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