import React from 'react';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const About: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <h1>{t('aboutTitle')}</h1>
      <p>{t('aboutDescription')}</p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});

export default About;
