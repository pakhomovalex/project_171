'use client';

import styles from './DonationModal.module.scss';
import Image from 'next/image';

interface PaymentMethod {
  name: string;
  icon: string;
  url: string;
  color: string;
}

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    monobank_jar_url?: string;
    privatbank_konvert_url?: string;
    paypal_me_url?: string;
    other_payment_details?: string;
  };
}

export default function DonationModal({ isOpen, onClose, project }: DonationModalProps) {
  if (!isOpen) return null;

  const paymentMethods: PaymentMethod[] = [
    {
      name: 'Monobank',
      icon: '/monobank.svg',
      url: project.monobank_jar_url || '',
      color: '#000000',
    },
    {
      name: 'Privat24',
      icon: '/privat.svg',
      url: project.privatbank_konvert_url || '',
      color: '#6a1b9a',
    },
    {
      name: 'PayPal',
      icon: '/paypal.svg',
      url: project.paypal_me_url || '',
      color: '#003087',
    },
    {
      name: 'Інше',
      icon: '🔗',
      url: project.other_payment_details || '',
      color: '#374151',
    },
  ].filter(method => method.url); // Показываем только заполненные методы

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        
        <h2 className={styles.title}>Підтримати проект</h2>
        <p className={styles.subtitle}>Оберіть зручний спосіб оплати</p>

        <div className={styles.methodsList}>
          {paymentMethods.map(method => (
            <a
              key={method.name}
              href={method.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.methodCard}
              style={{ '--method-color': method.color } as React.CSSProperties}
            >
              <span className={styles.methodIcon}>
                <Image
                width={30}
                height={30}
                src={method.icon} 
                alt='icon'
                /> 
              </span>
              <span className={styles.methodName}>{method.name}</span>
              <span className={styles.methodArrow}>→</span>
            </a>
          ))}
        </div>

        {paymentMethods.length === 0 && (
          <p className={styles.noMethods}>
            Реквізити для оплати ще не додані автором
          </p>
        )}
      </div>
    </div>
  );
}