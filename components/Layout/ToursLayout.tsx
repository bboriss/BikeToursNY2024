import React from 'react';
import { Box, Container } from '@mui/material';
import styles from './ToursLayout.module.scss';

interface ToursLayoutProps {
  children: React.ReactNode;
}

const ToursLayout: React.FC<ToursLayoutProps> = ({ children }) => {
  return (
    <Box className={styles.toursContainer}>
      {children}
    </Box>
  );
};

export default ToursLayout;
