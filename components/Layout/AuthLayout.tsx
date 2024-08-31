import React from 'react';
import { Box, Container } from '@mui/material';
import { useTranslation } from 'next-i18next';
import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { t } = useTranslation('common');

  return (
    <Container className={styles.authContainer}>
      <Box className={styles.background}>
        <Box className={styles.overlay}>
          <h1>{t('auth.title')}</h1>
          <h2>{t('auth.subtitle')}</h2>
        </Box>
        <Box className={styles.form}>
            {children}
        </Box>
      </Box>
    </Container>
  );
};

export default AuthLayout;
