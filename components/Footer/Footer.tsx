import React from 'react';
import { useTranslation } from 'next-i18next';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <p>&copy;{t('copyright')}</p>
    </footer>
  );
};

export default Footer;
