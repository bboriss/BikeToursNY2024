import React from 'react';
import { Box } from '@mui/material';
import styles from './ToursLayoutr.module.scss';
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
