import React from 'react';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomButton from '../components/CustomButton/CustomButton';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const changeLocale = (newLocale: string) => {
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  const currentLocale = router.locale || 'en';
  const changeTo = currentLocale === 'fr' ? 'de' : 'en';

  return (
    <div>
      <video
        src={require('../public/assets/video.mp4')}
        className={styles.backgroundVideo}
        autoPlay
        muted
        loop
      />
      <div className={styles.content}>
        <h1>{t('welcome')}</h1>
        <CustomButton href="/tours">{t('explore')}</CustomButton>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});

export default Home;
