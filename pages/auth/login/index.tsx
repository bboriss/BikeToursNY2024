import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TextField, Button, Box, Typography } from '@mui/material';
import AuthLayout from '../../../components/Layout/AuthLayout';
import styles from './../../../styles/AuthForm.module.scss';

const Login: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <AuthLayout>
      <Box className={styles.formWrapper}>
        <Typography variant="h4" className={styles.formTitle}>{t('auth.login')}</Typography>
        <TextField label={t('auth.username')} variant="outlined" fullWidth margin="normal" className={styles.textField} />
        <TextField label={t('auth.password')} type="password" variant="outlined" fullWidth margin="normal" className={styles.textField} />
        <Button variant="contained" color="primary" fullWidth className={styles.submitButton}>{t('auth.login')}</Button>
        <Typography variant="body2" className={styles.linkText}>
          {t('auth.noAccount')}?{' '}
          <Link href="/auth/register" passHref legacyBehavior>
            <a className={styles.link}>{t('auth.register')}</a>
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

export default Login;
