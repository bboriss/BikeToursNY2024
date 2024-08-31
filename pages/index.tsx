import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CustomButton from '../components/CustomButton/CustomButton';
import 'leaflet/dist/leaflet.css';
import styles from '../styles/Home.module.scss';

const Home: React.FC = () => {
  const { t } = useTranslation('common');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('./tours');
    }
  }, []);

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
