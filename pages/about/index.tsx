import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import styles from './About.module.scss';

const About: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('aboutPage.about')}</title>
        <meta name="description" content={t('aboutPage.description')} />
      </Head>
      <main className={styles.container}>
        <section className={styles.section}>
          <h1 className={styles.title}>{t('aboutPage.about')}</h1>
          <h2 className={styles.subtitle}>{t('aboutPage.mission')}</h2>
          <p className={styles.text}>{t('aboutPage.missionText')}</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.subtitle}>{t('aboutPage.offer')}</h2>
          <ul className={styles.list}>
            <li>{t('aboutPage.guidedTours')}</li>
            <li>{t('aboutPage.selfGuidedTours')}</li>
            <li>{t('aboutPage.customizableTours')}</li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2 className={styles.subtitle}>{t('aboutPage.whyChooseUs')}</h2>
          <ul className={styles.list}>
            <li>{t('aboutPage.scenicRoutes')}</li>
            <li>{t('aboutPage.safetyFirst')}</li>
            <li>{t('aboutPage.localExperience')}</li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2 className={styles.subtitle}>{t('aboutPage.whoCanJoin')}</h2>
          <p className={styles.text}>{t('aboutPage.whoCanJoinText')}</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.subtitle}>{t('aboutPage.contactUs')}</h2>
          <p className={styles.text}>{t('aboutPage.contactUsText')}</p>
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
});

export default About;
