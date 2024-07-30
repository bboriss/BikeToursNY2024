import React from 'react';
import { Button } from '@mui/material';
import styles from './CustomButton.module.scss';

interface CustomButtonProps {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, href, children }) => {
  return (
    <Button
      className={styles.mainButton}
      variant="contained"
      onClick={onClick}
      href={href}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
