import React from 'react';
import { Box, Container } from '@mui/material';
import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Container className={styles.authContainer}>
      <Box className={styles.background}>
        <Box className={styles.overlay}>
          <h1>Start Your City Adventure Here</h1>
          <h4>Registrujte se kako biste otključali dodatne mogućnosti istraživanja najboljih biciklističkih tura grada za najbolji doživljaj.</h4>
        </Box>
        <Box className={styles.form}>
            {children}
        </Box>
      </Box>
    </Container>
  );
};

export default AuthLayout;
