import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import styles from './CustomButton.module.scss';

interface CustomButtonProps {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, href, children }) => {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
    if (href) {
      router.push(href);
    }
  };

  return (
    <Button
      className={styles.mainButton}
      variant="contained"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
