import React from 'react';
import { useTranslation } from 'next-i18next';
import styles from './About.module.scss';

const About: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.container}>
      <h1>{t('aboutTitle')}</h1>
      <section className={styles.intro}>
        <p>{t('aboutIntro')}</p>
      </section>
      <section className={styles.details}>
        <h2>{t('aboutPurposeTitle')}</h2>
        <p>{t('aboutPurposeText')}</p>
        <h2>{t('aboutWhoCanUseTitle')}</h2>
        <p>{t('aboutWhoCanUseText')}</p>
        <h2>{t('aboutBenefitsTitle')}</h2>
        <p>{t('aboutBenefitsText')}</p>
        <h2>{t('aboutContactTitle')}</h2>
        <p>{t('aboutContactText')}</p>
      </section>
    </div>
  );
};

export default About;
