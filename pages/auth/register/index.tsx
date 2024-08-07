import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TextField, Button, Box, Typography } from '@mui/material';
import AuthLayout from '../../../components/Layout/AuthLayout';
import styles from './register.module.scss';

const Register: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <AuthLayout>
      <Box className={styles.form}>
        <Typography variant="h4" className={styles.title}>{t('register')}</Typography>
        <TextField label={t('firstName')} variant="outlined" fullWidth margin="normal" />
        <TextField label={t('lastName')} variant="outlined" fullWidth margin="normal" />
        <TextField label={t('email')} type="email" variant="outlined" fullWidth margin="normal" />
        <TextField label={t('password')} type="password" variant="outlined" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth>{t('register')}</Button>
        <Typography variant="body2" className={styles.linkText}>
          {t('haveAccount')}?{' '}
          <Link href="/auth/login" passHref legacyBehavior>
            <a className={styles.link}>{t('login')}</a>
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});

export default Register;
